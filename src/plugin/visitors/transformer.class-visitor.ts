import ts from 'typescript';
import { GetterName } from '../../common/constants';
import { CreateStaticGetter, MetadataDecorator } from '../transformer';
import { ClassElementVisitor } from './transformer.class-element-visitor';
import { ClassTransformerMetadata } from '../transformer.types';
import { serializeValue } from '../serializer';

export class ClassVisitor {
  public metadataDecorator: MetadataDecorator;

  public elementVisitor: ClassElementVisitor;

  public createStaticGetter: CreateStaticGetter;

  public metadata: ClassTransformerMetadata = {
    propNames: [],
    methodNames: [],
    decorators: [],
    members: {},
  };

  constructor(
    public program: ts.Program,
    public context: ts.TransformationContext,
    public sourceFile: ts.SourceFile,
  ) {
    this.metadataDecorator = new MetadataDecorator(program, context, sourceFile);
    this.elementVisitor = new ClassElementVisitor(program, context, sourceFile, this.metadata);
  }

  private isExtending(node: ts.ClassDeclaration) {
    const clauses = node.heritageClauses;
    if (!clauses?.length) return false;
    return clauses.some((clause) => clause.token === ts.SyntaxKind.ExtendsKeyword);
  }

  visit(node: ts.ClassDeclaration): ts.ClassDeclaration {
    const isExtending = this.isExtending(node);

    // eslint-disable-next-line no-param-reassign
    node = ts.visitEachChild(node, (curr) => this.elementVisitor.visit(curr), this.context);

    return this.context.factory.updateClassDeclaration(
      node,
      [
        ...(ts.getModifiers(node) ?? []),
        ...(ts.getDecorators(node) ?? []),
        ...this.metadata.decorators,
      ],
      node.name,
      node.typeParameters,
      node.heritageClauses,
      [
        ...node.members,
        CreateStaticGetter.create(
          this.context,
          GetterName.PropNames,
          this.metadata.propNames,
          isExtending,
        ),
        CreateStaticGetter.create(
          this.context,
          GetterName.MethodNames,
          this.metadata.methodNames,
          isExtending,
        ),
        this.createMetadataGetter(node),
      ],
    );
  }

  createMetadataGetter(node: ts.ClassDeclaration) {
    const metadataValues: Record<string, ts.Expression> = {};
    Object.entries(this.metadata.members).forEach(([key, value]) => {
      metadataValues[key] = serializeValue.asRecord(value);
    });
    const metadata = serializeValue.asRecord(metadataValues, true);

    const ret = this.isExtending(node)
      ? this.context.factory.createObjectLiteralExpression([
        this.context.factory.createSpreadAssignment(
          this.context.factory.createCallExpression(
            this.context.factory.createPropertyAccessExpression(
              this.context.factory.createSuper(),
              GetterName.Members,
            ),
            undefined,
            [],
          ),
        ),
        this.context.factory.createSpreadAssignment(metadata),
      ], true)
      : metadata;

    return this.context.factory.createMethodDeclaration(
      [this.context.factory.createModifier(ts.SyntaxKind.StaticKeyword)],
      undefined,
      GetterName.Members,
      undefined,
      undefined,
      [],
      undefined,
      this.context.factory.createBlock([
        this.context.factory.createReturnStatement(ret),
      ], true),
    );
  }
}

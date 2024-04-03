/* eslint-disable no-bitwise */
import ts from 'typescript';
import { MetaName } from '../../lib';
import { PropertyMetadata } from '../metadata';
import { Visitor } from './visitor.abstract';

export class PropertyVisitor extends Visitor<ts.PropertyDeclaration> {
  update(node: ts.PropertyDeclaration, decorators: ts.Decorator[]) {
    return this.context.factory.updatePropertyDeclaration(
      node,
      [
        ...ts.getModifiers(node) ?? [],
        ...ts.getDecorators(node) ?? [],
        ...decorators,
      ],
      node.name,
      node.questionToken,
      node.type,
      node.initializer,
    );
  }

  private parsePropertyMetadata(node: ts.PropertyDeclaration) {
    const type = this.getType(node);
    const propertyMetadata = new PropertyMetadata(
      node,
      type,
      this.program,
      this.context,
    );

    return propertyMetadata.serialize();
  }

  parse(node: ts.PropertyDeclaration): Partial<Record<MetaName, ts.Expression>> {
    return {
      [MetaName.PropMeta]: this.parsePropertyMetadata(node),
    };
  }
}

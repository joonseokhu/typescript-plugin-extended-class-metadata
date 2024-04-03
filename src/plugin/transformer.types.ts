import ts from 'typescript';
import { MetaName } from '../lib';

export interface ClassTransformerMetadata {
  propNames: string[];
  methodNames: string[];
  decorators: ts.ModifierLike[];
  members: Record<string, Partial<Record<MetaName, ts.Expression>>>;
}

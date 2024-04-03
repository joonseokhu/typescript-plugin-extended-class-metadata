import 'reflect-metadata';
import { expect } from 'chai';
import { ValueTypeName, getPropertyMetadata, getPropertyNames } from '../../../dist/lib';
import { ImportedTypeTest } from './imported-type';

describe('imported type', () => {
  it('should have correct property names', () => {
    expect(getPropertyNames(ImportedTypeTest)).to.be.deep.equal([
      'iBool',
      'iNum',
      'iStr',
      'iEnumA',
      'iEnumB',
      'iEnumC',
      'iSubA1',
      'iSubB1',
      'iSubC1',
      'iSubD1',
      'iSubA2',
      'iSubB2',
      'iSubC2',
      'iSubD2',
    ]);
  });

  it('iBool should have correct metadata', () => {
    const data = getPropertyMetadata(ImportedTypeTest.prototype, 'iBool');

    expect(data?.type).to.equal(ValueTypeName.Boolean);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(true);
  });
});

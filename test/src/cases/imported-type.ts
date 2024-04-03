import 'reflect-metadata';
import {
  IBoolean, IEnumA, IEnumB, INumber, IString, ISubA, ISubB,
} from './imported-type-data-1';
import { IEnumC, ISubC, ISubD } from './imported-type-data-2';

export class ImportedTypeTest {
  iBool: IBoolean = true;

  iNum: INumber = 0;

  iStr: IString = '';

  iEnumA: IEnumA = IEnumA.a;

  iEnumB: IEnumB;

  iEnumC: IEnumC;

  iSubA1: ISubA = new ISubA();

  iSubB1: ISubB<number>;

  iSubC1: ISubC;

  iSubD1: ISubD<number>;

  constructor(
    public iSubA2: ISubA,
    public iSubB2: ISubB<number>,
    public iSubC2: ISubC,
    public iSubD2: ISubD<number>,
  ) {}
}

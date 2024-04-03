export const enum MetaName {
  PropMeta = 'pm',
  MethodMeta = 'mm',
  ReturnType = 'rt',
  ParamTypes = 'pt',
  Constructor = 'ctr',
  // Initializer = 'init',
}

export enum GetterName {
  PropNames = '_TSEMD_pn',
  MethodNames = '_TSEMD_mn',
  Members = '_TSEMD_m',
}

export enum ValueTypeName {
  Unknown = 'unknown',
  Undefined = 'undefined',
  Null = 'null',
  Boolean = 'boolean',
  Number = 'number',
  String = 'string',
  Object = 'object',
}

/* eslint-disable no-bitwise */
export enum ValueTypeFlag {
  Unknown = 0,
  Optional = 1 << 0,
  Promise = 1 << 1,
  Array = 1 << 2,
  Class = 1 << 3,
  Enum = 1 << 4,
}

export enum MemberFlag {
  Unknown = 0,
  Deprecated = 1 << 10,
  Static = 1 << 11,
  NonPublic = 1 << 12,
}

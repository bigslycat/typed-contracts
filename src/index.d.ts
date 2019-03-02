export declare class ValidationError {
  readonly valueName: string;
  readonly expectedTypes: ReadonlyArray<string>;
  readonly value: unknown;
  readonly nested: ReadonlyArray<ValidationError>;

  constructor(
    valueName: string,
    value: unknown,
    expectedTypes?: string | ReadonlyArray<string>,
    nested?: ReadonlyArray<ValidationError>,
  );
}

export declare class ObjectValidationError extends ValidationError {
  constructor(
    valueName: string,
    value: unknown,
    errors: ReadonlyArray<ValidationError>,
  );
}

export declare class ArrayValidationError extends ValidationError {
  constructor(
    valueName: string,
    value: unknown,
    errors: ReadonlyArray<ValidationError>,
  );
}

export declare class UnionError extends ValidationError {
  constructor(
    valueName: string,
    value: unknown,
    errors: ReadonlyArray<ValidationError>,
  );
}

export type Contract<T> = {
  (valueName: string): {
    (value: unknown): ValidationError | T,
    optional(value: unknown): ValidationError | void | T,
    maybe(value: unknown): ValidationError | void | null | T,
  },
  (valueName: string, value: unknown): ValidationError | T,

  optional(
    valueName: string
  ): (value: unknown) => ValidationError | void | T,
  optional(valueName: string, value: unknown): ValidationError | void | T,

  maybe(
    valueName: string
  ): (value: unknown) => ValidationError | void | null | T,
  maybe(valueName: string, value: unknown): ValidationError | void | null | T,
};

export declare function of<T>(
  validate: (valueName: string, value: unknown) => ValidationError | T,
): Contract<T>;

export declare function array<T>(
  ...rules: Array<(name: string, value: unknown) => ValidationError | T>
): Contract<ReadonlyArray<T>>;

export declare var isArray: typeof array;
export declare var passArray: typeof array;
export declare var arr: typeof array;
export declare var isArr: typeof array;
export declare var passArr: typeof array;

export declare var boolean: Contract<boolean>;
export declare var isBoolean: typeof boolean;
export declare var passBoolean: typeof boolean;
export declare var bool: typeof boolean;
export declare var isBool: typeof boolean;
export declare var passBool: typeof boolean;

export declare function literal<T extends string | number | boolean>(
  expectedValue: T,
): Contract<T>;

export declare var isLiteral: typeof literal;
export declare var passLiteral: typeof literal;
export declare var lit: typeof literal;
export declare var isLit: typeof literal;
export declare var passLit: typeof literal;

export declare var nul: Contract<null>;
export declare var isNull: typeof nul;
export declare var passNull: typeof nul;

export declare var number: Contract<number>;
export declare var isNumber: typeof number;
export declare var passNumber: typeof number;
export declare var num: typeof number;
export declare var isNum: typeof number;
export declare var passNum: typeof number;

export declare var string: Contract<string>;
export declare var isString: typeof string;
export declare var passString: typeof string;
export declare var str: typeof string;
export declare var isStr: typeof string;
export declare var passStr: typeof string;

export declare function union<T, L extends string | number | boolean>(
  ...rules: Array<
    ((name: string, value: unknown) => ValidationError | T) | L
  >
): Contract<T | L>;

export declare var isUnion: typeof union;
export declare var passUnion: typeof union;
export declare var uni: typeof union;
export declare var isUni: typeof union;
export declare var passUni: typeof union;

export declare var undef: Contract<void>;
export declare var isUndefined: typeof undef;
export declare var passUndefined: typeof undef;
export declare var isUndef: typeof undef;
export declare var passUndef: typeof undef;
export declare var isVoid: typeof undef;
export declare var passVoid: typeof undef;

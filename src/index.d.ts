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

type Validator<T> = (name: string, value: unknown) => ValidationError | T
export type Get<T extends Validator<any>> = T extends Validator<infer R> ? R : never;

export type Contract<T> = {
  (valueName: string): {
    (value: unknown): ValidationError | T,
    optional(value: unknown): ValidationError | void | T,
    maybe(value: unknown): ValidationError | void | null | T,
  },
  (valueName: string, value: unknown): ValidationError | T,

  optional(valueName: string): Validator<T | void>,
  optional(valueName: string, value: unknown): ValidationError | void | T,

  maybe(valueName: string): Validator<T | void | null>,
  maybe(valueName: string, value: unknown): ValidationError | void | null | T,

  mapResult<M>(
    transform: (result: ValidationError | T) => M,
  ): ((valueName: string) => (value: unknown) => M) &
    ((valueName: string, value: unknown) => M),

  match<M>(
    fromValue: (value: T) => M,
    fromError: (error: ValidationError) => M,
  ): ((valueName: string) => (value: unknown) => M) &
    ((valueName: string, value: unknown) => M),
};

export declare function of<T>(validate: Validator<T>): Contract<T>;

export declare function array<T extends Array<Validator<any>>>(
  ...rules: T
): Contract<ReadonlyArray<Get<T[number]>>>;

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

export declare function union<T extends Array<Validator<any> | string | number | boolean>>(
  ...rules: T
): Contract<
  Exclude<T[number], Validator<any>> | (Extract<T[number], Validator<any>> extends Validator<any> ? Get<T[number]> : T[number])
>;

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

export declare function objectOf<T extends Array<Validator<any> | string | number | boolean>>(
  ...rules: T
): Contract<{
  readonly [key: string]:
    Exclude<T[number], Validator<any>> | (Extract<T[number], Validator<any>> extends Validator<any> ? Get<T[number]> : T[number])
}>;

export declare var isObjectOf: typeof objectOf;
export declare var passObjectOf: typeof objectOf;
export declare var objOf: typeof objectOf;
export declare var isObjOf: typeof objectOf;
export declare var passObjOf: typeof objectOf;

export declare function object<
  S extends {
    [prop: string]: (valueName: string, value: unknown) => any,
  },
>(spec: S): Contract<{
  readonly [K in keyof S]: Exclude<ReturnType<S[K]>, ValidationError>
}>;

export declare var isObject: typeof object;
export declare var passObject: typeof object;
export declare var obj: typeof object;
export declare var isObj: typeof object;
export declare var passObj: typeof object;

export declare function shape<
  S extends {
    [prop: string]: (valueName: string, value: unknown) => any,
  },
>(spec: S): Contract<{
  readonly [K in keyof S]: void | Exclude<ReturnType<S[K]>, ValidationError>
}>;

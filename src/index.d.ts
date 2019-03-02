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


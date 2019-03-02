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


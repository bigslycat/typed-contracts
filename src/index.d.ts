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

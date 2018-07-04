/* @flow */

const valueToString = (value: mixed): string => {
  if (Number.isNaN(value)) return 'NaN';
  switch (value) {
    case undefined:
      return 'undefined';
    case null:
      return 'null';
    default:
      return `${JSON.stringify(value)} (${typeof value})`;
  }
};

const typesToString = (expectedTypes: string[]): string =>
  expectedTypes
    .slice(0, -2)
    .concat(expectedTypes.slice(-2).join(' or '))
    .join(', ');

export class ValidationError extends TypeError {
  static of(
    valueName: string,
    value: mixed,
    expectedType: string,
    ...otherExpectedTypes: string[]
  ) {
    return new ValidationError(
      valueName,
      value,
      expectedType,
      ...otherExpectedTypes,
    );
  }

  +valueName: string;

  +expectedTypes: string[];

  +value: mixed;

  constructor(
    valueName: string,
    value: mixed,
    expectedType: string,
    ...otherExpectedTypes: string[]
  ) {
    super();

    this.name = 'ValidationError';
    this.valueName = valueName;
    this.value = value;
    this.expectedTypes = [expectedType].concat(otherExpectedTypes);
    this.message = `${this.valueName} must be ${typesToString(
      this.expectedTypes,
    )}, but ${valueToString(value)} given`;
  }
}

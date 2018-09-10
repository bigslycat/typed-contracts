/* @flow */

const valueToString = (value: mixed): string => {
  if (Number.isNaN(value)) return 'NaN';
  if (typeof value == 'function') return '[Function]';
  // $FlowFixMe
  if (typeof value == 'symbol') return value.toString();

  switch (value) {
    case Infinity:
      return Infinity.toString();
    case -Infinity:
      return (-Infinity).toString();
    case undefined:
      return 'undefined';
    case null:
      return 'null';
    default:
      return `${JSON.stringify(value)} (${typeof value})`;
  }
};

const typesToString = (expectedTypes: $ReadOnlyArray<string>): string =>
  expectedTypes
    .slice(0, -2)
    .concat(expectedTypes.slice(-2).join(' or '))
    .join(', ');

export class ValidationError extends TypeError {
  static of(
    valueName: string,
    value: mixed,
    expectedType: string,
    ...otherExpectedTypes: $ReadOnlyArray<string>
  ) {
    return new ValidationError(
      valueName,
      value,
      expectedType,
      ...otherExpectedTypes,
    );
  }

  +valueName: string;

  +expectedTypes: $ReadOnlyArray<string>;

  +value: mixed;

  constructor(
    valueName: string,
    value: mixed,
    expectedType: string,
    ...otherExpectedTypes: $ReadOnlyArray<string>
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

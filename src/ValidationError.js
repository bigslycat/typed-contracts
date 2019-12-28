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
      return `${(JSON.stringify(value): any)} (${typeof value})`;
  }
};

const typesToString = (expectedTypes: $ReadOnlyArray<string>): string =>
  expectedTypes
    .slice(0, -2)
    .concat(expectedTypes.slice(-2).join(' or '))
    .join(', ');

export class ValidationError extends TypeError {
  /* :: +valueName: string; */
  /* :: +expectedTypes: $ReadOnlyArray<string>; */
  /* :: +value: mixed; */
  /* :: +nested: $ReadOnlyArray<ValidationError>; */

  constructor(
    valueName: string,
    value: mixed,
    expectedTypes: string | $ReadOnlyArray<string> = [],
    nested?: $ReadOnlyArray<ValidationError> = [],
  ) {
    super();

    this.name = 'ValidationError';
    this.valueName = valueName;
    this.value = value;
    this.expectedTypes = [].concat(expectedTypes);
    this.nested = nested;

    if (this.expectedTypes.length) {
      this.message = this.nested.length
        ? `${this.expectedTypes[0]} ${this.valueName} have ${this.nested.length} nested validation errors`
        : `\`${this.valueName}\` must be ${typesToString(
            this.expectedTypes,
          )}, but ${valueToString(value)} given`;
    }
  }
}

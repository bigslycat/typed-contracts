/* @flow */

import { ValidationError } from '../../ValidationError';

export class ObjectValidationError extends ValidationError {
  constructor(
    valueName: string,
    value: mixed,
    errors: $ReadOnlyArray<ValidationError>,
  ) {
    super(valueName, value, 'Object', errors);
    this.name = 'ObjectValidationError';
  }
}

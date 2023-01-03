import { startCase, isEmpty } from 'lodash';

export class Utilities {
  static async parseError(error) {
    const children = [];
    for (const child of error.children || []) {
      children.push(this.parseError(child));
    }

    const messages = [];
    for (const c in error.constraints) {
      let message = error.constraints[c];
      message = message.replace(error.property, startCase(error.property));
      messages.push(message);
    }

    const errors = {};
    if (!isEmpty(messages)) {
      errors[error.property] = messages;
    }

    for (const child of children) {
      for (const key in child) {
        errors[`${error.property}.${key}`] = child[key];
      }
    }

    return errors;
  }
}

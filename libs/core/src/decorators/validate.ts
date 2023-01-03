import { createParamDecorator, ExecutionContext, HttpException, HttpStatus, Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { isEmpty } from 'lodash';
import { Utilities } from '../utilities/utils';

export const Validate = createParamDecorator(async function <T>(dto: Type<T>, ctx: ExecutionContext) {
  const request = ctx.switchToHttp().getRequest();
  const allParams = { ...request.query, ...request.body, ...request.params };
  const schema: T = plainToClass(dto, allParams, { excludeExtraneousValues: true });
  const errors = await validate(schema as Record<string, any>, {
    stopAtFirstError: true,
  });

  /**
   * Process errors, if any.
   * Throws new ValidationFailed Exception with validation errors
   */
  let bag = {};
  if (errors.length > 0) {
    for (const error of errors) {
      const errorsFromParser = await Utilities.parseError(error);
      const childErrorBag = {};
      for (const key in errorsFromParser) {
        if (!isEmpty(errorsFromParser[key])) {
          childErrorBag[key] = errorsFromParser[key];
        }
      }

      bag = { ...bag, ...childErrorBag };
    }

    throw new HttpException(bag, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  return schema;
});

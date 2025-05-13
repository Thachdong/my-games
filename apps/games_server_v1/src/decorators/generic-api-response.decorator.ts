import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { HttpResponse } from '../common/http-response';

export function GenericApiResponse(
  params: Omit<ApiResponseOptions, 'schema' | 'type'> = {},
  type?: Type<unknown> | Type<unknown>[]
): MethodDecorator {
  const isArray = Array.isArray(type);
  const model = isArray ? (type as Type<unknown>[])[0] : type;
  const models = [HttpResponse, ...(model ? [model] : [])];

  const dataSchema = type
    ? isArray
      ? { type: 'array', items: { $ref: getSchemaPath(model) } }
      : { $ref: getSchemaPath(model) }
    : { type: 'null', example: null };

  const schema = {
    allOf: [
      { $ref: getSchemaPath(HttpResponse) },
      { properties: { data: dataSchema } },
    ],
  };

  return applyDecorators(
    ApiExtraModels(...models),
    ApiResponse({
      ...params,
      schema,
    })
  );
}

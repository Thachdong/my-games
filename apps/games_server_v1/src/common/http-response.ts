import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

class Meta {
  @ApiProperty({ example: 100, required: false })
  total?: number;
  @ApiProperty({ example: 1, required: false })
  page?: number;
  @ApiProperty({ example: 10, required: false })
  limit?: number;
}

export class HttpResponse<T> {
  @ApiProperty({ example: HttpStatus.OK, required: true, type: 'number', enumName: 'HttpStatus' })
  statusCode: HttpStatus;
  @ApiProperty({ example: "Message", required: true, type: 'string' })
  message: string;
  @ApiProperty({ required: true })
  data?: T;
  @ApiProperty({ example: "Error", required: false, type: 'string' })
  error?: string;
  @ApiProperty({ example: ["Error 1", "Error 2"], required: false, type: 'array', items: { type: 'string' } })
  errors?: string[];
  @ApiProperty({ example: { total: 100, page: 1, limit: 10 }, required: false, type: () => Meta })
  meta?: Meta;
}

export type THttpResponse<T> = InstanceType<typeof HttpResponse<T>>;

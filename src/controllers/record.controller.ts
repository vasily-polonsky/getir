import { Body, Post, Route, Tags } from 'tsoa';
import { SearchDto } from '../dto/search.dto';
import { RecordService } from '../services/record.service';
import { dtoValidate } from '../validation';

@Tags('Users')
@Route('/records/')
export class RecordController {
  recordService: RecordService;

  constructor() {
    this.recordService = new RecordService();
  }

  @Post()
  async findRecords(@Body() dto: SearchDto) {
    const searchDto = dtoValidate(SearchDto, dto);

    const records: { key: string; createdAt: Date; totalCount: number }[] =
      await this.recordService.search(searchDto);

    return {
      // There is a conflict in requirements to provide RESTful api and at the same time not follow well known standards
      // this request should be GET request with query parameters and with response status code 200
      // instead of POST with request body and response with code inside body...
      code: 0,
      msg: 'Success',
      records,
    };
  }
}

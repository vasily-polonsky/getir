import { SearchDto } from '../dto/search.dto';
import { IRecord, RecordModel } from '../models/record.model';

export class RecordService {
  async search({ startDate, endDate, minCount, maxCount }: SearchDto) {
    const records = await RecordModel.aggregate<
      Pick<IRecord, 'key' | 'createdAt'> & { totalCount: number }
    >([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      { $project: { key: 1, createdAt: 1, totalCount: { $sum: '$counts' } } },
      {
        $match: {
          totalCount: { $gte: minCount, $lte: maxCount },
        },
      },
    ]);
    return records;
  }
}

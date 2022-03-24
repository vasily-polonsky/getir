import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { RecordService } from './record.service';
import { RecordModel } from '../models/record.model';

let mongoServer: MongoMemoryServer;
describe('RecordService', () => {
  let recordService: RecordService;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    recordService = new RecordService();
  });

  beforeEach(async () => {
    const { collections } = mongoose.connection;

    await Promise.all(
      Object.keys(collections).map(async (key) => {
        await collections[key].deleteMany({});
      }),
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('records', () => {
    describe('when the records exist and the conditions are met', () => {
      it('should return the records', async () => {
        await RecordModel.create([
          {
            key: 'firstKey',
            value: 'firstValue',
            createdAt: new Date('2015-01-01'),
            counts: [100, 200, 300],
          },
          {
            key: 'secondKey',
            value: 'secondValue',
            createdAt: new Date('2016-01-01'),
            counts: [2, 3, 4],
          },
        ]);

        const result = await recordService.search({
          startDate: new Date('2014-01-01'),
          endDate: new Date('2017-01-01'),
          minCount: 0,
          maxCount: 1000,
        });

        expect(result).toMatchObject([
          {
            key: 'firstKey',
            createdAt: new Date('2015-01-01'),
            totalCount: 600,
          },
          { key: 'secondKey', createdAt: new Date('2016-01-01'), totalCount: 9 },
        ]);
      });
    });

    describe('when the records exist and the date conditions are not met', () => {
      it('should return only the records satisfying conditions', async () => {
        await RecordModel.create([
          {
            key: 'firstKey',
            value: 'firstValue',
            createdAt: new Date('2015-01-01'),
            counts: [100, 200, 300],
          },
          {
            key: 'secondKey',
            value: 'secondValue',
            createdAt: new Date('2016-01-01'),
            counts: [2, 3, 4],
          },
          {
            key: 'thirdKey',
            value: 'thirdValue',
            createdAt: new Date('2015-01-01'),
            counts: [20, 30, 40],
          },
        ]);

        const result = await recordService.search({
          startDate: new Date('2016-01-01'),
          endDate: new Date('2016-01-01'),
          minCount: 0,
          maxCount: 1000,
        });

        expect(result).toMatchObject([
          { key: 'secondKey', createdAt: new Date('2016-01-01'), totalCount: 9 },
        ]);
      });
    });

    describe('when the records exist and the count conditions are not met', () => {
      it('should return only the records satisfying conditions', async () => {
        await RecordModel.create([
          {
            key: 'firstKey',
            value: 'firstValue',
            createdAt: new Date('2015-01-01'),
            counts: [100, 200, 300],
          },
          {
            key: 'secondKey',
            value: 'secondValue',
            createdAt: new Date('2016-01-01'),
            counts: [2, 3, 4],
          },
          {
            key: 'thirdKey',
            value: 'thirdValue',
            createdAt: new Date('2015-01-01'),
            counts: [20, 30, 40],
          },
        ]);

        const result = await recordService.search({
          startDate: new Date('2011-01-01'),
          endDate: new Date('2019-01-01'),
          minCount: 50,
          maxCount: 500,
        });

        expect(result).toMatchObject([
          { key: 'thirdKey', createdAt: new Date('2015-01-01'), totalCount: 90 },
        ]);
      });
    });
  });
});

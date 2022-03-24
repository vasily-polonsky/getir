import mongoose, { Document, Schema } from 'mongoose';

const recordScheme = new Schema(
  {
    key: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },

    counts: [
      {
        type: Number,
      },
    ],
  },
  { versionKey: false, timestamps: { createdAt: true, updatedAt: false } },
);

export interface IRecord {
  key: string;

  value: string;

  counts: number[];

  createdAt: Date;
}

export interface IRecordModel extends Document, IRecord {}

export const RecordModel = mongoose.model<IRecordModel>('records', recordScheme);

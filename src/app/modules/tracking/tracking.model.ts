/* eslint-disable @typescript-eslint/no-this-alias */
import { DateValue, Time } from '@internationalized/date';
import { ObjectId, Schema, model } from 'mongoose';
import { ITracking } from './tracking.interface';

const dateSchema = new Schema<DateValue>(
  {
    calendar: {
      identifier: { type: String, trim: true, required: true },
    },
    era: { type: String, trim: true, required: true },
    year: { type: Number, required: true },
    day: { type: Number, required: true },
    month: { type: Number, required: true },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const timeSchema = new Schema<Time>(
  {
    hour: { type: Number, required: true },
    minute: { type: Number, required: true },
    second: { type: Number, required: true },
    millisecond: { type: Number, required: true },
  },
  {
    _id: false,
    versionKey: false,
  }
);

export interface ITrackingDocument extends Omit<ITracking, '_id'>, Document {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TrackingSchema = new Schema<ITracking>(
  {
    loadId: { type: String, trim: true, required: true },
    loadStatus: {
      type: String,
      enum: [
        'under_process',
        'left_warehouse',
        'shipped_to_delivery_city',
        'delivered',
      ],
      required: true,
    },
    driverName: { type: String, trim: true, required: true },
    driverPhone: { type: String, trim: true, required: true },
    carrierName: { type: String, trim: true },
    carrierPhone: { type: String, trim: true },
    notificationEmail: { type: String, trim: true },
    notificationPhone: { type: String, trim: true },
    note: { type: String, trim: true },
    locations: [
      {
        id: { type: Number, required: true },
        location: {
          type: { type: String, enum: ['Point'], default: 'Point' },
          formatted: { type: String, trim: true, required: true },
          coordinates: {
            type: [Number],
            required: true,
            validate: {
              validator: function (value: number[]) {
                return value.length === 2;
              },
              message: (props: Record<string, unknown>) =>
                `${props.value} is not a valid coordinate array!`,
            },
          }, // [longitude, latitude]
        },
        isCompleted: { type: Boolean, default: false },
        actualDate: dateSchema,
        actualTime: timeSchema,
        startDate: dateSchema,
        startTime: timeSchema,
        endDate: dateSchema,
        endTime: timeSchema,
      },
    ],
    knownLocations: {
      type: [Object],
      country: String,
      state: String,
      lat: Number,
      lon: Number,
      time: { type: Date },
      required: false,
    },
    isActive: {
      type: Boolean,
      enum: [true, false],
      required: false,
    },
    type: { type: String, enum: ['active', 'passive'], required: true },
    status: { type: String, trim: true, required: true },
    isPublished: { type: Boolean, required: true },
    isArchived: { type: Boolean, default: false },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Tracking = model<ITracking>('Tracking', TrackingSchema);

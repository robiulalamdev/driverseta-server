/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { INotification } from './notification.interface';

const NotificationSchema = new Schema<INotification>(
  {
    phoneNumber: { type: String, required: true },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Notification = model<INotification>(
  'Notification',
  NotificationSchema
);

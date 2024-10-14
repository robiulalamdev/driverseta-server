/* eslint-disable no-unused-vars */

import { DateValue, Time } from "@internationalized/date";
import { ObjectId } from "mongoose";


export type ITracking = {
  loadId: ObjectId;
  loadStatus: string;
  driverName: string;
  driverPhone: string;
  carrierName: string;
  carrierPhone: string;
  notificationEmail:string;
  notificationPhone:string;
  note:string;
  locations:[
    {
      id:number;
      location:{
        type:string;
        formatted:string;
        coordicates:number[];
      },
      isCompleted:boolean;
      actualDate:DateValue;
      actualTime: Time;
      startDate:DateValue;
      startTime: Time;
      endDate:DateValue;
      endTime: Time;
    },
  ],
  status:string;
  isPublished: boolean;
  isArchived: boolean;
};


// export type TrackingModel = {
//   isUserExist(
//     id: string
//   ): Promise<ITracking>;
  
// } & Model<ITracking>;

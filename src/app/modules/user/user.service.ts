import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { RedisClient } from '../../../shared/redis';

import { EVENT_FACULTY_CREATED, EVENT_STUDENT_CREATED } from './user.constant';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId, 
} from './user.utils';



export const UserService = {
 
};
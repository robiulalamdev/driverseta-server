import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { TrackingRoutes } from '../modules/tracking/tracking.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path:'/tracking',
    route: TrackingRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
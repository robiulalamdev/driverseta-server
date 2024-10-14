import express from 'express';
import { TrackingController } from './tracking.controller';
const router = express.Router();

/**
 * @swagger
 * /tracking/init:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */

router.get('/init', TrackingController.init);

router.post('create', TrackingController.create);
router.get(
  '/deriver/:phoneNumber',
  TrackingController.getTrackingDataForDriver
);
router.get('/:id', TrackingController.getTrackingById);

export const TrackingRoutes = router;

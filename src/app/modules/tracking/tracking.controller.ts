import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Tracking } from './tracking.model';

// const createStudent: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const { student, ...userData } = req.body;
//     const result = await UserService.createStudent(student, userData);

//     sendResponse<IUser>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Student created successfully!',
//       data: result,
//     });
//   }
// );

// const createFaculy: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const { faculty, ...userData } = req.body;
//     const result = await UserService.createFaculty(faculty, userData);

//     sendResponse<IUser>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Faculty created successfully!',
//       data: result,
//     });
//   }
// );

// const createAdmin: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const { admin, ...userData } = req.body;
//     const result = await UserService.createAdmin(admin, userData);

//     sendResponse<IUser>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Admin created successfully!',
//       data: result,
//     });
//   }
// );

const init: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tracking Route Created!',
    data: 'There is no data',
  });
});

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body;
    console.log(body);

    try {
      const result = await Tracking.create(body);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Tracking Route Created!',
        data: result,
      });
    } catch (error: unknown) {
      console.error('Error in POST /tracking:', error);
      let errorMessage = 'An unexpected error occurred';

      if (error instanceof Error) {
        errorMessage = error.message;
      }
      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'An unexpected error occurred',
        data: errorMessage, // Or handle error object as needed
      });
    }
  }
);

const getRequestTrackingsForDriver = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const result = await Tracking.find({
        driverPhone: req.params?.phoneNumber,
        loadStatus: { $ne: 'delivered' },
      }).sort({ _id: -1 });

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
      });
    } catch (error: unknown) {
      console.error('Error in GET /tracking:', error);

      let errorMessage = 'An unexpected error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: errorMessage,
      });
    }
  }
);

const getTrackingData = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await Tracking.find({}, '', { sort: '-_id' });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    console.error('Error in GET /tracking:', error);

    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: errorMessage,
    });
  }
});

const getTrackingById = catchAsync(async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get the id from the URL params

    const result = await Tracking.findById(id);

    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Tracking data not found',
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    console.error('Error in GET /tracking/:id:', error);

    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: errorMessage,
    });
  }
});

const updateTracking = catchAsync(async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Extract id from request params
    const body = req.body; // Extract body from the request

    const result = await Tracking.findByIdAndUpdate(id, body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    });

    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Tracking data not found',
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    console.error('Error in PATCH /tracking/:id:', error);

    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: errorMessage,
    });
  }
});

const updateTrackingKnowLocation = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const result = await Tracking.updateOne(
        { _id: id },
        {
          $push: {
            knownLocations: req.body,
          },
        },
        {
          new: true,
        }
      );

      if (!result) {
        return sendResponse(res, {
          statusCode: httpStatus.NOT_FOUND,
          success: false,
          message: 'Tracking data not found',
        });
      }

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
      });
    } catch (error: unknown) {
      let errorMessage = 'An unexpected error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: errorMessage,
      });
    }
  }
);

export const TrackingController = {
  init,
  create,
  getTrackingData,
  getRequestTrackingsForDriver,
  getTrackingById,
  updateTracking,
  updateTrackingKnowLocation,
};

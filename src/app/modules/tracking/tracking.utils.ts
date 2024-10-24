
// Student ID
// export const findLastStudentId = async (): Promise<string | undefined> => {
//   const lastStudent = await Tracking.findOne(
//     {
//       role: 'student',
//     },
//     { id: 1, _id: 0 }
//   )
//     .sort({
//       createdAt: -1,
//     })
//     .lean();

//   return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
// };

// export const generateStudentId = async (
//   academicSemester: any
// ): Promise<string> => {
//   const currentId =
//     (await findLastStudentId()) || (0).toString().padStart(5, '0'); //00000
//   //increment by 1
//   let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
//   //20 25
//   incrementedId = `${academicSemester.year}${academicSemester.code
//     }${incrementedId}`;

//   return incrementedId;
// };

// // Faculty ID
// export const findLastFacultyId = async (): Promise<string | undefined> => {
//   const lastFaculty = await Tracking.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
//     .sort({
//       createdAt: -1,
//     })
//     .lean();

//   return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
// };

// export const generateFacultyId = async (): Promise<string> => {
//   const currentId =
//     (await findLastFacultyId()) || (0).toString().padStart(5, '0');
//   let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
//   incrementedId = `F-${incrementedId}`;

//   return incrementedId;
// };

// // Admin ID
// export const findLastAdminId = async (): Promise<string | undefined> => {
//   const lastFaculty = await Tracking.findOne({ role: 'admin' }, { id: 1, _id: 0 })
//     .sort({
//       createdAt: -1,
//     })
//     .lean();

//   return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
// };

// export const generateAdminId = async (): Promise<string> => {
//   const currentId =
//     (await findLastAdminId()) || (0).toString().padStart(5, '0');
//   let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
//   incrementedId = `A-${incrementedId}`;

//   return incrementedId;
// };

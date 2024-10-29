// const Editor = require('../models/editorModel');

// exports.createEditor = async (req, res) => {
//   const { name, dept, email, occupation } = req.body;

//   if (!name) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Name of editor is required',
//     });
//   }
//   if (!dept) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Department of editor is required',
//     });
//   }
//   if (!email) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Email of editor is required',
//     });
//   }
//   try {
//     const newEditor = await Editor.create({
//       name,
//       dept,
//       email,
//       occupation,
//     });

//     return res.status(400).json({
//       status: 'success',
//       data: {
//         newEditor,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       status: 'fail',
//       message: err.message,
//     });
//   }
// };

// exports.editController = async (req, res) => {
//   const { editorId } = req.params;

//   if (!editorId) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Editor Id is required',
//     });
//   }
//   try {
//     const { name, dept, email, occupation } = req.body;

//     const editor = await Editor.findById(editorId);

//     if (!editor) {
//       return res.status(400).json({
//         status: 'fail',
//         message: 'Editor not found',
//       });
//     }

//     if (name) {
//       editor.name = name;
//     }

//     if (dept) {
//       editor.dept = dept;
//     }

//     if (email) {
//       editor.email = email;
//     }

//     if (occupation) {
//       editor.occupation = occupation;
//     }

//     const newEditor = await editor.save();

//     return res.status(400).json({
//       status: 'success',
//       data: {
//         newEditor,
//       },
//     });
//   } catch (er) {
//     console.log(err);
//     return res.status(500).json({
//       status: 'fail',
//       message: err.message,
//     });
//   }
// };

// exports.deleteEditor = async (req, res) => {
//   const { editorId } = req.params;

//   if (!editorId) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Editor Id is required',
//     });
//   }

//   try {
//     const editor = await Editor.findById(editorId);

//     if (!editor) {
//       return res.status(400).json({
//         status: 'fail',
//         message: 'Editor not found',
//       });
//     }

//     // Delete the editor
//     await editor.deleteOne();

//     return res.status(200).json({
//       status: 'success',
//       message: 'Editor deleted successfully',
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       status: 'fail',
//       message: err.message,
//     });
//   }
// };

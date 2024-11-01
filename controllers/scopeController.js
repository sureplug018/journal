const Scope = require('../models/scopeModel');

exports.createScope = async (req, res) => {
  const { scope } = req.body;

  if (!scope) {
    return res.status(400).json({
      status: 'fail',
      message: 'Scope is required',
    });
  }
  let newScope = null;
  try {
    const existingScope = await Scope.findOne();
    if (existingScope) {
      existingScope.scope = scope;

      await existingScope.save();

      return res.status(200).json({
        status: 'success',
        data: {
          newScope,
        },
      });
    }
    newScope = await Scope.create({
      scope,
    });

    return res.status(200).json({
      status: 'success',
      data: {
        newScope,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

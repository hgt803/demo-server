// app/model/user.js
module.exports = function(app) {
  const { Bone, DataTypes: { BIGINT, STRING, TEXT, DATE } } = app.model;

  return class VerificationCode extends Bone {
      static table = 'verification_code'

      static attributes = {
          id: { type: BIGINT, primaryKey: true, autoIncrement: true },
          phoneNumber: {type: STRING, default: ''},
          verificationCode:  {type: STRING, default: ''},
          createdAt: { type: DATE },
      }
  };
}

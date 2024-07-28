// app/model/user.js
module.exports = function(app) {
    const { Bone, DataTypes: { BIGINT, STRING, TEXT } } = app.model;

    return class Users extends Bone {
        static table = 'users'

        static attributes = {
            name: STRING,
            pwd: STRING,
            phoneNumber: STRING(20),
            iconImage: STRING(100),
            verificationCode: STRING(20),
        }
    };
}

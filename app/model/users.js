// app/model/user.js
module.exports = function(app) {
    const { Bone, DataTypes: { BIGINT, STRING, TEXT, DATE } } = app.model;

    return class Users extends Bone {
        static table = 'users'

        static attributes = {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            email: {type: STRING, default: ''},
            phoneNumber: {type: STRING, default: ''},
            prefix: {type: STRING, default: ''},
            pwd:  {type: STRING, default: ''},
            address:  {type: STRING, default: ''},
            birthday:  {type: STRING, default: ''},
            iconImage:  {type: STRING, default: ''},
            // verificationCode:  {type: STRING, default: ''},
            createdAt: { type: DATE },
        }
    };
}

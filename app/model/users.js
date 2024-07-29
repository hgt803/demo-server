// app/model/user.js
module.exports = function(app) {
    const { Bone, DataTypes: { BIGINT, STRING, TEXT, DATE, TINYINT } } = app.model;

    return class Users extends Bone {
        static table = 'users'

        static attributes = {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            name: {type: STRING, default: '',},
            email: {type: STRING, default: '',},
            phoneNumber: {type: STRING, default: ''},
            prefix: {type: STRING, default: ''},
            pwd:  {type: STRING, default: ''},
            address:  {type: STRING, default: ''},
            birthday:  {type: STRING, default: ''},
            iconImage:  {type: STRING, default: ''},
            gender:  {type: STRING(1), default: 0},
            // verificationCode:  {type: STRING, default: ''},
            createdAt: { type: DATE },
            updatedAt: DATE,
        }
    };
}

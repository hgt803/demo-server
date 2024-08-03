// app/model/user.js
module.exports = function(app) {
    const { Bone, DataTypes: { BIGINT, STRING, TEXT, DATE, BOOLEAN } } = app.model;

    return class Notification extends Bone {
        static table = 'notification'

        static attributes = {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            userId: {type: BIGINT, allowNull: false,},
            content: {type: STRING, defaultValue: '',},
            vendor: {type: STRING, defaultValue: 'vendor',},
            read: {type: BOOLEAN, defaultValue: false,},
            createdAt: { type: DATE },
            updatedAt: DATE,
        }
    };
}

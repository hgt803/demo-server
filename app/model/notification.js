// app/model/user.js
module.exports = function(app) {
    const { Bone, DataTypes: { BIGINT, STRING, TEXT, DATE, BOOLEAN } } = app.model;

    return class Notification extends Bone {
        static table = 'notification'
      // 通知
        static attributes = {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            userId: {type: BIGINT, allowNull: false,},
            content: {type: STRING, defaultValue: '',},
            vendor: {type: STRING, defaultValue: 'vendor',},
            read: {type: BIGINT, defaultValue: 0,},
            createdAt: { type: DATE },
            updatedAt: DATE,
        }
    };
}

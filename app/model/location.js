// app/model/user.js
module.exports = function(app) {
    const { Bone, DataTypes: { BIGINT, STRING, TEXT, DATE, TINYINT } } = app.model;

    return class Location extends Bone {
        static table = 'location'
        // 配送地址
        static attributes = {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            userId: {type: BIGINT, allowNull: false,},
            location: {type: STRING, defaultValue: '',},
            createdAt: { type: DATE },
            updatedAt: DATE,
        }
    };
}

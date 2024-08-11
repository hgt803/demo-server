// app/model/user.js
module.exports = function(app) {
    const { Bone, DataTypes: { BIGINT, STRING, TEXT, DATE, TINYINT } } = app.model;

    return class Location extends Bone {
        static table = 'location'
        // 配送地址
        static attributes = {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            userId: {type: BIGINT, allowNull: false,},
            location: {type: STRING, defaultValue: '',},// 地址：省-市-县
            lng: {type: STRING, defaultValue: '',}, // 经度值
            lat : {type: STRING, defaultValue: '',}, //纬度值
            createdAt: { type: DATE },
            updatedAt: DATE,
        }
    };
}

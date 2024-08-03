// app/model/user.js
module.exports = function(app) {
    const { Bone, DataTypes: { BIGINT, STRING, TEXT, DATE, TINYINT, BOOLEAN } } = app.model;

    return class Category extends Bone {
        static table = 'category'
        // 标签
        static attributes = {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            name: {type: STRING, defaultValue: '',},
            inHome: {type: BOOLEAN, defaultValue: false,},
            createdAt: { type: DATE },
            updatedAt: DATE,
        }
    };
}

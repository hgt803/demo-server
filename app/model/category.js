// app/model/user.js
module.exports = function(app) {
    const { Bone, DataTypes: { BIGINT, STRING, TEXT, DATE, TINYINT, BOOLEAN } } = app.model;

    return class Category extends Bone {
        static table = 'category'

        static initialize() {
          this.belongsTo('goods', { foreignKey: 'categoryId' })
        }

        // 标签
        static attributes = {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            name: {type: STRING, defaultValue: '',},
            inHome: {type: BIGINT, defaultValue: 0,},  // 是否在首页展示
            createdAt: { type: DATE },
            updatedAt: DATE,
        }
    };
}

// app/model/user.js
module.exports = function(app) {
    const { Bone, DataTypes: { BIGINT, STRING, TEXT, DATE, TINYINT, BOOLEAN } } = app.model;

    return class Wishlist extends Bone {
        static table = 'wishlist'

        static initialize() {
          this.belongsTo('goods', { foreignKey: 'goodsId' })
        }

        // 心愿清单
        static attributes = {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            goodsId: {type: BIGINT, allowNull: false,},
            userId: {type: BIGINT, allowNull: false,},
            createdAt: { type: DATE },
            updatedAt: DATE,
        }
    };
}

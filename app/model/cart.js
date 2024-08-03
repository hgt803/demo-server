// app/model/user.js
module.exports = function(app) {
    const { Bone, DataTypes: { BIGINT, STRING, INTEGER, DECIMAL, DATE, TINYINT, BOOLEAN } } = app.model;

    return class Cart extends Bone {
        static table = 'cart'

        static initialize() {
          this.belongsTo('goods', { foreignKey: 'goodsId' })
        }

        // 购物车清单
        static attributes = {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            goodsId: {type: BIGINT, allowNull: false,},
            userId: {type: BIGINT, allowNull: false,},
            amount: {type: INTEGER, defaultValue: 1,},
            createdAt: { type: DATE },
            updatedAt: DATE,
        }
    };
}

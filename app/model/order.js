// app/model/user.js
module.exports = function(app) {
    const { Bone, DataTypes: { BIGINT, STRING, TEXT, DECIMAL, DATE, TINYINT, BOOLEAN } } = app.model;

    return class Order extends Bone {
        static table = 'order'

        static initialize() {
          this.belongsTo('goods', { foreignKey: 'goodsId' })
        }

        // 订单清单
        static attributes = {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            goodsId: {type: BIGINT, allowNull: false,},
            userId: {type: BIGINT, allowNull: false,},
            orderId: {type: BIGINT, allowNull: false,},
            price: {type: DECIMAL(10, 2), allowNull: false,},
            status: {type: BIGINT, allowNull: false,},
            createdAt: { type: DATE },
            updatedAt: DATE,
        }
    };
}

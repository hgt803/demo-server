// app/model/user.js
module.exports = function(app) {
    const { Bone, DataTypes: { BIGINT, STRING, TEXT, DECIMAL, DATE, TINYINT, BOOLEAN } } = app.model;

    return class Order extends Bone {
        static table = 'order'

        static initialize() {
          this.belongsTo('goods', { foreignKey: 'goodsId' })
          this.belongsTo('location', { foreignKey: 'locationId' })
        }

        // 订单清单
        static attributes = {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            userId: {type: BIGINT, allowNull: false,}, // 用户ID
            goodsId: {type: BIGINT, allowNull: false,}, // 商品ID
            locationId: {type: BIGINT, allowNull: false,}, // 配送地址ID
            amount: {type: BIGINT, allowNull: false,},  // 商品数量
            orderId: {type: STRING, allowNull: false,},  // 前端生成订单号：order_${yyyMMddHHmmss}_${uuid}
            status: {type: BIGINT, allowNull: false,},   // -1:cancelled 1:pending 2:on going 3:completed
            subTotal: {type: DECIMAL(10, 2), allowNull: false,},
            tax: {type: DECIMAL(10, 2), allowNull: false,},
            handling: {type: DECIMAL(10, 2), allowNull: false,},
            total: {type: DECIMAL(10, 2), allowNull: false,},
            createdAt: { type: DATE },
            updatedAt: DATE,
        }
    };
}

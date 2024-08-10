// app/model/user.js
module.exports = function(app) {
    const { Bone, DataTypes: { BIGINT, STRING, TEXT, DATE, BOOLEAN, DECIMAL } } = app.model;

    return class Goods extends Bone {
        static table = 'goods'
        // 商品
        static attributes = {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            name: {type: STRING, defaultValue: '',}, // 名称 【模糊搜索】
            introduction: {type: TEXT,}, // 介绍
            price: {type: DECIMAL(10, 2), allowNull: false,}, //价格
            image:  {type: STRING, defaultValue: ''},
            origin:  {type: STRING, defaultValue: ''}, // 产地
            score:  {type: DECIMAL(3, 2), defaultValue: 5}, //评分
            categoryId: {type: BIGINT}, // 标签id
            barCode: {type: BIGINT, unique: true}, //条形码 【搜索】
            isBanner: {type: BIGINT, defaultValue: 0,},  // 是否在首页Banner
            isRecommended: {type: BIGINT, defaultValue: 0,},  // 是否在首页Recommended
            isPopular: {type: BIGINT, defaultValue: 0,},  // 是否在首页Popular
            createdAt: { type: DATE },
            updatedAt: DATE,
        }
    };
}

// app/model/user.js
module.exports = function(app) {
    const { Bone, DataTypes: { BIGINT, STRING, TEXT, DATE, TINYINT } } = app.model;

    return class Users extends Bone {
        static table = 'users'

        static initialize() {
          // this.belongsTo('cart')
          // this.belongsTo('order')
          // this.belongsTo('notification')
        }

        static attributes = {
            id: { type: BIGINT, primaryKey: true, autoIncrement: true },
            name: {type: STRING, defaultValue: '',},
            email: {type: STRING, defaultValue: '',},
            phoneNumber: {type: STRING, defaultValue: ''},
            prefix: {type: STRING, defaultValue: ''},
            pwd:  {type: STRING, defaultValue: ''},
            address:  {type: STRING, defaultValue: ''},
            birthday:  {type: STRING, defaultValue: ''},
            iconImage:  {type: STRING, defaultValue: ''},
            gender:  {type: STRING(1), defaultValue: 0},
            visaName:  {type: STRING, defaultValue: ''},
            visaNumber:  {type: STRING, defaultValue: ''},
            visaExpiry:  {type: STRING, defaultValue: ''},
            visaCvv:  {type: STRING, defaultValue: ''},
            createdAt: { type: DATE },
            updatedAt: DATE,
        }
    };
}

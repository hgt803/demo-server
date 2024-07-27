// app/model/user.js
module.exports = function(app) {
    const { Bone, DataTypes: { STRING } } = app.model;

    return class User extends Bone {
        static table = 'users'

        static attributes = {
            name: STRING,
            password: STRING,
            avatar: STRING(2048),
        }
    };
}

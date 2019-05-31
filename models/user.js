// bcrypt for hashing of creds

var bcrypt = require("bcryptjs");

// Create User Model
// Set to export
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // email cannot be null - must have xx@xx.com
        email: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // Create custom method for USER Model
    // check unhashed input comparable to hashed db record
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    // HOOKS - Automatic methods that run during various phases of the User Model lifecycle
    // Auto hashing user entered password

    User.beforeCreate(user => {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });
    return User;
};
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

class UserSchema extends Schema {
    static get STATUS() {
        return {
            ACTIVE: 'ACTIVE',
            INACTIVE: 'INACTIVE',
            PENDING: 'PENDING',
        };
    }
    static get ROLE() {
        return {
            ADMIN: 'ADMIN',
            CUSTOMER_EXECUTIVE: 'CUSTOMER_EXECUTIVE',
        };
    }
    constructor(object, options) {
        super(object, options);
        this.add({
            u_name: {
                type: String,
                required: true,
            },
            e_mail: {
                type: String,
                required: true,
            },
            stts: {
                type: String,
                enum: Object.keys(UserSchema.STATUS),
                DEFAULT: UserSchema.STATUS.ACTIVE,
            },
            role: {
                type: String,
                required: true,
                enum: Object.keys(UserSchema.ROLE),
            },
            lastUpdated: {
                type: Number,
            },
            creationTime: {
                type: Number,
            },
        });
    }
}

const userSchema = new UserSchema(null, {
    timestamps: { createdAt: 'creationTime', updatedAt: 'lastUpdated' },
    versionKey: false,
});
const UserModel = mongoose.model('user', userSchema, 'user');

module.exports = {
    UserModel: UserModel,
    UserSchema: UserSchema,
};

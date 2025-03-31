let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username da ton tai"],
        required: true
    },
    password: {
        type: String,
        required: true,
        set: function (value) {
            return bcrypt.hashSync(value, 10);
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        default: ""
    },
    avatarUrl: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'role',
        required: true
    },
    loginCount: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true
})

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(this.password, salt);
        this.password = hash;
    }
    next();
})

module.exports = mongoose.model('user', userSchema)

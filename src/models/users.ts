import mongoose from 'mongoose'
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
	email: { 
        type: String, 
        lowercase: true,
        trim: true,
        required: [true, "email is required"],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Fill valid email address"],
        index: {
            unique: true
        },
        minlength: [6, "Email can't be shorter than 6 characters"],
        maxlength: [64, "Email can't be longer  than 6 characters"]
    },
	password: { type: String, required: [true, "password is required"] },
	fullName: { type: String, required: [true, "fullName is required"] },
    username: { 
        type: String,
        required: [true, "username is required"],
        index: {
            unique: true
        }
    },
	userType: { type: String, default: 'user' },
});

// ko xai arrow func vi ko co con tro this
// save chay truoc khi luu vao DB
UserSchema.pre('save', function (next) {
	const user = this;
	if (!user.isModified('password')) {
        return next();
    }
	bcrypt
		.genSalt(10)
		.then(salt => bcrypt.hash(user.password, salt))
		.then(hash => {
			user.password = hash;
			next(); // khi thuc hien xong se chay lai qua controller
		});
});
const User = mongoose.model('User', UserSchema);
export default User;
import mongoose from '../connections.js';

const mySchema = new mongoose.Schema({
    name: String,
    firstName: String,
    lastName: String,
    displayName: String,
    googleId: String,
    photo: String,
    googleTokens: {
        access_token: String,
        refresh_token: String,
        expiry_date: Number,
    },
    email: { type: String, required: true, unique: true },
    city: { type: String, default: 'unknown' },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model('users', mySchema);
export default UserModel;

import mongoose from '../connections.js';

const mySchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    city: { type: String, default: 'unknown' },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model('users', mySchema);
export default UserModel;

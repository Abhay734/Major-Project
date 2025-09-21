import mongoose from '../connections.js';

const emailSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
  prompt: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const EmailModel = mongoose.model('template', emailSchema);
export default EmailModel;

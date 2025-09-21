import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  to: { type: String, required: true },
  from: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['sent', 'failed', 'pending'], default: 'pending' },
});

// The variable is declared as 'emailModel'
const emailModel = mongoose.model('Email', emailSchema);

// Change the export to match the variable name
export default emailModel;
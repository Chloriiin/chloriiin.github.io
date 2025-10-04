// models/Reaction.js
import mongoose from 'mongoose';

const ReactionSchema = new mongoose.Schema({
  emoji: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
});

export default mongoose.models.Reaction || mongoose.model('Reaction', ReactionSchema);

const mongoose = require('mongoose');
const formSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    Serie: { type: Number, required: true },
    piecejointe: { type: String },
    description: { type: String }
});

module.exports = mongoose.model('Form', formSchema);
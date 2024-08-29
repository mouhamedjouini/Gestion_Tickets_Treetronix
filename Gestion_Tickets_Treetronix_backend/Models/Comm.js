const mongoose = require('mongoose');

const CommSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    form: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
piecejointe: { type: String },
    description: { type: String },
    Date: { type: Date, required: false },




});
module.exports=mongoose.model('CommSchema',CommSchema)
const mongoose = require('mongoose');


const userDocumentSchema = new mongoose.Schema({
    document: { type: 'String', required:true},
    user: { type: 'String', required:true},
    pinned:Boolean
})
 
module.exports = mongoose.model("UserDocument",userDocumentSchema)
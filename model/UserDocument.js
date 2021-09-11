const mongoose = require('mongoose');


const userDocumentSchema = new mongoose.Schema({
    document: { type: 'String', required:true}
})

module.exports = mongoose.model("UserDocument",userDocumentSchema)
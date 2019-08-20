const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
    type: {
        type: String
    },
    remark: {
        type: String
    },
    descript: {
        type: String
    },
    cash: {
        type: String,
        required: true
    },
    incode: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    identity: {
        type: Date,
       default:Date.now
    },
})


module.exports = Profile = mongoose.model("profiles", ProfileSchema)
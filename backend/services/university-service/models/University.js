const mongoose = require('mongoose')

const UniversitySchema = new mongoose.Schema({
    university_name: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String,default:null},
    state: {type: String,default: null},
    postal_code: {type: String, required: true},
    google_map_link: {type: String, required: true},
    country: {type: String, required: true},
})

module.exports = mongoose.model('University', UniversitySchema)
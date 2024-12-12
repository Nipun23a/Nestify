const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
   first_name: {type: String, required: true},
   last_name: {type: String, required: true},
   email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    type:{type:String,enum:['student','owner'],required:true},
    contact_number:{type:String},
    profile_image:{type:String},
    created_at:{type:Date,default:Date.now},
    updated_at:{type:Date,default:Date.now},
});

// Password Hashing Middleware
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare Password
UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('Users',UserSchema);
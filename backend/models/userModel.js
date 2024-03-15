const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    fullname:{
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    username:{
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true
    },
    password:{
        type: String,
        required: true 
    },
    avatar:{
        type: String,
        default: 'https://res.cloudinary.com/dd6nsdcff/image/upload/v1710403578/Avatar_ujigdo.png' 
    },
    role:{
        type: String,
        default: 'user'
    },
    gender:{
        type: String,
        default: 'male'
    },
    mobile:{
        type: String,
        default: ''
    },
    address:{
        type: String,
        default: ''
    },
    story:{
        type: String,
        default: '',
        maxlength: 200
    },
    website:{
        type: String,
        default: ''
    },
    followers:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }
    ],
    following:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }
    ],
    
},{timestamps: true})

module.exports = mongoose.model('user',userSchema)
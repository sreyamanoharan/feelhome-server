import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    profileImage: {
        type: String,
        default:"https://imgs.search.brave.com/cq-_goCh8MtEwBvZNOacpmXYGYAa1mlBz910zXrG0KU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8x/MC8wNS8yMi8zNy9i/bGFuay1wcm9maWxl/LXBpY3R1cmUtOTcz/NDYwXzY0MC5wbmc"
    },
    ConfirmPassword:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    wallet: {
        type: Number,
        default: 0,
    },
    walletHistory: [{
        date: {
            type: Date,
            default: Date.now(),
        },
        amount: {
            type: Number,
            default: 0,
        },
        from: {
            type: mongoose.Schema.Types.ObjectId,   
            ref: 'User'
        },
        transactionType: {
            type: String,
            enum: ['Credit', 'Debit'],
        }
    }],
    registrationDate: {
        type: Date,
        default: Date.now(),
    }

});

const User = mongoose.model('User', UserSchema);

export default User;

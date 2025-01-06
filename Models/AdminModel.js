import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
   
    email: {
        type: String
    },
    password: {
        type: String
    
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
    }]
});

const admin = mongoose.model('admin', adminSchema);

export default admin;

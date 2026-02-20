import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
            unique: true
        },
        
        passwordHash: { // store the bcrypt hash
            type: String,
            required: true
        }
    },
    { 
        timestamps: true // automatically add createdAt and updatedAt
    }
);

export default mongoose.model('User', userSchema);
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 40,
        trim: true,
        required: true
    },
    content: {
        type: String,
        maxlength: 2000,
        trim: true,
        required: true
    },
    userId: { // used to link the note to a user
        type: String,
        required: true
    }
},
    {
        timestamps: true // automatically add createdAt and updatedAt fields to the schema
    }
);

export default mongoose.model('Note', noteSchema);

/*
Notes to self:
https://mongoosejs.com/docs/schematypes.html
*/
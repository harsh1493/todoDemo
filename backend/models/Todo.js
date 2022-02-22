const mongoose = require('mongoose');
const {Schema}= mongoose;
const TodoSchema= new Schema({
    title:{
        type: String,
        required : true
    },
    description :{
        type: String,
        required : true,
    },
    completed :{
        type: Boolean,
        required : true,
        default:false
    },
});

module.exports= mongoose.model('todo',TodoSchema);


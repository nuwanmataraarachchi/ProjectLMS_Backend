const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bankSchema = new Schema({

    Acc_no:{
        type:Number,
        require:true
    },
    Bank_name:{
        type:String,
        require:true
    },
    Branch_name:{
        type:String,
        require:true
    },
    Acc_Holder_name:{
        type:String,
        require:true
    }
    
})

const Bank = mongoose.model("Bank",bankSchema);//Baank is going to be the table name

module.exports = Bank;
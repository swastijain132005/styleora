import mongoose from "mongoose";
const wishschema=new mongoose.Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    product :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    timestamps : true
})

wishschema.index({ user: 1, product: 1 }, { unique: true });

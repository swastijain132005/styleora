import mongoose from "mongoose";
import product from "../productmodel/product.js";
import user from "../usermodel/register.js";
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
},
{
    timestamps: true
}


)

wishschema.index({ user: 1, product: 1 }, { unique: true });

export default mongoose.model ("wish",wishschema);

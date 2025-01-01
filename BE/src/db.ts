import mongoose from "mongoose";

const mongourl=process.env.MONGO_URL;
mongoose.connect(mongourl as string);

const Schema =mongoose.Schema;
const ObjectId= Schema.Types.ObjectId;

const sellerSchema= new Schema({
    email : {type:String, required:true, unique: true},
    firstName: {type:String, required: true},
    lastName: {type:String},
    userName:{type:String, required: true},
    sellerType:{type:String, required:true},
    password:{type: String, required: true}
})
export const sellerModel= mongoose.model("seller", sellerSchema);

const userSchema= new Schema({
    email : {type:String, required:true, unique: true},
    firstName: {type:String, required: true},
    lastName: {type:String},
    userName:{type:String, required: true},
    password:{type: String, required: true}
})

export const userModel= mongoose.model("seller", sellerSchema);
const newProductSchema= new Schema({
    productType:{type:String},
    title:String,
    description:String,
    price: Number,
    quantity: Number
})

export const productModel= mongoose.model("products", newProductSchema);
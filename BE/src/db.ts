import mongoose from "mongoose";

const Schema =mongoose.Schema;
const mongourl=process.env.MONGO_URL;
mongoose.connect(mongourl as string);
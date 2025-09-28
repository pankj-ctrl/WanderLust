const mongoose= require("mongoose");
const initData = require("./data.js");
const listing= require("../models/listing.js");

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


const initDb= async()=>{
   await listing.deleteMany({});
   initData.data=initData.data.map((obj)=>({...obj,owner:"68ce3c0929ecc68b78a45b1c"}));
   await listing.insertMany(initData.data);
   console.log("Data initialized successfully");
}

initDb();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Reviews = require("./review.js")

let listingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image: {
    filename: {
        type: String,
        default: "listingimage"
    },
    url: {
        type: String,
        default: "https://images.unsplash.com/photo-1756489693617-b6586eed7e51?q=80&w=1471...",

        set: v => (v === "" || v == null
        ? "https://images.unsplash.com/photo-1756489693617-b6586eed7e51?q=80&w=1471..."
        : v)
    }
},
   
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{
        type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    category:{
        type:String,
        enum:["Rooms","Iconic cities","Moutains","Castles","Amazing pools","Camping","Farms","Arctic pools","Domes"]
    }
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Reviews.deleteMany({_id :{$in: listing.reviews}})
    }
})

const Listing= mongoose.model("Listing",listingSchema);

module.exports= Listing;
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview=async(req,res)=>{
    let listing =await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
      req.flash("success","New Review Created")
    await newReview.save();
    await listing.save();
    console.log("New reviews add");
    res.redirect(`/listings/${listing.id}`)
}

module.exports.destroyReview=async(req,res)=>{
      let{id,reviewId}=req.params;

      let review = await Review.findById(reviewId);
      if (!review.author.equals(req.user._id)) {
        req.flash("error", "You can only delete your own reviews");
        return res.redirect(`/listings/${id}`);
      }

     await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
       req.flash("success","Review Deleted")
      await Review.findByIdAndDelete(reviewId);

      res.redirect(`/listings/${id}`)
}
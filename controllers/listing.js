const listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  let allListing = await listing.find();
  res.render("listings/index.ejs", { allListing });
};

module.exports.randerNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listingD = await listing
    .findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listingD) {
    req.flash("error", "Listing you request for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listingD });
};

module.exports.createListing = async (req, res) => {
  let response=await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send()


  let url = req.file.path;
  let filename = req.file.filename;
  console.log(url, "..", filename);
  const newListing = new listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry=response.body.features[0].geometry;
  let savedListing=await newListing.save();
 
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listingD = await listing.findById(id);
  if (!listingD) {
    req.flash("error", "Listing you request for does not exist!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listingD.image.url.replace(
    "/upload",
    "/upload/h_300,w_250"
  );
  res.render("listings/edit.ejs", { listingD, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let Listing = await listing.findByIdAndUpdate(id, req.body.listing);

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;

    Listing.image = { url, filename };
    await Listing.save();
  }
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  req.flash("success", "Listing Deleted");
  await listing.findByIdAndDelete(id);
  res.redirect("/listings");
};

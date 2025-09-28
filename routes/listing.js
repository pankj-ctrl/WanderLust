const Express = require("express");
const router = Express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");
const { isOwner } = require("../middleware.js");
const {validateListing}=require("../middleware.js");
const multer  = require('multer');
const{storage}=require("../cloudConfig.js")
const upload = multer({storage});

const listingController = require("../controllers/listing.js")

router.route("/")
.get(
  wrapAsync(listingController.index)
)
.post(
  validateListing,upload.single('listing[image]'),
  wrapAsync(listingController.createListing)
);
// New Route
router.get("/new", isLoggedIn,listingController.randerNewForm);

router.route("/:id")
.get(
  wrapAsync(listingController.showListing)
)
.put(
  validateListing,
  isLoggedIn,isOwner,upload.single('listing[image]'),
  wrapAsync(listingController.updateListing)
)
.delete(
  isLoggedIn,isOwner,
  wrapAsync(listingController.deleteListing)
);






// edit route
router.get(
  "/:id/edit",
  isLoggedIn,isOwner,
  wrapAsync(listingController.renderEditForm)
);



module.exports = router;

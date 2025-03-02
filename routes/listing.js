const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyc.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isloggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });


router.route("/")
    .get(wrapAsync(listingController.index))  //index route
    .post(isloggedin, upload.single('listing[image]'), wrapAsync(listingController.createListing)); //create route



//New Route
router.get("/new", isloggedin, listingController.renderNewForm); //should be kept above /:id route else our new will be treated as an id variable


router.route("/:id")
    .get(wrapAsync(listingController.showListing)) //show route
    .put(isloggedin,
         isOwner,
         upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing)) //update route
    .delete(isloggedin, isOwner, wrapAsync(listingController.destroyListing)); //delte route



//Edit Route
router.get("/:id/edit", isloggedin, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;

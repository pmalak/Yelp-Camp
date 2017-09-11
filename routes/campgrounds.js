var express = require("express")
var router = express.Router()
var Campground = require("../models/campground")
var middleware = require("../middleware") // index.js is automatically used required as it is special name

//=============  ROUTES  ==================
//=========================================

//INDEX - show all campgrounds
router.get("/", function(req, res) {
    // get all campgrounds
    Campground.find({},function(err, allCampgrounds) {
        if(err){console.log("there was a error")}
        else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user})        
        }
    })
})

//CREATE route - add new campground to database
router.post("/", middleware.isLoggedIn, function(req, res){
    // res.send("you hit the post route")
    var name = req.body.name
    var price = req.body.price
    var image = req.body.image
    var description = req.body.description 
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price:price, image: image, description: description, author: author}
    //create new campground 
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err){
            console.log("there was a error")
            console.log(err)
        }
        else {
            //redirect back to campgrounds
            console.log(newlyCreated)
            res.redirect("/campgrounds")
        }
    })
})

//NEW - show form to create a new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new")
})

//SHOW - show speific campground and more info
router.get("/:id", function(req, res) {
    //find the campgroudn with provided ID 
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
          if(err){
            console.log("there was a error")
            console.log(err)
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground})        
        }
    })
})

/// EDIT CAMPGROUD ROUTE
router.get("/:id/edit", middleware.checkCampOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit",{campground:foundCampground})
    })
})

// UPDATE CAMPGROUNDROUTE
router.put("/:id", middleware.checkCampOwnership, function(req, res) {
    //find and update correct camp
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground) {
     if (err) {
         res.redirect("/campgrounds")
     } else {
         res.redirect("/campgrounds/" + req.params.id)
     }
    })
    //
})

// Destroy CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err)
            res.redirect("/campgrounds")
        } else {    
            res.redirect("/campgrounds")
        }
    })
})

//middleware

module.exports = router
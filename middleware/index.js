
var Campground = require("../models/campground")
var Comment = require("../models/comment")
//all middleware objects goes here
var middlewareObj = {}


middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next() 
    }
    req.flash("error", "You need to be logged in to do that")
    res.redirect("/login")
}


middlewareObj.checkCampOwnership = function (req, res, next) {
      if (req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) {
                req.flash("error", "Campground not found")
                res.render("back")
            } else {
                //does user own the camp
                    // foundCampground.author.id = mongoose object
                    //  req.user._id = string
                if (foundCampground.author.id.equals(req.user._id)){
                    next()
                } else {
                    // res.send("you don't have permistion to do that")
                    req.flash("error", "You don't have permistion to do that")
                    res.redirect("back")
                }
            }
            })
        } else {
            // console.log("you need to be logged in")
            // res.send("you need to be logged in")
            req.flash("error", " you need to be logged in to do that")
            res.redirect("back")
        } 
}



middlewareObj.checkCommentOwnership = function(req, res, next) {
      if (req.isAuthenticated()){
        Comment.findById(req.params.comments_id, function(err, foundComment) {
            if (err) {
                res.render("back")
            } else {
                //does user own the comment
                    // foundCampground.author.id = mongoose object
                    //  req.user._id = string
                if (foundComment.author.id.equals(req.user._id)){
                    next()
                } else {
                    // res.send("you don't have permistion to do that")
                    req.flash("error", "You don't have permistion to do that")
                    res.redirect("back")
                }
            }
            })
        } else {
            // console.log("you need to be logged in")
            // res.send("you need to be logged in")
            req.flash("error", "You need to be logged in to do that")
            res.redirect("back")
        } 
}

module.exports = middlewareObj
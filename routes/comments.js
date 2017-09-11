var express = require("express")
//mergeParams will merge together params from campgroudns and comments and make them accesible
var router = express.Router({mergeParams: true})
var Campground = require("../models/campground")
var Comment = require("../models/comment")
var middleware = require("../middleware") // index.js is automatically used required as it is special name

//comments new 
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground})        
        }
    })
});
//comments create
//router.post("/campgrounds/:id/comments" = defined in app.js by app.use("/campgrounds/:id/comments",commentRoutes)
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err)
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err)
                } else {
                    // add user name na id to comment
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    //save comment
                    comment.save()
                    campground.comments.push(comment)
                    campground.save()
                    req.flash("success", "Successfully added comment")
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
           
        }
    })
});

//commment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back")
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment})        
        }
    })
    
})

//COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

//DELETE COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
     if (err) {
         res.redirect("/back")
     } else {
          req.flash("success", "Comment deleted")
         res.redirect("/campgrounds/" + req.params.id)
     }
    })
    
    
})



//middleware



module.exports = router
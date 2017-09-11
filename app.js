var express     = require("express"),
    app         = express(),
    bodyparser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds"),
    flash       = require("connect-flash"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    methodOverride          = require("method-override"),
    passportLocalMongoose   = require("passport-local-mongoose"),           
    User                    = require("./models/user")
    

//requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index")

app.set("view engine", "ejs")
app.use(bodyparser.urlencoded({extended: true}))
mongoose.connect('mongodb://localhost/yelp_camp_v2')
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))
app.use(flash())

// feed db with some data
// seedDB()

//============= PASSPORT CONFIG ================
app.use(require("express-session")({
    secret: "Kdo nic nevi nice nepovi",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))  
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//to pass req.user to every single template!!!!! 
app.use(function(req, res, next) {
    //whatever is in res.locals is available in templates
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    //move on to the next code, without next, nothing will happen
    next()
}) 

//using all the routes in separate files 
//app.use(shortens url in other route files where they contain just /)
app.use(indexRoutes)
app.use("/campgrounds/:id/comments",commentRoutes)
app.use("/campgrounds",campgroundRoutes)

//==========server listen====================//
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelpcamp Server started")
})
var express     = require("express"),
    app         = express(),
    bodyparser  = require("body-parser"),
    mongoose    = require("mongoose")

app.set("view engine", "ejs")
app.use(bodyparser.urlencoded({extended: true}))
mongoose.connect('mongodb://localhost/yelp_camp');

///schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String()
})
var Campground = mongoose.model("Campground", campgroundSchema)

Campground.create(
    {
        name: "Frenštát pod Radhoštěm",
        image: "https://www.dokempu.cz/photos/facilitiesmodule/546/autokemp-frenstat-pod-radhostem_mainThumb_83263"
    }, function(err, campground) {
        if(err){console.log(err)}
        else {
            console.log("newly created campground")
            console.log(campground)
        }
})

var campgrounds = [

        {name: "Vranovská pláž", image: "https://www.dokempu.cz/photos/facilitiesmodule/556/camping-vranovska-plaz_mainThumb_76528" },
        {name: "Šikland", image: "https://www.dokempu.cz/photos/facilitiesmodule/503/kemp-sikluv-mlyn_mainThumb_43889" },
        {name: "Frenštát pod Radhoštěm", image: "https://www.dokempu.cz/photos/facilitiesmodule/546/autokemp-frenstat-pod-radhostem_mainThumb_83263"},
        {name: "Vranovská pláž", image: "https://www.dokempu.cz/photos/facilitiesmodule/556/camping-vranovska-plaz_mainThumb_76528" },
        {name: "Šikland", image: "https://www.dokempu.cz/photos/facilitiesmodule/503/kemp-sikluv-mlyn_mainThumb_43889" },
        {name: "Frenštát pod Radhoštěm", image: "https://www.dokempu.cz/photos/facilitiesmodule/546/autokemp-frenstat-pod-radhostem_mainThumb_83263"},
        {name: "Vranovská pláž", image: "https://www.dokempu.cz/photos/facilitiesmodule/556/camping-vranovska-plaz_mainThumb_76528" },
        {name: "Šikland", image: "https://www.dokempu.cz/photos/facilitiesmodule/503/kemp-sikluv-mlyn_mainThumb_43889" },
        {name: "Frenštát pod Radhoštěm", image: "https://www.dokempu.cz/photos/facilitiesmodule/546/autokemp-frenstat-pod-radhostem_mainThumb_83263"},
        {name: "Vranovská pláž", image: "https://www.dokempu.cz/photos/facilitiesmodule/556/camping-vranovska-plaz_mainThumb_76528" },
    ]



app.get("/", function(req, res) {
    res.render("landing")
})

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds})
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs")
})

app.post("/campgrounds", function(req, res){
    // res.send("you hit the post route")
    var name = req.body.name
    var image = req.body.image
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground)
    res.redirect("/campgrounds")
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelpcamp Server started")
})
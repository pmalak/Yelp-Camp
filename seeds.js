var mongoose = require("mongoose")
var Campground = require("./models/campground")
var Comment = require("./models/comment")

var data = [
    {
        name: "Cheley Colorado Camp, Colorado",
        image: "http://cdn.skim.gs/image/upload/c_fill,dpr_1.0,f_auto,fl_lossy,q_auto,w_940/v1456344096/msi/cheley-camp_sheova.jpg",
        description: "Located at the gateway to Rocky Mountain National Park, Cheley Colorado Camp is an amazing summer camp for kids that offers a number of activities from horseback riding and hiking to archery and riflery. If your kids love adventure and the outdoors, this is a terrific option."
    },
    {
        name: "Four Winds Westward Ho camp, Washington State",
        image: "http://cdn.skim.gs/image/upload/c_fill,dpr_1.0,f_auto,fl_lossy,q_auto,w_940/v1456344097/msi/four-winds-camp_czofva.jpg",
        description: "Situated on Orcas Island near Seattle, Washington, Four Winds Westward Ho is a place where kids can get away from technology and modern comforts and discover new friendships and interests in the great outdoors."
    },
    {
        name: "Sanborn Western Camps, Colorado" ,
        image: "http://cdn.skim.gs/image/upload/c_fill,dpr_1.0,f_auto,fl_lossy,q_auto,w_940/v1456344101/msi/sanborn-summer-camp_fnbgdy.jpg",
        description: "Located on 6,000 acres of aspen, spruce, Douglas-fir, and ponderosa pine-filled forests, and an hour west of Colorado Springs, Sanborn Western Camps provide the perfect place for kids to do everything from fly-fishing to horseback riding and community service to science projects."
    }
]

function seedDB() {
    //remove all campgrounds
    Campground.remove({}, function(err){
        if (err) {
            console.log(err)    
        } 
        console.log("removed all camps") 
        //add a few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err) {
                    console.log(err)    
                } else { 
                    console.log("added a camp")
                    //add some comments
                    Comment.create(
                        {
                            text: "this place is grat but I wish there was an internet",
                            author: "Homer"
                        }, function (err, comment) {
                            if (err) {
                                console.log(err)    
                            } else { 
                                campground.comments.push(comment)
                                campground.save()
                                console.log("comment saved")
                            }
                    })
                }
            })
        })
    })
}

module.exports = seedDB

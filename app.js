var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

var app = express();

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

// Compile the model
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//                     {name: "Granite Hill",
//                     image: "https://images.unsplash.com/photo-1536646506670-821b8a6bbbca?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0f9d92ffc7bab36aee409d633606b6fa&auto=format&fit=crop&w=1950&q=80",
//                     description: "This is a huge granite hill, no bathrooms.  No water.  Beautiful granite!"
                        
//                     }, function(err, campground){
//                     if(err){
//                         console.log(err);
//                     } else {
//                         console.log("NEWLY CREATED CAMPGROUND");
//                         console.log(campground);
//                     }
//                  });


//ROUTES
app.get("/", function(req, res){
   res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds for DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           // redirect back to campgrounds page
           res.redirect("/campgrounds");
       }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provide ID
    //render show template with that campground
    res.render("show");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!"); 
});
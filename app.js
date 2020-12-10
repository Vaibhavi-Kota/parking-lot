let express=require("express");
let bodyparser=require("body-parser");
let app=express();

let cookieparser=require("cookie-parser");
let auth=require("./controllers/auth");
let mongoose=require("mongoose");
let jwt=require('jsonwebtoken');
let secret='djnk68kn8h';
mongoose.connect('mongodb://localhost:27017/parking-lot', {
	useNewUrlParser: true,
	useUnifiedTopology:true
});
let usersRouter=require('./routes/users');
app.use(express.static('public'));
app.use(express.json());
app.use('/users',usersRouter);
app.use(bodyparser.urlencoded({extended:false})) ;
app.use(bodyparser.json()) ;
app.use(cookieparser()); 
app.set("view engine",'ejs');
let db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
	console.log("database connected");
})
let vehicle=require("./modules/user").vehicle;
let user=require("./modules/user").user;

/*let user1=new user({
	id:1,
	name:"Vaibhavi",
	mobnum:"123456789",
	emailid:"kotavaibhu.2000@gmail.com"
})
user1.save();*/
/*user.remove({},function(err)
		   {
	if(err){console.log("oops");}
});*/
/*user.find({}, function (err,Allusers){if(err){console.log("oops");}
else {
console.log(Allusers);
}
});*/
let slot=require("./modules/slot").slot;
/*let slot1=new slot({
	slotid:1,
	occupancy:false
})
slot1.save();
let slot2=new slot({
	slotid:2,
	occupancy:false
})
slot2.save();
let slot3=new slot({
	slotid:3,
	occupancy:false
})
slot3.save();
let slot4=new slot({
	slotid:4,
	occupancy:false
})
slot4.save();
let slot5=new slot({
	slotid:5,
	occupancy:false
})
slot5.save();
let slot6=new slot({
	slotid:6,
	occupancy:false
})
slot6.save();
let slot7=new slot({
	slotid:7,
	occupancy:false
})
slot7.save();
let slot8=new slot({
	slotid:8,
	occupancy:false
})
slot8.save();
let slot9=new slot({
	slotid:9,
	occupancy:false
})
slot9.save();
let slot10=new slot({
	slotid:10,
	occupancy:false
})
slot10.save();
let slot11=new slot({
	slotid:11,
	occupancy:false
})
slot11.save();
let slot12=new slot({
	slotid:12,
	occupancy:false
})
slot12.save();
let slot13=new slot({
	slotid:13,
	occupancy:false
})
slot13.save();
let slot14=new slot({
	slotid:14,
	occupancy:false
})
slot14.save();
let slot15=new slot({
	slotid:15,
	occupancy:false
})
slot15.save();*/
/*slot.remove({},function(err)
		   {
	if(err){console.log("oops");}
});*/
/*slot.find({}, function (err,Allslots){if(err){console.log("oops");}
else {
console.log(Allslots);
}});*/

app.get('/',(req,res)=>
	   {
	res.render("home");
})
app.get('/home',(req,res)=>
	   {
	res.render("home");
})
app.get('/login',(req,res)=>
	   {
	let token=req.cookies['auth_token'];
	
	if(token && auth.checktoken(token)){
		res.render("vehicles");
		
	}
	else{
		res.render("login");
	}
})
app.get('/parkinglot',(req,res)=>
	   {
	res.render("parkinglot");
})

app.get('/vehicles',(req,res)=>{
	let token=req.cookies['auth_token'];
	if(token && auth.checktoken(token)){
		
		/*jwt.verify(token,secret,function(err, decoded) {
  var userId = decoded._id  
		console.log(userId)
};  */
		  
		res.render("vehicles");
	}
	else{
		res.redirect("/login");
	}
	
})
app.get('/addvehicle',(req,res)=>{
	res.render("addvehicle");
})

app.post('/addvehicle',async(req,res)=>{
		let vehiclenumber=req.body.vehicleno;
		let vehicletype=req.body.vehicletype;
		let newvehicle=new vehicle({
			vehiclenum:vehiclenumber,
			type:vehicletype
			
		})
		console.log("success");
	await newvehicle.save();
	
})
vehicle.find({},function(err,allvehicles){if(err){console.log("oops");}
else {
console.log(allvehicles);
}});
user.find({},function(err,allusers){if(err){console.log("oops");}
else {
console.log(allusers);
}});

app.listen('3000',()=>{
	console.log("listening to port 3002")
})


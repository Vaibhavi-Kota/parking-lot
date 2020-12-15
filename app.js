let express=require("express");
let bodyparser=require("body-parser");
let app=express();

let cookieparser=require("cookie-parser");
let auth=require("./controllers/auth");
let mongoose=require("mongoose");
let jwt=require('jsonwebtoken');

window:true;
mongoose.connect('mongodb://localhost:27017/parking-lot', {
	useNewUrlParser: true,
	useUnifiedTopology:true
});
let usersRouter=require('./routes/users');
let {cur}=usersRouter.cur;


app.use(express.static('public'));
app.use(express.json());
app.use('/users',usersRouter.router);
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
let booking=require("./modules/user").booking;
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
let slot=require("./modules/user").slot;
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


/*booking.remove({},function(err)
		   {
 	if(err){console.log("oops");}
 });
user.remove({},function(err)
		   {
 	if(err){console.log("oops");}
 });
vehicle.remove({},function(err)
		   {
 	if(err){console.log("oops");}
 });*/

app.get('/',(req,res)=>
	   {
	res.render("home");
})
app.get('/contactus',(req,res)=>
	   {
	res.render("contactus");
})
app.get('/timer',(req,res)=>
	   {
	res.render("timer");
})
app.get('/continue',(req,res)=>
	   {
	res.render("continue");
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
	let token=req.cookies['auth_token'];
	if(token && auth.checktoken(token)){
	res.render("parkinglot");}
	else{
		res.redirect("/continue");
	}
})

app.get('/vehicles',async(req,res)=>{
	let token=req.cookies['auth_token'];
	if(token && auth.checktoken(token)){
		
			let someuser=auth.checktoken(token);
		 let curr=someuser.userid;
		
		let curuser=await user.findOne().where({_id:curr});
		
		
		let vehiclearr=[];
		 let vehi=curuser.vehicles;
		
		
		let i;
		for(i=0;i<vehi.length;i++)
			{
				let abc=await vehicle.findOne().where({_id:vehi[i]});
				vehiclearr.push(abc);
			}
			
				res.render("vehicles",{cur:curuser,vehicles:vehiclearr});
		
	}
	else{
		
		res.redirect("/continue");
	}
	
})


app.get('/addvehicle',(req,res)=>{
	let token=req.cookies['auth_token'];
	if(token && auth.checktoken(token)){
	res.render("addvehicle");}
	else{
		res.redirect("/continue");
	}
})

app.get('/stop',async(req,res)=>{
	let token=req.cookies['auth_token'];
	if(token && auth.checktoken(token)){
		let someuser=auth.checktoken(token);
		 let curr=someuser.userid;
		let curbooking=await booking.findOne().where({ user_id:curr,outtime:""});
		let curslotid=curbooking.slot_id;
	let curslot=await slot.findOne().where({_id:curslotid});
		let allslots=await slot.find({});
	res.render("stop",{slot:curslot,slots:allslots});
	}
	else{
		res.redirect("/continue");
	}
})

app.get('/receipt',(req,res)=>{
	let token=req.cookies['auth_token'];
	if(token && auth.checktoken(token)){
	res.render("receipt");
	}
	else{
		res.redirect("/continue");
	}
})

app.get('/admin',async(req,res)=>{
	let token=req.cookies['auth_token'];
	if(token && auth.checktoken(token)){
	let someuser=auth.checktoken(token);
		 let curr=someuser.userid;
	let curuser=await user.findOne().where({_id:curr});
	if(curuser.emailid==="admin@gmail.com" && curuser.password==="adminkvvk"){
	
	res.render("admin");}
	else{
		res.send("Only admin has access");
	}
	}
	else{
		res.redirect("/continue");
	}
		
})
app.get('/adminvehicles',async(req,res)=>
	   {
	let token=req.cookies['auth_token'];
	if(token && auth.checktoken(token)){
		let someuser=auth.checktoken(token);
		 let curr=someuser.userid;
	let curuser=await user.findOne().where({_id:curr});
	if(curuser.emailid==="admin@gmail.com" && curuser.password==="adminkvvk"){
	
	vehicle.find({},async function(err,allvehicles){
		await res.render("adminvehicles",{vehicles:allvehicles})
});}
	else{
		res.send("Only admin has access");
	}}
	else{
		res.redirect("/continue");
	}
	
})
app.get('/adminusers',async(req,res)=>
	   {
	let token=req.cookies['auth_token'];
	if(token && auth.checktoken(token)){
		let someuser=auth.checktoken(token);
		 let curr=someuser.userid;
	let curuser=await user.findOne().where({_id:curr});
	if(curuser.emailid==="admin@gmail.com" && curuser.password==="adminkvvk"){
	
	user.find({},async function(err,allusers){
		await res.render("adminusers",{users:allusers})
});}
	else{
		res.send("Only admin has access");
	}}
	else{
		res.redirect("/continue");
	}
})
app.get('/adminbookings',async(req,res)=>
	   {
	let token=req.cookies['auth_token'];
	if(token && auth.checktoken(token)){
		let someuser=auth.checktoken(token);
		 let curr=someuser.userid;
	let curuser=await user.findOne().where({_id:curr});
	if(curuser.emailid==="admin@gmail.com" && curuser.password==="adminkvvk"){
	
	let allbookings=await booking.find({});
	let allusers=await user.find({});
	let allslots=await slot.find({});
	let allvehicles=await vehicle.find({});
		
	res.render("adminbookings",{bookings:allbookings,users:allusers,slots:allslots,vehicles:allvehicles});	
	}
	else{
		res.send("Only admin has access");
	}}
	else{
		res.redirect("/continue");
	}
})


app.post('/addvehicle',async(req,res)=>{
		let vehiclenumber=req.body.vehicleno;
		let vehicletype=req.body.vehicletype;
		let existingvehicle=await vehicle.find().where({vehiclenum:vehiclenumber});
		let token=req.cookies['auth_token'];
		let someuser=auth.checktoken(token);
		 let curr=someuser.userid;
		let curuser=await user.findOne().where({_id:curr});
		if(existingvehicle.length===0)
			{
				let newvehicle=new vehicle({
					vehiclenum:vehiclenumber,
					type:vehicletype

				})
				
				await newvehicle.save();
				let someuser=auth.checktoken(token);
		 		let curr=someuser.userid;
		
				let curuser=await user.findOne().where({_id:curr});
				
				await curuser.vehicles.push(newvehicle);
				curuser.save();
				res.redirect("/vehicles");
			}
		else{
			
			res.send("vehicle already exists");
			
		}
	
})

app.post('/bookslot',async(req,res)=>{
	
		let vehicleno=req.body.exampleRadios;
		let curvehicle=await vehicle.findOne().where({vehiclenum:vehicleno});
		
		let token=req.cookies['auth_token'];
	let someuser=auth.checktoken(token);
		 let curr=someuser.userid;
		
		
		let curbooking=await booking.find().where({ user_id:curr,outtime:""});
		if(curbooking.length===0)
		{

			let emptyslot=await slot.findOne().where({occupancy:false});
			if(emptyslot)
			{
			emptyslot.occupancy=true;
			emptyslot.save();
			let ans=await booking.find();


			let newbooking=new booking({
				booking_id:ans.length+1,
				user_id:curr,
				vehicle_id:curvehicle._id,
				slot_id:emptyslot._id,
				intime:new Date()
			})
			newbooking.save();
			
			res.redirect("/stop");
			}
			else
			{
				res.send("Slot unavailable");
			}
		}
		else{
			res.send("You already have a ongoing booking");
		}	
})


app.post('/stop',async(req,res)=>{
	let token=req.cookies['auth_token'];
let someuser=auth.checktoken(token);
		 let curr=someuser.userid;
		
		let curuser=await user.findOne().where({_id:curr});
	let curusername=curuser.name;
	let curbooking=await booking.findOne().where({ user_id:curr,outtime:""});
	curbooking.outtime=new Date();
	let amount=await((curbooking.outtime.getTime()-curbooking.intime.getTime())/3600000)*10;
	curbooking.amount=amount;
	curbooking.save();
	
	let curslotid=curbooking.slot_id;
	let curslot=await slot.findOne().where({_id:curslotid});
	curslot.occupancy=false;
	curslot.save();
	let curvehicleid=curbooking.vehicle_id;
	let curvehicle=await vehicle.findOne().where({_id:curvehicleid});
	
	
	setTimeout(function(){res.render("receipt",{booking:curbooking,username:curusername,slot:curslot,vehicle:curvehicle,amount:amount})},1000);
	
})






/*vehicle.find({},function(err,allvehicles){if(err){console.log("oops");}
else {
console.log(allvehicles);
}});
/*user.find({},function(err,allusers){if(err){console.log("oops");}
else {
console.log(allusers);
}});*/

app.listen('3000',()=>{
	console.log("listening to port 3000");
})
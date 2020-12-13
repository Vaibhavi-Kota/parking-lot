let User=require('../modules/user').user;
let express=require('express');
let router=express.Router();
let auth=require("../controllers/auth");
let cur=[];

router.post('/login',async(req,res)=>{
	let email=req.body.email;
	let password=req.body.password;
	let user=await User.findOne().where({emailid:email}).where({password:password});
	
	if(user){
		cur.push(user);
		
		
		
		let token=auth.generatetoken(user);
		res.cookie('auth_token',token);
		if(user.emailid==="admin@gmail.com" && user.password==="adminkvvk")
			{
				res.send({
			redirectURL:'/admin'
		})
			}
		else{
		res.send({
			redirectURL:'/vehicles'
		})}
	}
	else{
		res.status(400);
		res.send('rejected');
	}
})

router.post('/register',async(req,res)=>{
	let email=req.body.email;
	let password=req.body.password;
	let name=req.body.name;
	let phoneno=req.body.phoneno;
	let user=await User.find().where({emailid:email}).where({password:password}).where({phoneno:phoneno}).where({name:name});
	if(user.length===0){
		let newUser=new User({
			 emailid:email,
			password:password,
			name:name,
			mobnum:phoneno
			
		})
		await newUser.save();
		res.send('Done');
	}
	else{
		res.send('rejected');
	}
})
module.exports={router:router,cur:{cur}};

let User=require('../modules/user').user;
let express=require('express');
let router=express.Router();
let auth=require("../controllers/auth");
router.post('/login',async(req,res)=>{
	let email=req.body.email;
	let password=req.body.password;
	let user=await User.find().where({emailid:email}).where({password:password});
	if(user.length>0){
		let curuser=user[0];
		let token=auth.generatetoken(user[0]);
		res.cookie('auth_token',token);
		console.log(curuser);
		res.send({
			redirectURL:'/vehicles'
		})
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
			phoneno:phoneno
			
		})
		await newUser.save();
		res.send('Done');
	}
	else{
		res.send('rejected');
	}
})
module.exports=router;


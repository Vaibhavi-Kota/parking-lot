let mongoose=require("mongoose");
let Schema=mongoose.Schema;
let vehicleschema=new mongoose.Schema({
	vehiclenum:String,
	type:Number
})
let vehicle=mongoose.model('vehicle',vehicleschema);
let userschema=new mongoose.Schema({
	id:Number,
	name:String,
	mobnum:String,
	emailid:String,
	password:String,
	logintoken:String,
	vehicles:[{vehicle:{ type: Schema.Types.ObjectId, ref: 'vehicle' }}]
})
let user=mongoose.model("user",userschema);
module.exports={ user,vehicle }

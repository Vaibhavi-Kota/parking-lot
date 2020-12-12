let mongoose=require("mongoose");

let Schema=mongoose.Schema;
let slotschema=new mongoose.Schema({
	slotid:Number,
	occupancy:Boolean
})
let slot=mongoose.model("slot",slotschema);



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

let bookingschema=new mongoose.Schema({
	booking_id:Number,
	user_id:{ type: Schema.Types.ObjectId, ref: 'user' },
	slot_id:{ type: Schema.Types.ObjectId, ref: 'slot' },
	vehicle_id:{type: Schema.Types.ObjectId, ref: 'vehicle'},
	intime:Date,
	outtime:Date
})



let booking=mongoose.model("booking",bookingschema);

module.exports={ user,vehicle,booking,slot}
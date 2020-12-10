let mongoose=require("mongoose");
let Schema=mongoose.Schema;
let slotschema=new mongoose.Schema({
	slotid:Number,
	occupancy:Boolean
})
let slot=mongoose.model("slot",slotschema);
module.exports={ slot }
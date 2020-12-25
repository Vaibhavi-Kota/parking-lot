let express=require('express');
let router=express.Router();


const linear = require("../controllers/cool.js");

router.get("/",linear.linear);



module.exports=router;
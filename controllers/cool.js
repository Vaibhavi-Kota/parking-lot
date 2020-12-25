var jsregression = require('js-regression');
let booking=require("../modules/user").booking;

let X=[];
let Y=[];

const linear=async(req,res)=>{

   let data=await booking.aggregate([
    {$match:{}},
    {$group:{_id:{ $dayOfYear:"$intime"},amo:{$sum:"$amount"}
    }}
    ]) 
    let x=[];
    let y=[];
    let i;
    var dat = [];
    
    data.push([x, y]);
    // for(i=0;i<data.length-1;i++)
    // {
    //     x.push(data[i]._id);
    //     let a=data[i]._id;
    //     let b=Math.floor(data[i].amo);
    //     y.push(Math.floor(data[i].amo));
    //     dat.push([a, b]);
    // }


      dat.push([1,330]);
      dat.push([2,320]);
      dat.push([3,330]);
      dat.push([4,320]);
      dat.push([5,330]);
      dat.push([6,310]);
      dat.push([7,340]);
      dat.push([8,330]);
      dat.push([9,320]);
      dat.push([10,330]);
      dat.push([11,340]);
      dat.push([12,320]);

    

      var regression = new jsregression.LinearRegression({
        alpha: 0.001,
        iterations: 3000000,
        lambda: 0.0
      });
 
      var model = await regression.fit(dat);
      console.log(model);
      
    for(i=0;i<10;i++)
    {
        let k=Math.floor(Math.random()*(365-1)+1);
        X.push(k);
        let l;
        l=await regression.transform([k]);
        
        await Y.push(l);
       
    }
  
   X.push(1);
   Y.push(regression.transform([0]));
   X.push(365);
    
    Y.push(regression.transform([365]));
    X.sort(function(a, b){return a - b});
    Y.sort(function(a, b){return a - b});
    
    console.log(X);
    console.log(Y);
    
    res.render("predict",{X:X,Y:Y});
   

};


exports.linear = linear;
module.exports.X = X;
module.exports.Y = Y;
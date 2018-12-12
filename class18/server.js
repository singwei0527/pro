var express = require("express")
var http = express();
var Db = require("./mongodbFZ.js")
var db = new Db("randio");
http.listen(8080,()=>{
	console.log("OK");
})
http.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*")
	next();
})

http.get("/add",(req,res)=>{
	var data = req.query;
	db.find("list",{query:{wish:data.wish}},(err,data1)=>{
		if(data1.length==0){
	        data.time = new Date().getTime();
			db.insertOne("list",data,(err,data2)=>{
				res.send(data2)
			})
		}else{
			res.send("不能重复许愿");
		}
	})
})
http.get("/show",(req,res)=>{
	db.find("list",{},(err,data)=>{
		res.send(data);
	})
})
http.get("/del",(req,res)=>{
	var id = req.query.id
	db.deleteById("list",id,(err,data)=>{
		res.send(data);
	})
})

var express = require("express");
var http = express();
var Db = require("./public/js/mongodbFZ.js")
var db = new Db("elm");

http.listen(8080, () => {
	console.log("8080 OK");
})
http.use(express.static("./public"));

http.get("/show", (req, res) => {
	db.find("list", {}, (err, data) => {
		if(err) throw err
		res.send(data);
	})
})

http.get("/add", (req, res) => {
	var data = req.query;
	var num = data.num * 1;
	db.findById("list", data.id, (err, data1) => {
		if(err) throw err;
		var total = num * data1.foodsPrice * 1
		db.updateById("list", data.id, {
			num,
			total
		}, (err, data2) => {
			if(err) throw err;
			if(err) throw err;
			res.send({
				status: "2",
				statusText: "添加成功",
				data2
			})
		})
	})
})

http.get("/sub", (req, res) => {
	var data = req.query;
	var num = data.num * 1;
	db.find("list", data.id, (err, data1) => {
		if(err) throw err;
		var total = num * data1.foodsPrice * 1;
		db.updateById("list", data.id, {
			num,
			total
		}, (err, data2) => {
			if(err) throw err;
			res.send({
				status: "3",
				statusText: "减少成功",
				data2
			})
		})
	})
})


http.get("/doub",(req,res)=>{
	var data = req.query;
	db.updateById("list",data.id,data,(err,data1)=>{
		if(err) throw err;
		res.send(data1);
	})
})

http.get("/total",(req,res)=>{
	db.find("list",{},(err,data)=>{
		var num = 0
		var total = 0
		data.forEach((item,index)=>{
			num+=item.num*1;
			total+=num*item.foodsPrice*1;
		})
		var obj = {num,total};
		res.send(obj);
	})
})

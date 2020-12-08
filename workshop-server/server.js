require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("port", 8080);

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const Pool = require("pg").Pool
const config = {
	    host: process.env.DB_HOST,
	    user: process.env.DB_USER,
	    password: process.env.DB_PASS,
	    database: "workshop"
};
const pool = new Pool(config)

app.get('/hello', (req, res) => {
  // console log the request query json object
  console.log(req.query);
  // console log the person parameter
  console.log(req.query.person);
  // now send a response back to the client
  res.json({response: `Hello, ${req.query.person}`});
});
app.post("/api", async(req,res) => {
	const workshop = req.body.workshop;
        const attendee = req.body.attendee;
	try{
		
		const template = "SELECT * FROM workshops WHERE workshop = $1 AND attendee = $2";
		const check = await pool.query(template, [workshop, attendee]);
		if(check.rowCount != 0){
		res.json({status: "attendee already in database"});
		}else{
			const template1 = "INSERT INTO workshops (workshop, attendee) VALUES ($1,$2)";
			const response = await pool.query(template1, [workshop, attendee]);
			res.json({status: "added"});
		}
	}catch (err){
		console.log(err);
	}
});

app.get("/api", async(req, res) => {
	const template = "SELECT * FROM workshops";
	const check = await pool.query(template, [workshop]);
	res.json({status: "complete", result: {workshop: workshop}});
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); 
});

require('dotenv').config();
const express = require('express');
const router = require('./routes');
const app = express();
const path = require("path");
const multer = require("multer")
const port = process.env.PORT || 4008;
const cors = require('cors');
const dayjs = require("dayjs")
var wget = require('node-wget');
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use('/be/v1/mansyuriyah', router);
app.get("/",(req,res)=>{
	return res.send({
		message : "be-mansyuriyah"
	})
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
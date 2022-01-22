const { string } = require("@hapi/joi");
const mongose = require("mongoose")
var mongoDB = "mongodb://localhost:27017/mansyuriyah";
mongose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const schema = mongose.Schema({
    username:String,
    fullname:String,
    email:String,
    password:String,
    role:String,
    picture:String
},{collection:"users"})

module.exports = mongose.model("Users",schema)
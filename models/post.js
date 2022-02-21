const mongose = require("mongoose")
var mongoDB = "mongodb://localhost:27017/mansyuriyah";
mongose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const schema = mongose.Schema({
    judul:String,
    status:Boolean,
    content:String,
    createAt:String,
    User : {
        type: mongose.Schema.Types.ObjectId,
        ref:"Users"
    },
    tumbname:String
},{collection:"posts"})

module.exports = mongose.model("Posts",schema)
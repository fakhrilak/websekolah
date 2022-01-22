const mongose = require("mongoose")
var mongoDB = "mongodb://localhost:27017/mansyuriyah";
mongose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const schema = mongose.Schema({
    kegiatan : Array,
    slider : Array,
    beranda : Array,
    prestasi : Array
},{collection:"foto"})

module.exports = mongose.model("Foto",schema)
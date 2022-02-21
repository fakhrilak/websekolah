const foto = require("../models/kegitan")
exports.uploadsfile=async(req,res)=>{
    try{
        const {title} = req.body
        const {filename} = req.file
        let updateDocument = {}
        if (title == "kegiatan"){
            updateDocument = {
                $push: {
                    kegiatan:{
                        $each: [filename],
                        $position: 0
                    }
                }
            }
        }else if (title == "slider"){
            updateDocument = {
                $push: {
                    slider:{
                        $each: [filename],
                        $position: 0
                    }
                }
            }
        }else if (title == "beranda"){
            updateDocument = {
                $push: {
                    beranda:{
                        $each: [filename],
                        $position: 0
                    }
                }
            }
        }else if (title == "prestasi"){
            updateDocument = {
                $push: {
                    prestasi:{
                        $each: [filename],
                        $position: 0
                    }
                }
            }
        }else{
            return res.status(400).send({
                message : "Please choose uploaded"
            })
        }
        const cari =  await foto.find({})
        if (cari.length == 0){
            const create = await foto.create({kegiatan:[],slider:[],beranda:[],prestasi:[]})
            const edit = await foto.updateOne({_id:create._id},updateDocument)
            return res.send({
                message : "uploaded file",
                data:edit
            })
        }else{
            const edit = await foto.updateOne({_id:cari[0]._id},updateDocument)
            return res.send({
                message : "uploaded file",
                data:edit
            })
        }
        
    }catch(err){
        return res.send({
            message : err
        })
    }
}

exports.getFoto=async(req,res)=>{
    try{
        const getfoto = await foto.find({})
        if (getfoto.length > 0) {
            return res.send({
                message : "Success",
                data : getfoto[0]
            }).status(200)
        }else{
            return res.send({
                message : "filed get foto",
            }).status(500)
        }
        
    }catch(err){
        return res.status(500).send({
            message : err
        })
    }
}

exports.deletFoto=async(req,res)=>{
    try{
        const {title,filename} = req.body
        const Cari  = await foto.find({})
        if (title == "kegiatan"){
            const file = Cari[0].kegiatan
            let newArray = []
            for(let i=0;i<file.length;i++){
                if(file[i]!==filename){
                    newArray.push(file[i])
                }
            }
            const update = await foto.updateOne({_id:Cari[0]._id},{kegiatan:newArray})
            return res.status(200).send({
                message:"success",
                data : update
            })
        }else if (title == "slider"){
            const file = Cari[0].slider
            let newArray = []
            for(let i=0;i<file.length;i++){
                if(file[i]!==filename){
                    newArray.push(file[i])
                }
            }
            const update = await foto.updateOne({_id:Cari[0]._id},{slider:newArray})
            return res.status(200).send({
                message:"success",
                data : update
            })
        }else if (title == "beranda"){
            const file = Cari[0].beranda
            let newArray = []
            for(let i=0;i<file.length;i++){
                if(file[i]!==filename){
                    newArray.push(file[i])
                }
            }
            const update = await foto.updateOne({_id:Cari[0]._id},{beranda:newArray})
            return res.status(200).send({
                message:"success",
                data : update
            })
        }else if (title == "prestasi"){
            const file = Cari[0].prestasi
            let newArray = []
            for(let i=0;i<file.length;i++){
                if(file[i]!==filename){
                    newArray.push(file[i])
                }
            }
            const update = await foto.updateOne({_id:Cari[0]._id},{prestasi:newArray})
            return res.status(200).send({
                message:"success",
                data : update
            })
        }else{
            return res.status(400).send({
                message : "Please choose uploaded"
            })
        }
    }catch(err){
        console.log(err)
        return res.status(500).send({
            message:"Server Error"
        })
    }
}
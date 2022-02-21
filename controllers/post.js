const dayjs = require("dayjs")
const Post = require("../models/post")
const path = require('path')

exports.createPost=async(req,res)=>{
    try{
        const {idUser,judul,content} = req.body
        const {filename} = req.file
        const Cari = await Post.findOne(
            {User:idUser,judul:judul}
            )
        if(Cari){
            return res.send({
                message:"konten sudah tersedia"
            })
        }else{
            const create = await Post.create(
                {
                    judul:judul,
                    content:content,
                    createAt: new Date(),
                    User:idUser,
                    tumbname:filename,
                }
            )
            return res.send({
                message : "Berhasil menambahkan konten",
                data:create
            })
        }
    }catch(err){
        console.log(err)
        return res.send({
            message : err.message
        }).status(500)
    }
}

exports.getPost=async(req,res)=>{
    try{
        const Cari = await Post.find({})
        return res.status(200).send({
            message:"Success",
            data : Cari
        })
    }catch(err){
        return res.send({
            message : err.message
        }).status(500)
    }
}

exports.getPostID=async(req,res)=>{
    try{
        const {id} = req.params
        const Cari = await Post.findOne({_id:id})
        return res.status(200).send({
            message:"Success",
            data : Cari
        })
    }catch(err){
        return res.send({
            message : err.message
        }).status(500)
    }
}
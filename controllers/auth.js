const Users = require("../models/users")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const path = require('path')
exports.loadUser = async(req,res)=>{
    try{
        const{user_id}=req.user
        console.log(req.user)
        const user = await Users.findOne({_id:user_id},
            {"emai":1,"username":1,"fullname":1,"picture":1,"email":1,"role":1})
        console.log(user)
        return res.status(200).send({
             massage:'Auth Success',
             data:user   
		})
    }catch(error){
        res.status(500).send(err)
    }
}
const helpervalidasi=(email)=>{
    for(let i = 0;i<email.length;i++){
        if(email[i] == "@"){
            return true
        }
    }
    return false
}
exports.login=async(req,res)=>{
    try{
        const {email,password,username} = req.body
        let Cari
        const val = helpervalidasi(email)
        if(val == true){
            Cari = await Users.findOne({email:email})
        }else{
            Cari = await Users.findOne({username:email})
        }
        if (Cari){
            const validPass = await bcrypt.compare(password, Cari.password);
            if(!validPass){
                console.log("disini1")
                return res.status(400).send({
                    message:"Wrong Email or Password",
                })
            }else{
                const token = jwt.sign({user_id:Cari.id},process.env.SECRET_KEY)
                return res.status(200).send({
                token:token,
                message:"Login Success"
                })
            }
        }else{
            console.log("disini")
            return res.status(400).send({
                message:"Invalid Login"
            })
        }
        
    }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message:err.message
        })
    }
}

exports.getSinge=async(req,res)=>{
    try{
        const { name } = req.params;
        console.log(name)
        res.sendFile(path.join (__dirname, `../uploads/${name}`));
    }catch(err){
        return res.send({
            message:err.message
        })
    }
}

exports.register=async(req,res)=>{
    try{
        const schema = Joi.object({
			email: Joi.string().email().min(6).required(),
            username: Joi.string().min(5).required(),
			password: Joi.string().min(6).required(),
            fullname:  Joi.string().min(7).required(),
		});
		const { error } = schema.validate(req.body);
		if (error)
			return res.status(400).send({
				message: error.details[0].message
			});
        const {email,password,username} = req.body
        const CariEmail = await Users.findOne({email})
        if (CariEmail){
            return res.status(400).send({
                message:"Email is already exist"
            })
        }
        const CariUsername = await Users.findOne({username})
        if (CariUsername){
            return res.status(400).send({
                message:"username is ready in use, please select an uniq"
            })
        }else{
            const hashedPass = await bcrypt.hash(password,10)
            const user = await Users.create({
                ...req.body,
                password:hashedPass,
                role: "2",
                picture : "1623600320103.png"
            })
            const token = jwt.sign({user_id:user.id},process.env.SECRET_KEY)
            return res.status(200).send({
                token: token,
                email:user.email,
                message:"Register Success"
            })
        }
    }catch(err){
        return res.status(400).send({
            message:err.message
        })
    }
}


exports.getAllUser=async(req,res)=>{
    try{
        const users = await Users.find({role:2},{username:1,picture:1})
        return res.send({
            message:"Success",
            data:users
        })
    }catch(err){
        return res.send({
            message : err.message
        })
    }
}

const express = require('express');
const router = express.Router();

const {login,register, getSinge, loadUser} = require("../controllers/auth");
const {auth} = require("../midleware/auth")
const {upload} = require("../midleware/uploadImage")
const {uploadsfile, getFoto, deletFoto,}= require("../controllers/uploads");
const { createPost, getPost,getPostID } = require('../controllers/post');


router.post("/register",register)
router.post("/login",login)
router.get("/auth",auth,loadUser)

router.post("/uploads",auth,upload("file"),uploadsfile)
router.get("/uploads",getFoto)
router.patch("/uploads",auth,deletFoto)

router.get("/single/:name",getSinge)
router.post("/post",auth,upload('file'),createPost)
router.get("/post",auth,getPost)
router.get("/post/:id",auth,getPostID)

module.exports = router
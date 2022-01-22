const express = require('express');
const router = express.Router();

const {login,register, getSinge, loadUser} = require("../controllers/auth");
const {auth} = require("../midleware/auth")
const {upload} = require("../midleware/uploadImage")
const {uploadsfile, getFoto}= require("../controllers/uploads")


router.post("/register",register)
router.post("/login",login)
router.get("/auth",auth,loadUser)

router.post("/uploads",auth,upload("file"),uploadsfile)
router.get("/uploads",getFoto)

router.get("/single/:name",getSinge)

module.exports = router
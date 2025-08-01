const express = require("express");
const router = express.Router();

const User = require("../models/User");

const {login, signup} = require("../Controllers/Auth");
const {auth, isUser,isAdmin} = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

//testing protected routes for single middleware
router.get("/test", auth, (req,res) =>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for TESTS',
    });
});

//Protected Route
router.get("/user", auth, isUser, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for User',
    });
} );

router.get("/admin", auth, isAdmin, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Admin',
    });
});


module.exports = router;
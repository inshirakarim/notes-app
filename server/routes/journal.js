const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth");
const {Journal} = require('../db/index');
const { title } = require('process');

const app= express();
app.use(express.json());
router.post('/journal', authenticateJwt, async (req , res) => {
    const {title, content} = req.body;
    const newJournal = new Journal({
        user : {
            email : req.user.email,
            _id : req.user.userId
        },
        journal : {
            title : title,
            content : content,
        }
    });
    await newJournal.save();
    // console.log(req.user)
    res.json({ message: "Journal entered succesfully"});
})

module.exports = router;


const express = require('express');
const router = express.Router();
const {z, ZodError} = require('zod');
const bcrypt = require('bcrypt');
const {User} = require('../db/index')
const jwt = require('jsonwebtoken');
const {authenticateJwt , SecretKey } = require('../middleware/auth')

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number',
        }),
});

router.post('/signup', async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(403).json({ message: 'User already exists' });
    } 
    try{
        const userData = signupSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        const newUser = new User({
            email: userData.email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).json({
            success: true , msg : "Signup Successful : New User Created", data : userData  
        });
    }
    catch(error){
        if (error instanceof ZodError){
            res.status(400).json({success: false , msg : 'validation failed'});
        } else{
            console.error(error);
            res.status(500).json({success: false , msg : 'Internal Server Error'});
        }
    }
    

})
router.post('/signin' , async (req,res) => {
    const email = req.body.email;
    const user = await User.findOne({ email });
    const userId = user._id;
    if (user) {
        const token = jwt.sign({email, userId , role: 'user'}, SecretKey , {expiresIn: '1h'});
        res.status(200).json({
            msg: "Welcome back, Signed in successfully" , token
        })
    }
    else {
        res.status(401).json({
            msg: "Invalid email and password, Please sign up"
        });
    }
})

// router.get('/get-all-journals', authenticateJwt, (req, res) => {
//     res.json({
//         msg: 'checkpoint-1'
//     });
// })
module.exports = router;
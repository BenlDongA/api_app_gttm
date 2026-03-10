const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



exports.register = async (req,res)=>{

    try{

        const {username,name,email,password,sdt} = req.body

        const exist = await User.findOne({email})

        if(exist){
            return res.json({message:"Email already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const user = new User({
            username,
            name,
            email,
            password:hashPassword,
            sdt
        })

        await user.save()

        res.json({
            message:"Register success",
            user
        })

    }catch(err){

        res.status(500).json(err)

    }

}



exports.login = async (req,res)=>{

    try{

        const {email,password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.json({message:"User not found"})
        }

        const check = await bcrypt.compare(password,user.password)

        if(!check){
            return res.json({message:"Wrong password"})
        }

        const token = jwt.sign(
            {id:user._id},
            "SECRET_KEY",
            {expiresIn:"7d"}
        )

        res.json({
            message:"Login success",
            token,
            user
        })

    }catch(err){

        res.status(500).json(err)

    }

}



exports.getUsers = async (req,res)=>{

    try{

        const users = await User.find()

        res.json(users)

    }catch(err){

        res.status(500).json(err)

    }

}



exports.updateUser = async (req,res)=>{

    try{

        const id = req.params.id

        const {username,name,email,sdt} = req.body

        const user = await User.findByIdAndUpdate(
            id,
            {username,name,email,sdt},
            {new:true}
        )

        res.json({
            message:"User updated",
            user
        })

    }catch(err){

        res.status(500).json(err)

    }

}



exports.deleteUser = async (req,res)=>{

    try{

        const id = req.params.id

        await User.findByIdAndDelete(id)

        res.json({
            message:"User deleted"
        })

    }catch(err){

        res.status(500).json(err)

    }

}
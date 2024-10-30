const mongoose = require('mongoose');
const AdminSechema=require('../model/model');
const bcrypt=require('bcrypt');


const AdminSignup=async (req,res) => {
    try{
        const {email,password}=req.body;
        const adminExist=await AdminSechema.findOne({email});
        if(adminExist) return res.status(400).json({error:'Admin already exist'});
        const hashedPassword=await bcrypt.hash(password,10);
        const admin=new AdminSechema({email,password:hashedPassword});
        await admin.save();
        res.status(201).json({message:'Admin created successfully'});

    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const AdminLogin=async (req,res) => {
    try{
        const {email,password}=req.body;
        const admin=await AdminSechema.findOne({email});
        if(!admin) return res.status(404).json({error:'Admin not found'});
        const isMatch=await bcrypt.compare(password,admin.password);
        if(!isMatch) return res.status(400).json({error:'Invalid password'});
        res.json({message:'Admin logged in successfully'});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const GetProfule=async (req,res) => {
    try {
        const user = await AdminSechema.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 };

 const ChangePassword=async(req,res) => {
    try{
        const {email,oldPassword,newPassword}=req.body;
        const admin=await AdminSechema.findOne({email});
        if(!admin) return res.status(404).json({error:'Admin not found'});
        const isMatch=await bcrypt.compare(oldPassword,admin.password);
        if(!isMatch) return res.status(400).json({error:'Invalid password'});
        const hashedPassword=await bcrypt.hash(newPassword,10);
        admin.password=hashedPassword;
        await admin.save();
        res.json({message:'Password changed successfully'});
 }catch(error){
     res.status(500).json({error:error.message});
 }
};

module.exports={AdminSignup,AdminLogin,GetProfule,ChangePassword};


// import mongoose from "mongoose";
import User from "../models/UserSchema.js";

// Create a User model using the schema
// const User = mongoose.model('User', UserSchema);

export const updateUser = async(req,res)=>{
    const id = req.params.id
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,{$set:req.body},{new : true}
        );

        res
        .status(200)
        .json({
            success: true,
            message : 'Successfully updated',
            data:updatedUser,
        });
        
    } catch (err) {

        res
        .status(500)
        .json({success:false, message : 'Failed to update'});   
    }
};

export const deleteUser = async(req,res)=>{
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(
            id,
        );

        res
        .status(200)
        .json({
            success:true,message : "Sucessfully Deleted",
            });
        
    } catch (err) {

        res
        .status(500)
        .json({success:false, message : 'Failed to delete'});   
    }
};

export const getSingleUser = async(req,res)=>{
    const id = req.params.id;
    try {
        const user = await User.findById(id).select("-password");

        res
        .status(200)
        .json({
            success:true,
            message : 'User found',
            data:user
        });
        
    } catch (err) {

        res
        .status(404)
        .json({success:false, message : 'No User found'});   
    }
};

export const getAllUser = async(req,res)=>{
    
    try {
        const users = await User.find({}).select("-password");
        res
        .status(200)
        .json({
            success:true,message : 'Users found',
            data:users,
        });
        
    } catch (err) {

        res
        .status(404)
        .json({success:false, message : 'Not found'});   
    }
};
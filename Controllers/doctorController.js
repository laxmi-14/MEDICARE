// import mongoose from "mongoose";
import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            id, 
            { $set: req.body }, 
            { new: true }
        );

        // if (!updatedDoctor) {
        //     return res.status(404).json({ success: false, message: "Doctor not found" });
        // }

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedDoctor,
        });
    } catch (err) {
        // console.error(`Error updating doctor with ID ${id}:`, err);  // More context in logging
        res.status(500).json({ success: false, message: 'Failed to update doctor' });
    }
};

export const deleteDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        await Doctor.findByIdAndDelete(id);
        
        // if (!deletedDoctor) {
        //     return res.status(404).json({ success: false, message: 'Doctor not found' });
        // }

        res.status(200).json({
            success: true,
            message: "Successfully Deleted",
        });
    } catch (err) {
        // console.error(`Error deleting doctor with ID ${id}:`, err);
        res.status(500).json({ success: false, message: 'Failed to delete doctor' });
    }
};

export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const doctor = await Doctor.findById(id).populate("reviews").select("-password");

            

        res.status(200).json({
            success: true,
            message: 'Doctor found',
            data: doctor,
        });
    } catch (err) {
        // console.error(`Error retrieving doctor with ID ${id}:`, err);
        res.status(404).json({ success: false, message: 'No Doctor found' });
    }
};

export const getAllDoctor = async (req, res) => {
    try {
        const { query } = req.query;  // Ensure correct query handling
        let doctors;
        if(query) {
            doctors = await Doctor.find({
                isApproved:"approved",
              $or: [
                {name: {$regex:query, $options: "i"}},
              ] ,
            }).select("-password");
        }else{
            doctors = await Doctor.find({isApproved:"approved"}).select("-password");
        }
        // if (!doctors || doctors.length === 0) {
        //     return res.status(404).json({ success: false, message: `No doctors found` });
        // }

        res.status(200).json({
            success: true,
            message: 'Doctors found',
            data: doctors,
        });
    } catch (err) {
        // console.error(`Error retrieving doctors:`, err);
        res.status(404).json({ success: false, message: 'Not found' });
    }
};
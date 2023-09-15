import { Request, Response } from 'express';
import User from '../models/users'
import validator from 'validator';
export const createUser = async(req: Request, res: Response) => {
    try{
        const {name, email} = req.body
        if(!validator.isEmail(req.body.email)) {
            return res.status(400).json({status:"failed", error: "invaild email format"})
        }
        // Validate the name field (must be a string)
    if (typeof name !== 'string') {
        return res.status(400).json({status:"failed", error: 'Name must be a string.' });
      }
  
        
      const user = new User({ name,email });
      await user.save();
      
      res.status(201).json({ status: "success", user });
  } catch (error) {
    res.status(500).json({ status: "error", error: 'An error occurred while creating the user.' });
  }
    
}


export const deleteUser =async (req:Request, res: Response) => {
  
  try {

    const dynamicName = req.params.name;
    
    // Ensure that the dynamic name parameter is a string
    if (typeof dynamicName !== 'string') {
      return res.status(400).json({ status: "failed", error: 'Name must be a string.' });
    }   
    const user = await User.findOneAndDelete({name: dynamicName })
    if(!user)  {
      return res.status(404).json({ error: 'user not found.' });
    }
    res.status(200).json({status:"success", message: "user successfully deleted"})
  } catch (error) {
      res.status(500).json({status: "failed", Error: error })
  }
}


// Get user by a dynamic name parameter
export const getUserByName = async (req: Request, res: Response) => {
  try {
    const dynamicName = req.params.name;

    // Validate the name parameter (must be a string)
    if (typeof dynamicName !== 'string') {
      return res.status(400).json({ status: "failed", error: 'Name must be a string.' });
    }

    // Find the user by the dynamic name
    const user = await User.findOne({ name: dynamicName });

    if (!user) {
      return res.status(404).json({ status: 'failed', error: 'User not found.' });
    }

    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(500).json({ status: "failed", error });
  }
};

// Update a user by a dynamic name parameter
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const dynamicName = req.params.name;

    // Validate the email field
    if (!validator.isEmail(email)) {
      return res.status(400).json({ status: "failed", error: "Invalid email format" });
    }

    // Validate the name parameter (must be a string)
    if (typeof dynamicName !== 'string') {
      return res.status(400).json({ status: "failed", error: 'Name must be a string.' });
    }

   

    // Find the user by the dynamic name and update the fields
    const updatedUser = await User.findOneAndUpdate(
      { name: dynamicName },
      { name, email },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ status: 'failed', error: 'User not found.' });
    }
    
    res.status(200).json({ status: "success", user: updatedUser });
  } catch (error) {
    res.status(500).json({ status: "failed", error });
  }
};

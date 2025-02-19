import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function registerUser(req, res) {
    try {
        const data = req.body;

        data.password = bcrypt.hashSync(data.password, 10);
        const newUser = new User(data);

        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred during registration", error: error.message });
    }
}

export async function loginUser(req, res) {
    try {
        const data = req.body;

        const user = await User.findOne({ email: data.email });

        if (user == null) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

        if (isPasswordCorrect) {
            const token = jwt.sign(
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    profilePicture: user.profilePicture,
                    phone:user.phone
                },
                process.env.JWT_SECRET
            );

            res.json({ message: "Login successful", token: token , user : user });
        } else {
            res.status(401).json({ error: "Login failed" });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred during login", error: error.message });
    }
}



export function isItAdmin(req){
    let isAdmin = false;
    
    if(req.user != null ){
        if(req.user.role=="admin")
        {
            isAdmin = true;
        }
            
    }

    return isAdmin;

}

export function isItCustomer(req){
    let isCustomer = false;

    if(req.user !=null){
        if(req.user.role == "customer"){
            isCustomer = true;
        }
    }

    return isCustomer;
}

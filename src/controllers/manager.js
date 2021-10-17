import models from '../models';
import {bcryptingPassword, userExist} from "../helpers"
import {sendVerificationEmail} from "../helpers"
export const managerSignup = async (req, res) => {
const {first_name, last_name, email, password,date_of_birth, phone,national_id} = req.body;

const bcryptedPasswrd = bcryptingPassword(password)
const randomNumber = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
const code = `EMP${randomNumber}` 
try{
   const userIsExist = await userExist(email);
   if(userIsExist) return res.status(409).json({message:"User with the same email already exist"});
   
   const newManager = await models.Users.create({first_name, last_name, email, password:bcryptedPasswrd,code,phone,national_id, date_of_birth});
   await sendVerificationEmail(req, res,first_name, email)
   return res.status(201).json({status:201, message: `sign up successful! verify your email ${email} to activate your account`, data: newManager})
 } catch (error) {
   return res.status(400).json({message: error.message, stack: error.stack});
 }
}
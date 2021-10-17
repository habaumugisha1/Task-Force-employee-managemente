import models from '../models';
import {employeeExist,employeeIdExist} from "../helpers"
import {sendVerificationEmail} from "../helpers"

export const createNewEmployee = async (req, res) => {
const {first_name, last_name, email, date_of_birth, position, phone, national_id} = req.body;

const randomNumber = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
const code = `EMP${randomNumber}` 
try{
   const employeeIsExist = await employeeExist(email);
   const nationalIdExist = await employeeIdExist(national_id)
   
   if(employeeIsExist) return res.status(409).json({message:"Employee with the same email already exist"});

   if(nationalIdExist) return res.status(409).json({message:"national ID already exist"});
   
   const newEmployee = await models.Employees.create({first_name, last_name, email, code, position, phone,national_id, date_of_birth});
   await sendVerificationEmail(req, res,first_name, email)
   return res.status(201).json({status:201, message: 'Employee created successful!', data: newEmployee})
 } catch (error) {
   return res.status(400).json({status:400, message: error.message});
 }
}
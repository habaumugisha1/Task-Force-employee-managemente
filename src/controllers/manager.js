import models from '../models';
import {bcryptingPassword, userExist, comparePassword, generateToken, verifyToken} from "../helpers"
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
   return res.status(400).json({status:400, message: error.message});
 }
}

export const managerLogin = async (req, res) => {
  const{email, password } = req.body;

  try {
    // check if user is exist in database
    const isUserExist = await userExist(email);
    if (!isUserExist) return res.status(404).json({status:404, message:`You don't have account with this email ${email}!`});
    if(isUserExist.status !=="ACTIVE") return res.status(400).json({status:400, message:`You account is not activated!`});
    const comparedPassword = comparePassword(password, isUserExist.password);
  
    if(!comparedPassword) return res.status(400).json({status:400, message:"Password incorrect!"}) 
    const tokenPayload = {email:isUserExist.email, position:isUserExist.position};

    // generate manager token
    const token = generateToken(tokenPayload)

    return res.status(200).json({status:200, message:"Login successful", token})
    
  } catch (error) {
    return res.status(400).json({message: error.message, stack: error.stack});
  }
}

export const confirmEmail = async (req, res)  =>{
  const {token} = req.query;
  const userEmail = await verifyToken(token);
  const isExist = await userExist(userEmail.email)

  const activateManager = models.Users.update({status:"ACTIVE"},{where:{email:isExist.email}});
  return res.status(200).json({statua:200, message:"account confirmed successful"})

}
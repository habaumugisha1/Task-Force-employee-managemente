import models from './models';
import {Op} from 'sequelize';

//search employee
export const queryEmployee = async (req, res, {...query}) => {
    const { position, email, phone, code } = query;

    //search based on the position only
    if(!email && !phone && !code && position){
        const results = await models.Employees.findAll({ where: { position:{[Op.iLike]:`%${position}%`} }});
        if(!results) return res.status(404).json({status:404, message:"No results found!"})
        return results;
    }

    //search based on the email only
    if(!phone && !code && !position && email){
        const results = await models.Employees.findOne({ where: { email :{[Op.iLike]:`%${email}%`} }});
        if(!results) return res.status(404).json({status:404, message:"No results found!"})
        return results;
    }

    //search based on the phone only
    if(!code && !position && !email&& phone){
        const results = await models.Employees.findAll({ where: { phone :{[Op.iLike]:`%${phone}%`} }});
        if(!results) return res.status(404).json({status:404, message:"No results found!"})
        return results;
    }
    //search based on the code only
    if(!position && !email&& !phone && code){
        const results = await models.Employees.findOne({ where: { code :{[Op.iLike]:`%${code}%`} }});
        if(!results) return res.status(404).json({status:404, message:"No results found!"})
        return results;
    }
    //search based on the position and email
    const results = await models.Employees.findOne({  where: { position: {[Op.iLike]:`%${position}%`}, email:{[Op.iLike]:`%${email}%`} }});
    if(!results) return res.status(404).json({status:404, message:"No results found!"})
    return results;
    
};
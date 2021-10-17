import joi from 'joi'

const managerLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});

export default (req, res, next) => {
    const  results  = managerLoginSchema.validate(req.body);
    if (results.error) return res.status(400).json({message:results.error.details[0].message, status:400});
    
    next();
  };
import joi from 'joi'

const managerSchema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    position: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    phone: joi.string().length(10).required(),
    national_id: joi.string().length(16).required(),
    date_of_birth: joi.date().required(),
});

export default (req, res, next) => {
    const  results  = managerSchema.validate(req.body);
    if (results.error) return res.status(400).json({message:results.error.details[0].message, status:400});
    
    next();
  };
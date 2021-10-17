import joi from 'joi'

const employeeSchema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    code: joi.string().required(),
    postion: joi.string().required(),
    email: joi.string().email().trim(true).required(),
    phone: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    date_of_birth: joi.date().required(),
});

export default (req, res, next) => {
    const { error } = employeeSchema.validate(req.body);
    if (error) {
      res.status().json({message:error.details[0].message, status:400});
    }
    next();
  };
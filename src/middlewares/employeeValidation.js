import joi from 'joi'

const employeeSchema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    position: joi.string().required(),
    email: joi.string().email().trim(true).required(),
    phone: joi.string().length(10).required(),
    date_of_birth: joi.date().required(),
    national_id: joi.string().length(16).required()
});

export default (req, res, next) => {
    const { error } = employeeSchema.validate(req.body);
    if (error) {
      res.status(400).json({status:400, message:error.details[0].message});
    }
    next();
  };
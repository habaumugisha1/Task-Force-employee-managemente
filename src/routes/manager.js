import express from 'express';
import {managerSignup, managerLogin} from "../controllers/manager"
import managerValidation from "../middlewares/managerValidation";
import loginValidation from "../middlewares/loginValidation";

const router = express.Router();

router.post('/signup', managerValidation, managerSignup);
router.post('/login', loginValidation, managerLogin);

export default router
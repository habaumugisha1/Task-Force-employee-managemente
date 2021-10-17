import express from 'express';
import {managerSignup, managerLogin, confirmEmail} from "../controllers/manager"
import managerValidation from "../middlewares/managerValidation";
import loginValidation from "../middlewares/loginValidation";

const router = express.Router();

router.post('/signup', managerValidation, managerSignup);
router.post('/login', loginValidation, managerLogin);
router.get('/verification', confirmEmail);

export default router
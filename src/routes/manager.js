import express from 'express';
import {managerSignup} from "../controllers/manager"
import managerValidation from "../middlewares/managerValidation";

const router = express.Router();

router.post('/signup', managerValidation, managerSignup)

export default router
import express from 'express';
import {createNewEmployee} from "../controllers/employee"
import employeeValidation from "../middlewares/employeeValidation";
import { isManager } from '../middlewares/isManager';


const router = express.Router();

router.post('/create', isManager, employeeValidation, createNewEmployee);

export default router
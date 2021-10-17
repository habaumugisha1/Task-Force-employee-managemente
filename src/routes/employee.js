import express from 'express';
import {activateEmp, createNewEmployee, deleteRecord, getAllRecord, updateRecord} from "../controllers/employee"
import employeeValidation from "../middlewares/employeeValidation";
import { isManager } from '../middlewares/isManager';


const router = express.Router();

router.post('/create', isManager, employeeValidation, createNewEmployee);
router.patch('/:employeeId', isManager, updateRecord);
router.get('/', isManager, getAllRecord);
router.delete('/:employeeId', isManager, deleteRecord);
router.patch('/:employeeId', isManager, activateEmp);
export default router
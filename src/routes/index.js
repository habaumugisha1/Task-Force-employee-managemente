import express from 'express';
import managerRouter from "./manager"
import employeeRouter from "./employee"

const router = express.Router();

router.use("/user", managerRouter)
router.use("/employee", employeeRouter)

export default router
import express from 'express';
import managerRouter from "./manager"

const router = express.Router();

router.use("/user", managerRouter)

export default router
import { verifyToken } from "../helpers"
export const isManager = async (req,res, next) => {
    const bearerToken = req.headers.authorization
    if(!bearerToken) return res.status(401).json({status:401, message:"Unauthorizaed"})
    const token = bearerToken.split(" ")[1];

    const decoded = await verifyToken(token);
    if (decoded.position !== "Manager") return res.status(403).json({status:403, message:"Access denied"})
    return next()
}
import  jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"
import config from '../config';
import { pool } from '../config/db';

const auth = (...roles : string[]) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        try{
            const token = req.headers.authorization;
            if(!token){
                return res.status(500).json({message: "You are not verified.!"});
            }
            const decode = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
        req.user = decode ;
        const user = await pool.query(`
            SELECT * FROM Users WHERE email = $1
            `, [decode.email]);
            if(user.rows.length === 0){
                throw new Error("User not found!")
            }
        if(roles.length && !roles.includes(decode.role as string)){
            return res.status(500).json({
                error: "Unauthorized!!"
            });
        }
        next();
        }catch(err: any){
              res.status(500).json({
      success: false,
      message: "Failed",
      errors: err.message,
    });
        }
    }
};

export default auth;
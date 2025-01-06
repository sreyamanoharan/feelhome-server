import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'
import userCollection from '../Models/UserModel.js'
const SECRETCODE=process.env.VITE_jwtSecretKey


export const generateToken= (id,role)=> {
   
        const token = jwt.sign({id,role},SECRETCODE)
        return token

    }

export const verifyUserToken=async(req,res,next)=>{
        try{
            let token = req.headers.authorization
            console.log(token,'here is the tokennnn......');
            if(!token){
                console.log('token illa ughh')
                return res.status(403).json({errmsg:'Access denied'})
            }

            if(token.startsWith('Bearer')){
               console.log('token ind guys')
               token = token.slice(7,token.length).trimLeft()
            }

            const verified = jwt.verify(token,SECRETCODE)
            if(verified.role === 'user'){

                const user = await userCollection.findOne({_id:verified.id});
                if(user.isBlocked){
                    return res.status(403).json({errmsg:'user is blocked by admin'})
                }else{
                    req.payload = verified
                    next()
                }
                }else{
                    req.status(403).json({errmsg:'Access is denied'})
                }
            }catch (error){
               res.status(500).json({errmsg:'server error'})
            }
        

        }

       export const verifyAdminToken=async(req,res,next) => {
          try{
             let token = req.headers.authorization
             if(!token){
                return res.status(403).json({errmsg:'Access Denied'})
             }
             
            if(token.startsWith('Bearer')){
                token = token.slice(7,token.length).trimLeft()
             }

             const verified = jwt.verify(token , SECRETCODE)

             if(verified.role === 'admin'){
                req.payload = verified
                next()
             }else{
                return res.status(403).json({errmsg:'Access is denied'})
             }
          }catch(err){
            console.log(err.message);
            return res.status(500).json({errmsg:'Server error'})
          }
        
        }

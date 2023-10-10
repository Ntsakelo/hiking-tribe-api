import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


 
export const crypted = async (password: string) => {
try{
    const salt = await bcrypt.genSalt(10);
    const crypted = await bcrypt.hash(password, salt);
    return crypted;
}catch(error){
    console.log(error)
}    
    
}

export const checkPassword = async (password: string, hash:string) => {
   try{
         const passwordMatch = await bcrypt.compare(password, hash);
         return passwordMatch;
   }catch(error){
    console.log(error)
   }
}

export const genToken = (email:string, userId: string) => {
     const token = jwt.sign(
        {
            email,
            userId
        },
        process.env.SECRET, 
        {
            expiresIn: "1h"
        }
        );
        return token;
}
import bcrypt from "bcrypt";


export const crypted = async (password: string) => {
try{
    const salt = await bcrypt.genSalt(10);
    const crypted = await bcrypt.hash(password, salt);
    return crypted;
}catch(error){
    console.log(error)
}    
    
}
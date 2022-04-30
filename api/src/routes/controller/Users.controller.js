const bcryptjs = require("bcryptjs");
const {User , Operation} = require("../../db.js");

const postUser = async(req , res, next) =>{
    const{
        email,
        name,
        lastName,
        password,
    } = req.body;
    const emailExists = await User.findOne({
        where:{email}
    });
    if(emailExists){
        return res.status(400).json({error:"ya hay un usuario con ese email"});
    }
    try{
        // const userCreate = await bcryptjs.hash(password,10).then(hash =>{
        //     User.create({
        //         email,
        //         name,
        //         lastName,
        //         password:hash,
        //     });
        // });
        const userCreate = await User.create({
            email,
            name,
            lastName,
            password
        });
        return res.status(200).send("usuario creado");
    }catch(error){
        next(error)
        res.send(error)
    }
}

const dbUser = async()=>{
    return await User.findAll({
        include:{
            model: Operation,
            attributes: ["id", "name", "money", "date", "type","category", "idUser"],
            through:{
                attributes:[],
            }
        }
    });
}

const getAllUsers = async(req,res , next) =>{
    try{
        const allUsers = await dbUser();
        return res.status(200).send(allUsers)
    }catch(error){
        next(error);
        res.send(error)
  }
}

const getUserEmail = async(req , res , next) =>{ 
    try{
        const{email} = req.params;
        const allUsers = await dbUser();
        const user = allUsers.find(el => el.email.toLowerCase() === email.toLowerCase() );
        if(user){
            return res.status(200).send(user)
        }
        return res.status(404).json({error:"no se encuentra ese usuario"})
    }catch(error){
        next(error);
        res.send(error)
    }
}



module.exports = {postUser , getAllUsers, getUserEmail };
const {Operation, User} = require("../../db.js");

const postOperation = async(req,res ,next)=>{
    let{
        name,
        money,
        date,
        type,
        category,
        idUser,
    }= req.body;
    try{
        const user = idUser && await User.findAll({
            where:{id:idUser}
        });
        const operationCreate = await Operation.create({
            name,
            money,
            date,
            type,
            category,
            idUser,
        });
        console.log(user)
        for(let i=0; i < user.length; i++){
            await user[i].addOperation(operationCreate.dataValues.id)
        }
        return res.status(200).send(operationCreate) 
    }catch(error){
        next(error);
        res.send(error);
    }
}


const getAllOpetations = async(req,res, next)=>{
    try{
        const{user} = req.params;
        const allOperations = await Operation.findAll({
            where:{idUser:user}
        });
        return res.status(200).send(allOperations)
    }catch(error){
        next(error);
        res.send(error);
    }
}


const getIdOperation = async(req , res ,next) =>{
    try{
        const {idOperation} = req.params;
        const allOperations = await Operation.findAll();
        if(idOperation){
            const id = allOperations.find(el => el.id.toLowerCase() === idOperation.toLowerCase() );
             return id ?  res.status(200).send(id)
            : res.status(404).json({error: "Esa operacion no existe" })  
        }
    }catch(error){
        next(error);
        res.send(error);
    }
}


const deleteOperation = async(req , res , next) =>{
    try{
        const {idOperation} = req.params;
        const allOperations = await Operation.findAll();
        const id = allOperations.find(el => el.id.toLowerCase() === idOperation.toLowerCase() );
        if(id){
            await id.destroy();
            return res.status(200).send("Operacion eleminada")
        }
        return res.status(404).json({error: "no se puede eleminar la operacion"})   
    }catch(error){
        next(error);
        res.send(error);
    }
}


const modifyOperation = async(req ,res , next) =>{
    try{
        const {idOperation} = req.params;
        const {
            name,
            money,
            date,
            category,
        } = req.body
        const allOperations = await Operation.findAll();
        const operation = allOperations.find(el => el.id.toLowerCase() === idOperation.toLowerCase() );
        if(operation){
            operation.name = name ? name : operation.name;
            operation.money = money ? money : operation.money;
            operation.date = date ? date : operation.date;
            operation.category = category ? category : operation.category;
            operation.save();
            return res.status(200).send(operation)
        }
        return res.status(404).json({error:"No esta esa operacion para modificar" })
    }catch(error){
        next(error);
        res.send(error);
    }
}



const getAllIncome = async(req,res , next) =>{ // ruta para prueba interna
    try{
        const allOperations = await Operation.findAll();
        const operationsIncome =  allOperations.filter(el => el.type.toLowerCase() === "ingreso");
        if(operationsIncome.length > 0 ){
            return res.status(200).send(operationsIncome);
        }
        return res.status(404).json({error:"No hay operaciones de ingreso para mostrar"})
    }catch(error){
        next(error);
        res.send(error);
    }
}


const getAllEgress = async(req,res, next) =>{ // ruta para prueba interna
    try{
        const allOperations = await Operation.findAll();
        const OperationsEgress = allOperations.filter(el => el.type.toLowerCase() === "egreso" )
        if(OperationsEgress.length > 0){
            return res.status(200).send(OperationsEgress);
        }
        return res.status(404).json({error:"No hay operaciones de egresos de dinero" })
    }catch(error){
        next(error);
        res.send(error);
    }
}

const getFilterType = async(req,res ,next ) =>{
    try{
        const{user , type} = req.params; 
        if(type === "egresos"){
            const allOperations = await Operation.findAll({
                where:{idUser: user}
            });
            const OperationsEgress = allOperations.filter(el => el.type.toLowerCase() === "egreso" );
            return res.status(200).send(OperationsEgress);
        }
        if(type === "ingresos"){
            const allOperations = await Operation.findAll({
                where:{idUser: user}
            });
            const operationsIncome =  allOperations.filter(el => el.type.toLowerCase() === "ingreso");
            return res.status(200).send(operationsIncome)
        }
        const allOperations = await Operation.findAll({
            where:{idUser: user}
        });
        return res.status(200).send(allOperations)
    }catch(error){
        next(error);
        res.send(error);
    }
}

const getFilterCategory = async(req, res, next) => {
    try{
        const{user,category} = req.params; // agarro por destructurin el params de user y de category
        const allOperations = await Operation.findAll({ // traigo solamente lo que tiene type:"egreso" y  tambien que sea idUser:user
            where: {idUser:user , type: "egreso"} 
        });
        if(category === "all"){
            return res.status(200).send(allOperations);
        }
        const operationsFilter =  allOperations.filter(el => el.category.toLowerCase() === category.toLowerCase()  );
        return res.status(200).send(operationsFilter);
    }catch(error){
        next(error);
        res.send(error);
    }
}


module.exports={
    postOperation ,
    getAllOpetations,
    getIdOperation ,
    deleteOperation,
    modifyOperation, 
    getAllIncome , 
    getAllEgress , 
    getFilterType,
    getFilterCategory,
};
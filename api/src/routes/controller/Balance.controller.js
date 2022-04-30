const {Operation} = require("../../db.js");

const incomeTotal = async(req,res , next) =>{
    try{
        const{user} = req.params;
        const allOperations = await Operation.findAll({
            where: {idUser: user}
        });
        const operationsIncome =  allOperations.filter(el => el.type.toLowerCase() === "ingreso");
        if(operationsIncome.length > 0 ){
           const arrayIncomes = operationsIncome.map(el => { return el.money}) ;
           let total = arrayIncomes.reduce(function(acumulador , element ){
               return acumulador + element;
           },0).toString() // lo convierto a string para que lo pueda ver en postman
        //    total = [total]
        //    console.log(total)
        //    total = total.join("");
        //    console.log(total)
           return res.status(200).send("+" + total)
        }
        return res.status(200).send("0")
    }catch(error){
        next(error);
        res.send(error);
    }
}


const expenditureTotal = async(req,res , next) =>{
    try{
        const{user} = req.params;
        const allOperations = await Operation.findAll({
            where: {idUser: user}
        });
        const operationsExpenditure =  allOperations.filter(el => el.type.toLowerCase() === "egreso");
        if(operationsExpenditure.length > 0 ){
           const arrayExpenditures = operationsExpenditure.map(el => { return el.money}) ;
           let total = arrayExpenditures.reduce(function(acumulador , element ){
               return acumulador + element;
           },0).toString() // lo convierto a string para que lo pueda ver en postman
           return res.status(200).send("-" + total)
        }
        return res.status(200).send("0")
    }catch(error){
        next(error);
        res.send(error);
    }
}

//funcion que se va a utilizar en la funcion currentBalance, (me va dar el total de los ingresos)
const incomeAmount = async(user) =>{  // el user va ser un id que viene por paramas en la funcion currentBalance
    const allOperations = await Operation.findAll({ 
        where: {idUser: user}
    });
    const operationsExpenditure = await  allOperations.filter(el => el.type.toLowerCase() === "ingreso");
    if(operationsExpenditure.length > 0 ){
       const arrayExpenditures = operationsExpenditure.map(el => { return el.money}) ;
       let total = arrayExpenditures.reduce(function(acumulador , el ){
           return acumulador + el;
       },0)
       return total
    }
    return 0
}

//funcion que se va a utilizar en la funcion currentBalance , (me va dar el total de los egresos )
const expensesAmount = async(user) =>{ // el user va ser un id que viene por paramas en la funcion currentBalance
    const allOperations = await Operation.findAll({
        where:{idUser: user}
    });
    const operationsExpenditure = await  allOperations.filter(el => el.type.toLowerCase() === "egreso");
    if(operationsExpenditure.length > 0 ){
       const arrayExpenditures = operationsExpenditure.map(el => { return el.money}) ;
       let total = arrayExpenditures.reduce(function(acumulador , el ){
           return acumulador + el;
       },0)
       return total 
    }
    return 0
}


const currentBalance = async(req , res , next) =>{ 
    try{
        const{user} = req.params
        const income = await incomeAmount(user); // el user que traigo por parmas lo voy a utiilizar en esta funcion
        const expenses = await expensesAmount(user); // el user que traigo por parmas lo voy a utiilizar en esta funcion
        let balance = income - expenses;
        balance = balance.toString()
        return res.status(200).send(balance)
    }catch(error){
        next(error);
        res.send(error);
    }
}



module.exports={incomeTotal, expenditureTotal , currentBalance}
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {postOperation,
    getAllOpetations ,
    getIdOperation , 
    deleteOperation ,
    modifyOperation,
    getAllIncome , 
    getAllEgress,
    getFilterType,
    getFilterCategory,
} = require("./controller/Operations.controller");

const {incomeTotal , expenditureTotal , currentBalance} = require("./controller/Balance.controller");

const {postUser, getAllUsers, getUserEmail} = require("./controller/Users.controller")

const router = Router();

router.post("/createOperation" ,postOperation);
router.get("/operations/:user", getAllOpetations);
router.get("/operation/:idOperation",getIdOperation );
router.delete("/deleteOperation/:idOperation", deleteOperation);
router.put("/modifyOperation/:idOperation", modifyOperation);
router.get("/operationsIncome", getAllIncome); // ruta para prueba interna
router.get("/opertionsExpenditures" , getAllEgress);// ruta para prueba interna
router.get("/filterOperations/:user/:type",getFilterType);
router.get("/filterCategory/:user/:category",getFilterCategory); // hago un doble parms , el primer es el id del user y el segundo filtrado por category


router.get("/ingresos/:user" , incomeTotal);
router.get("/egresos/:user" , expenditureTotal);
router.get("/balance/:user", currentBalance);


router.post("/createUser", postUser);
router.get("/users",getAllUsers);
router.get("/users/:email", getUserEmail);




module.exports = router;

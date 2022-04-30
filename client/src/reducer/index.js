import { 
    GET_BALANCE,
    GET_FINAL_EXPENDITURE,
    GET_FINAL_INCOME, 
    GET_OPERATIONS,
    POST_OPERATION,
    DELETE_OPERATION,
    FILTER_TYPE,
    FILTER_CATEGORY,
    GET_ID_OPERATION,
    ORDER_BY_DATE,
    //
    GET_USERS,
    POST_USER,
    GET_EMAIL_USER,
} from "../actions/types";


const initialState ={
    operations:[],
    // copyOperations:[],
    balance:[],
    finalIncome:[],
    finalExpenditure:[],
    operationId:[],
    users:[],
    userEmail:[],
}



function reducer (state=initialState, {type,payload}){
    switch(type){
        case GET_USERS:
            return{
                ...state,
                users: payload,
            }

        case POST_USER:
            return{
                ...state,
            }

        case GET_EMAIL_USER:
            return{
                ...state,
                userEmail: payload
            }

        case GET_OPERATIONS:
            return{
                ...state,
                operations: payload,
                // copyOperations: payload,
            }

        case GET_BALANCE:
            return{
                ...state,
                balance: payload,
            }

        case GET_FINAL_INCOME:
            return{
                ...state,
                finalIncome : payload,
            }

        case GET_FINAL_EXPENDITURE:
            return{
                ...state,
                finalExpenditure: payload
            }

        case POST_OPERATION:
            return{
                ...state
            }

        case DELETE_OPERATION:{
            return{
                ...state
            }
        }

    case FILTER_TYPE:
        // const allOperations = state.copyOperations; 
        // const statusFilter = payload === "All" ? allOperations :
        // allOperations.filter(el => el.type.toLowerCase()  === payload );
        return{
            ...state,
            operations: payload,
        }

    case FILTER_CATEGORY:
        return{
            ...state,
            operations: payload,
        }

    case GET_ID_OPERATION:
        return{
            ...state,
            operationId: payload,
        }

    case ORDER_BY_DATE:
        if(payload === "near"){
            const orderDate = state.operations.sort(function(a,b){
                if(new Date(a.date) > new Date(b.date) ){
                    return -1;
                }
                if(new Date(a.date) < new Date(b.date) ){
                    return 1;
                }
                return 0;
            });
            return{
                ...state,
                operations : orderDate,
            }
        }else if(payload === "far"){
            const orderDate = state.operations.sort(function(a,b){
                if(new Date(a.date) < new Date(b.date) ){
                    return -1;
                }
                if(new Date(a.date) > new Date(b.date) ){
                    return 1;
                }
                return 0;
            });
            return{
                ...state,
                operations : orderDate,
            }
        }
        const orderDate = state.operations
        return{
            ...state,
            operations : orderDate
        }


        default: return state;
    }
}


export default reducer;
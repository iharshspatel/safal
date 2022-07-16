import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    CLEAR_ERRORS

} from "../constants/userConstants"

export const userReducer = (state = {user:{}}, action)=>{

    switch (action.type){
        case LOGIN_REQUEST:
            return{
                loading:true,
                isAuthenticated:false
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload
            }
        case LOGIN_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                error:action.payload
            }
        case REGISTER_USER_REQUEST:
            return{
                loading:true,
                isAuthenticated:false
            }
        case REGISTER_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload
            } 
        case REGISTER_USER_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                error:action.payload
            }  
        case LOAD_USER_REQUEST:
            return{
                loading:true,
                isAuthenticated:false
            }
        
        case LOAD_USER_SUCCESS:
            return{
                loading:false,
                isAuthenticated:true,
                user:action.payload
            }
        
        case LOAD_USER_FAIL:
            return{
                loading:false,
                isAuthenticated:false,
                error:action.payload
            }
        
        
           

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        
        default:
            return state;
    }
} 
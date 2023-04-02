import { User_Submit } from "./Type";
import { User_Delete } from "./Type";
import { User_Edit } from "./Type";
import { User_Index } from "./Type";

export const userSubmit = (data) =>{
    return{
        type:User_Submit,
        payload: data
    }
};
export const userDelete = (data) =>{
    return{
        type:User_Delete,
        payload: data
    }
};
export const userEdit = (data) =>{
    return{
        type:User_Edit,
        payload: data
    }
};
export const userIndex = (data) =>{
    return{
        type:User_Index,
        payload: data
    }
};
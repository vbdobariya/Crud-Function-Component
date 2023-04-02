import { User_Submit } from "./Type";
import { User_Delete } from "./Type";
import { User_Edit } from "./Type";
import { User_Index } from "./Type";

const initialstate = {
    data:[],
    UserEdit:{},
    UserIndex:'',
}

const onSubmitReducer = (state = initialstate, action) => {
    console.log("reducerstate----->", state)
    console.log("reduceraction----->", action)
    switch (action.type) {
        case User_Submit:
            return {
               ...state,
                data: action.payload
            }
        case User_Delete:
            return {
               ...state,
                data: action.payload
            }
        case User_Edit:
            return {
               ...state,
                UserEdit: action.payload
            }
        case User_Index:
            return {
               ...state,
                UserIndex: action.payload
            }
            default: 
                return initialstate
        }
}

export default onSubmitReducer;
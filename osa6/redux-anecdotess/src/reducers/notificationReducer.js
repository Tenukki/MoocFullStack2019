export const setMessageAction = (message) =>{
    return{
        type: "SET_MESSAGE",
        message
    }
}

const noteReducer = (state = "", action) => {
    switch(action.type){
        case "SET_MESSAGE":
            return action.message
        default:
            return state
    }

}

export default noteReducer
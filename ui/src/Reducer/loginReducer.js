
export default function loginReducer(state,action){
    switch (action.type){
        case "LOGIN":
            console.log("Reducer..")
            return {
                ...state,status:"Login successfully"
            }

        case "SIGN_UP_SUCCESS":
            if(action.payload.failure){
                return {
                    ...state,
                    signUpsuccess:false,
                    signUpFailure:action.payload.failure
                }
            }else{
                return {
                    ...state,
                    signUpsuccess:true,
                    signUpFailure:{}
                }
            }
            

        default:
            return {...state}
    }
}
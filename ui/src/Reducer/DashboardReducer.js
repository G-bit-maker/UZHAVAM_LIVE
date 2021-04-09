
export default function profileReducer(state,action){
    console.log(action.type)
    switch (action.type){
        case "ADD_REMOVE_CATEGORY":
            if(action.flag === "Add"){
                let list = state.productList || []
                list.push(action.payload.list ? action.payload.list[0] : null)
                return {
                    ...state,
                    productList:list || []
                }
            }else if(action.flag === "Remove"){
                let list = state.productList || []
                list.push(action.payload.list ? action.payload.list[0] : null)
                return {
                    ...state,
                    productList:list || []
                }
            }
            
        case "GET_USER_DETAILS":
            return {
                ...state,
                userDetails:action.payload || ""
            }
        case "GET_PRODUCT_DETAILS":
            return {
                ...state,
                productDetails:action.payload || ""
            }
        case "GET_PRODUCT_LIST":
            return {
                ...state,
                productList:action.payload.list || [],
                at:Math.random()

            }
        case "GET_CATEGORY":
            return {
                ...state,
                categoryList:action.payload.list ? action.payload.list : []
            }
        case "GET_USER_LIST":
            console.log(action.payload)
            return {
                ...state,
                userList:action.payload.list ? action.payload.list : []
            }

        default:
            return {...state}
    }
}
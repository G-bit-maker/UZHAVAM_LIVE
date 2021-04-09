import UserApi from "../Api/UserApi"

export function addressSelect(addressList){
    return function(dispatch){
            dispatch({type:"SELECT_ADDRESS",addressList})
    } 
}

export function getCategory(){
    return function(dispatch){
        UserApi.getCategoryApi()
        .then((res)=>{
            dispatch({type:"GET_USER_CATEGORY",payload:res})
            return res
        })
    } 
}

export function placeOrder(id){
    return function(dispatch){
        return UserApi.placeOrderApi(id)
        .then((res)=>{
            return res
        })
    } 
}

export function getCartDetails(){
    return function(dispatch){
        UserApi.getCartDetailsApi()
        .then((res)=>{
            dispatch({type:"GET_CART_DETAILS",payload:res})
            return res
        })
    } 
}

export function getAddressList(){
    return function(dispatch){
        UserApi.getAddressListApi()
        .then((res)=>{
            dispatch({type:"GET_ADDRESS_LIST",payload:res})
            return res
        })
    } 
}

export function getProductList(id){
    return function(dispatch){
        UserApi.getProductListApi(id)
        .then((res)=>{
            let userCart = res.userCart
            let details = res.list
            if(details && details.length !== 0){
                if(userCart && userCart.length !==0){
                    userCart.map((data)=>{
                        let i = details.findIndex(x=>x._id === data.productId)
                        if(i !== -1 ){
                            details[i].count = data.count
                        }
                    })
                }
                dispatch({type:"GET_USER_PRODUCT_LIST",payload:details,cartList:userCart})
            }else{
                dispatch({type:"GET_USER_PRODUCT_LIST",payload:details})
            }



            
            return res
        })
    } 
}

export function cartUpdate(id,c){
    return function(dispatch){
        UserApi.cartUpdateApi(id,c)
        .then((res)=>{
            //dispatch({type:"UPDATE_USER_CART",payload:res,id,c})
            //if(c==0){
                dispatch(getCartDetails())
            //}
            return res
        })
    } 
}

export function addressSave(data){
    console.log("Action",data)
    return function(dispatch){
        return UserApi.addressSaveApi(data)
        .then((res)=>{
            if(res.success){
                dispatch(getAddressList())
            }
            return res
        })
    } 
}
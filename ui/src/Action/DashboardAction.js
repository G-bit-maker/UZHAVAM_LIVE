import DashboardApi from "../Api/DashboardApi"

export  function addUser(data){
    return function(dispatch){
        return DashboardApi.addUserApi(data)
        .then((res)=>{
            alert("Success")
            //dispatch({type:"ADD_REMOVE_CATEGORY",payload:res})
            return res
        })
    } 
}
export  function getUserDetails(id){
    return function(dispatch){
        return DashboardApi.getUserDetailsApi(id)
        .then((res)=>{
            dispatch({type:"GET_USER_DETAILS",payload:res.list ? res.list[0] : {}})
            return res
        })
    } 
}
export  function userRemoveAct(id){
    return function(dispatch){
        return DashboardApi.userRemoveApi(id)
        .then((res)=>{
            dispatch(getUserList())
            return res
        })
    } 
}
export  function AddCategory(data,flag,id){
    return function(dispatch){
        return DashboardApi.SaveCategoryApi(data,flag,id)
        .then((res)=>{
            dispatch(getCategory())
            dispatch({type:"ADD_REMOVE_CATEGORY",payload:res,flag})
            return res
        })
    } 
}
export function getCategory(){
    return function(dispatch){
        DashboardApi.getCategoryApi()
        .then((res)=>{
            console.log(res)
            dispatch({type:"GET_CATEGORY",payload:res})
            return res
        })
    } 
}
export function addProductDetails(data){
    return function(dispatch){
        return DashboardApi.addProductApi(data)
        .then((res)=>{
            if(res.success){
               alert("Product added successfully")
            }
            return res
        })
    } 
}
export function productRemove(id){
    return function(dispatch){
        return DashboardApi.productRemoveApi(id)
        .then((res)=>{
            if(res.success){
                dispatch(getProductList())
               alert("Product removed successfully")
            }
            return res
        })
    } 
}
export function getProductDetails(id){
    return function(dispatch){
        if(id && id != "Add"){
            DashboardApi.getProductDetailsApi(id)
            .then((res)=>{
                dispatch({type:"GET_PRODUCT_DETAILS",payload:res.product })
            })
        }else{
            dispatch({type:"GET_PRODUCT_DETAILS",payload:""})
        }
        
    } 
}
export function getProductList(){
    return function(dispatch){
        DashboardApi.getProductlistApi()
        .then((res)=>{
            dispatch({type:"GET_PRODUCT_LIST",payload:res})
        })
    } 
}
export function getUserList(){
    return function(dispatch){
        DashboardApi.getUserListApi()
        .then((res)=>{
            dispatch({type:"GET_USER_LIST",payload:res})
        })
    } 
}
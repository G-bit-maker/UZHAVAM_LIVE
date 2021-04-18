import axios from "./api"
import qs from "qs";
import urls from "./urls"

class UserApi{
    static getCartDetailsApi(){
        return axios.get(urls.getCartDetails)
    }   
    static getAddressListApi(){
        return axios.get(urls.getAddressList)
    }   
    static getOrderListApi(userType){
        return axios.get(urls.getOrderList[userType])
    }   
    static getProfileDetailApi(id){
        return axios.get(urls.getProfileDetails[id ? "Admin" : "User"],{params:{userId:id}})
    }   
    static orderStatusChangeApi(data){
        return axios.put(urls.orderStatus,qs.stringify(
            data
        ))
    }   
    static onProfileDetailsSaveApi(data){
        return axios.put(urls.profileDetailSave[data.userId ? "Admin" : "User"],qs.stringify(
            data
        ))
    }   
    static getOrderByIdApi(id,userType){
        return axios.get(urls.getOrderById[userType],{params:{orderId:id}})
    }   
    static getCategoryApi(data){
        return axios.get(urls.getCategoryForUser)
    }   
    static getProductListApi(id){
        return axios.get(urls.getProductForUser,{params:{id:id}})
    }   
    static cartUpdateApi(id,i,price){
        return axios.post(urls.updateCart ,qs.stringify({
            productId:id,count:i,price
        }) )
    }   
    static addressSaveApi(data){
        return axios.post(urls.addressSave ,qs.stringify(
            data
        ) )
    }   
    static placeOrderApi(id){
        return axios.post(urls.placeOrder ,qs.stringify(
            {addressId:id}
        ) )
    }   
}

export default UserApi;
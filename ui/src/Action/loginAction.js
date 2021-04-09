import LoginApi from "../Api/loginApi"
import session from "../session"

export function login(data){
    return function(dispatch){
        return LoginApi.login(data)
        .then((res)=>{
            console.log(res)
            if(res.success){
                session.setCookie("UserType",data.userName === "Admin" ? "Admin" : "User",30)
                session.setCookie("TOKEN",res.token,30)
                window.location = data.userName === "Admin" ? "/Dashboard" : "/User/Dashboard"
            }
            dispatch({type:"LOGIN",payload:res})
            return res
        })
    } 
}

export function signUp(data){
    return function(dispatch){
        return LoginApi.signUp(data)
        .then((res)=>{
            console.log(res)
            dispatch({type:"SIGN_UP_SUCCESS",payload:res})
            if(res.success){
                session.setCookie("UserType",data.userName === "Admin" ? "Admin" : "User",30)
                session.setCookie("TOKEN",res.token,30)
                window.location = "/User/Dashboard"
            }
            return res
        })
    } 
}
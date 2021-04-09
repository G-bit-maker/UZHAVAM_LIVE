import axios from "./api"
import qs from "qs";
import urls from "./urls"

class LoginApi{
    static signUp(data){
        let d = qs.stringify(data)
        return axios.post("/user/signUp",d)
    }
    static login(data){
        console.log(data)
        let url = data.userName === "Admin" ? urls.adminLogin : urls.userLogin
        return axios.post(url,qs.stringify(data))
    }
}

export default LoginApi;
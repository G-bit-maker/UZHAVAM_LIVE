
import axios from "axios";
import session from "../session";

const api = axios.create()
api.interceptors.response.use(
    function(res){
        return res.data
    },function(error){
        if (
            error &&
            error.response &&
            (error.response.status === 401 || error.response.statusText === "Unauthorized")
        ){
            session.delteCookies()
            window.open("/Login", "_self");
        }
    }
)
api.interceptors.request.use(
    function(res){
        const AUTH_TOKEN = session.getCookie("TOKEN")
        if(AUTH_TOKEN){
            res.headers["Accept"] = "application/json";
            res.headers["Content-Type"] = "application/x-www-form-urlencoded";
            res.headers["Authorization"] = AUTH_TOKEN;
        }
        return res
    }
)
export default api 
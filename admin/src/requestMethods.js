import axios from "axios";

const BASE_URL ="http://localhost:5000/api/"

const TOKEN = () =>{
    if (localStorage?.getItem("persist:root")){
        if(JSON?.parse(JSON.parse(localStorage?.getItem("persist:root"))?.user)?.currentUser?.accessToken){
            return JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken
        }else {
            return ''
        }
    } else {
        return ''
    }
}

export const publicRequest = axios.create({
    baseURL:BASE_URL
})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN()}`}
})


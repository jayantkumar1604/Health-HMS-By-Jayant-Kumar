import axiosInstance from "../Interceptor/Axiosinterceptor"

const registerUser=async(user: any) =>{
    return axiosInstance.post('user/registerUser',user)
        .then((response:any)=>response.data)
        .catch((error:any)=>{throw error;})
}
export {registerUser};

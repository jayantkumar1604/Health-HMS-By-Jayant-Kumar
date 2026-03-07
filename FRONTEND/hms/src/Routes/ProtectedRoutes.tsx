import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import AdminDashboard from "../Layout/AdminDashboard";
import Random from "../Components/Random";

interface ProtectedRouteProps{
    children:JSX.Element
}

const ProtectedRoute:React.FC<ProtectedRouteProps>=({children})=>{
    const token=useSelector((state:any)=>state.jwt)
    if(token){
        return children;

    }
    return <Navigate to="/login"/>
}
export default ProtectedRoute;


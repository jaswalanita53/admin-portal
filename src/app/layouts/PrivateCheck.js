import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import StudioHeader from "../../components/StudioHeader/Header";


const PrivateCheck = () => {
    const navigate = useNavigate();
    const isLoginSession = sessionStorage.getItem("isLogin");
    const path = window.location.pathname;
    console.log("path", path)
    // const pathCheced = 

    useEffect(() => {
        if (isLoginSession === null) {
            navigate("/");
        }
    }, [])

    return (
        <>
            {isLoginSession &&
                <>
                    {path === "/studio/dashboard" ?
                        <StudioHeader /> :
                        <Header />}
                    <Outlet />
                </>
            }
        </>

    )

}


export default PrivateCheck;

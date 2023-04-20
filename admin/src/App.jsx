import "./App.css";
import Home from "./pages/Home";

import {
    BrowserRouter as Router,
    Switch,
    Route,

    Redirect,
    Routes, Navigate,
} from 'react-router-dom'
import NewProduct from "./pages/newProduct/NewProduct";
import Product from "./pages/product/Product";
import Login from "./pages/login/Login";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {publicRequest, userRequest} from "./requestMethods";
import {logOut} from "./redux/userRedux";


function App() {

    // const admin = () =>{
    //     if (JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin){
    //       return  true
    //     }else {
    //         return false
    //     }
    // }


    // useEffect(()=>{
    //     setAdmin(
    //         JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.isAdmin ?
    //         JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.isAdmin :
    //         false
    //     )
    //     console.log(admin)
    // },[JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.isAdmin])


    const userAdmin = useSelector(state => state.user.currentUser?.isAdmin)
    const userId = useSelector(state => state.user.currentUser?._id)
    const dispatch = useDispatch()

    useEffect(()=>{
        const isTokemnVerified = async () => {
            try {
                const res = await userRequest.get(`/user/find/${userId}`)
                console.log(res.data)
            }catch (err){
                console.log('token not valid')
                logOutt()
            }
        }
        userAdmin && isTokemnVerified()
    },[])

    const logOutt = async () =>{
        await dispatch(
            logOut()
        )
        console.log('user logged out')
    }

    return (
        <Router>
                    <Routes>
                        <Route exact path="/" element={
                            userAdmin ?
                                <Home />
                                : <Navigate to={"/login"} />

                        }/>

                        <Route exact path="/newProduct" element={
                            userAdmin ?
                                <NewProduct />
                                : <Login />
                        }/>

                        <Route exact path="/product/:id" element={
                            userAdmin ? <Product /> : <Login />
                        }/>

                        <Route exact path="/login" reloadDocument element={
                            userAdmin !== true
                               ? <Login />
                                : <Navigate to={"/"} />
                        }/>

                        />
                    </Routes>

        </Router>
    );
}

export default App;

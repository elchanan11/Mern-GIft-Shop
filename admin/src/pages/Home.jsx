import React, {useEffect} from 'react'
import './home.css'
import Navbar from "../components/Navbar";
import ProductList from "./productList/ProductList";
import {getAuth,signOut} from "firebase/auth";
export default function CategoryItem(props) {

    // useEffect(()=>{
    //     const auth = getAuth();
    //     signOut(auth).then(() => {
    //         console.log("Sign-out successful.")
    //     }).catch((error) => {
    //         // An error happened.
    //     });
    //
    // },[])

    return (
        <div className={"home"}>
            <Navbar />
            <ProductList />
        </div>
    )
}
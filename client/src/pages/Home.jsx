import React, {useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";

import Announcment from "../components/Announcment";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../components/Footer";
import {Fab} from "@mui/material";
import {WhatsApp} from "@mui/icons-material";
import BgImage from "../components/BgImage";
import Newsletter from "../components/NewsLetter";
import MainCategories from "../components/MainCategories";
import SliderEx from "../components/SliderEx";
import {Helmet} from "react-helmet";
import styled from "styled-components";

const MainContent = styled.main`

`

const SkipTOMainContent = styled.div`
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  background:white;
  font-weight: bold;
  display: block;
  padding: 10px;
  &:focus{
    position: static;
    z-index: 101;
    width: 100px;
    height: 100px;
    overflow: visible;
  }
`

export default function Home(){
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    },[])

    return(
        <div >
            <Helmet>
                <title>המסיבה שלי - עמוד הבית</title>
                <meta
                    name={"description"}
                    content={"about us and register to our news lwtter"}
                />
                <link rel={"canonical"} href={"/"}/>
            </Helmet>
            <Announcment />
            <header>
                <SkipTOMainContent>
                    <a href={"#content"}>לחץ למעבר מהיר לרשימת הקטגוריות</a>
                </SkipTOMainContent>
                <Navbar home={"home"}/>
            </header>
            {/*<Slider />*/}
            <SliderEx />
            <MainContent id={"content"}>
                <MainCategories  />
            </MainContent>
            <Products cat={"Reccomanded"} from={'home'}/>
            <Newsletter />
            <footer>
                <Footer />
            </footer>
            <Fab size="large" color="secondary" aria-label="add"  style={{background:"white",color:"green",cursor:"pointer",zIndex:100, position:"fixed",bottom: 40,left:10}}>
                <WhatsApp style={{width:"70%",height:"70%"}} onClick={()=>{
                    let postMessageToWatapp = "שלום אני מהאתר"
                        let url = `https://wa.me/+972539323849?text=${postMessageToWatapp}`;

                    window.open(url);}} />
            </Fab>

        </div>
    )
}

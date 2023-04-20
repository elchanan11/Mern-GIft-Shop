import Navbar from "./Navbar";
import React from "react";
import styled from "styled-components";

const Container = styled.h1`
  background-color: #F2CD5C;
  color: black;
  
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  position: sticky;
  top: 0px;
  z-index: 4;
`


export default function Announcment(){
    return(
        <Container  lang="he">
          !ניתן להזמין בלונים מראש ולבוא לאסוף
        </Container>
    )
}
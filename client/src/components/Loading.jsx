import React from "react";
import styled from "styled-components";
import {CircularProgress, LinearProgress} from "@mui/material";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color:  #${props=> props? props.color : "f3ecec"};
  z-index: 100;
  position: absolute;
  
`
const LoadContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`

const Loading = (props) => {
    return(
        <>
            <Container color={props.color}>
                <LoadContainer>
                    <CircularProgress  color="inherit"/>
                </LoadContainer>
            </Container>
        </>
    )
}
export default Loading
import React from "react";
import styled from "styled-components";
import {leptop, mobile, tablet} from "../responsive";
import {Link} from "react-router-dom";
import './newsLetter.css'
//
// const Container = styled.div`
//   width: 150px;
//   height: 200px;
//   background-color: rgb(248, 248, 223);
//   flex-direction: column;
//   position: relative;
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//
//   height: 200px;
//
//
//   margin-top: 0px;
//
//   margin-bottom: 15px;
//   padding-left: 0%;
//   margin-right: 20px;
//   margin-left: 20px;
//
// `
// const Image = styled.img`
//   width: 155px;
//   height: 200px;
//   max-height: 100%;
//
//   border: none;
//   border-radius: 0;
//   box-shadow: 0px 0px 8px 1px rgb(196 196 196 / 50%);
//   transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
//
//   flex: 1;
// `
const Info = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

 `
// const Title = styled.h1`
//   width: 155px;
//   max-height: 100%;
//   height: 50px;
//   padding: 0;
//   margin: 0;
//   line-height: 1;
//   font-size: 20px;
//   font-weight: 600;
//   color: wheat;
//   position: absolute;
//   bottom: 0;
//   text-align: center;
//   justify-content: center;
//   background-color: black;
//   opacity: 0.6;
// `
//



const Container = styled.div`
  //background-color: rgb(248, 248, 223);
  background-color: #f3f1ef;
  flex-direction: column;
  flex-basis: 30.333333%;
  position: relative;

  display: flex;
  align-items: center;
  height: 200px;
  border-style: solid;
  border-width: 1px;
  border-color: #f3f1ef;
  //border-radius: 10px 10px 10px 10px;
  //box-shadow: 0px 0px 8px 1px rgb(196 196 196 / 50%);
  transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
  margin-top: 0px;

  margin-bottom: 8px;
  padding: 0;

  ${tablet({height: "175px"})}
  ${leptop({height: "175px"})}
  ${mobile({height: "115px", marginBottom: "15px"})}
`

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  max-height: 100%;
  border-radius: 10px 10px 10px 10px;
  background-color: #F2CD5C;
  box-shadow: 0px 0px 8px 1px rgb(196 196 196 / 50%);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex: 1;
  transition: transform 0.5s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  ${tablet({height: "120px", width: "120px"})}
  ${leptop({height: "120px", width: "120px"})}
  ${mobile({height: "100px", width: "100px"})}
`

const Image = styled.img`
  width: 100px;
  height: 100px;
  max-height: 100%;
  top: 0;
  bottom: 0;
  
  ${tablet({height: "70px", width:"70px"})}
  ${leptop({height: "70px", width:"70px"})}
  ${mobile({height:"50px",width:"50px"})}
`

const Title = styled.div`
  padding: 0;
  margin: 0;
  height: 15px;
  line-height: 1;
  font-size: 20px;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  justify-content: center;
  color: black;
  font-weight: 600;
  ${tablet({fontSize:"20px"})}
  ${leptop({fontSize:"20px"})}
  ${mobile({fontSize:"16px"})}
`

export default function MainCategoryItem(props){
    console.log(props.item.cat)
    return(
        <Container className={"lineUp"}>
            <Link to={
                '/subCategory/'+props.item.cat}
                  state={{title: props.item.title}}
                  style={{textDecoration: 'none'}}
                  aria-label={`קטגוריה ${props.item.title} `}
            >
                <ImageContainer>
                    <Image src={props.item.img} alt={""}/>
                </ImageContainer>
                {/*<Info>*/}
                    <Title className={"lineUp"} >{props.item.title}</Title>

                {/*</Info>*/}
            </Link>
        </Container>
    )
}
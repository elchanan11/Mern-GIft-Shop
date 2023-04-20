import React from "react";
import styled from "styled-components";
import {categoryData, mainCategories} from '../data'
import CategoryItem from "./CategoryItem";
import {leptop, mobile} from "../responsive";
import {WhatsApp} from "@mui/icons-material";
import {Fab} from "@mui/material";
import MainCategoryItem from "./MainCategoryItem";
import './newsLetter.css'

const Container = styled.div`

  text-align: center;
  align-items: center;
  padding: 0;
  margin: 0;
  //background-color: rgb(248, 248, 223);
  background-color: #f3f1ef;
  padding-bottom: 60px;
  padding-top: 40px;
  ${leptop({paddingLeft: '170px',paddingRight: '170px',paddingBottom:0})}
`

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  
  ${mobile({padding: '0px'})}
`
const CategoryTitle = styled.h1`
  color: black;
  text-align: center;
  align-items: center;
  font-size: 35px;
  margin-bottom: 50px;
  padding-top: 20px;
  
`

export default function MainCategories(){
    return(
        <Container >

            <CategoryTitle >
                קטגוריות מוצרים
            </CategoryTitle>
                <Wrapper>
                    { mainCategories.map(item=>(
                        <MainCategoryItem item={item} key={item.id} />
                    ))}
                </Wrapper>
        </Container>

    )
}
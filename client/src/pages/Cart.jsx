import {Add, DeleteOutline, Mail, Remove, WhatsApp} from "@mui/icons-material";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Announcment from "../components/Announcment";
import {mobile, tablet} from "../responsive";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {deleteProducts,deleteOneProduct} from "../redux/cartRedux";


import {useEffect, useState} from "react";
import {addProduct} from "../redux/cartRedux";
import CartItem from "../components/CartItem";
import {Helmet} from "react-helmet";
import React from "react";

const Container = styled.div`
  background-color: #f3ecec;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({padding: "10px"})}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({display: "none"})}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({flexDirection: "column"})}
  ${mobile({flexDirection: "column"})}
`;

const Info = styled.div`
  flex: 3;
`;



const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  text-align: right;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const IconConainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Icon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
`
const Note = styled.p`
  text-align: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 20;
  padding-top: 5px;
  color: gray;
`
const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;


const Cart = () => {

    const dispatch = useDispatch()
    let productNum = 0

    const cart = useSelector(state=>state.cart)

    let productName = []
    let postMessageToWatapp = "שלום אני מהאתר ואני מעוניין ב "


    useEffect(()=>{
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    },[])

    const handleWhatsAppClick = () => {

        cart.products.map((productItem)=> {
            productName.push(productItem.title)
        })

        console.log(productName)
//         let url = `https://wa.me/send?phone=${+972539323849}`;
// //  Appending the message to the URL by encoding it
//         url += `&text=${encodeURI(` ${postMessage + " "+productName} ` )}&app_absent=0`;

        let url = `https://wa.me/+972539323849?text=${postMessageToWatapp+productName}`

        window.open(url);
        productName = []
    }

    const  handleRestCart = () =>{
        dispatch(
            deleteProducts()
        )
    }

    return (
        <Container>
            <Helmet>
                <title>המסיבה שלי - עמוד סל קניות</title>
                <meta
                    name={"description"}
                    content={"our cart page"}
                />
                <link rel={"canonical"} href={"/cart"}/>
            </Helmet>
            <Announcment />
            <Navbar />
            <Wrapper>
                <Title>הסל שלך</Title>
                <Top>
                    <Link to={"/"}>
                        <TopButton>המשך לקנות</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>סל({cart.quantity})</TopText>

                    </TopTexts>
                    <TopButton type="filled" onClick={handleRestCart}>אפס סל</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((productItem,index)=>(
                            <CartItem cartItem={productItem} key={index} index={index}/>

                        ))}
                        <Hr />
                    </Info>
                    <Summary>
                        <SummaryTitle>סיכום הזמנה</SummaryTitle>
                        <SummaryItem>

                            <SummaryItemPrice>₪ {cart.totalDiscount }</SummaryItemPrice>
                            <SummaryItemText>:הנחה</SummaryItemText>
                        </SummaryItem>

                        <SummaryItem type="total">
                            <SummaryItemPrice>₪ {cart.total > 0 ? cart.total : 0}</SummaryItemPrice>
                            <SummaryItemText>:סך הכל</SummaryItemText>
                        </SummaryItem>
                        <IconConainer>
                            <Icon color={'82CD47'} onClick={handleWhatsAppClick}>
                                {<WhatsApp fontSize={"large"}/>}
                            </Icon>
                            <Icon color={'E60023'}>
                                {<Mail fontSize={"large"}/>}
                            </Icon>
                        </IconConainer>
                        <Note>
                            לחץ על אחד הכפתורים לתשלום במייל\וואצאפ*
                        </Note>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    );
};

export default Cart;
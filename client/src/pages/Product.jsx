import {Add, Remove, ShoppingCartOutlined, WhatsApp} from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {mobile, tablet} from "../responsive";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {publicRequest} from "../requestMethods";
import {addProduct} from "../redux/cartRedux";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../components/Loading";
import {useMemo} from "react";
import ProductItem from "../components/ProductItem";
import React from "react";
import {Helmet} from "react-helmet";

const Container = styled.div`
  background-color: #f3ecec;
  
`;

const OtherProductsContainer = styled.div`

  text-align: center;
  align-items: center;
  padding: 0;
  margin: 0;
  background-color: #fae8e8;

`
const OtherProductsWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
`;

const RecomanedProducts = styled.h1`
  font-size: 35px;
  font-weight: 600;
  margin-top: 40px;
  padding: 20px;
  padding-top: 40px;
`


const Wrapper = styled.div`
  padding: 50px;
  display:${props => (props.display === "true" ? "flex" : `none`)};
  ${mobile({flexDirection: 'column', padding: "10px"})}

`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: gray;
  text-align: center;
  font-size: 12px;
  justify-content: flex-start;
  
`;

const ImageNote = styled.span`
  
`

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  height: 400px;
  
  ${mobile({height: '80%'})}
`;
const InfoAndIconContainer = styled.div`
    display: flex;
  flex: 0.5;
  justify-content: flex-start;
  align-items: center;
    flex-direction: column;
    ${mobile({flexDirection:"column"})}
`

const InfoContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  ${mobile({padding: '10px'})}
  ${tablet({padding:0})}

`;

const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  font-size: 35px;
  padding-top: 15px;
`;

const Desc = styled.p`
  margin: 20px 0px;
  text-align: center;
  font-weight: 600;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 25px;
  text-align: center;
  text-decoration: line-through;
`;

const UpdatedPrice = styled.span`
  font-weight: 100;
  font-size: 40px;
  text-align: center;
  
`;


const UpdatedPriceText = styled.span`
  font-weight: 100;
  font-size: 15px;
  text-align: center;
  direction: rtl;
`;

const PriceContainer = styled.span`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
`;


const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.5;
  bottom: 0;
  padding-top: 20px;
  ${mobile({justifyContent: "center"})}
`

const Icon = styled.div`
  width: 50px;
  height: 50px;
  color: white;
  display: flex;
  margin: 5px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background-color: #${props=>props.color};
  border-radius: 50%;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const Product = () => {

    const location = useLocation()
    const cart = useSelector(state=>state.cart)
    const productId = location.pathname.split('/')[2]
    const [product,setProduct] = useState({})
    const [pageLink,setPageLink] = useState(null)
    const [quantity,setQuantity] = useState(1)
    const dispatch = useDispatch()
    const [productName,setProductName] = useState("")
    const [otherProducts,setOtherProducts] = useState([])
    let postMessageToWatapp = "שלום אני מהאתר ואני מעוניין ב "
    const [imageIsLoaded,setImageIsLoaded] = useState(false)



    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(`/product/find/${productId}`)
                setProduct(res.data)
            }catch (err){
                console.log(err)
            }
        }
        getProduct()
    },[productId])

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        setPageLink(window.location.href)
        console.log(pageLink)
    },[productId])

    useEffect(()=>{
       const getOtherProducts = async () =>{

           if (product?.category){
               const productCat = product?.category[0];
               try {
                   const res = await publicRequest.get(
                       product.category && `/product?category=${ product.category[0]}`

                   )
                   setOtherProducts(res.data)
               }catch (err){
                   console.log(err)
               }
           }

       }
       console.log(product)
       getOtherProducts()
    },[product])

    useEffect(()=>{
        setProductName(product.title)
    },[product])

    const handleAddTOCartClick = () => {
        const itemFound = cart.products.some(item=> item._id === product._id)
        if (!itemFound){
            console.log(product)
            dispatch(
                addProduct({product, quantity,price: parseInt(product.price)})
            )
        }
    }

    const handleWhatsAppClick = () => {

        console.log(productName)

        let url = `https://wa.me/+972539323849?text=${postMessageToWatapp+ productName +`  \n` + pageLink}`

        window.open(url);

        setProductName("")
    }

    const handleImageLoded = () => {
        setImageIsLoaded(
            true
        )
    }

    return (
        <>
            <Container>
                <Helmet>
                    <title>המסיבה שלי - עמוד מוצר</title>
                </Helmet>
                <Announcement />
                <Navbar />
                {!imageIsLoaded && <Loading color={"f3ecec"}/>}
                <Wrapper display={imageIsLoaded.toString()}>
                    <ImgContainer>
                        <Image src={product.img} onLoad={handleImageLoded} alt={product.title}/>
                        <ImageNote>
                            *התמונה להמחשה בלבד
                        </ImageNote>
                    </ImgContainer>
                    <InfoAndIconContainer>
                        <InfoContainer>
                            <Desc style={{margin:"5px", color:"red"}}>
                                {!product.inStock && "חסר במלאי"}
                            </Desc>
                            <Title style={{direction:"rtl"}}>{product.title}</Title>
                            <Desc style={{direction:"rtl"}}>
                                {product.desc}
                            </Desc>
                            {
                                product?.price === product.updatedPrice ?
                                    <UpdatedPrice>₪ {product?.price}</UpdatedPrice> :
                                    <PriceContainer>
                                        <Price>₪{product?.price}</Price>
                                        <UpdatedPrice>₪ {product?.updatedPrice}</UpdatedPrice>
                                    </PriceContainer>

                            }

                            {
                                product?.price !== product.updatedPrice &&
                                    <UpdatedPriceText>
                                        שימו ❤️ מוצר במבצע!
                                    </UpdatedPriceText>
                            }
                            <AddContainer>
                                <AmountContainer>

                                </AmountContainer>
                            </AddContainer>
                        </InfoContainer>

                        <IconContainer>
                            <Icon color={"7DCE13"} onClick={handleWhatsAppClick}>
                                <WhatsApp/>
                            </Icon>
                            <Icon color={"0002A1"} onClick={handleAddTOCartClick}>
                                <ShoppingCartOutlined />
                            </Icon>
                        </IconContainer>
                        <Desc style={{margin:"5px", color:"red"}}>
                            {!product.inStock && "חסר במלאי"}
                        </Desc>
                    </InfoAndIconContainer>
                </Wrapper>
                {
                    otherProducts.length > 1
                    &&
                    <OtherProductsContainer>
                        <RecomanedProducts>
                            מומלצים עבורך
                        </RecomanedProducts>
                        <OtherProductsWrapper>
                            {
                                otherProducts.filter(item=>item._id!==productId).slice(0,2).map(
                                    (productItem,index)=>(
                                        <ProductItem key={productItem._id} item={productItem} id={productItem._id} />
                                    ))
                            }
                        </OtherProductsWrapper>
                    </OtherProductsContainer>
                }
                {
                    imageIsLoaded && <Footer />
                }
            </Container>
        </>

    );
};

export default Product;
import {productData} from "../data";
import React, {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import axios from "axios";
import {publicRequest} from "../requestMethods";
import {mobile} from "../responsive";
import Loading from "./Loading";

const Container = styled.div`

  text-align: center;
  align-items: center;
  padding: 0;
  margin: 0;
  background-color: #fae8e8;

`

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
`
const NoProductsContainer = styled.span`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`

const NoProducts = styled.span`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`

const CategoryTitle = styled.h1`
  color: black;
  text-align: center;
  align-items: center;
  font-size: 35px;
  margin-bottom: 20px;
  padding-top: 20px;
  
`

const InputWrapper = styled.div`
  margin: 5px 20px;
  display: flex;
  text-align: right;
  ${mobile({margin: '2px 20px'})}
`
const Input = styled.input`
  background-color: #fae8e8;
  width: 100px;
  height: 35px;
  color: black;
  border: 1px solid gray;
  text-align: right;
  
`

export default function Products(props){
    const [products,setProducts] = useState([])
    const [fetchingProducts,setFetchingProducts] = useState(false)
    const [updatedProducts,setUpdatedProducts] = useState([])
    const [filteredPro,setFilteredPro] = useState([])
    const [query,setQuery] = useState("")
    const [itemsFilter,setItemsFilter] = useState("")

    useMemo(()=>{
        const getProducts = async () => {
            try {
                const res = await publicRequest.get(
                    props.cat ? "/product?category="+props.cat
                        : "/product"
                )
                setProducts(res.data)
                setFetchingProducts(true)
            }catch (err){
                console.log(err)
            }
        }
        getProducts()
    },[props.cat])

    useEffect(()=>{

        if (props.sort==="newest"){
            console.log(props.sort)
            setProducts((prev)=>
                [...prev].sort((a,b) => {return new Date(b.createdAt) - new Date(a.createdAt)})
            )
        }else if (props.sort==="asc"){
            console.log(props.sort)
            setProducts((prev)=>
                [...prev].sort((a,b) => a.price - b.price)
            )
        }else {
            setProducts((prev) =>
                [...prev].sort((a,b) => b.price - a.price)
            )
        }
    }, [props.sort])

    // useEffect(()=>{
    //     console.log(itemsFilter)
    //     setUpdatedProducts(products)
    //     if (itemsFilter !== ""){
    //         updatedProducts.map((item,index) =>{
    //             if (!item.title.includes(itemsFilter)){
    //                 console.log(false)
    //                 updatedProducts.splice(index,1)
    //             }
    //         })
    //     }
    //     console.log(updatedProducts)
    // },[itemsFilter])
    //
    // useEffect(()=>{
    //     setItemsFilter(query)
    // },[query])
    //
    //
    // const handleInputChange = async (e)=>{
    //     await setQuery(e.target.value)
    // }



    return(

        <Container>
            {props.from === 'home' &&
                <CategoryTitle>
                    מוצרים מומלצים
                </CategoryTitle>
            }
            {/*{*/}
            {/*    props.fromProductsList &&*/}
            {/*    <InputWrapper>*/}
            {/*        <Input*/}
            {/*            placeholder={"חפש"}*/}
            {/*            onChange={handleInputChange}*/}
            {/*        />*/}
            {/*    </InputWrapper>*/}
            {/*}*/}
            {
                !fetchingProducts ?
                    <Loading color={"fae8e8"}/> :
                    <Wrapper>
                        {products.length !== 0 ?

                            products.map(
                                productItem=>(
                                    <ProductItem key={productItem._id} item={productItem} />
                                ))
                            :
                            <NoProductsContainer>
                                <NoProducts>
                                    אין כרגע מוצרים זמינים בקטגוריה זו
                                </NoProducts>
                            </NoProductsContainer>
                        }
                    </Wrapper>
            }

        </Container>

    )
}

import React, {useEffect,useState} from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcment from "../components/Announcment";
import Products from "../components/Products";
import Footer from "../components/Footer";
import {mobile} from "../responsive";
import {useLocation, useNavigate} from "react-router-dom";
import {WhatsApp} from "@mui/icons-material";
import {Autocomplete, Fab, TextField} from "@mui/material";
import {subCategiries} from "../data";
import {Helmet} from "react-helmet";

const Container = styled.div`
  background-color: #fae8e8;
`
const Title = styled.h1`
  padding-top: 45px;
  padding-bottom: 35px;
  font-size: 38px;
  margin: 5px;
  right: 0;
  text-align: center;
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
`
const Filter = styled.div`
  margin: 5px 20px;
  display: flex;
  ${mobile({margin: '2px 20px'})}

`
const FilterText = styled.span`
  font-weight: 600;
  font-size: 20px;
  margin-left: 10px;
`
const Select = styled.select`
  background-color: #fae8e8;
  width: 90px;
  height: 40px;
  border: 1px solid #b5b3b3;
`
const Option = styled.option`
  
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
  color: black;
  border: 1px solid gray;
  text-align: right;
  
`

export default function ProductList(){
    const location = useLocation()
    const cat = location.pathname.split('/')[2]
    // const categoryTitle = location.state.title
    const category = subCategiries.filter(item=>{
        return(
            item.cat === cat
        )
    })
    console.log(category)
    const [sort,setSort] = useState("newest")


    const [query,setQuery] = useState("")
    const [itemsFilter,setItemsFilter] = useState("")


    // useEffect(()=>{
    //     window.scrollTo({
    //         top: 0,
    //         left: 0,
    //         behavior: "smooth"
    //     });
    // },[])
    //
    // useEffect(()=>{
    //     setItemsFilter(query)
    // },[query])
    //
    //
    // const handleInputChange = async (e)=>{
    //     await setQuery(e.target.value)
    // }

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    },[])
    const handleSort = (e) =>{
        setSort(e.target.value)
    }

    return(
        <Container>
            <Helmet>
                <title>המסיבה שלי - דף רשימת מוצרים</title>
            </Helmet>
            <Announcment />
            <Navbar />
            <Title style={{direction:"rtl"}}>
                {category[0]?.title}
            </Title>
            <FilterContainer>
                <Filter>
                    <Select onChange={handleSort}>
                        <Option value={'newest'}>
                            חדש ביותר
                        </Option>
                        <Option value={'asc'}>
                           מהנמוך לגבוה
                        </Option >
                        <Option value={'desc'}>
                            מהגבוה לנמוך
                        </Option>
                    </Select>
                </Filter>

                {/*<InputWrapper>*/}
                {/*    <Input*/}
                {/*        placeholder={"חפש"}*/}
                {/*        onChange={handleInputChange}*/}
                {/*    />*/}
                {/*</InputWrapper>*/}
            </FilterContainer>
            <Products cat={cat} sort={sort} fromProductsList={"fromProductsList"}/>
            <Footer />
            <Fab size="large" color="secondary" aria-label="add"  style={{background:"white",color:"green",cursor:"pointer",zIndex:100, position:"fixed",bottom: 40,left:10}}>
                <WhatsApp style={{width:"70%",height:"70%"}} onClick={()=>{
                    let postMessageToWatapp = "שלום אני מהאתר"
                    let url = `https://wa.me/+972539323849?text=${postMessageToWatapp}`;

                    window.open(url);}} />
            </Fab>
        </Container>
    )
}

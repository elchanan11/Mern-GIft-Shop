import {useEffect, useState} from "react";
import CartItem from "./CartItem";
import {mainCategories} from "../data";
import {useSelector} from "react-redux";
import styled from "styled-components";
import SearchItems from "./SearchItems";
import {publicRequest} from "../requestMethods";

const Container = styled.div`
  margin-top: 3px;
  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  text-align: center;
`
const NoProducts = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  
  background-color: whitesmoke;
  text-align: center;
  direction: rtl;
  font-weight: 600;
`
const NoProductsReasult = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  text-align: center;
  direction: rtl;
  font-weight: 300;
`

const Title = styled.h1`
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export default function SearchReasult(props){

    const cart = useSelector(state=>state.cart)
    const [searchedProducts,setSearchedProducts] = useState([])
    const [noProducts,setNoProducts] = useState(true)

    useEffect(()=>{
        const handleSearch = async () =>{
            try {
                const res = await publicRequest.get('product/search?filter='+props.serchText)
                console.log(res.data)
                setSearchedProducts(res.data)
                if (res.data.length === 0){
                    setNoProducts(false)
                }else {
                    setNoProducts(true)
                }
            }catch (e) {
                console.log(e)
            }
        }
        if (props.serchText.length > 1){
            handleSearch()
        }
    },[props.serchText])
    return(
        <Container aria-live={"assertive"}>
            <Title>
                תוצאות החיפוש
            </Title>
            {
                !noProducts &&
                <NoProducts>
                    לא הצלחנו למצוא פריטים התואמים:
                    <NoProductsReasult>
                        {"  ` "+props.serchText+" ` "}
                    </NoProductsReasult>
                </NoProducts>
            }
            {searchedProducts.map((productItem,index)=>(
                <SearchItems cartItem={productItem} key={index} index={index}/>
            ))}

        </Container>
    )
}
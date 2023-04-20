import React, {useEffect, useState} from "react";
import styled from "styled-components";
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Logo from '../logo.png'
import './navBar.css'
import {mobile} from "../responsive";
import {categorys} from "../dummyData";
import {CSSTransition} from "react-transition-group";
import {useDispatch} from "react-redux";
import {logOut} from "../redux/userRedux";
import {getAuth, signOut} from "firebase/auth";
import {Clear, Search} from "@mui/icons-material";
import SearchReasult from "./SearchReasult";

const Container = styled.div`
  width: 100%;
  position: sticky;
  height: 120px;
  box-shadow: 0 4px 2px -2px gray;
  background-color: white;
  top: 0;
  z-index: 100;
  min-height: 60px;

  ${mobile({height: '120px'})}
`
const Wrapper = styled.div`
  

  display: flex;
  justify-content: space-between;
  padding: 10px 20px ;
  align-items: center;
  ${mobile({padding: '10px 0'})}
`;
const Left = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  padding: 1px;
  align-items: center;
  justify-content: flex-start;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;


const ReasultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Logo1 = styled.img`
  height: 120px;
  font-weight: bold;
  color: blue;
  cursor: pointer;
  font-family: 'Noto Serif Hebrew', serif;
  ${mobile({height: '90px',fontsize:"400px"})}
`
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({flex:1,justifyContent: "flex-end",alignItems:"right"})}
`;

const MenuLink = styled.div`
  font-size: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 7px;
  ${mobile({fontsize: '80px',marginRight:"0px" })}
`
export default function Navbar(props){

    const navigate = useNavigate();
    const dispach = useDispatch()
    const [isSearchFieldOpen, setIsSearchFiledOpen] = useState(false)
    const [textSearch,setTextSearch] = useState("")
    const [isSearchResult, setIsSearchResult] = useState(false)


    const handleLogOut = async ()=> {

        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Sign-out successful.")
            logOutt()
        }).catch((error) => {
            alert(error)
            console.log(error)
        });

        const logOutt = async () =>{
            await dispach(
                logOut()
            )
            navigate('/')
        }
    }


    const handleSearchChanged = (e) => {
        setTextSearch(e.target.value)
        if (e.target.value.length > 1){
            setIsSearchResult(true)
        }else {
            setIsSearchResult(false)
        }
    }

    const handleSearchClicked = (e) => {
        if (isSearchFieldOpen){
            setIsSearchFiledOpen(!isSearchFieldOpen)
            setIsSearchResult(false)
            setTextSearch("")
        }else {
            setIsSearchFiledOpen(!isSearchFieldOpen)
            // window.scrollTo({
            //     top: 0,
            //     left: 0,
            //     behavior: "smooth"
            // });
        }
    }

    /////////////////////////////////for Drop down menu/////////////////////////

    const [isNavVisible, setNavVisibility] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);


    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 700px)");
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    const handleMediaQueryChange = (mediaQuery) => {
        if (mediaQuery.matches) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    const toggleNav = () => {
        setNavVisibility(!isNavVisible);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    };

    return(
        <Container
            style={{position:isNavVisible===true ? "absolute" : "sticky"}}
        >
            <Wrapper>
                {
                    isSearchFieldOpen ?
                        <ReasultContainer>
                            <input onChange={handleSearchChanged}
                                   placeholder={"חפש מוצרים"}
                                   style={{
                                       backgroundColor:"white",
                                       height:"100px",

                                       border:"none",




                                       direction:"rtl"
                                       ,textAlign:"right",
                                       marginRight : "3 px",
                                       alignItems:"center",
                                       display:"flex",
                                       fontSize:"40px"
                                   }}
                            />
                            {
                                isSearchResult &&
                                <SearchReasult serchText={textSearch}/>
                            }
                            <Clear
                                onClick={handleSearchClicked}
                                fontSize={"large"}
                                style={{position:"absolute",top:16,fontSize:"70px"}}
                            />
                        </ReasultContainer> :
                        <>
                            <Left>
                                <MenuLink onClick = {handleLogOut} style={{fontsize:"190px",fontWeight:"600"}}>
                                    התנתק
                                </MenuLink>

                                <MenuLink style={{marginLeft:"30px",justifyContent:"flex-end"}} onClick={handleSearchClicked}>
                                    {
                                        // !isSearchFieldOpen ?
                                        <Search fontSize={"large"} style={{fontSize:"70px"}}/>
                                        // :
                                        // <Clear />
                                    }

                                </MenuLink>
                            </Left>
                            <Center>
                                <Link to={"/"}>
                                    <Logo1 src={Logo} style={{marginRight:"5px"}}/>
                                </Link>
                            </Center>
                            <Right>

                                <MenuLink>
                                    <MenuIcon
                                        style={{fontSize:"80px"}}
                                        onClick={toggleNav}
                                        className="Burger"
                                    />
                                </MenuLink>
                            </Right>
                        </>
                }
            </Wrapper>
            <CSSTransition
                in={isNavVisible}
                timeout={350}
                classNames="NavAnimation"
                unmountOnExit
            >
                <nav className="Nav">
                    {
                        categorys.map(catItem=>(
                            <Link
                                key={catItem.id}
                                to={
                                    '/'+catItem.cat}
                                state={{title: catItem.title}}
                                style={{textDecoration: 'none'}}
                                onClick={toggleNav}
                            >
                                {catItem.title}
                            </Link>
                        ))
                    }

                </nav>
            </CSSTransition>

        </Container>
    )
}

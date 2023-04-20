import { Send } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import {useState} from "react";
import {publicRequest} from "../requestMethods";
import {CircularProgress} from "@mui/material";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import './newsLetter.css'

const Container = styled.div`
  height: 60vh;
  //background-color: #fdfdfd;
  //background-color: #DAEAF1;
  background-color: #f3f1ef;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  direction: rtl;
  font-size: 40px;
  text-align: center;
  margin: 5px;
  margin-bottom: 25px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  cursor: pointer;
  background-color: #F2CD5C;
  color: white;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;
const IconContainer = styled.button`
  font-size: 60px;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #D6E4E5;
  margin: 0;
  padding: 0;
  border: none;
  border: white;
`;

const Newsletter = () => {
    const [email,setEmail] = useState("")
    const [desc,setDesc] = useState("הצטרפו לניוזלטר ותהנו מרעיונות למתנות, השראות למסיבות ומבצעים")
    const [isSubmitted,setIsSubmitted] = useState(false)
    const [submitDone,setSubmitDone] = useState(false)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log(email)
        if (email !== ""){
            try {
                const res = await publicRequest.post("/newsLetter/", {email:email})
                console.log(res.data)
                setEmail("")
                if (res.data === "success"){
                    setDesc("!אנחנו מודים לך על הצטרפותך")
                    setIsSubmitted(true)
                }else {
                    setDesc("!אנא שנית במועד מאוחר יותר")
                }
            }catch (e) {
                setIsSubmitted(false)
                setDesc("אנא שנית במועד מאוחר יותר")
                setEmail("")

                console.log(e)
            }
        }
    }


    return (
        <Container aria-label={"הצטרף לניוז לטר שלנו"}>
            <label htmlFor='promo' aria-live={"assertive"}>
                {
                    <Title className={"lineUp"} style={{marginBottom:"0"}}>
                        {
                            isSubmitted ? "אנחנו מודים לך על הצטרפותך!" : "התעדכנו במבצעים החמים שלנו"
                        }
                    </Title>
                }
                {
                    !isSubmitted && <Desc className={"lineUp"}>{desc}</Desc>
                }
            </label>
            <form
                id='promo'
                onSubmit={handleSubmit}
                style={{border:"0.5px solid lightgray"}}>
                {
                    isSubmitted ?
                        <IconContainer >
                            < DoneOutlineIcon />
                        </IconContainer> :
                        <InputContainer style={{fontSize :"20px"}}>
                            <Input
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                placeholder="email.email@gmail.com"
                                aria-label={"הכנס אימייל והצטרף לאימייל שלנו"}
                                type={"email"}
                            />
                            <Button type={"submit"} enabled={isSubmitted} aria-label={'שלח אימייל ותהיה חלק מרשימת הניוז לטר שלנו'}>
                                {
                                    !isSubmitted ? <Send color="neutral"/> :
                                        <CircularProgress color={"inherit"}/>
                                }
                            </Button>
                        </InputContainer>
                }


            </form>
        </Container>
    );
};

export default Newsletter;
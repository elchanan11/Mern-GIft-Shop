import styled from "styled-components";
import {useState} from "react";
import {login} from "../../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";
import {publicRequest} from "../../requestMethods";
import {mobile} from "../../responsive";
import './login.css'
import {Navigate, useNavigate} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase'
import {CircularProgress} from "@mui/material";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 50%;
  padding: 20px;
  background-color: white;
  ${mobile({width: '80%'})}
  
`;

const Title = styled.h1`
  font-size: 64px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  ${mobile({margin: '40px'})}

`;

const Input = styled.input`
  height: 500px;
  flex: 1;
  width: 100%;
  min-width: 40%;
 
  padding: 50px;
  font-weight: 600;
  text-align: right;
  margin: 20px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  height: 60px;
  background-color: #354eca;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 20px;
  ${mobile({fontsize:"180px", height:"100px",width:"200px"})}

  &:disabled{
    color: blue;
    cursor: not-allowed;
  }
`;

const Error = styled.span `
    color: red;
`

const FieldEmpty = styled.span `
    color: red;
`

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  ${mobile({width: '150px'})}

`;

const Login = () => {
    const [userName, setUserName] = useState("")
    const [isFieldEmpty,setIsFieldEmpty] = useState(false)
    const [userPassword, setUserPassword] = useState("")
    const dispatch = useDispatch()
    const {isFetching,error} = useSelector((state) => state.user)
    const navigate = useNavigate()

    const handleLogin = async (e)=>{
        e.preventDefault()
        if (userPassword === "" || userName === ""){
            setIsFieldEmpty(true)
        }else {
            setIsFieldEmpty(false)
            login(dispatch, {email:userName,password:userPassword})
            const auth = getAuth();
            signInWithEmailAndPassword(auth, userName, userPassword)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user)
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                });

        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>התחבר</Title>
                <Form>
                    <Input type={"text"} placeholder="אימייל" onChange={(e)=>setUserName(e.target.value)} />
                    <Input placeholder="סיסמא"
                           type={"password"}
                           onChange={(e)=>setUserPassword(e.target.value)}

                    />
                    <Button onClick={handleLogin} disabled={isFetching}>{!isFetching ? "התחבר" : <CircularProgress />}</Button>
                    {error && <Error>
                        שגיאה...
                    </Error>}
                    {isFieldEmpty && <FieldEmpty>
                        אנא מלא את כל השדות
                    </FieldEmpty>}
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;
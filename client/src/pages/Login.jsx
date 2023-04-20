import styled from "styled-components";
import {mobile} from "../responsive";
import {useState} from "react";
import {login} from "../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";
import {publicRequest} from "../requestMethods";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({width: '60%'})}
  
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobile({margin: '40px'})}

`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  text-align: right;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  background-color: #354eca;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 20px;
  ${mobile({width: '80px'})}

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

    const handleLogin = async (e)=>{
        e.preventDefault()
        if (userPassword === "" || userName === ""){
            setIsFieldEmpty(true)
        }else {
            setIsFieldEmpty(false)
            login(dispatch, {email:userName,password:userPassword})
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>התחבר</Title>
                <Form>
                    <Input placeholder="אימייל" onChange={(e)=>setUserName(e.target.value)} />
                    <Input placeholder="סיסמא"
                           type={"password"}
                           onChange={(e)=>setUserPassword(e.target.value)}/>
                    <Button onClick={handleLogin} disabled={isFetching}>התחבר</Button>
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
import styled from "styled-components";
import {mobile} from "../responsive";
import {useState} from "react";
import {publicRequest} from "../requestMethods";
import {useNavigate} from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
  align-items: center;
  //Added
  justify-content: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  text-align: right;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  text-align: center;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  background-color: #354eca;
  color: white;
  cursor: pointer;
  font-weight: 400;
  font-size: 20px;
`;

const Register = () => {

    const navigate = useNavigate()

    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [confirmPassword,setConfirmPassword] = useState()
    const [isError,setIsError] = useState(false)

    const handleRegisterClick = async (e) =>{
        e.preventDefault()

        if (password && email && name){
            if (password === confirmPassword){
                setIsError(false)
                try {
                    await publicRequest.post(
                        '/auth/register', {userName: name,email:email,password:password}
                    )
                    setEmail("")
                    setPassword("")
                    setConfirmPassword("")
                    setName("")

                    navigate('/login')

                }catch (e){
                    console.log(e)
                    setIsError(true)
                }

            }else {
                setIsError(true)
            }
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>צור חשבון</Title>
                <Form>
                    <Input type={name}  onChange={(e)=>{
                        setName(e.target.value)
                    }} placeholder="שם"
                    />

                    <Input type={email}  onChange={(e)=>{
                        setEmail(e.target.value)
                    }} placeholder="אימייל"
                    />

                    <Input onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                        placeholder="סיסמא"
                        type={"password"}
                    />

                    <Input onChange={(e)=>{
                        setConfirmPassword(e.target.value)
                    }}
                        placeholder="אימות סיסמא"
                        type={"password"}
                    />

                    <Agreement>
                        על ידי יצירת חשבון, אני מסכים לעיבוד האישי שלי
                        נתונים בהתאם ל <b>מדיניות הפרטיות</b>
                    </Agreement>
                    <Button onClick={handleRegisterClick}>צור חשבון</Button>
                </Form>
                {isError && <span style={{color:"red",width:"10px"}}>בדוק שהסיסמאות זהות\האימייל איננו קיים במערכת שגיאה</span>}
            </Wrapper>
        </Container>
    );
};

export default Register;



import {
    Facebook,
    Instagram, LocationOnOutlined, Mail,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter, WhatsApp,
} from "@mui/icons-material";
import logo from '../images/logo.png'
import styled from "styled-components";
import {leptop, mobile, mobileMini, tablet} from "../responsive";
import {Link} from "react-router-dom";
import {deleteProducts} from "../redux/cartRedux";
import {logOut} from "../redux/userRedux";
import {useDispatch, useSelector} from "react-redux";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const Container = styled.div`
  display: flex;
  z-index: 4;
  
  background-color: #e5d7b1;
  ${tablet({flexDirection: 'column'})}
  ${mobile({flexDirection: 'column'})}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 50px 20px;
  ${tablet({alignItems: "center"})}
  ${mobile({alignItems: "center"})}
`;

const Logo = styled.img`
  width: 200px;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  ${tablet({marginBottom: '20px'})}
  ${mobile({marginBottom: '20px'})}
`;

const Desc = styled.p`
  margin: 20px 0px;
  ${tablet({display: 'none'})}
  ${mobile({display: 'none'})}
`;

const SocialContainer = styled.div`
  display: flex;
  
`;

const SocialIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: white;
    background-color: #${(props) => props.color};
  //background-color: #f3d1aa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  margin-left: 8px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(1.1);
  }
  ${leptop({marginLeft:0})}
  ${mobileMini({width: "32px", height: "32px", marginLeft: "5px", marginRight: "5px"})}
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${tablet({display: 'none'})}
  ${mobile({display: 'none'})}
`;

const Title = styled.h1`
  margin-bottom: 30px;
  text-align: right;
  font-size: 25px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  text-align: right;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  text-align: right;
  font-size: 17px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: right;
  padding: 20px;
  ${tablet({alignItems: "center",paddingTop:"5px"})}
  ${mobile({alignItems: "center",paddingTop:"5px"})}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  text-align: right;
  font-size: 20px;
`;
const DeveloperDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 40px;
  text-align: center;
  justify-content: center;
  direction: rtl;
  border-top: 1.5px lightgray solid;
  background-color: #e5d7b1;
`;

const DeveloperDetailsTitle = styled.h2`
  font-size: 20px;
`
const DeveloperDetailsDets = styled.h3`
  font-size: 15px;
`

const DevIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

const DevIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: white;
  background-color: #4c8eca;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  margin-left: 8px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(1.1);
  }
  ${mobileMini({width: "32px", height: "32px", marginLeft: "5px", marginRight: "5px"})}
`


//tile for screeen reader
const TitleForScreenReader = styled.h2`
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;


const Footer = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.currentUser)

    const handleLogOut = () => {

        dispatch(
            deleteProducts()
        )

        dispatch(
            logOut()
        )
    }

    return (
        <>
            <footer>
                <Container>
                    <Left>
                        <Link to={'/'} aria-label='לחץ  לחזרה לדף הבית'>
                            <Logo src={logo} alt={""}/>
                        </Link>
                        <Desc>
                            לקהל לקוחותינו היקרים
                            בימים אלו ניתן לבצע הזמנה דרך הטלפון הוואצאפ או המייל, יש אפשרות להגיע לאסוף מהחנות, בנוסף יש אפשרות למשלוח עד לבית! באיזור ביתר עילית, צור הדסה, מבוא ביתר, ירושלים גילה, בית וגן, בית הכרם, גבעת שאול, קרית משה
                        </Desc>
                        <SocialContainer >
                            {/*{user && true ?*/}
                            {/*    <SocialIcon color="3B5999">*/}
                            {/*        <PersonRemoveIcon onClick={handleLogOut} aria-label={'logout'}>*/}
                            {/*            התנתק*/}
                            {/*        </PersonRemoveIcon>*/}
                            {/*    </SocialIcon>*/}

                            {/*    :*/}
                            {/*    <SocialIcon color="3B5999">*/}
                            {/*        <Link to={'/login'} aria-label={'log in'}>*/}
                            {/*            <PersonAddIcon >*/}
                            {/*                התחבר*/}
                            {/*            </PersonAddIcon>*/}
                            {/*        </Link>*/}
                            {/*    </SocialIcon>*/}
                            {/*}*/}
                            <SocialIcon color="3B5999">
                                <a target={"blank"}
                                   aria-label={'לחץ לעמוד הפייסבוק שלנו'}
                                   href={"https://www.facebook.com/pages/category/art/%D7%94%D7%9E%D7%A1%D7%99%D7%91%D7%94-%D7%A9%D7%9C%D7%99-2197659190450858/"}
                                   style={{color:"#fff"}}
                                >
                                    <Facebook />
                                </a>
                            </SocialIcon>
                            <SocialIcon color="A4BE7B">
                                <a style={{color:"#fff"}} href="tel:+972542595225" aria-label={'לחץ לשיחת טלפון איתנו'}>
                                    <Phone />
                                </a>
                            </SocialIcon>
                            <SocialIcon
                                color="E60023"
                            >
                                <a style={{color:"#fff"}} href="mailto:Mypartybb@gmail.com" aria-label={'לחץ לשליחת אימייל אלינו'}>
                                    <Mail />
                                </a>
                            </SocialIcon>
                            <SocialIcon color="54B435">
                                <WhatsApp
                                    aria-label={'לחץ לשיחה איתנו בווצאפ'}
                                    role={"link"}
                                    aria-hidden={false}
                                    tabIndex={'0'}
                                    onClick={()=>{
                                    let postMessageToWatapp = "שלום אני מהאתר"
                                    let url = `https://wa.me/+972539323849?text=${postMessageToWatapp}`;
                                    window.open(url);}}
                                />
                            </SocialIcon>
                            <SocialIcon color="E26868">
                                <Instagram
                                    aria-hidden={false}
                                    role={"link"}
                                    aria-label={'קישור לאינסטגרם'}
                                    tabIndex={'0'}
                                    onClick={()=>{
                                    let url = `https://instagram.com/hamesibasheli?igshid=NTdlMDg3MTY=`;
                                    window.open(url);}}
                                />
                            </SocialIcon>
                            <SocialIcon
                                color="665A48" >
                                <a target={"blank"}
                                   aria-label={'לחץ לפתיחת גוגל מפות על מנת לראות איפה אנחנו ממוקמים - העמוד ייפתח בדף חדש'}
                                   href={"https://www.google.com/maps/place/%D7%94%D7%9E%D7%A1%D7%99%D7%91%D7%94+%D7%A9%D7%9C%D7%99%E2%80%AD/@31.7031666,35.1201339,17z/data=!3m1!4b1!4m5!3m4!1s0x1502db8f10675105:0x8c5f377bd6bf6a3a!8m2!3d31.7031666!4d35.1179452"}
                                   style={{color:"#fff"}}
                                >
                                    <LocationOnOutlined />
                                </a>
                            </SocialIcon>
                        </SocialContainer>
                    </Left>
                    <Center>

                    </Center>
                    <Right>
                        <Title>צור קשר</Title>
                        <ContactItem >
                            <TitleForScreenReader>
                                הכתובת שלנו
                            </TitleForScreenReader>
                            <Room style={{marginRight:"10px",fontSize:"30px"}}/> הר"ן 20 ,ביתר עילית
                        </ContactItem>
                        <ContactItem >
                            <TitleForScreenReader>
                                מספר הטלפון שלנו
                            </TitleForScreenReader>
                            <Phone style={{marginRight:"10px",fontSize:"30px"}}/> 054-259-5225
                        </ContactItem>
                        <ContactItem >
                            <TitleForScreenReader>
                                 האימייל שלנו
                            </TitleForScreenReader>
                            <MailOutline style={{marginRight:"10px",fontSize:"30px"}} /> Mypartybb@gmail.com
                        </ContactItem>
                    </Right>
                </Container>
                <DeveloperDetailsContainer>
                    <DeveloperDetailsTitle >
                        האתר נבנה ועוצב ב ❤️ על ידי WebEL
                    </DeveloperDetailsTitle>
                    <DeveloperDetailsDets>
                        לשיחת ייעוץ ראשונית לחץ:
                    </DeveloperDetailsDets>
                    <DevIconContainer>
                        <DevIcon>
                            <WhatsApp
                                aria-label={'לחץ ליצירת קשר עם המפתח בווצאפ'}
                                tabIndex={'0'}
                                aria-hidden={false}
                                onClick={()=>{
                                let postMessageToWatapp = "שלום אני מאתר המסיבה שלי ורציתי לשוחח בנושא.."
                                let url = `https://wa.me/+972539323849?text=${postMessageToWatapp}`;

                                window.open(url);}}  />
                        </DevIcon>
                        <DevIcon>
                            <a
                                aria-label={'call the developer'}
                                tabIndex={'0'}
                                style={{color:"#fff"}}
                                href="tel:+972539323849"
                            >
                                <Phone />
                            </a>
                        </DevIcon>
                    </DevIconContainer>

                </DeveloperDetailsContainer>
            </footer>
        </>

    );
};

export default Footer;
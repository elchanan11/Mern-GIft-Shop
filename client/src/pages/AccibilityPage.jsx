import styled from "styled-components";
import {mobile} from "../responsive";
import {useState} from "react";
import {login} from "../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";
import {publicRequest} from "../requestMethods";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Helmet} from "react-helmet";
import React from "react";

const Container = styled.div`
  width: 100%;
  background-size: cover;
  display: flex;
  flex-direction: column;
`;


const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;


const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  direction: rtl;
`;

const Desc  = styled.span`
  font-size: 16px;
  font-weight: 300;
  direction: rtl;
  margin-right: 10px;
`;

const AccibilityPage = () => {
    return (
        <Container>
            <Helmet>
                <title>המסיבה שלי - הצהרת נגישות</title>
            </Helmet>
            <Navbar />
            <Title>
                נגישות
            </Title>
            <SubTitle>
                נגישות באתר
            </SubTitle>
            <Desc>
                באתר זה בוצעו עבודות הנגשה בשאיפה לעמידה בתקן WCAG 2.0 לרמה AA, ואנו עושים כמיטב יכולתנו על מנת לדאוג שיישאר נגיש כמה שיותר. בממשק הנגישות שלנו תוכלו לבצע פעולות הנגשה התאם לרצונותיכם ובהתאם למגבלותיכם. כל התאמה שתעשו תשמר בקובץ "קוקי" בדפדפן שלכם, כלומר לא תצטרכו לבצע התאמות כל פעם מחדש,כיוון שהגדרות הנגישות שהכנסתם נשמרות והאתר יחכה לכם מראש מותאם ומוכן עם ההתאמות שביצעתם בפעם הקודמת.
                    <br/>
                בכל דפי האתר תוכלו למצוא כפתור נגישות שבו תוכלו לבצע פעולות כגון הגדלת פונט ועוד.
                <br/>
                 לכל אדם מגיע הזכות לחיות בכבוד, שוויון, נוחות ועצמאות,ולכן השקענו מאמצים רבים לעבר הנגשה מלאה של האתר.
            </Desc>
            <SubTitle>
                תאימות:
            </SubTitle>
            <Desc>
                Google Chrome, FireFox, Safari, Opera, Microsoft Edge, Android Marshmallow, iOS – אנו תומכים בכל המכשירים והדפדפנים הפופולריים בגרסה הנוכחית.
                <br/>
                כפתור להפעלת נגישות בסיסית, ניווט ע"י המקלדת, הפעלת מקלדת וירטואלית, התאמה לקוראי מסך, דילוג לתוכן המרכזי, חיפוש ביטויים ראשי תיבות וסלנג, שינוי שפת הממשק, שינוי מיקום הממשק, שינוי גודל הממשק.
                <br/>
                שינוי גדלי הגופן, שינוי הגופן לקריא, הגדלת טקסט במעבר עכבר (זכוכית מגדלת), הדגשת קישורים, הדגשת כותרות, שינוי מרווח בין שורות, שינוי מרווח בין מילים, שינוי מרווח בין אותיות, יישור למרכז, יישור לימין, יישור לשמאל, יישור מוחלט.
                <br/>
                הצגת תיאורי תמונות, התאמה לקוראי מסך, ניגודיות כהה, ניגודיות בהירה, שינוי האתר לצבעי אפור, צבעים מנוגדים, שינוי צבע הטקסטים, שינוי צבע הכותרות, שינוי צבע הרקע, עצירת אנימציות ותנועה.
                <br/>
                שינוי סמן העכבר לסמן גדול ולבן, או סמן שחור וגדול, הדגשת מעבר עכבר, הגדלה והקטנת תצוגת האתר, הדפסה נגישה, מצב קריאה, ניווט ע"י אותיות, הדגשת פוקוס, הדגשת מעבר עכבר.
                <br/>
                למרות מאמצנו הרבים לאפשר את התאמת האתר ברמה הטובה ביותר, יתכן ויתגלו דפים או חלקים באתר שטרם הונגשו או שטרם נמצא בעבורם הפתרון הטכנולוגי. יחד עם זאת, אנו ממשיכים בכל עת לשפר, להוסיף ולעדכן יכולות לממשק הנגישות באתר, וכן להתאים ואף לפתח טכנולוגיות חדשות על מנת להגיע לרמת הנגישות האופטימלית ביותר, בכל רגע נתון ובהתאם להתקדמות הטכנולוגית.
                <br/>
                במידה ומצאתם תקלה, או שאינכם מסתדרים עם ממשק הנגישות, או שיש לכם רעיונות לשיפורו, נשמח לשמוע מכם. ניתן לפנות לטלפון בכתובת למעלה.
            </Desc>
            <SubTitle>
                בחנות:
            </SubTitle>
            <Desc>
                חניות נכים – בסמוך לחנות
                <br/>
                 כניסה נגישה ומותאמת
            </Desc>
            <SubTitle>
                נציג נגישות בחנות:
            </SubTitle>
            <Desc>
                יעקב קונו
            </Desc>
            <Desc>
                טלפון:058-4427328
            </Desc>
            <Footer />
        </Container>
    );
};

export default AccibilityPage;
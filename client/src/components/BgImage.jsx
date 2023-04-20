import styled from "styled-components";
import {mobile} from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 250px;
  display: flex;
  position: relative;
  overflow: hidden;
  max-height: 300px;
  
  ${mobile({height: '250px'})}
  //box-shadow: 0 4px 2px -3px gold;
`

const ImageContainer = styled.img`
   
  
  height: 400px;
  object-fit: cover;
  flex: 1;
  top: 30px;
  ${mobile({height: '251px',width: "100%",objectFit:"cover"})}
`


export default function BgImage(){
  return(
        <>
          <Container>
            <ImageContainer src={""} alt={"תמונת מסך בית"}>

            </ImageContainer>
          </Container>

      </>
      )

}
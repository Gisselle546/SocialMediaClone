import styled from 'styled-components';
import {device} from '../../utils/device';

export const PostBannerWrapper = styled.nav({
    display:'flex',
    flexDirection:'column',
    
    
})

export const Input = styled.input({
    height:"120px", 
    width:"600px",
    marginTop:"2rem",
    border:"2px solid #DC143C",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    backgroundColor:"#fdfff4",
    fontSize:"1.1rem",
    
    "&:focus": {
        outline:"yellow"
      },
      [`@media ${device.mobile}`]:{
        
        width:"100%"
     }


 })






export const InputHeader = styled.h4({
   cursor:"pointer",
   backgroundColor:"#DC143C",
   color:"yellow",
   display:"flex",
   width:"100%",
   padding:"0.7rem"
})
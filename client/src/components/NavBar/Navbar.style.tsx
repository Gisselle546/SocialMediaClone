import styled from 'styled-components';
import {device} from '../../utils/device';

export const NavbarWrapper = styled.nav({
    display:'flex',
    backgroundColor:"#DC143C",
    justifyContent:"space-around",
    height:"10h",
    [`@media ${device.mobile}`]:{
        width:'100%',
        justifyContent:'space-around'
    }
   
    
})

export const LeftWrapper=styled.div({
    display:"flex",
    [`@media ${device.mobile}`]:{
       flexDirection:"column",
       justifyContent:"center"
    }
   
})

export const InputWrapper=styled.div({
    width:"80%",
    alignSelf:"center",
    height:"3rem",
   



})

export const Input = styled.input({
    color:"black",
    width:"50rem",
    height:"1.3rem",
    outline: "none",
    marginTop:"1rem",
    



})



export const Information = styled.ul({
    display: 'flex',
    color:'#f3e50d',
    justifyContent:"flex-end",
    marginTop:"2.5rem",
  



  });


export const List = styled.li({
    listStyleType:"none",
    marginRight:"1rem",
    alignSelf:"center",
    fontSize:"1.1rem",
    cursor:"pointer",
    [`@media ${device.mobile}`]:{
      display:'flex'
      }
    
   
   
})

export const ImageProfile = styled.img({
    height:"1.7rem", 
    marginRight:"0.8rem",
    marginTop:'-1rem',
   
})
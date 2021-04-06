import styled from 'styled-components';
import {device} from '../../utils/device'


export const SideBarWrapper = styled.div({
    display:'flex',
    flexDirection:"column",
    minHeight:"100vh",
  
    
 
    
})

export const SideBarUnorderedList = styled.ul({
    listStyleType:"none",
     flexGrow:1,
     marginLeft:"-3rem",
     
    
     
     
})

export const SideBarList = styled.li({
    
     padding:"2rem",
     margin:"2rem",
     cursor:"pointer",
     boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
     fontSize:"1.1rem",
    
})


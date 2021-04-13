import styled from 'styled-components';
import {device} from './utils/device'; 


export const AppWrapper = styled.div({
    display:'grid',
    gridTemplateColumns: "20vw 1fr",
    [`@media ${device.mobile}`]:{
       display:'flex',
       flexDirection:"column-reverse",
       
    }
    
})
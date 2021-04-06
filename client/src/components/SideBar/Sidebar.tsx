import { SideBarWrapper,SideBarUnorderedList,SideBarList } from "./Sidebar.style";
import styled from "styled-components";
import {Link} from 'react-router-dom';

const Linky = styled(Link)`
  
  color: orange;
  text-decoration: none;
  &:hover {
    color: red;
    
  }
`;

function Sidebar(){
    return(
        <SideBarWrapper>
            <SideBarUnorderedList>
                <SideBarList><Linky to="/">Feed</Linky></SideBarList>
                <SideBarList><Linky to="/shop">Shop</Linky></SideBarList>
                <SideBarList><Linky to="/cart">Cart</Linky></SideBarList>
            </SideBarUnorderedList>
        </SideBarWrapper>
    )
}

export default Sidebar;
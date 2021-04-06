import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import {useStore} from '../context/cart'; 
import ClearIcon from '@material-ui/icons/Clear';
import {device} from '../utils/device';

const MAXVALUE = 10;

const Cart = () => {

    const CartWrapper = styled.div`
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-top:4rem;
        @media ${device.mobile} { 
           display:flex;
           flex-direction:column;
          }
        
        
       
    `;
    
    const CartItems = styled.div`
        
        display:flex;
        width:100%;
        flex-direction:column;
        
    `;

    const ImageWrapper = styled.div`
        height:200px;
        margin-top:1rem;
    `;
    const DetailsWrapper = styled.div`
        
    `;

    const IconWrapper = styled.div`
        justify-items:flex-end;
        margin-top:2rem;
        margin-left:10rem
    `;

    const OrderWrapper = styled.div`
     margin-left:3rem;
     height:40vh;
     width:20vw;
     padding:1rem;
     background:linear-gradient(129deg, rgba(214,107,28,1) 11%, rgba(224,29,29,1) 38%);
     @media ${device.mobile} { 
        margin:0rem;
        width:100%
       }
    `;

    const OrderPrice = styled.div`
        color:#fff;
        display:flex;
        justify-content:space-between;
     
    `
    
    
    
    const num=[1,2,3,4,5,6,7,8,9,10];
    const {state,remove,number} = useStore();
    const total = state.cart.reduce((acc,carts:any,index,array)=>acc+carts.total,0);
    const itemtotal = state.cart.reduce((acc,carts:any,index,array)=>acc+carts.quantity,0)
    console.log(total,'total');
    console.log(itemtotal,'item');
    const items = itemtotal===1?'Item':'Items';

    if(state.cart.length==0) return<div>Cart is empty</div>;


    function tax(total:any){
        const fee=total*0.07
        return fee.toFixed(2)
   }


   function completeTotal(total:any):number{
    return parseFloat(tax(total.toFixed(2)))+parseFloat(total.toFixed(2));
   }
    
    const cart = state.cart.map((carts:any)=>{
       
       return(
          
                <div style={{display:"flex", justifyContent:"space-between",boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
                border: "2px solid white", marginTop:"1rem"}}>
                 
                       <ImageWrapper >
                            <img width="180px" height="180px" src={carts.images[0]}/>
                       </ImageWrapper>
                      <DetailsWrapper>
                          <h3>{carts.title}</h3>
                          <h4>Size: {carts.size}</h4>
                          <h5>Price: {carts.price}</h5>
                          <select value={carts.quantity}
                                onChange={(e) => number(carts.id,e.target.value)}>
                            {num.map((team) => <option key={team} value={team}>{team}</option>)}
                        </select>
                        
                      </DetailsWrapper>
                      <IconWrapper>
                          <ClearIcon style={{cursor:"pointer"}}fontSize="large" onClick = {()=>remove(carts.id)}/>
                      </IconWrapper>
                   
                </div>
                
          
       );
    })

    return (
       
        <CartWrapper>
          <CartItems>
              {cart}
          </CartItems>
          <OrderWrapper>
                <h3 style={{textAlign:'center', color:"#fff"}}>Order Summary</h3>
                <OrderPrice>
                    <h4>{itemtotal} {items}</h4>
                    <h3>${total}</h3>
                </OrderPrice>
                <OrderPrice>
                    <h4>Delivery</h4>
                    <h3>FREE</h3>
                </OrderPrice>
                <OrderPrice>
                    <h4>Sales Tax</h4>
                    <h3>${tax(total)}</h3>
                </OrderPrice>
                <OrderPrice>
                    <h4 style={{color:'#000'}}>Total</h4>
                    <h3 style={{color:'#000'}}>${completeTotal(total).toFixed(2)}</h3>
                </OrderPrice>


          </OrderWrapper>
            
        </CartWrapper>
    )
}

export default Cart;

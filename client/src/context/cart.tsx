import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { isConstructorDeclaration } from 'typescript';
import {Iproduct} from '../types/product';

enum ActionType {
    ADDCART = "ADDCART",
    REMOVECART = "REMOVECART",
    INCREMENT='INCREMENT',
    DECREMENT='DECREMENT',
    NUMBER='NUMBER'
  }


  const initialState={
    cart: JSON.parse(localStorage.getItem("cart")!) || [],
    
}

interface Action {
    type: ActionType;
    payload?: {
        productId:Iproduct,
        id:any,
        
    },
    quantity?:{
        id:any
        num:any
    }

}

interface State{
    cart:Iproduct[]
}

const reducer: React.Reducer<State, Action> =  (state: State, action: Action) => {

    let updatedCart;
    let index;
    let amount:any;

    switch(action.type){
        case ActionType.ADDCART:
           
            updatedCart = [...state.cart];
            
            index=[...state.cart].findIndex((item:Iproduct)=>item.id === action.payload!.productId.id)
            
            if(index<0){
                updatedCart.push({...action.payload!.productId,quantity:1, total:action.payload!.productId.price})
            }else{

                updatedCart = [...state.cart];


                const updatedItem={
                    ...updatedCart[index]
                }
            updatedItem.quantity++;
            updatedItem.total=(updatedItem.price*updatedItem.quantity)
            updatedCart[index]=updatedItem;
            
            }
            console.log(updatedCart)
            
            return{
                ...state,
                cart:updatedCart
            };



        case ActionType.INCREMENT:
            updatedCart = [...state.cart];
             index = updatedCart.findIndex(
               ( item:Iproduct )=> item.id === action.payload!.productId.id
            );
  
            const incrementedItem = {
                ...updatedCart[index]
            };
  
            incrementedItem.quantity++;
  
            updatedCart[index] = incrementedItem;
  
  
            return {...state, cart: updatedCart};
            


        case ActionType.DECREMENT:
            updatedCart = [...state.cart];
            index= updatedCart.findIndex(
                ( item:Iproduct ) => item.id === action.payload!.productId.id
            );

            const decrementedItem = {
                ...updatedCart[index]
            };

            decrementedItem.quantity--;

            updatedCart[index] = decrementedItem;

            return {...state, cart: updatedCart};



            case ActionType.NUMBER:
                updatedCart = [...state.cart];

                console.log(action.quantity)

                index = updatedCart.findIndex(
                    item => item.id === action.quantity!.id
                );
        
                const Item = {
                    ...updatedCart[index]
                };

                Item.quantity = parseInt(action.quantity!.num);
                Item.total=(Item.price*Item.quantity)

                updatedCart[index] = Item;
                
        
                return {...state, cart: updatedCart};

            



            case ActionType.REMOVECART:
                updatedCart = [...state.cart];

                console.log(action.payload)

                index = updatedCart.findIndex(
                    item => item.id === action.payload!.id
                );
        
                updatedCart.splice(index, 1);
        
                return {...state, cart: updatedCart};
        
              default:
                throw new Error();
   

  
    }

}

const CartContext = createContext<{
    state:State
    addCart:(items:any)=>void
    increment:(items:any)=>void
    decrement:(items:any)=>void
    remove:(items:any)=>void
    number:(items:any, amount:any)=>void
}>({
    state:initialState,
    addCart:()=>{},
    increment:()=>{},
    decrement:()=>{},
    remove:()=>{},
    number:()=>{},
   
});




  
  export const CartProvider  = (props: { children: React.ReactNode; }) => {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        localStorage.setItem(
          "cart",
          JSON.stringify(state.cart)
        );
        
      });

    const addCart = (items:any)=>{
        dispatch({
            type:ActionType.ADDCART,
            payload:items!
        })
      }

      const increment = (items:any)=>{
       
        dispatch({
            type:ActionType.INCREMENT,
            payload:items 
        })
      }
    
      const decrement = (items:any)=>{
        dispatch({
            type:ActionType.DECREMENT,
            payload:items!
        })
      }
    
      const remove=(items:any)=>{
          
          dispatch({
              type:ActionType.REMOVECART,
              payload:items!
          })
      }

      const number = (id:any,num:any)=>{
         
          dispatch({
              type:ActionType.NUMBER,
              quantity:{id,num}
          })
      }
      
    
    return (
        <CartContext.Provider value={{state,addCart,increment,decrement,remove,number}}>
          {props.children}
       </CartContext.Provider>
      )
  }
  
  export const useStore = () => useContext(CartContext);


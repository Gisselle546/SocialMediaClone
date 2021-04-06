import React, { createContext,useReducer, useEffect, useContext,useState, useRef } from "react";
import {IUSER} from '../types/user';


enum ActionType {
    SIGNIN = "SIGNIN",
    SIGNOUT = "SIGNOUT"
  }


  

  const initialState={
    token: JSON.parse(sessionStorage.getItem("token")!) ||null,
    user: JSON.parse(sessionStorage.getItem("user")!) ||null
    
}

interface Action {
    type: ActionType;
    payload?: {
        token:string,
        user:IUSER
    };
}

interface State{
    token:string,
    user:IUSER;
    
}



const reducer: React.Reducer<State, Action> =  (state: State, action: Action) => {
  

    switch(action.type){
        case ActionType.SIGNIN:
             
            return{
                token:action.payload!.token!,
                user:action.payload!.user
                
            };
            case "SIGNOUT":
              sessionStorage.clear();
              return{
                token:null!,
                user:null!
                
              };

              default:
                throw new Error();
   
  }

}

const AuthContext = createContext<{
    state:State
    addToken:(token:any)=>void,
    signout:()=>void
    
    
    
}>({
    state:initialState,
    addToken:()=>{},
    signout:()=>{}
   
   
});


export const AuthProvider = (props: { children: React.ReactNode; } )=>{
    const [state, dispatch] = useReducer(reducer, initialState);
    
    

    useEffect(() => {
        sessionStorage.setItem(
          "token",
          JSON.stringify(state.token)
        );

        sessionStorage.setItem(
          "user",
          JSON.stringify(state.user)
        )
        
      },[state.token,state.user]);

      
      

      const addToken = (token:any)=>{
        dispatch({
            type:ActionType.SIGNIN,
            payload:token!
        })
      }

      const signout=()=>{
       
   
        dispatch({type:ActionType.SIGNOUT });
       
  
       
       }
      

    return(
        <AuthContext.Provider value={{state,addToken,signout}}>
            {props.children}
        </AuthContext.Provider>
        );



};

export const useStore = () => useContext(AuthContext);


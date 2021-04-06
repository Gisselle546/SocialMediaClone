import React from 'react';
import {ApolloLink, ApolloClient, InMemoryCache,HttpLink,ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from './pages/home';
import {useStore} from './context/auth';
import Signup from './pages/signup';
import Login from './pages/login';
import {CartProvider} from './context/cart';



function App() {

  const httpLink = new HttpLink({
    uri: 'http://localhost:2000/api',
    credentials:'include'
  });

  const {state}=useStore();

  const token = state.token;

  

  
  const authLink = setContext((_,{headers})=>{

    return{
        headers:{
          ...headers,
            authorization: token ? `Bearer ${token}` : ''
        },

    };


  });


  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>

     { if (message === "Totally expired") {
        // every 401/unauthorized error will be caught here and update the global local state
			  sessionStorage.removeItem('token');
        client.clearStore();
       
      
      }
     }
       
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  

  const link = ApolloLink.from([authLink,errorLink,httpLink]); 


  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    
    
    
  })

  

  return(
    <ApolloProvider client ={client}>
      <CartProvider>
      {
        token ? (<Route path="/" component={Home}/>) :
        <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Redirect to="/signup" />
      </Switch>
      
      
      }
      </CartProvider>
    </ApolloProvider>
  )






}

export default App;

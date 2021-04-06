import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {IfcSigninInterface} from '../types/login';
import { TextField, Button } from '@material-ui/core';
import {useLoginMutation} from '../generated/graphql';
import Grid from '@material-ui/core/Grid';
import {useStore} from '../context/auth';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   
    root:{
        display:"flex",
        justifyContent:"center",
        marginTop:"7rem",
       

    },


   form:{
    
    flexDirection:"column",
    justifyContent:"center",
    alignContent:"center",
    padding:"6rem",
    boxShadow:"10px 10px 5px #aaaaaa",
    backgroundColor:"rgb(204,0,0)"
   
   },

   field:{
    flex:"1 0 auto",
    color:"#fff",
    fontSize:"1rem",
    "&.focused": {
        color: "yellow"
      },
    
       
   },

   
   underline: {
    "&:before": {
      borderBottom: "1px solid #fff"
    },
  },
  
  button:{
      backgroundColor:"rgb(255,209,0)",
      display:"flex",
      marginLeft:"65px",
      borderRadius:"0px",
      "&:hover":{
        backgroundColor:"rgb(255,209,0)"
      }
  },

  helperText:{
    color:"yellow"
},

background:{
  background:"linear-gradient(to top right,rgba(220,20,60,0),rgba(204,0,0,100)),url(https://s7d2.scene7.com/is/image/TWCNews/APTOPIX_Spain_Running_of_the_Bulls_56419) left/cover",
  height:"98vh"
}

  
}));


const defaultData:IfcSigninInterface={
  
    email:" ",
    password:" "
  
  };

  interface Props{
    history:any
}


  
const Login:React.FC<Props> = ({history}) =>{
    const classes = useStyles();
    const{addToken} = useStore();
    const [signin,setSignin]=useState(defaultData);
    const [login,{error}] = useLoginMutation();
  


    function handleChange (event:React.ChangeEvent<HTMLInputElement>) {
        const{name,value}=event.target;
        setSignin((prevsignin:any)=>({
          ...prevsignin,
          [name]:value
        })); 
      }

      function handleError(field:any){
        return error&& field===""
      }

      async function loginHandler(){
        const{email,password}=signin;

        let response:any
        try{
            response= await login({
                variables:{
                   
                    email,
                    password
                    
                }
            })
            
        }catch(error){
            console.dir(error)
        }
       const {accessToken,user} = response!.data!.login
       return {token:accessToken,user:user}
       
    }



    const handleSubmit = async(event:any) => {

      event.preventDefault();
      try{
          const token = await loginHandler();
          addToken(token);
          history.push('/')
      }catch(err){
          console.dir(err)
      }
    }






    return(
      <>
       <Grid container spacing={1}>
        

       <Grid item xs={6}>
           <div className={classes.background}></div>
         </Grid>
        
        <Grid item xs={6}>
              <div className={classes.root}>
                
              <form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
                  
                  <div style={{margin:"3rem"}}>
                  
                      <TextField  InputProps={{classes:{underline: classes.underline}}} 
                      onChange={handleChange} 
                      InputLabelProps={{ classes: { root: classes.field,focused: "focused", shrink: "shrink"}}} label="Email" name="email"  
                      helperText={error&&error.graphQLErrors[0].message} 
                      error={handleError(signin.email)}
                      FormHelperTextProps={{
                          className: classes.helperText
                        }}
                      />
                      
                  
                  </div>
                  <div style={{margin:"3rem"}}>
                  
                      <TextField  InputProps={{classes:{underline: classes.underline}}}  
                      onChange={handleChange} 
                      InputLabelProps={{classes: {root: classes.field,focused: "focused",shrink: "shrink"}}} label="Password" type="password" name="password"  
                      helperText={error&&error.graphQLErrors[0].message} 
                      error={handleError(signin.email)}
                      FormHelperTextProps={{
                          className: classes.helperText
                        }}
                      />
                      
                    
                  
                  </div>
        
                  <Button className={classes.button}variant="contained" size= "large"  type="submit">Login</Button>
              
              </form>
          
          </div>
    
    
      </Grid>
    </Grid>
    </>
    )
 }
 export default Login;
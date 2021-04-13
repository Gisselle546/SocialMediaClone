import React, { useContext, useState } from "react"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Button,Grid } from '@material-ui/core';
import { IfcSignupInterface } from "../types/signup";
import { Link } from "react-router-dom";
import {useRegisterMutation} from '../generated/graphql';
import {useStore} from '../context/auth';
import { Hidden } from "@material-ui/core";
import {device} from '../utils/device';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   
    root:{
        display:"flex",
        justifyContent:"center",
        marginTop:"7rem",
        [`@media ${device.mobile}`]:{
          width:"100vw",
          height:"100vh",
          margin:0
       }

    },


   form:{
    
    flexDirection:"column",
    justifyContent:"center",
    alignContent:"center",
    padding:"6rem",
    boxShadow:"10px 10px 5px #aaaaaa",
    backgroundColor:"rgb(204,0,0)",
    [`@media ${device.mobile}`]:{
     padding:0
   }
   
  
  
  
  
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
    height:"98vh",
  
  }
  
  
}));

const defaultData:IfcSignupInterface={
    name: " ",
    email:" ",
    password:" ",
    username:" "

};


interface Props{
    history:any
}












const Signup:React.FC<Props> = ({history}) => {
    const classes = useStyles();
    const [signup,setSignup]=useState(defaultData)
    const [register,{error}] = useRegisterMutation();
    const {addToken} = useStore()
    
    
    
    
    
    function handleChange (event:React.ChangeEvent<HTMLInputElement>) {
        const{name,value}=event.target;
        setSignup((prevsignup:any)=>({
          ...prevsignup,
          [name]:value
        })); 
      }

      function handleError(field:any){
        return error&& field===""
      }

      async function signupHandler(){
        const{name,email,password,username}=signup;

        let response:any
        try{
            response= await register({
                variables:{
                    name,
                    email,
                    password,
                    username
                }
            })
            
        }catch(error){
            console.dir(error)
        }
       const {accessToken,user} = response!.data!.register;
      
       return {token:accessToken,user:user}
       
    }



    const handleSubmit = async(event:any) => {

      event.preventDefault();
      try{
          const token = await signupHandler();
          addToken(token);
          history.push('/')
      }catch(err){
          console.dir(err)
      }
    }
     

   return(
    <>
      <Grid container spacing={1}>
        

        <Grid item md={6}>
        <Hidden smDown>
           <div className={classes.background}></div>
          </Hidden>
         </Grid>
         
    <Grid item sm={12}md={6}>




    <div className={classes.root}>
           
    <form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
        <div  style={{margin:"3rem"}}>
            
            <TextField  
            InputProps={{classes:{underline: classes.underline}}} 
            onChange={handleChange} 
            InputLabelProps={{ classes: {root: classes.field,focused: "focused",shrink: "shrink"} }} label="Name" name="name"  
            helperText={error &&error.graphQLErrors[0].message && ' cannot be empty'} 
            error={handleError(signup.name)}
            FormHelperTextProps={{
                className: classes.helperText
              }}
            />
            
        
        </div>
        <div style={{margin:"3rem"}}>
        
        <TextField  
        InputProps={{classes:{underline: classes.underline}}} 
        onChange={handleChange} 
        InputLabelProps={{ classes: { root: classes.field,focused: "focused", shrink: "shrink"}}} label="Username" name="username"  
        helperText={error&&error.graphQLErrors[0].extensions &&' Must be an Email and not be empty'} 
        error={handleError(signup.email)}
        FormHelperTextProps={{
            className: classes.helperText
          }}
        />
        
       
    
    </div>





        <div style={{margin:"3rem"}}>
        
            <TextField  
            InputProps={{classes:{underline: classes.underline}}} 
            onChange={handleChange} 
            InputLabelProps={{ classes: { root: classes.field,focused: "focused", shrink: "shrink"}}} label="Email" name="email"  
            helperText={error&&error.graphQLErrors[0].extensions &&' Must be an Email and not be empty'} 
            error={handleError(signup.email)}
            FormHelperTextProps={{
                className: classes.helperText
              }}
            />
            
           
        
        </div>
        <div style={{margin:"3rem"}}>
        
            <TextField  InputProps={{classes:{underline: classes.underline}}}  
            onChange={handleChange} 
            InputLabelProps={{classes: {root: classes.field,focused: "focused",shrink: "shrink"}}} label="Password" type="password" name="password"  
            helperText={error&&error.graphQLErrors[0].extensions &&' Password cannot be blank'} 
            error={handleError(signup.password)}
            FormHelperTextProps={{
                className: classes.helperText
              }}
            />
        </div>

        <Button variant="contained" size= "large"  type="submit" className={classes.button}>Signup</Button>
        <Link style={{textDecoration:"none",display:"flex",justifyContent:"center", alignContent:"center", marginTop:"1.5rem", color:"#fff"}} to="/login">Or Login<span>&rarr;</span></Link>
    
    </form>

  </div>

  </Grid>
</Grid>
</>
   )
}
export default Signup
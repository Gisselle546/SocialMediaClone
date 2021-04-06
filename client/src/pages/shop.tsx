import React from 'react';
import {useProductsQuery} from '../generated/graphql';
import{Link, match, Router} from 'react-router-dom';
import{CircularProgress} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {device} from '../utils/device';


const useStyles = makeStyles((theme) => ({
    root: {
        display:"flex",
        textDecoration:"none",
        [`@media ${device.mobile}`]:{
            width:"100%",
            flexDirection:"column",
            marginLeft:"-3rem"
         }
    
    },

    product:{
        display:"flex",
        flexDirection:"column",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        marginLeft:"4rem",
        padding:"2rem",
        cursor:"pointer"
    }
    
   
    

  }));




interface Props{
    match:any,
    history:any
}



const Shop:React.FC<Props> = ({match,history}) => {

    const {data,loading,error}=useProductsQuery()
    const classes = useStyles();


    function clickHandler(id:any){
        history.push(`${match.path}/${id}`)
    }

    if (loading) {
        return(
          <div style={{
             display:"flex",
             flexDirection:"column",
             alignItems:"center",
             marginTop:"40px"
          }}
          >
             <CircularProgress/>
          </div>
       )
        }
        if (error) {
          return <div>Error</div>
          
        }
        console.log(match);

return(
    
    <div style={{marginTop:"3rem"}}>
      
           <div className={classes.root}>
            
               {
                   
                   data!.products.map((product)=>{
                       return(
                        
                          <div onClick={()=> clickHandler(product.id)}className={classes.product}>
                               <h2 style={{marginLeft:"1rem"}}>{product.title}</h2>
                                <div>
                                    <img  style={{height:"230px",width:"230px"}}src={product.images[0]}/>
                                </div>
                                <h3 style={{marginLeft:"2.5rem"}}>${product.price}</h3>
                          </div>
                        
                        
                       )
                   })
               }
           
           </div>
        
    </div>
)



}

export default Shop;
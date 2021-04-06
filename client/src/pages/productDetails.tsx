import React from 'react'
import {useProductIdQuery} from '../generated/graphql';
import{Button, CircularProgress, Grid, Typography} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import SizeBox from '../components/SizeBox/SizeBox';
import toast from 'react-hot-toast';
import {useStore} from '../context/cart'; 
import {device} from '../utils/device';

const useStyles = makeStyles((theme) => ({
    root: {
        display:"flex",
        justifyContent:"space-between",
        marginTop:"1.5rem"
    },
    imageWrapper:{
        height:"80%"
    },
    
    heading:{
        marginLeft:"2.3rem"
    },
    itemwrapper:{
        display:"flex",
        justifyContent:"space-around",
        [`@media ${device.mobile}`]:{
           flexDirection:"column",
           marginLeft:"1rem"
         }
    },

    link:{
        textDecoration:"none",
        color:"black",
        
    },


    productdetail:{
        borderTop: "1px solid red",
        marginLeft:"2.3rem",
        marginTop:"4rem",
        borderBottom:"1px solid blue",
        padding:"1.2rem"
    },

    sizeWrapper:{
        height:"400px",
        width:'400px',
        marginLeft:"2.3rem",
        marginTop:"-1.9rem",
        display:"flex",
        flexDirection:"column",
        justifyContent:'center'
        

    },

    cartButton:{
        width:"76%",
        backgroundColor:"#DC143C",
        borderRadius:"0px",
        marginTop:"1.6rem",
        padding:"1rem",
        color: "#f3e50d",
        "&:hover": {
        backgroundColor:"#f3e50d",
        color:"#DC143C"
        }

    }, 

    description:{
        width:"70%",
        lineHeight:"1.7",
        fontSize:"1.1rem",
        marginLeft:"2rem"
    }

  }));







interface Props{
    match:any
}



 const ProductDetails:React.FC<Props> = ({match}) => {
    
    const classes = useStyles();
    const {addCart} = useStore();

    const {data,loading,error} = useProductIdQuery({
        variables:{
            data:parseFloat(match.params.id)
        }
    })

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
        console.log(data);


        function addCartHandler(data:any){
            addCart(data);
            toast.success(`${data.productId.title} is added to cart!!` )
        }
   

    return (
        
        <div style={{marginTop:"1rem"}}>
        <Link className={classes.link}to="/shop"><ArrowBackIcon style={{alignItems:"center"}}/>Go Back</Link>
        <div className={classes.root}>
            
             <Grid container spacing={3}>
                <Grid item xs={8}>
                    <div className={classes.itemwrapper}>
                           
                            <div className={classes.imageWrapper}>
                                <img style={{height:"32vh", width:"32vh"}}src={data!.productId.images[0]}/>
                            </div>
                            <div style={{display:'flex', alignContent:"center", flexWrap:"wrap"}}>
                                <Typography className={classes.heading}variant="h4">{data!.productId.title}</Typography>
                                <Typography className={classes.heading} style={{marginTop:"0.4rem"}}variant="h6">${data!.productId.price}</Typography>
                           <div className={classes.sizeWrapper}>
                            <h2>Sizes:</h2>
                            <SizeBox size ={data!.productId.size}/>
                            <Button className={classes.cartButton} onClick={()=>addCartHandler(data)}>Add to Cart</Button>
                           </div>
                        
                           <p className={classes.description}>{data!.productId.description}</p>
                           
                           
                           </div>
                           
                     

                    </div>
                    
                </Grid>
            </Grid>
        </div>
      </div>
    )
}

export default ProductDetails;
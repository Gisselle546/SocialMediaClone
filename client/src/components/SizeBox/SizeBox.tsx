import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display:"flex",
      
    },

    button:{
        marginLeft:"1rem",
        
    },
      
    

  }));

  enum sizeENUM{
      "SMALL","MEDIUM","LARGE","EXTRA LARGE"
  }

  interface Props{
    size:any;
  }

  

const SizeBox:React.FC<Props>=({size}) => {
    const classes = useStyles();
 
   
    return (
        
       <div className={classes.root}>
            <Button disabled={size!==sizeENUM[0]}  variant="outlined">S</Button>
            <Button disabled={size!==sizeENUM[1]}  className={classes.button}variant="outlined">M</Button>
            <Button disabled={size!==sizeENUM[2]}  className={classes.button}variant="outlined" >L</Button>
            <Button disabled={size!==sizeENUM[3]}   className={classes.button}variant="outlined" >XL</Button>
            
        </div>
    )
}

export default SizeBox

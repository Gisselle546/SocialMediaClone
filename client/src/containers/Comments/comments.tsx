import { CircularProgress, List,ListItem,ListItemAvatar,Avatar,ListItemText,Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import {useCommentsbypostQuery} from '../../generated/graphql';




interface Props{
  post:any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   
    root:{
        display:"flex",
        
        
       

    },


   
  
  
}));


const Comments:React.FC<Props> = ({post}) => {
  const classes = useStyles();
  const {data,loading,error}=useCommentsbypostQuery({
    variables:{
      postId:post
    }
  });
 

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
    console.log(data)

    const comet=data!.commentsbypost.map((comment)=>{

    return(
      <List className={classes.root}>
      <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={comment.user.avatar} />
      </ListItemAvatar>
      
      
      
      
      <ListItemText
        primary={comment.description}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              
              color="textPrimary"
            >
             {comment.user.username}
            </Typography>
           
          </React.Fragment>
        }
      />
    </ListItem>
    </List>
    )
    
    })

    
      
    

    return(
      <>
       {comet}
      </>
    )


}
export default Comments;
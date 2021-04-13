import React, { useState, lazy,Suspense, useEffect } from 'react';
import CreatePostBanner from '../containers/CreatePostBanner/createPostBanner';
import {usePostsQuery,useCreateCommentMutation,useCreateLikesMutation,useRemoveLikesMutation,useLikesbypostQuery} from '../generated/graphql';
import{CircularProgress} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {List,ListItem,ListItemAvatar,ListItemText,Avatar,Typography,TextField,Button} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import NoteIcon from '@material-ui/icons/Note';
import {useStore} from '../context/auth';
import {device} from '../utils/device';


const Comments = lazy(()=>import('../containers/Comments/comments'));

const renderLoader = ()=> <CircularProgress/>;


const useStyles = makeStyles((theme) => ({
    root: {
      width: '50%',
      display:"flex",
      backgroundColor: theme.palette.background.paper,
      marginTop:"1.3rem",
      boxShadow:"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      [`@media ${device.mobile}`]:{
        
        width:"100%",
       
     }
    
    
    
    
    
    },

    
    
    postHeading:{
        marginTop:"1.2rem"
    },

    postContent:{
      display:"flex",
      flexDirection:"column",
      justifyContent:"flex-start",
      alignItems:"flex-start",
      height:"86%",
      width:"100%",
      boxSizing: "border-box"
      
      
    },

    imageContainer:{
      height:"86%",
      width:"100%",
    },


    image:{
      height: "100%", 
      width: "100%" ,
      objectFit: "cover"
    },

    comments:{
   
      color:"#DC143C",
     
   
    },

    commentsContainer:{
      marginTop:"0.4rem",
      marginLeft:"1rem",
      display:"flex",
      justifyContent:"space-between"
   
    },

    textFieldinput:{
        width:"100%",
        borderRadius:"0px"
    },

    input:{
      "&.Mui-focused": {
        border: "2px solid #000",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none"
        }
      }
    },

    commentWrapper:{
      marginTop:"0.5rem",
      display:"flex"
    },

    icons:{
      color:"rgb(204,0,0)"
    }

    

  }));






const Feed:React.FC = () => {
   
  const classes = useStyles();
  const[createComment] = useCreateCommentMutation();
  const {data,loading,error}=usePostsQuery()
  const [comment,setComment]=useState("");
  const [id,setid]= useState(0);
  const[show,setShow]= useState(false);
  
  




 function commentsHandler(post:any){
    
    setShow(!show);
    setid(post)

    
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
          
          console.dir(error);
          
          
        }

        function handleChange(e:React.ChangeEvent<HTMLInputElement>){
          setComment(e.target.value);
        }
        
        async function sendCommentHandler(id:number){
          let response:any
          try{
              response= await createComment({
                  variables:{
                   
                     description:comment,
                     postid:id
                     
                  }
              })
              
          }catch(error){
             console.dir(error)
          }
         
          return response.data;

        }

       
          

          const post = data!.posts.map((post)=>{
            
          
         
           
         return( 
          <div className={classes.root}>
          <List style={{width:"100%",height:"100%"}}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={post.user.username} src={post.user.avatar} />
              </ListItemAvatar>
              <div className={classes.postHeading}>
                {post.user.username}
              </div>
              
             
            </ListItem>
            <div className={classes.postContent}>
              
                  <div className={classes.imageContainer}>
                    <img className={classes.image}src={post.image}/>
                  </div>
                  
              <Typography style={{marginLeft:"1rem"}}>{post.description}</Typography>
              
  
            </div>
              
              <div className={classes.commentsContainer}>
                <Typography className={classes.comments}>{post.likes.length} {post.likes.length>0?('likes'):('like')}</Typography>
                <Typography style={{marginRight:"1rem"}}className={classes.comments}>{post.comments.length} Comments</Typography>
              </div>
              <div className={classes.commentWrapper}>
                   <TextField className={classes.textFieldinput} placeholder="Enter Comment..." onChange={handleChange} variant="outlined" />
                   <Button style={{backgroundColor:"#DC143C",color:"yellow"}} onClick={()=>sendCommentHandler(post.id)}variant="contained">Send</Button>
                   
              </div>
             
              <div >
                <LikeButton post={post} />
                <Button><NoteIcon className={classes.icons} style={{marginBottom:"1rem"}}onClick={()=>commentsHandler(post.id)}/></Button>
              </div>
              {
                show&&post.id===id&&
                <Suspense fallback={renderLoader()}>

                  <Comments post={post.id}/>
                </Suspense>
               }
             
               </List>

              </div>

          
         );
        })


return(
   
    
    <div>
        <CreatePostBanner/>

        <div>
         {
           post
         }
        </div>
              
             

    </div>
)

    

}

interface Props{
  post:any;
  
}

const LikeButton:React.FC<Props> = ({post}) => {
  const classes = useStyles();
  const {state} = useStore();
  const [createLikes] = useCreateLikesMutation();
  const isAlreadyLiked = post.likes.some(( user:any ) => user.userId===state.user.id);
  const [removeLikes] = useRemoveLikesMutation();
  const [liked, setLiked] = useState(isAlreadyLiked);
  const onClick = liked ? handleUnlike : handleLike;

 


  async function handleLike() {
    // console.log("like");
    setLiked(true);
    await createLikes({ variables:{postid:post.id,likescounter:1} });
  }

  
 async function handleUnlike(){
  setLiked(false);
  await removeLikes({variables:{postId:post.id}})
 }



  return(
    <ThumbUpIcon style={{marginTop:'0.6rem',marginLeft:'0.4rem', cursor:'pointer'}}className={classes.icons} onClick={onClick}/>
  )
}





export default Feed;
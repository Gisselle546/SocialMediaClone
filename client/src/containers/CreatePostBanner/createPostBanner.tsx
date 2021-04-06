import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import{PostBannerWrapper, Input,InputHeader} from './createPostBanner.style';
import {useCreatePostsMutation} from '../../generated/graphql';
import{useStore} from '../../context/auth';
import imageUpload from '../../utils/imageupload';
import toast from 'react-hot-toast';
import { Button } from '@material-ui/core';
import {device} from '../../utils/device';

const useStyles = makeStyles((theme) => ({
    constainer:{
        display:"flex",
        justifyContent:"space-evenly",
        marginRight:"30rem",
        [`@media ${device.mobile}`]:{
            width:"100%"
         }
    },

    button:{
        backgroundColor:"#DC143C",
        color:"yellow",
        marginRight:"9rem",
        marginTop:"1rem",
        width:"8rem",
        height:"3rem",
        fontWeight:"bold",
        borderRadius:"0px",
        "&:hover":{ 
            backgroundColor:"#DC143C"
          },
        
          [`@media ${device.mobile}`]:{
        
            marginRight:"4rem"
           
         }

        
    }
      
    
  }));



const CreatePostBanner:React.FC = () => {
    const [textArea,setTextArea] = useState('');
    const [createPosts,{error}] = useCreatePostsMutation();
    const{state} =useStore();
    const{username,avatar}=state.user;
    const classes = useStyles();
    const [images,setImage]=useState(" ");

    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
        setTextArea(event.target.value);
    }


    async function createPost(){
    

        let response:any
        try{
            response= await createPosts({
                variables:{
                 
                   description:textArea,
                   image:images!
                   
                }
            })
            
        }catch(error){
           console.log(error)
        }
       
        console.log(response);
       
    }



    const donehandler=async()=>{
        await createPost();
    }


    async function handleUpload(e:any){
        const url = await imageUpload(e.target.files[0])
        setImage(url);
        toast.success('Image uploaded! Now post it!');
    }


return(
   <PostBannerWrapper>
     <Input type="text" onChange ={handleChange} name="textarea" autoComplete="off"placeholder={`Hi ${username}, share your thoughts...`}/> 
     <div className={classes.constainer}>

       <div>
        <label htmlFor="image">
        <InputHeader>
         <input
            accept="image/*"
            id="image"
            type="file"
            style={{display:'none'}}
            onChange={handleUpload}
            />
            Image 
          </InputHeader>
        </label>
        </div>

         <Button size="medium"className={classes.button}type="submit"onClick={donehandler}>Post</Button>
   
      </div>



   </PostBannerWrapper>

)

}

export default CreatePostBanner;
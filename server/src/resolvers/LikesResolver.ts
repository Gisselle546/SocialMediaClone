import { Resolver, Query, InputType,Field, 
    Mutation,Arg, Authorized, Int, Ctx, UseMiddleware} from "type-graphql";
import { getRepository } from "typeorm";
import {Likes } from '../entity/Likes';
import { Post } from "../entity/Post";
import { TokenContext } from "../utils/context";
import { isAuth } from "../utils/isAuth";

@InputType()
class likesInput{
        
       
    @Field(()=>Int)
    likescounter!:number;
  
    @Field(()=>Int)
    postid!:number;
  
}


@InputType()
class removeInput{
        

  
    @Field(()=>Int)
    postId!:number
  
}

@InputType()
class getpost{
  @Field(()=>Int)
  postId!:number
}





@Resolver()
export class LikesResolver{

    @Query(()=>[Likes])
  
    async likes(
      
    ){
      const likes = await getRepository(Likes)
      .createQueryBuilder("likes")
      .leftJoinAndSelect("likes.post","post")
      .leftJoinAndSelect("likes.user", "user")
      .getMany();
  
       return likes;
  
    }


    @Query(()=>[Likes])

    async likesbypost(
      @Arg("data") data:getpost
    ){
      const likes = await Likes.find({
        relations:["user","post"],
        where:{
          postId:data.postId,
          
        },
      })
      return likes;
    }
        
      
       
    @Mutation (()=>Likes)
    @UseMiddleware(isAuth)
    async createLikes(
        @Arg("data") data: likesInput,
        @Ctx() context:TokenContext,
    ):Promise<Likes>{
        const user =context.payload!.userId
        

        const likes = await Likes.create(
          {
            likesCounter:data.likescounter,
            postId:data.postid,
            userId:parseInt(user)
            

          });
         
       
          await likes.save();

          return likes;
          
       
    }


   @Mutation(()=>Boolean)
   @UseMiddleware(isAuth)
   async removeLikes(
    @Arg("data") data:removeInput,
    @Ctx() context:TokenContext,
   ){
    const removeLike = await Likes.find({
      where:{
        userId: context.payload!.userId,
        postId:data.postId
      }
    })
      console.log(removeLike)
       Likes.remove(removeLike);
   
    
      return true;
    
   }









}
import { Resolver, Query, InputType,Field, 
    Mutation,Arg, Authorized, Int, Ctx, UseMiddleware} from "type-graphql";
import { getRepository } from "typeorm";
import {Likes } from '../entity/Likes';
import { TokenContext } from "../utils/context";
import { isAuth } from "../utils/isAuth";

@InputType()
class likesInput{
        
       
    @Field(()=>Int)
    likescounter!:number;
  
    @Field(()=>Int)
    postid!:number;
  
}

@Resolver()
export class LikesResolver{

    @Query(()=>Likes)
    async Likes(){
        const likes = await Likes.findOne({
            relations:['post','user']
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
        console.log(data)

        const likes = await Likes.create(
          {
            likesCounter:data.likescounter,
            postId:data.postid,
            userId:parseInt(user)
            

          });
         
       
          await likes.save();

          return likes;
          
       
    }


    









}
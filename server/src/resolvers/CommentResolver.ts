import { TokenContext } from './../utils/context';
import { Comment } from '../entity/Comment';
import { Resolver, Query, InputType,Field, 
    Mutation,Arg, Authorized, Int, Ctx, UseMiddleware} from "type-graphql";


import { isAuth } from '../utils/isAuth';
import { Post } from '../entity/Post';
import {getRepository} from "typeorm";


    @InputType()
    class commentInput{
        
       
        @Field()
        description!:string;

        @Field(()=>Int)
        postid!:number;

      
    }

    @InputType()
      class getComments{
        @Field(()=>Int)
        postId!:number
      }
    

    @Resolver()
    export class CommentResolver{
    
        @Query(()=>[Comment])
  
        async comments(
          
        ){
          const comment = await getRepository(Comment)
          .createQueryBuilder("comment")
          .leftJoinAndSelect("comment.post","post")
          .leftJoinAndSelect("comment.user", "user")
          .getMany();
      
           return comment;
      
        }

        @Query(()=>[Comment])

        async commentsbypost(
          @Arg("data") data:getComments
        ){
          const comments = await Comment.find({
            relations:["user"],
            where:{
              postId:data.postId,
              
            },
          })
          return comments;
        }

    
        @Mutation (()=>Comment)
        @UseMiddleware(isAuth)
        async createComment(
          @Arg("data") data:commentInput,
          @Ctx() context:TokenContext,
        ):Promise<Comment>{

          const user =context.payload!.userId
          
      

          const comment= await Comment.create(
            {
              ...data,
              postId:data.postid,
              userId:parseInt(user)
             
            });
            
            return await comment.save()
          }

    
    
    
    
    }
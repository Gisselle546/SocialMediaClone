import { Post } from './../entity/Post';
import { isAuth } from '../utils/isAuth';
import { Resolver, Query, InputType,Field, 
    Mutation,Arg, Authorized, Int, Ctx, UseMiddleware} from "type-graphql";
import { TokenContext } from '../utils/context';
import {getRepository} from "typeorm";


    @InputType()
    class postInput{
        
       
        @Field()
        description!:string;
        
        @Field()
        image?:string;
        
    
      
    }

@Resolver()
export class PostResolver{

    @Query(()=>[Post])
    async posts(
      
    ){
      
      const posts = await getRepository(Post)
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.user", "user")
        .leftJoinAndSelect("post.comments","comments")
        .leftJoinAndSelect("post.likes","likes")
        .getMany();

      return posts;
  
    }

    @Mutation (()=>Post)
    @UseMiddleware(isAuth)
    async createPosts(
        @Arg("data") data: postInput,
        @Ctx() context:TokenContext,
    ):Promise<Post>{
        const user =context.payload!.userId
        

        const post = Post.create(
          {
            ...data,
            userId:parseInt(user)


          });
       
          return await post.save();
       
        
    }

}
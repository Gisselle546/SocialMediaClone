import { accessTokenGenerator } from './../utils/token';
import { getToken } from './../utils/getToken';
import { Resolver, Query, InputType,Field, Mutation,Arg,Ctx } from "type-graphql";
import { IsEmail, MinLength } from "class-validator";
import bcrypt from "bcryptjs";
import { User } from './../entity/User';
import {AuthenticationError } from 'apollo-server-express';
import { TokenContext } from '../utils/context';
import { verify } from "jsonwebtoken";



@InputType()
class RegisterInput{
 
  @Field()
  name!:string;


  @Field()
  username!:string;

 
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(4)
  password!: string;
}

@InputType()
  class LoginInput{
    @Field()
    @IsEmail()
    email!: string;
  
    @Field()
    @MinLength(4)
    password!: string;

  }




@Resolver()
export class UserResolver {



    @Query(() => [User])
    async users(){
       const user = await User.find({});


       return user;
    }


    @Query(()=>User)
    
      async me(
        @Ctx() context:TokenContext
      ){
       
    
          const authorization = context.req.headers['authorization']
          console.log(authorization)
          if (!authorization) {
            return null;
          }
      
          try {
            const token = authorization.split(" ")[1];
            const payload: any = verify(token, process.env.JWT_SECRET!);
            
            return User.findOne(payload.userId);
          } catch (err) {
            console.log(err);
            return null;
          }
      }
    

    @Mutation(()=>getToken)
  async register(
    @Arg("data") data: RegisterInput,
  ): Promise<getToken> {

    const user = User.create(data)

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(user.password,salt);
    user.password = hash;
    
    
    await user.save();
   
     
  return{
    accessToken:accessTokenGenerator(user),
    user
  }

  }

  
  @Mutation(()=>getToken)
  async login(
    @Arg("data") data:LoginInput
  ):Promise<getToken>{

  
    const user = await User.findOne({where: { email: data.email } })
 
    if (!user) {
      throw new AuthenticationError ('No Registered User');
    }
  
    const match = await bcrypt.compare(data.password, user.password);
  
    if (!match) {
      throw new AuthenticationError ("Bad password");
    }
  
  
    return{
      accessToken:accessTokenGenerator(user),
      user
      }
  
  }



}
import { Product } from './../entity/Product';
import {Size} from '../utils/sizeEnum'
import { Resolver, Query, InputType,Field, 
    Mutation,Arg, Authorized, Int, Ctx, UseMiddleware} from "type-graphql";
import { getRepository, ILike} from 'typeorm';




    @InputType()
    class productInput{
        
       
       
        @Field()
        title!:string; 
    
        @Field()
        image!:string;

        @Field()
        description!:string;
        
        @Field()
        price!:number;
    
      
    }

    @Resolver()
    export class ProductResolver{

        @Query(()=>[Product])
        async products(
          
        ){
          
          const products = await Product.find({})
          return products;
      
        }

        @Query(()=>[Product])
        async search(
            @Arg("data") data:string
        ){
            
            const product = await getRepository(Product)
            .find({
                title: ILike(`%${data}%`)
            });

                return product;
           
        }


        @Query(()=>Product)
        async productId(
            @Arg("data") data:number
        ){
            const product = await getRepository(Product)
            .findOne({
                id:data
            });
            

            if (product === undefined) {
                throw new Error;
              }

              


            return product;
        }


        @Mutation(()=>Product)
        async createProducts(
            @Arg("data") data: productInput
        ):Promise<Product>{

            const product = Product.create(data);
            
            await product.save()
           
            return product;
        }



}
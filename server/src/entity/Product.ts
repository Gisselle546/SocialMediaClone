import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
   
   
  } from "typeorm";
  import { Field, Int, ObjectType } from "type-graphql";
  import{Size} from '../utils/sizeEnum';

  @ObjectType()
  @Entity()
  export class Product extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column("enum", { enum: Size})
    size!: string;

    @Field()
    @Column()
    title!:string;

    @Field(()=>[String])
    @Column("text",{nullable:true, array: true })
    images?: string[];


    @Field()
    @Column( { type: "numeric",default:0.00})
    price!:number;

    @Field()
    @Column()
    description!:string;


  }
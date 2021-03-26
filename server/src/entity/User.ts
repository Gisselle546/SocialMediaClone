import { Post } from './Post';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany
   
  } from "typeorm";
  
  import { Field, Int, ObjectType } from "type-graphql";

  @ObjectType()
  @Entity()
  export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!:string;

    @Field()
    @Column()
    username!:string;

    @Field()
    @Column('text', {
      default: 'https://img.icons8.com/fluent/48/000000/user-male-circle.png',
    })
    avatar!:string;
  
  
    @Field()
    @Column({unique:true})
    email!:string;
  
    @Field()
    @Column()
    password!: string;
  
  
  
    
  
  }
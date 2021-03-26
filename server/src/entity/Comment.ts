import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    RelationId
   
  } from "typeorm";
  import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { Post } from "./Post";


  @ObjectType()
  @Entity()
  export class Comment extends BaseEntity { 
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    description!:string;


    @Field(type => User)
    @ManyToOne(type => User)
    user?: User;
    @RelationId((comment: Comment) => comment.user)
    @Column('int',{nullable:true})
    userId?: number;


    @Field(()=>Post)
    @ManyToOne(()=>Post)
    post?:Post
    @RelationId((comment: Comment) => comment.post)
    @Column('int',{nullable:true})
    postId?:number;
   



  }
import {Post} from '../entity/Post';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
    ManyToOne,
    RelationId,
   
   
  } from "typeorm";
  import { Field, Int, ObjectType } from "type-graphql";
import { User } from './User';

  @ObjectType()
  @Entity()
  export class Likes extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(type => User)
    @ManyToOne(type => User)
    user?: User;
    @RelationId((likes: Likes) => likes.user)
    
    @Field()
    @Column('int',{nullable:true})
    userId?: number;

    
    @Field()
    @Column('int',{nullable:true, default:0})
    likesCounter!:number;

    @Field(()=>Post)
    @ManyToOne(()=>Post,post=>post.likes)
    post?:Post
    @Column('int',{nullable:true})
    postId?:number;
   
   




  }
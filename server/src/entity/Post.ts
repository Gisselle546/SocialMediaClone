import{Likes} from './Likes';

import { Comment } from './Comment';
import { User } from './User';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    OneToMany,
    RelationId,
    CreateDateColumn,
    Like,
    OneToOne,
    JoinColumn,
   
   
  } from "typeorm";
  import { Field, Int, ObjectType } from "type-graphql";

  @ObjectType()
  @Entity()
  export class Post extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    description!:string;

    
    @Field()
    @CreateDateColumn()
     createdAt!: string;
    

    @Field()
    @Column()
    image?:string;

    @Field(type => User)
    @ManyToOne(type => User)
    user?: User;
    @RelationId((post: Post) => post.user)
    @Column('int',{nullable:true})
    userId?: number;


    @Field(type => [Comment])
    @Column('int',{nullable:true})
    @OneToMany(type => Comment, comment => comment.post)
    comments?: Comment[];
  
    @Field(type => [Likes])
    @Column('int',{nullable:true})
    @OneToMany(type => Likes, likes => likes.post)
    likes?: Likes[];

  }
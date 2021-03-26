import { buildSchema } from "type-graphql";
import { UserResolver } from '../resolvers/UserResolver';
import { CommentResolver } from './../resolvers/CommentResolver';
import { PostResolver } from './../resolvers/PostResolver';
import { ProductResolver } from './../resolvers/ProductResolver';
import { LikesResolver } from './../resolvers/LikesResolver';

export const createSchema = () =>
  buildSchema({
    resolvers: [
      UserResolver,
      PostResolver,
      CommentResolver,
      ProductResolver,
      LikesResolver
    ]
  });
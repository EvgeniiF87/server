import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQLError } from 'graphql';
import { join } from 'path';

export const GraphqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  playground: false,
  // playground: {
  //   settings: { 'request.credentials': 'include' },
  // },
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  includeStacktraceInErrorResponses: false,
  formatError: (err: GraphQLError) => {
    return {
      message: err.message,
      extensions: err.extensions,
    };
  },
};

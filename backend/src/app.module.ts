import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { EventModule } from "./event/event.module";
import { TagModule } from "./tag/tag.module";
import { CostOptionsModule } from "./cost-options/cost-options.module";
import { ImagesModule } from "./images/images.module";
import { PlaceModule } from "./place/place.module";
import { InfoModule } from "./info/info.module";
import { EventPlaceTagsModule } from "./event_place_tags/event_place_tags.module";
import { EventPlaceCostOptionsModule } from "./event_place_cost_options/event_place_cost_options.module";
import { InterestingCollectionModule } from "./interesting_collection/interesting_collection.module";
import { InterestingCollectionSelectionsModule } from "./interesting_collection_selections/interesting_collection_selections.module";
import { InterestingCategoriesModule } from "./interesting_categories/interesting_categories.module";
import { InterestingCategorySelectModule } from "./interesting_category_select/interesting_category_select.module";
import { join } from "path";
import { RoleModule } from "./role/role.module";
import { GraphQLError } from "graphql";
import { AuthModule } from "./auth/auth.module";
import { TokensModule } from "./tokens/tokens.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      playground: true,
      includeStacktraceInErrorResponses: false,
      formatError: (err: GraphQLError) => {
        return {
          message: err.message,
          extensions: err.extensions,
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<"aurora-postgres">("TYPEORM_CONNECTION"),
        username: config.get<string>("TYPEORM_USERNAME"),
        password: config.get<string>("TYPEORM_PASSWORD"),
        database: config.get<string>("TYPEORM_DATABASE"),
        port: config.get<number>("TYPEORM_PORT"),
        entities: [__dirname + "dist/**/*.entity{.ts,.js}"],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    UserModule,
    EventModule,
    TagModule,
    CostOptionsModule,
    ImagesModule,
    PlaceModule,
    InfoModule,
    EventPlaceTagsModule,
    EventPlaceCostOptionsModule,
    InterestingCollectionModule,
    InterestingCollectionSelectionsModule,
    InterestingCategoriesModule,
    InterestingCategorySelectModule,
    RoleModule,
    AuthModule,
    TokensModule,
  ],
})
export class AppModule {}

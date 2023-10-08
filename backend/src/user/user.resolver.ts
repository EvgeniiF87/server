import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";
import { UpdateUserInput } from "./dto/update-user.input";
import { CreateUserInput } from "./dto/create-user.input";
import CountResponse from "src/response/count-response";

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => CountResponse, { name: "getUsersCount" })
  getCount() {
    const count = this.userService.getCount();
    return { count };
  }

  @Query(() => [UserEntity], { name: "users" })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserEntity, { name: "user" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => UserEntity)
  createManagers(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.userService.createManagers(createUserInput);
  }

  @Mutation(() => UserEntity)
  updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserEntity)
  removeUser(@Args("id", { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}

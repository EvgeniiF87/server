import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { InterestingCategorySelectService } from "./interesting_category_select.service";
import { InterestingCategorySelectEntity } from "./entities/interesting_category_select.entity";
import { CreateInterestingCategorySelectInput } from "./dto/create-interesting_category_select.input";
import { UpdateInterestingCategorySelectInput } from "./dto/update-interesting_category_select.input";

@Resolver(() => InterestingCategorySelectEntity)
export class InterestingCategorySelectResolver {
  constructor(
    private readonly interestingCategorySelectService: InterestingCategorySelectService
  ) {}

  @Mutation(() => InterestingCategorySelectEntity)
  createInterestingCategorySelect(
    @Args("createInterestingCategorySelectInput")
    createInterestingCategorySelectInput: CreateInterestingCategorySelectInput
  ) {
    return this.interestingCategorySelectService.create(
      createInterestingCategorySelectInput
    );
  }

  @Query(() => [InterestingCategorySelectEntity], {
    name: "interestingCategorySelect",
  })
  findAll() {
    return this.interestingCategorySelectService.findAll();
  }

  @Query(() => InterestingCategorySelectEntity, {
    name: "interestingCategorySelect",
  })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.interestingCategorySelectService.findOne(id);
  }

  @Mutation(() => InterestingCategorySelectEntity)
  updateInterestingCategorySelect(
    @Args("updateInterestingCategorySelectInput")
    updateInterestingCategorySelectInput: UpdateInterestingCategorySelectInput
  ) {
    return this.interestingCategorySelectService.update(
      updateInterestingCategorySelectInput.id,
      updateInterestingCategorySelectInput
    );
  }

  @Mutation(() => InterestingCategorySelectEntity)
  removeInterestingCategorySelect(@Args("id", { type: () => Int }) id: number) {
    return this.interestingCategorySelectService.remove(id);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlaceService } from './place.service';
import { PlaceEntity } from './entities/place.entity';
import { CreatePlaceInput } from './dto/create-place.input';
import { UpdatePlaceInput } from './dto/update-place.input';
import { PlaceDirections } from './directions';
import RemoveResponse from 'src/response/remove-response';
import { Role } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/role/role-types';
import CountResponse from 'src/response/count-response';

@Resolver(() => PlaceEntity)
export class PlaceResolver {
  constructor(private readonly placeService: PlaceService) {}

  @Query(() => CountResponse, { name: 'getPlacesCount' })
  getCount() {
    const count = this.placeService.getCount();
    return { count };
  }

  @Role(
    Roles.Admin,
    Roles.Manager,
    Roles.Place_manager,
    Roles.Junior_place_manager,
    Roles.Client,
    Roles.User,
  )
  @Mutation(() => PlaceEntity)
  createPlace(@Args('createPlaceInput') createPlaceInput: CreatePlaceInput) {
    return this.placeService.create(createPlaceInput);
  }

  @Role(
    Roles.Admin,
    Roles.Manager,
    Roles.Place_manager,
    Roles.Junior_place_manager,
    Roles.Client,
    Roles.Client_manager,
    Roles.User,
  )
  @Query(() => [PlaceEntity], { name: 'placesDashboard' })
  findAllDashboard(
    @Args('direction', { type: () => PlaceDirections, nullable: true })
    direction?: PlaceDirections,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ) {
    return this.placeService.findAll(direction, take, skip);
  }

  @Query(() => [PlaceEntity], { name: 'places' })
  findAll(
    @Args('direction', { type: () => PlaceDirections, nullable: true })
    direction?: PlaceDirections,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ) {
    return this.placeService.findAll(direction, take, skip);
  }

  @Role(
    Roles.Admin,
    Roles.Manager,
    Roles.Place_manager,
    Roles.Junior_place_manager,
    Roles.Client,
    Roles.Client_manager,
    Roles.User,
  )
  @Query(() => PlaceEntity, { name: 'placeDashboard' })
  findOneDashboard(@Args('id', { type: () => Int }) id: number) {
    return this.placeService.findOne(id);
  }

  @Query(() => PlaceEntity, { name: 'place' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.placeService.findOne(id);
  }

  @Role(
    Roles.Admin,
    Roles.Manager,
    Roles.Place_manager,
    Roles.Junior_place_manager,
    Roles.Client,
    Roles.Client_manager,
    Roles.User,
  )
  @Query(() => [PlaceEntity], { name: 'userPlaces' })
  userPlaces(@Args('id', { type: () => Int }) id: number) {
    return this.placeService.findAllUserPaces(id);
  }

  @Role(Roles.Admin, Roles.Manager, Roles.Place_manager, Roles.Client)
  @Mutation(() => PlaceEntity)
  publishPlace(@Args('id', { type: () => Int }) id: number) {
    return this.placeService.publish(id);
  }

  @Role(Roles.Admin, Roles.Manager, Roles.Place_manager, Roles.Client)
  @Mutation(() => PlaceEntity)
  updatePlace(@Args('updatePlaceInput') updatePlaceInput: UpdatePlaceInput) {
    return this.placeService.update(updatePlaceInput.id, updatePlaceInput);
  }

  @Mutation(() => PlaceEntity)
  updatePlaceViews(@Args('id', { type: () => Int }) id: number) {
    return this.placeService.updateViews(id);
  }

  @Role(Roles.Admin)
  @Mutation(() => RemoveResponse)
  removePlace(@Args('id', { type: () => Int }) id: number) {
    return this.placeService.remove(id);
  }
}

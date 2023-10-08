import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { EventService } from "./event.service";
import { EventEntity } from "./entities/event.entity";
import { CreateEventInput } from "./dto/create-event.input";
import { UpdateEventInput } from "./dto/update-event.input";
import { EventDirections } from "./directions";
import RemoveResponse from "src/response/remove-response";
import CountResponse from "src/response/count-response";

@Resolver(() => EventEntity)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(() => CountResponse, { name: "getEventsCount" })
  getCount() {
    const count = this.eventService.getCount();
    return { count };
  }

  @Mutation(() => EventEntity)
  createEvent(@Args("createEventInput") createEventInput: CreateEventInput) {
    return this.eventService.create(createEventInput);
  }

  @Query(() => [EventEntity], { name: "eventsDashboard" })
  findAllDashboard(
    @Args("direction", { type: () => EventDirections, nullable: true })
    direction?: EventDirections,
    @Args("take", { type: () => Int, nullable: true }) take?: number,
    @Args("skip", { type: () => Int, nullable: true }) skip?: number
  ) {
    return this.eventService.findAll(direction, take, skip);
  }

  @Query(() => [EventEntity], { name: "events" })
  findAll(
    @Args("direction", { type: () => EventDirections, nullable: true })
    direction?: EventDirections,
    @Args("take", { type: () => Int, nullable: true }) take?: number,
    @Args("skip", { type: () => Int, nullable: true }) skip?: number
  ) {
    return this.eventService.findAll(direction, take, skip);
  }

  @Query(() => EventEntity, { name: "eventDashboard" })
  findOneDashboard(@Args("id", { type: () => Int }) id: number) {
    return this.eventService.findOne(id);
  }

  @Query(() => EventEntity, { name: "event" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.eventService.findOne(id);
  }

  @Query(() => [EventEntity], { name: "userEvents" })
  userEvents(@Args("id", { type: () => Int }) id: number) {
    return this.eventService.findAllUserEvents(id);
  }

  @Mutation(() => EventEntity)
  publishPlace(@Args("id", { type: () => Int }) id: number) {
    return this.eventService.publish(id);
  }

  @Mutation(() => EventEntity)
  updateEvent(@Args("updateEventInput") updateEventInput: UpdateEventInput) {
    return this.eventService.update(updateEventInput.id, updateEventInput);
  }

  @Mutation(() => EventEntity)
  updateEventViews(@Args("id", { type: () => Int }) id: number) {
    return this.eventService.updateViews(id);
  }

  @Mutation(() => RemoveResponse)
  removeEvent(@Args("id", { type: () => Int }) id: number) {
    return this.eventService.remove(id);
  }
}

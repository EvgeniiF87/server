import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import Tokens from './response';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { SignInInput } from './dto/signin.dto';

@Resolver(() => Tokens)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Tokens)
  signIn(@Args('signinUserInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }

  @Mutation(() => Tokens)
  registrationUser(
    @Args('registrationUserInput') createUserInput: CreateUserInput,
  ) {
    return this.authService.registrationUser(createUserInput);
  }

  @Mutation(() => Tokens)
  registrationMeneger(
    @Args('registrationUserInput') createUserInput: CreateUserInput,
  ) {
    return this.authService.registrationMeneger(createUserInput);
  }
}

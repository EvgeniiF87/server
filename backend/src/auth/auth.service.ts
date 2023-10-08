import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { SignInInput } from './dto/signin.dto';
import { TokensService } from 'src/tokens/tokens.service';

enum RegistrationType {
  User = 'user',
  Manager = 'manager',
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokensService: TokensService,
  ) {}

  async signIn(signinInput: SignInInput) {
    const user = await this.validateUser(signinInput);
    const token = this.generateTokens(user);

    return {
      token: token.token,
      userId: user.id,
      role: user.role.name,
    };
  }

  private async registration(
    createUserInput: CreateUserInput,
    registration_type: RegistrationType,
  ) {
    const { email, password } = createUserInput;
    const newUser = await this.userService.isExist(email);

    if (newUser) {
      throw new ConflictException(`email ${email} уже занят`);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const values = { ...createUserInput, password: hashPassword };
    let createdUser: UserEntity;

    switch (registration_type) {
      case RegistrationType.User:
        createdUser = await this.userService.create(values);
        break;
      case RegistrationType.Manager:
        createdUser = await this.userService.createManagers(values);
        break;
    }

    const user = await this.userService.findOne(createdUser.id);

    const token = this.generateTokens(user);
    const refresh_token = await this.tokensService.generateRefreshToken(
      user.id,
    );

    await this.tokensService.create(refresh_token);

    return {
      token: token.token,
      userId: user.id,
      role: user.role.name,
    };
  }

  async registrationUser(createUserInput: CreateUserInput) {
    return await this.registration(createUserInput, RegistrationType.User);
  }

  async registrationMeneger(createUserInput: CreateUserInput) {
    return await this.registration(createUserInput, RegistrationType.Manager);
  }

  private generateTokens(user: UserEntity) {
    const payload = { id: user.id, role: user.role.name };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  private async validateUser(signinInput: SignInInput) {
    try {
      const user = await this.userService.isExist(signinInput.email);
      const passwordEquals = await bcrypt.compare(
        signinInput.password,
        user.password,
      );

      if (user && passwordEquals) return user;
      throw new UnauthorizedException('Не верный логин или пароль');
    } catch (e) {
      throw new UnauthorizedException('Не верный логин или пароль');
    }
  }
}

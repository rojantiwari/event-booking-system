import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSignupDto } from './create-user-signup.dto';


export class UpdateUserDto extends PartialType(CreateUserSignupDto) { }

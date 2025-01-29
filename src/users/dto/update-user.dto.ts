import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSignupDTO } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserSignupDTO) { }

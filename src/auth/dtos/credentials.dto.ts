import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CredentialsDto {
  @IsEmail()
  readonly email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(24)
  // https://gist.github.com/arielweinberger/18a29bfa17072444d45adaeeb8e92ddc
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lower case letter, and 1 number or special character',
  })
  readonly password!: string;
}

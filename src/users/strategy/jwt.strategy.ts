
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prismaService/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt',
)
{
    constructor(
        config: ConfigService,
        private prisma: PrismaService

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>('secret'),
        });
    }
    async validate(payload: { sub: number, email: string }) {

        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        })

        return user;
    }
}

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()

export class SetTokenService {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService
    ) {

    }
    //sign token
    signToken(
        userId: number,
        email: string
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }

        const secret = this.configService.get('secret')

        return this.jwtService
            .signAsync(payload, {
                expiresIn: '15m',
                secret: secret,
            })
            .then((token) => ({
                access_token: token,
            }));
    }
}
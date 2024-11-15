import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './infra/env/env';
import { EnvService } from './infra/env/env.service';
import { AuthModule } from './infra/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule
  ],
  providers: [
    EnvService
  ]
})
export class AppModule { }

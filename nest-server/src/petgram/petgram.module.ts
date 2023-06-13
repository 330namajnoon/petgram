import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { PetgramService } from './petgram/petgram.service';

@Module({
  controllers: [LoginController],
  providers: [PetgramService],
})
export class PetgramModule {}

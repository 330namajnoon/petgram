import { Module } from '@nestjs/common';
import { PetgramModule } from './petgram/petgram.module';

@Module({
  imports: [PetgramModule],
})
export class AppModule {}

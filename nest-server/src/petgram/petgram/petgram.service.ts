import { Injectable } from '@nestjs/common';

@Injectable()
export class PetgramService {
  mysql = require('mysql');
}

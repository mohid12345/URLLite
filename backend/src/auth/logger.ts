import { Injectable, LoggerService } from '@nestjs/common';
import * as morgan from 'morgan';

@Injectable()
export class MorganLoggerService implements LoggerService {
  private logger = morgan('combined'); // You can use other formats here

  log(message: string) {
    console.log(message);
  }

  error(message: string, trace: string) {
    console.error(message, trace);
  }

  warn(message: string) {
    console.warn(message);
  }

  debug(message: string) {
    console.debug(message);
  }

  verbose(message: string) {
    console.log(message);
  }

  getLogger() {
    return this.logger;
  }
}

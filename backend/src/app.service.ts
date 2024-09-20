import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    console.log(
      "jiiiiii"
    )
    return 'Hello World!';
  } 

  getHome(data:any):string{
    console.log(data)
    return "home "
  }

  


}

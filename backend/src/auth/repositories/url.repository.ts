import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from '../schemas/urlSchema';
import { IUrlRepository } from './interfaces/url.repository.interface';

@Injectable()
export class UrlRepository implements IUrlRepository {
  constructor(@InjectModel(Url.name) private readonly urlModel: Model<Url>) { }

  async create(url: Partial<Url>): Promise<Url> {
    const newUrl = new this.urlModel(url);
    return newUrl.save();
  }
  async findByUrl(longUrl: string): Promise<Url | null> {
    return this.urlModel.findOne({ longUrl }).exec();
  }

  async findLongUrlFromShort(shortUrl: string): Promise<Url | null> {
    return this.urlModel.findOne({ shortUrl }).exec()
  }
  async findByUserId(userId: string): Promise<Url[]> {
    return this.urlModel.find({ userId }).exec();
  }
}
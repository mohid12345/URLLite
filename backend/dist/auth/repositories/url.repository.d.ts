import { Model } from 'mongoose';
import { Url } from '../schemas/urlSchema';
import { IUrlRepository } from './interfaces/url.repository.interface';
export declare class UrlRepository implements IUrlRepository {
    private readonly urlModel;
    constructor(urlModel: Model<Url>);
    create(url: Partial<Url>): Promise<Url>;
    findByUrl(longUrl: string): Promise<Url | null>;
    findLongUrlFromShort(shortUrl: string): Promise<Url | null>;
    findByUserId(userId: string): Promise<Url[]>;
    deleteByShortUrl(shortUrl: string): Promise<any>;
    deleteAllByUserId(userId: string): Promise<void>;
}

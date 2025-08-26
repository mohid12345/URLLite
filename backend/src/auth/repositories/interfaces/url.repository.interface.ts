import { Url } from "src/auth/schemas/urlSchema";

export const IUrlRepositoryToken = 'IUrlRepository'; // define and export a constant token for each interface. 

export interface IUrlRepository {
    create(url: Partial<Url>): Promise<Url>; //longUrl, shortUrl and userId is passed 
    findByUrl(url: string): Promise<Url>
    findLongUrlFromShort(key: string): Promise<Url>

    findByUserId(userId: string): Promise<Url[] | null>;
    deleteByShortUrl(url: string): Promise<any>;
    deleteAllByUserId(userId: string): Promise<void>;
}
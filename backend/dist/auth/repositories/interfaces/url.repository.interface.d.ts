import { Url } from "src/auth/schemas/urlSchema";
export declare const IUrlRepositoryToken = "IUrlRepository";
export interface IUrlRepository {
    create(url: Partial<Url>): Promise<Url>;
    findByUrl(url: string): Promise<Url>;
    findLongUrlFromShort(key: string): Promise<Url>;
    findByUserId(userId: string): Promise<Url[] | null>;
}

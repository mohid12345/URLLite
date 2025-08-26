import { Document } from 'mongoose';
export declare class Url extends Document {
    shortUrl: String;
    longUrl: String;
    userId: String;
    createdAt: Date;
    count: Number;
}
export declare const UrlSchema: import("mongoose").Schema<Url, import("mongoose").Model<Url, any, any, any, Document<unknown, any, Url> & Url & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Url, Document<unknown, {}, import("mongoose").FlatRecord<Url>> & import("mongoose").FlatRecord<Url> & Required<{
    _id: unknown;
}>>;

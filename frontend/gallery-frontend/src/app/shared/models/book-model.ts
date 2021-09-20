import { PhotoModel } from "./photo-model";

export class BookModel {
    id?: number;
    title: string = '';
    description: string = '';
    cover_image: string = '';
    creator: string = '';
    photos: PhotoModel[] = [];

    toCreate(
        title: string,
        description: string,
        cover_image: string,
        creator: string,
    ) {
        this.title = title;
        this.description = description;
        this.cover_image = cover_image;
        this.creator = creator;
    }
}

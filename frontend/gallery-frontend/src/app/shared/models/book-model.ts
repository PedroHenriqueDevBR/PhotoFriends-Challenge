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

    noAcceptedImages(): PhotoModel[] {
        let response: PhotoModel[] = [];
        for (let photo of this.photos) {
            if (photo.acepted == false) {
                response.push(photo);
            }
        }
        return response;
    }

    acceptedImages(): PhotoModel[] {
        let response: PhotoModel[] = [];
        for (let photo of this.photos) {
            if (photo.acepted == true) {
                response.push(photo);
            }
        }
        return response;
    }
}

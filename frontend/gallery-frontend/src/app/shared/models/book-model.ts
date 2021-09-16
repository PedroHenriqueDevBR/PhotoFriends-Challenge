export class BookModel {
    id?: number;
    title: string = '';
    description: string = '';
    cover_image: string = '';
    creator: string = '';
    images: string[] = [];

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

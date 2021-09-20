export class PhotoModel {
    id?: number;
    url: string;
    acepted: boolean = false;
    book?: number;

    constructor(url: string) {
        this.url = url;
    }

}

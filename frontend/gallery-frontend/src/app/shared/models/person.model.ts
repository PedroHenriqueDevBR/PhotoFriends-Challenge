import { BookModel } from "./book-model";

export class PersonModel {
    id?: number;
    name: String = '';
    username: String = '';
    password: String = '';
    image: String = '';
    friends: PersonModel[] = [];
    spouse?: string;
    books: BookModel[] = [];

    public setLogin(
        username: String,
        password: String,
    ): void {
        this.username = username;
        this.password = password;
    }

    public setRregister(
        name: String,
        username: String,
        password: String,
        image: String,
    ): void {
        this.name = name;
        this.username = username;
        this.password = password;
        this.image = image;
    }

    public toLogin() {
        return {
            username: this.username,
            password: this.password,
        }
    }

    public toRegister() {
        return {
            name: this.name,
            username: this.username,
            password: this.password,
        }
    }
}
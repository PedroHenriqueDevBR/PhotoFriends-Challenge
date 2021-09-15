export class PersonModel {
    name: String = '';
    username: String = '';
    password: String = '';
    image: String = '';
    friends: PersonModel[] = [];
    spouse?: PersonModel;

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
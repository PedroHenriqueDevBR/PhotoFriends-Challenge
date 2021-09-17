import { PersonModel } from "./person.model";

export class InvitationModel {
    id: number;
    person: PersonModel;

    constructor(
        id: number,
        person: PersonModel,
    ) {
        this.id = id;
        this.person = person;
    }
}

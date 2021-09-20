export class CommentModel {
    id?: number;
    person: string = "";
    content: string = "";

    toCreate() {
        return {
            "content": this.content,
        }
    }
}
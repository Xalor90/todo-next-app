export class TodoTask {
    constructor(text, completed = false) {
        this.text = text;
        this.completed = completed;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
}
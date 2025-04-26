import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Register");
    }

    async getHtml() {
        return `
            <h1 style="text-align: center">Register Page</h1>
        `;
    }
}
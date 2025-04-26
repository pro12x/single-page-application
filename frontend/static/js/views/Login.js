import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Login");
    }

    async getHtml() {
        return `
            <h1 style="text-align: center">Login Page</h1>
        `;
    }
}
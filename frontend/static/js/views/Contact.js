import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Contact");
    }

    async getHtml() {
        return `
            <h1 style="text-align: center">Contact Page</h1>
        `;
    }
}
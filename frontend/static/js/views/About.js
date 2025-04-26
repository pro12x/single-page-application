import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("About");
    }

    async getHtml() {
        return `
            <h1 style="text-align: center">About Page</h1>
        `;
    }
}
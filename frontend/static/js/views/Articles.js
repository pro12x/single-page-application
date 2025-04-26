import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Articles");
    }

    async getHtml() {
        return `
            <h1 style="text-align: center">Articles Page</h1>
        `;
    }
}
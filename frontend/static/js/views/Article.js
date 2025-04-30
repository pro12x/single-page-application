import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Article");
    }

    async getHtml() {
        console.log(this.params.id)
        return `
            <h1 style="text-align: center">Article Page</h1>
        `;
    }
}
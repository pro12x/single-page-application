import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("My Sample");
    }

    async getHtml() {
        return `
            <h1 style="text-align: center">Welcome to My Sample</h1>
            <p style="text-align: center">This is a simple HTML template.</p>
            <p style="text-align: center">Feel free to modify it as per your needs.</p>
            <p style="text-align: center">Enjoy coding!</p>
            <p style="text-align: center">For more information, visit the <a href="https://pro12x.github.io/folio#contact" target="_blank">official website</a>.</p>
        `;
    }
}
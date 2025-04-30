import AbstractView from "./AbstractView.js";
import { navigateTo } from "../index.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Login");
    }

    async getHtml() {
        return `
            <h1 class="form__title">Login</h1>
            <form class="auth__form" id="login-form">
                <div class="form__group">
                    <label for="email">Email</label>
                    <input autocomplete="off" type="email" id="email" name="email"/>
                </div>
                <div class="form__group">
                    <label for="password">Password</label>
                    <input autocomplete="off" type="password" id="password" name="password"/>
                </div>
                <div class="form__group">
                    <button>Login</button>
                </div>
                <div class="form__group">
                    <p>
                        Don't have an account? <a href="/register" data-link>Register</a>
                    </p>
                </div>
                <span id="error"></span>
            </form>
        `
    }

    async init() {
        const form = document.querySelector('form#login-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                try {
                    const response = await fetch("/api/login", { // il manque le / ici
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

                    const data = await response.json();
                    if (response.ok) {
                        console.log("Logged in as " + data.role);
                        navigateTo("/");
                    } else {
                        console.error(data.message);
                        document.getElementById('error').innerText = data.message;
                    }
                } catch (e) {
                    document.getElementById('error').innerText = "An error occurred. Please try again.";
                }
            });
        }
    }
}
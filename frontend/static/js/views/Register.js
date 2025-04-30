import AbstractView from "./AbstractView.js";
import {navigateTo} from "../index.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Register");
    }

    async getHtml() {
        return `
            <h1 class="form__title">Register</h1>
            <form class="auth__form" id="register-form">
                <div class="form__group">
                    <label for="firstname">First name</label>
                    <input type="text" autocomplete="off" id="firstname" name="firstname"/>
                </div>
                <div class="form__group">
                    <label for="lastname">Last name</label>
                    <input type="text" autocomplete="off" id="lastname" name="lastname"/>
                </div>
                <div class="form__group">
                    <label for="email">Email</label>
                    <input type="email" autocomplete="off" id="email" name="email"/>
                </div>
                <div class="form__group">
                    <label for="password">Password</label>
                    <input type="password" autocomplete="off" id="password" name="password"/>
                </div>
                <div class="form__group">
                    <label for="phone">Phone number</label>
                    <input type="tel" autocomplete="off" id="phone" name="phone"/>
                </div>
                <div class="form__group">
                    <label for="role">Role</label>
                    <select autocomplete="off" id="role" name="role">
                        <option value="CLIENT" selected>CLIENT</option>
                        <option value="SELLER">SELLER</option>
                    </select>
                </div>
                <div class="form__group">
                    <label for="address">Address</label>
                    <input type="text" autocomplete="off" id="address" name="address"/>
                </div>
                <div class="form__group">
                    <button type="submit">Register</button>
                </div>
                <div class="form__group">
                    <p>
                        Already have an account? <a href="/login" data-link>Login</a>
                    </p>
                </div>
                <span id="error"></span>
            </form>
        `
    }

    async init() {
        const form = document.querySelector('form#register-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const formData = {
                    firstname: document.getElementById('firstname').value.trim(),
                    lastname: document.getElementById('lastname').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    password: document.getElementById('password').value.trim(),
                    phone: document.getElementById('phone').value.trim(),
                    role: document.getElementById('role').value.trim(),
                    address: document.getElementById('address').value.trim()
                };

                console.table(formData)

                try {
                    const response = await fetch("/api/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    });

                    const data = await response.json();
                    if (response.ok) {
                        console.log("Registered successfully. Login to continue.");
                        navigateTo("/login");
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
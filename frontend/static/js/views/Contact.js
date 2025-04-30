import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Contact");
    }

    async getHtml() {
        return `
            <h1 class="form__title">Contact Me</h1>
            <div class="contact__container">
                <div class="contact__infoline">
                    <div class="contact__info">
                        <h2 class="contact__info__title">Location</h2>
                        <p class="contact__info__text">Senegal, DK</p>
                    </div>
                    <div class="contact__info">
                        <h2 class="contact__info__title">Phone</h2>
                        <p class="contact__info__text">(221) 77 860 19 90</p>
                    </div>
                    <div class="contact__info">
                        <h2 class="contact__info__title">Email</h2>
                        <p class="contact__info__text">janelaffranchis@gmail.com</p>
                    </div>
                    <div class="contact__info">
                        <h2 class="contact__info__title">Social Media</h2>
                        <p class="contact__info__text">
                            <a href="https://www.linkedin.com/in/janel-affranchis/" target="_blank">LinkedIn</a> |
                            <a href="https://github.com/pro12x" target="_blank">Github</a>
                        </p>
                    </div>
                </div>
                <div class="contact__form">
                    <form>
                        <div class="input__box">
                            <input autocomplete="off" type="text" id="name" name="name" placeholder="Full Name">
                            <input autocomplete="off" type="email" id="email" name="email" placeholder="Email Address">
                        </div>
                        <div class="input__box">
                            <input autocomplete="off" type="tel" id="phone" name="phone" placeholder="Phone Number">
                            <input autocomplete="off" type="text" id="subject" name="subject" placeholder="Subject">
                        </div>
                        <textarea autocomplete="off" id="message" name="message" placeholder="Your Message"></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        `;
    }
}
import Home from "./views/Home.js";
import Articles from "./views/Articles.js";
import About from "./views/About.js";
import Login from "./views/Login.js";
import Register from "./views/Register.js";

const navigateTo = path => {
    history.pushState(null, null, path)
    router().then(_ => console.log)
}

const router = async () => {
    const routes = [
        {
            path: "/",
            view: Home
        },
        {
            path: "/articles",
            view: Articles
        },
        {
            path: "/articles/:id",
            view: Articles
        },
        {
            path: "/about",
            view: About
        },
        {
            path: "/login",
            view: Login
        },
        {
            path: "/register",
            view: Register
        }
    ]

    // Test each route for a potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    })

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }

    const view = new match.route.view()

    document.querySelector("#app").innerHTML = await view.getHtml()
}

window.addEventListener("popstate", () => router)

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault()
            navigateTo(e.target.href)
        }
    })

    router().then(_ => console.log)
})
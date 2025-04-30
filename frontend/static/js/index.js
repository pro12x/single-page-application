import Home from "./views/Home.js";
import Articles from "./views/Articles.js";
import About from "./views/About.js";
import Login from "./views/Login.js";
import Register from "./views/Register.js";
import Article from "./views/Article.js";
import Contact from "./views/Contact.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

const getParams = match => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1])

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]]
    }))
}

export const navigateTo = path => {
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
            view: Article
        },
        {
            path: "/about",
            view: About
        },
        {
            path: "/contact",
            view: Contact
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
            result: location.pathname.match(pathToRegex(route.path))
        }
    })

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null)

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        }
    }

    const view = new match.route.view(getParams(match))

    document.querySelector("#app").innerHTML = await view.getHtml()

    await view.init?.()
}

/*async function register(firstname, lastname, email, password, phone, role) {
    const response = await fetch("api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ firstname, lastname, email, password, phone, role })
    })

    const data = await response.json()
    if (response.ok) {
        alert("User registered successfully. Login to continue.")
        navigateTo("/login")
    } else {
        console.error(data.message)
    }
}*/

export async function getCurrentUser() {
    try {
        const response = await fetch("api/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            return await response.json()
        } else {
            console.error("Failed to fetch user data")
            return null
        }
    } catch {
        return null
    }
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
const express = require("express")
const path = require("path")
const session = require("express-session")
const MysqlStore = require("express-mysql-session")(session)
const bcrypt = require("bcryptjs")
const mysql = require("mysql2/promise")

const app = express()

const PORT = process.env.PORT || 3000

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'spa',
})

// Middleware
app.use(express.json())
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")))

// Session Store
const sessionStore = new MysqlStore({}, db)

app.use(session({
    key: "spa_session_cookie",
    secret: '097574b6abefa0538be87830ca2b853c19d910aa2135bc5333ae7681cc3d813c59aa86ea5f6ba45f82ba70346972178f363cc1dff5c4697951fb5a6bf983c193',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1h
        sameSite: true,
        secure: false, // Set to true if using HTTPS
        httpOnly: true
    }
}))

// Routes
// Register
app.post("/api/register", async (req, res) => {
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.phone || !req.body.role || !req.body.address) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await db.execute("INSERT INTO users (firstname, lastname, email, password, phone, role, address) VALUES (?, ?, ?, ?, ?, ?, ?)", [req.body.firstname, req.body.lastname, req.body.email, hashedPassword, req.body.phone, req.body.role, req.body.address])
        res.status(201).json({ message: "User registered successfully" })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "User registration failed" })
    }
})

// Login
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Missing credentials" })
    }

    try {
        const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email])
        if (users.length === 0) return res.status(401).json({ message: "Invalid credentials" })

        const user = users[0]

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" })

        req.session.user = {
            userId: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            role: user.role
        }
        res.status(200).json({ message: "Logged in successfully", user: req.session.user })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Login failed" })
    }
})

// Logout
app.post("/api/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err)
            return res.status(500).json({ message: "Logout failed" })
        }
        res.clearCookie("spa_session_cookie")
        res.json({ message: "Logged out successfully" })
    })
})

// Get User
app.get("/api/me", async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    res.json({
        id: req.session.userId,
        firstname: req.session.firstname,
        lastname: req.session.lastname,
        email: req.session.email,
        phone: req.session.phone,
        role: req.session.role
    })
})

app.get('*splat', (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"))
})

app.listen(PORT, () => console.log("Server is running on port " + PORT))
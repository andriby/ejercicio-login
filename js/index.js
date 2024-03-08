class User{
    constructor(name, email, password){
        this.name = name
        this.email = email
        this.password = password
    }
}

function login() {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    let users = JSON.parse(localStorage.getItem("users"));
    users.map(user => {
        if (user.email === email && user.password === password) {
            console.log("Inicio de sesión exitoso.")
            localStorage.setItem("user", JSON.stringify(user))
            window.location.href = "welcome.html"
        } else {
            document.getElementById("error").innerHTML = "El email o la contraseña son incorrectos."
        }
    })
}

function logout() {
    localStorage.removeItem("user")
}

function createUser(){
    let name = document.getElementById("user").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let rpassword = document.getElementById("rpassword").value
    validatePassword(password, rpassword)
    if (validatePassword(password, rpassword)) {
        let user = new User(name, email, password)
        console.log(user)
        saveData(user)
        clear()
    }
}

function saveData(user) {
    let users = []
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users))
    getData();
}

function getData() {
    let url = window.location.href
    let users = JSON.parse(localStorage.getItem("users"))
    if (users) {
        users.map(user => {
            console.log(user)
        });
    }
    if(localStorage.getItem("user")) {
        if (url.includes("welcome.html")) {
            console.log("ya está logueado")
        } else {
            window.location.href = "welcome.html"
        }
    } else {
        if (url.includes("welcome.html")) {
            window.location.href = "index.html"
            console.log("No está logueado")
        }
    }
}

function validatePassword(password, rpassword) {
    if (password == rpassword) {
        return true
    } else{
        document.getElementById("error").innerHTML = "Las contraseñas deben ser iguales"
        return false
    }
}

function logout() {
    localStorage.removeItem("user")
    window.location.href = "index.html"
}     

function clear(){
    document.getElementById("user").value = ""
    document.getElementById("email").value = ""
    document.getElementById("password").value = ""
    document.getElementById("rpassword").value = ""
}

getData()
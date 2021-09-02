const EmitNotification = require("events")

const register = require("./register")
const login = require("./login")
const RegisterEvent = new EmitNotification;
console.log(register)
function checkEvent() {

    const users = ["omkar", "vishal"]
    RegisterEvent.on("register event", register)
    RegisterEvent.on("login event", login)

    users.forEach((item) => {
        RegisterEvent.emit("register event", item)
        RegisterEvent.emit("login event", item)
    })

}
checkEvent()
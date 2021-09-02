const { stdin } = require('process')
const readline = require('readline')

const readline1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline1.question("who is your best friend \n", (name) => {
    if (name == "Omkar") {
        readline1.question("what is your favorite food \n", (par) => {
            console.log(`so you are saying Omkar is your best friend and your fav food is ${par}`)
            readline1.close()
        })

    } else {
        console.log("I hate you")

    }

})

readline1.on("close", () => {
    console.log("khatam tata bye bye")
})
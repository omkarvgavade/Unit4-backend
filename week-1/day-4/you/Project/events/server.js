const { stdin } = require('process')
const readline = require('readline')

const readline1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})



const EmitNotification = require("events")

const press1 = require("./press1event.js")
const press2 = require("./press2event.js")
const press3 = require("./press3event.js")

const BooksEvent = new EmitNotification;

function checkEvent() {

    const books = ["chava", "2 states", "Half girlfriend", "Harry potter"]
    BooksEvent.on("press 1", press1)
    BooksEvent.on("press 2", press2)
    BooksEvent.on("press 3", press3)
    readline1.question("press 1 to see all books/press 2 to update the store/press 3 to quit \n", (btn) => {
        if (btn == "1") {
            BooksEvent.emit("press 1", books)
            checkEvent()


        } else if (btn == "2") {
            readline1.question("Enter the book which you want to add \n", (par) => {
                BooksEvent.emit("press 2", { books: books, newBook: par });
                checkEvent()


            })

        } else if (btn == "3") {
            readline1.question("Are you sure want to quit y/n \n", (par) => {
                if (par == "y") {
                    BooksEvent.emit("press 3")
                    readline1.close()
                } else if (par == "n") {
                    checkEvent()
                }

            })

        } else {
            readline1.close()
        }

    })


}
checkEvent()


readline1.on("close", () => {
    console.log("khatam tata bye bye")
})




import express from 'express'
import path from "path"
import fs from "fs"

const users = loadUsers()


const app = express();

app.use(express.static(path.join('client')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.post('/api/index', (request, response) => {
    users.push(
        {
            email: request.body.email, password: request.body.password
        }
    )
    console.log(users)
    saveUsers()
    response.send('Success!')

})

app.post('/api/login', (request, response) => {
    const { email, password } = request.body
    const user = users.find(u => u.email == email && u.password == password)

    if (user) {
        response.send('Login success!')
    } else {
        response.send('Login failed.')
    }
})

function loadUsers() {
    if (!fs.existsSync(path.join('users.json')))
        return []
    const data = fs.readFileSync(path.join('users.json'))
    if (data)
        return JSON.parse(data)
    return []
}

function saveUsers() {
    fs.writeFileSync(path.join('users.json'), JSON.stringify(users))
}

app.listen(3000, () => {

    console.log(`Server started at http://localhost:3000}`)

});
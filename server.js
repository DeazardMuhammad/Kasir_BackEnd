const express = require(`express`)
const app = express()
const PORT = 1000
const cors = require(`cors`)
app.use(cors())



app.use(express.static(__dirname))

let routes = [
    { prefix: `/meja`, route: require('./routes/meja') },
    { prefix: `/menu`, route: require('./routes/menu') },
    { prefix: `/user`, route: require('./routes/user') },
    { prefix: `/transaksi`, route: require('./routes/transaksi') },
    { prefix: `/detail`, route: require('./routes/detail') },


]

for (let i = 0; i < routes.length; i++) {
    app.use(routes[i].prefix, routes[i].route)

}

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
})
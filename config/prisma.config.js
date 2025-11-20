const dotenv = require("dotenv")
const { defineConfig } = require("prisma/config")
dotenv.config()

module.exports = defineConfig({
    schema:"../prisma/schema.prisma",
    datasource:{
        provider:"postgresql",
        url:process.env.DATABASE_URL
    },
    migrations:{
        path:"../prisma/migrations",
        seed:"node prisma/seed.prisma.js"
    }
})
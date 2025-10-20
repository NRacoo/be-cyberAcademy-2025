const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config();

async function SeedAdmin(){
    
    try {
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;
        const existAdmin = await prisma.admin.findFirst({
            where:{
                username
            }
        })
        if(existAdmin){
            throw new Error("Admin sudah dibuat")
        }
        const hashedPassword = bcrypt.hash(password, 10)

        const seedAdmin = await prisma.admin.create({
            data:{
                username:username,
                password:hashedPassword
            }
        });

        if(seedAdmin){
            console.log({message:"admin berhasil dibuat", data:seedAdmin})
        }
        
    } catch (error) {
        console.log({message:"admin gagal dibuat", data:error})
    }finally{
        await prisma.$disconnect()
    }
}

SeedAdmin()


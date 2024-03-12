const prisma = new (require("@prisma/client").PrismaClient)

const list_user_role = [

    {
        id: "USER",
        name: "user",
        description: "user"
    },
    {
        id: "ADMIN",
        name: "admin",
        description: "admin"
    },
    {
        id: "SUPER_ADMIN",
        name: "super admin",
        description: "super admin"
    },
]

!async function () {
    try {

        console.log("create user role")
        for (let lu of list_user_role) {
            await prisma.userRole.upsert({
                where: {
                    id: lu.id
                },
                create: {
                    id: lu.id,
                    name: lu.name,
                    description: lu.description
                },
                update: {}
            })
        }
        console.log("user role created")


        console.log("coba buat user")
        await prisma.user.upsert({
            where: {
                id: "super_admin"
            },
            create: {
                id: "super_admin",
                name: "super admin",
                email: "admin@gmail.com",
                password: "admin_123",
                phone: "089",
                userRoleId: "ADMIN"
            },
            update: {}
        })
        console.log("user admin created")


    } catch (error) {
        console.log(error)
    }
}().catch(error => {
    console.log(error)
    process.exit(1)
})
    .finally(async () => {
        await prisma.$disconnect()
    })
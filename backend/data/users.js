import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Admin User',
        email: 'test@example.com',
        password: bcrypt.hashSync('123456', 10)

    },
    {
        name: 'Admin User',
        email: 'trey@example.com',
        password: bcrypt.hashSync('123456', 10)

    },
    {
        name: 'Admin User',
        email: 'jay@example.com',
        password: bcrypt.hashSync('123456', 10)

    }
]

export default users
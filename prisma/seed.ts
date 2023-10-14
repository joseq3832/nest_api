import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany();
  const password = 'password'
  const hashedPassword = await bcrypt.hash(password, 10)
  
  await prisma.user.create({
    data: {
      firstName: 'Jose',
      lastName: 'Alarcon',
      email: 'joseq.ja@gmail.com',
      password: hashedPassword
    },
  })

  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: `${faker.internet.userName()}_${i}@gmail.com`,
        password: hashedPassword
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

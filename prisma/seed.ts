import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import faker from "faker";

const prisma = new PrismaClient();

async function seed() {
  const password = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      fullName: "Woufu Dev",
      username: "woufu",
      password,
      role: "admin",
      address: "Siem Reap, Cambodia",
      contact: "0987654321",
    },
  });

  await Promise.all(
    [...new Array(100)].map(() => {
      return prisma.user.create({ data: generateUser(password) });
    })
  );
}

function generateUser(password: string) {
  return {
    fullName: faker.name.firstName() + " " + faker.name.lastName(),
    username: faker.internet.userName(),
    password,
    role: "user",
    address: faker.address.streetAddress(),
    contact: faker.phone.phoneNumber(),
  };
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());

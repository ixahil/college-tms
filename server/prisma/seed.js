import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const agentData = [
  {
    name: "Agent 1",
    email: "agent1@gmail.com",
    password: "123",
    approved: true,
    tours: {
      create: [
        {
          title: "Tour 1",
          description: "Description of tour 1",
          price: 300,
          comparePrice: 450,
          city: "Surat",
          state: "Gujarat",
          Country: "India",
        },
        {
          title: "Tour 2",
          description: "Description of tour 2",
          price: 789.65,
          comparePrice: 987.65,
          city: "Surat",
          state: "Gujarat",
          Country: "India",
        },
      ],
    },
  },
  {
    name: "Agent 2",
    email: "agent2@gmail.com",
    password: "123",
    approved: true,
    tours: {
      create: [
        {
          title: "Tour 3",
          description: "Description of tour 3",
          price: 300,
          comparePrice: 450,
          city: "Surat",
          state: "Gujarat",
          Country: "India",
        },
        {
          title: "Tour 4",
          description: "Description of tour 4",
          price: 789.65,
          comparePrice: 987.65,
          city: "Surat",
          state: "Gujarat",
          Country: "India",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of agentData) {
    const agent = await prisma.agent.create({
      data: u,
    });
    console.log(`Created agent with id: ${agent.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

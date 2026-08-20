import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const services = [
    {
      name: "Birth Certificate",
      description: "Official registration of birth required for school admissions and identity proof.",
      requiredDocs: JSON.stringify(["Hospital discharge slip", "Parents' Identity Proof"]),
      estimatedTime: "7-10 Days",
      serviceCharge: 150.0,
    },
    {
      name: "Income Certificate",
      description: "Proof of annual income for scholarships and government subsidies.",
      requiredDocs: JSON.stringify(["Aadhaar Card", "Salary Slip / Income Proof", "Passport Size Photo"]),
      estimatedTime: "5-7 Days",
      serviceCharge: 120.0,
    },
    {
      name: "Caste Certificate",
      description: "Reserved category verification document required for admissions and jobs.",
      requiredDocs: JSON.stringify(["Family Member's Caste Proof", "Aadhaar Card", "Voter ID"]),
      estimatedTime: "15 Days",
      serviceCharge: 200.0,
    },
    {
      name: "Domicile Certificate",
      description: "Proof of residence in a particular state for education and state jobs.",
      requiredDocs: JSON.stringify(["Electricity Bill / Ration Card", "School Certificate", "Aadhaar Card"]),
      estimatedTime: "10-12 Days",
      serviceCharge: 180.0,
    }
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }

  console.log("Services seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

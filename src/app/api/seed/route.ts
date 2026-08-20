import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const servicesCount = await prisma.service.count();
    
    if (servicesCount > 0) {
      return NextResponse.json({ message: "Services already seeded!", count: servicesCount });
    }

    const services = [
      {
        name: "Domicile Certificate",
        description: "Proof of residence in a particular state for education and state jobs.",
        requiredDocs: JSON.stringify(["Electricity Bill", "School Certificate", "Aadhaar Card"]),
        estimatedTime: "10-12 Days",
        serviceCharge: 180
      },
      {
        name: "Income Certificate",
        description: "Official document proving the annual income of a family or individual.",
        requiredDocs: JSON.stringify(["Salary Slip", "Bank Statement", "Aadhaar Card"]),
        estimatedTime: "7-10 Days",
        serviceCharge: 150
      },
      {
        name: "Caste Certificate",
        description: "Documentary proof of belonging to a specific caste (SC/ST/OBC).",
        requiredDocs: JSON.stringify(["Old Caste Certificate of Relative", "Affidavit", "Aadhaar Card"]),
        estimatedTime: "15-20 Days",
        serviceCharge: 200
      }
    ];

    await prisma.service.createMany({ data: services });

    return NextResponse.json({ message: "Successfully seeded initial services!", added: services.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

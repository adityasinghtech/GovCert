import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Auto-seed if SQLite was reset by Render Free Tier
    if (services.length === 0) {
      const defaultServices = [
        { name: "Domicile Certificate", description: "Proof of residence in a particular state.", requiredDocs: JSON.stringify(["Electricity Bill", "Aadhaar Card"]), estimatedTime: "10-12 Days", serviceCharge: 180 },
        { name: "Income Certificate", description: "Official document proving annual family income.", requiredDocs: JSON.stringify(["Salary Slip", "Aadhaar Card"]), estimatedTime: "7-10 Days", serviceCharge: 150 },
        { name: "Caste Certificate", description: "Proof of belonging to a specific caste (SC/ST/OBC).", requiredDocs: JSON.stringify(["Old Certificate", "Aadhaar Card"]), estimatedTime: "15-20 Days", serviceCharge: 200 }
      ];
      await prisma.service.createMany({ data: defaultServices });
      
      // Fetch them again including their generated IDs
      services = await prisma.service.findMany({
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

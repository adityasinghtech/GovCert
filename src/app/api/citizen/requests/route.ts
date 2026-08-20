import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const citizenId = (session.user as any).id;

    const myRequests = await prisma.serviceRequest.findMany({
      where: { citizenId },
      include: { service: true },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(myRequests);
  } catch (error) {
    console.error("Error fetching citizen requests:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

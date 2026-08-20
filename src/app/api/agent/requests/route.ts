import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import fs from "fs/promises";
import path from "path";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "AGENT") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // "pending" | "my-tasks"
    const agentId = (session.user as any).id;

    if (type === "my-tasks") {
      const myTasks = await prisma.serviceRequest.findMany({
        where: { agentId },
        include: { service: true, citizen: { select: { name: true, email: true } } },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(myTasks);
    }
    
    // Default to unassigned pending tasks
    const pendingTasks = await prisma.serviceRequest.findMany({
      where: { status: "PENDING", agentId: null },
      include: { service: true, citizen: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(pendingTasks);
  } catch (error) {
    console.error("Error fetching agent requests:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "AGENT") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { requestId, status, action } = await req.json();
    const agentId = (session.user as any).id;

    if (action === "assign") {
      const request = await prisma.serviceRequest.findUnique({ where: { id: requestId }});
      if (request?.agentId) {
        return NextResponse.json({ message: "Request already tracked by another agent" }, { status: 400 });
      }

      const updated = await prisma.serviceRequest.update({
        where: { id: requestId },
        data: { agentId, status: "ACCEPTED" },
      });
      return NextResponse.json(updated);
    } 
    
    if (action === "updateStatus" && status) {
      const updated = await prisma.serviceRequest.update({
        where: { id: requestId, agentId }, // Make sure they own it
        data: { status },
      });
      return NextResponse.json(updated);
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error updating agent requests:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "AGENT") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const agentId = (session.user as any).id;
    const formData = await req.formData();
    const requestId = formData.get("requestId") as string;
    const file = formData.get("file") as File;

    if (!requestId || !file) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const request = await prisma.serviceRequest.findUnique({
      where: { id: requestId, agentId }
    });

    if (!request) {
      return NextResponse.json({ message: "Not found or unauthorized" }, { status: 404 });
    }

    // Handle file upload
    const uploadDir = path.join(process.cwd(), "public", "uploads", "completed", requestId);
    await fs.mkdir(uploadDir, { recursive: true });

    const fileExt = path.extname(file.name) || ".pdf";
    const fileName = `final_certificate_${requestId}${fileExt}`;
    const filePath = path.join(uploadDir, fileName);
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    const completedDocs = [{
      name: "Final Certificate",
      path: `/uploads/completed/${requestId}/${fileName}`
    }];

    // Update with file and mark as COMPLETED
    const updated = await prisma.serviceRequest.update({
      where: { id: requestId },
      data: { 
        status: "COMPLETED",
        completedDocs: JSON.stringify(completedDocs)
      },
    });

    return NextResponse.json({ message: "Successfully uploaded", request: updated }, { status: 201 });
  } catch (error) {
    console.error("Error uploading final certificate:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const citizenId = formData.get("citizenId") as string;
    const serviceId = formData.get("serviceId") as string;
    
    if (!citizenId || !serviceId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const formDataJSON = formData.get("formDataJSON") as string;

    // First create a pending DB record to get the requestId
    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        citizenId,
        serviceId,
        status: "PENDING",
        formData: formDataJSON || null,
        userDocs: "[]",
      }
    });

    // Handle file uploads
    const userDocs: { name: string; path: string }[] = [];
    const uploadDir = path.join(process.cwd(), "public", "uploads", citizenId, serviceRequest.id);
    
    await fs.mkdir(uploadDir, { recursive: true });

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("file_") && value instanceof File) {
        const docName = key.replace("file_", ""); // original requiredDoc name
        const fileExt = path.extname(value.name) || ".pdf";
        const fileName = `${docName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}${fileExt}`;
        const filePath = path.join(uploadDir, fileName);
        
        const arrayBuffer = await value.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await fs.writeFile(filePath, buffer);

        userDocs.push({
          name: docName,
          path: `/uploads/${citizenId}/${serviceRequest.id}/${fileName}`
        });
      }
    }

    // Update the record with the uploaded documents paths
    const updatedRequest = await prisma.serviceRequest.update({
      where: { id: serviceRequest.id },
      data: { userDocs: JSON.stringify(userDocs) }
    });

    return NextResponse.json({ message: "Request submitted successfully", request: updatedRequest }, { status: 201 });
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

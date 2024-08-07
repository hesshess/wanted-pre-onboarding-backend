import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function create(body){ 
    const {companyId} = body;
    return await db.job.create({
      data: {
        companyId, 
        position, 
        reward, 
        content, 
        skills
      }
    });
  }
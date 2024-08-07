import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function create(body){ 
  const {companyId, position, reward, content, skills} = body;
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

export async function checkApply(jobId, userId){ 
  return await db.application.findUnique({
    where: {
      userId: parseInt(userId),
      jobId: parseInt(jobId),
    },
  });
}


export async function getAll(){
  return await db.job.findMany({
    select: {
      id: true,
      position: true,
      reward: true,
      skills: true,
      company: {
        select: 
        {
          name: true,
          country: true,
          city: true,
        }
      }
      
    },
  });
}

export async function getById(id) {
  return await db.job.findUnique({
    where: {
      id : parseInt(id)
    },
    select: {
      id: true,
      companyId:true,
      position: true,
      reward: true,
      skills: true,
      company: {
        select: 
        {
          name: true,
          country: true,
          city: true,
        }
      }
    }

  })
}

export async function getAllBySearch(search){
  return await db.job.findMany({
    where: {
      OR: [
        {        
          position: {
            contains: search,
        },
        },
        {
          skills: {
            contains: search,
          },
        },
        {
          company: {
            name: {
              contains: search,
            }
          },
        }
      ]
    },
    select:{
      id:true,
      position: true,
      reward: true,
      skills: true,
      company: {
        select:{
          name: true,
          country: true,
          city:true,
        }
      }
    },

  })
}



export async function getByCompany(companyId, jobId){
  return await db.job.findMany({
    where: {
      companyId,
      NOT: {
        id: jobId
      }
    },
    select:{
      id: true,
    }
  })
}


export async function update(id, body) {
  const {position, reward, content, skills} = body
  return await db.job.update({
    where:{
      id: parseInt(id)
    },
    data:{
      position, reward: parseInt(reward), content, skills,
    },
    select:{
      position: true,
      reward: true,
      content: true,
      skills: true,
    }
  }) 
}

export async function remove(id) {
  return await db.job.delete({
    where:{
      id: parseInt(id)
    }
  })
}
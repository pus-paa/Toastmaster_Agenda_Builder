import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { clubId, name, region, district, division, area, charteredDate } = body;

    const club = await prisma.club.create({
      data: {
        clubId: Number(clubId),
        name,
        region,
        district,
        division,
        area,
        charteredDate: new Date(charteredDate),
        createdBy: session.user.id,
      },
    });

    return NextResponse.json(club, { status: 201 });
  } catch (error: any) {
    console.error('Error creating club:', error);
    return NextResponse.json(
      { error: 'Club already exists or invalid data' },
      { status: 400 }
    );
  }
}

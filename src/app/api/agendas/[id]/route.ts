import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const agendaId = parseInt(params.id);

    if (isNaN(agendaId)) {
      return NextResponse.json(
        { error: 'Invalid agenda ID' },
        { status: 400 }
      );
    }

    const agenda = await prisma.agenda.findUnique({
      where: { id: agendaId },
      include: {
        meeting: true,
        member: true,
      },
    });

    if (!agenda) {
      return NextResponse.json(
        { error: 'Agenda not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(agenda);
  } catch (error: any) {
    console.error('Error fetching agenda:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agenda' },
      { status: 500 }
    );
  }
}

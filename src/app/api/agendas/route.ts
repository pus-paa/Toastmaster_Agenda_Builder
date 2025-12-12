import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const meetingId = searchParams.get('meetingId');

    const where = meetingId ? { meetingId: parseInt(meetingId) } : {};

    const agendas = await prisma.agenda.findMany({
      where,
      orderBy: {
        sequence: 'asc',
      },
      include: {
        meeting: true,
        member: true,
      },
    });

    return NextResponse.json(agendas);
  } catch (error: any) {
    console.error('Error fetching agendas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agendas' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { meetingId, role, assignedTo, memberId, memberDetail, allocatedTime, sequence } = body;

    // Validation
    if (!meetingId || !role || !assignedTo || sequence === undefined) {
      return NextResponse.json(
        { error: 'Meeting ID, role, assignedTo, and sequence are required' },
        { status: 400 }
      );
    }

    const meeting = await prisma.meeting.findUnique({
      where: { id: parseInt(meetingId) },
    });

    if (!meeting) {
      return NextResponse.json(
        { error: 'Meeting not found' },
        { status: 404 }
      );
    }

    const agenda = await prisma.agenda.create({
      data: {
        meetingId: parseInt(meetingId),
        role,
        assignedTo,
        memberId: memberId ? parseInt(memberId) : null,
        memberDetail: memberDetail || null,
        allocatedTime: allocatedTime || null,
        sequence: parseInt(sequence),
      },
      include: {
        meeting: true,
        member: true,
      },
    });

    return NextResponse.json(agenda, { status: 201 });
  } catch (error: any) {
    console.error('Error creating agenda:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create agenda' },
      { status: 500 }
    );
  }
}
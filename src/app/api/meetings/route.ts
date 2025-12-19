import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET() {
  try {
    const meetings = await prisma.meeting.findMany({
      orderBy: {
        meetingNumber: 'desc',
      },
      include: {
        agendas: true,
      },
    });

    return NextResponse.json(meetings);
  } catch (error: any) {
    console.error('Error fetching meetings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meetings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { meetingNumber, meetingTheme, meetingDate, startTime, toastMasterOfDay, clubId } = body;

    if ([meetingNumber, meetingTheme, meetingDate, startTime, toastMasterOfDay, clubId].some(v => v === undefined || v === null)) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const existingMeeting = await prisma.meeting.findUnique({
      where: { meetingNumber: parseInt(meetingNumber) },
    });

    if (existingMeeting) {
      return NextResponse.json(
        { error: 'Meeting number already exists' },
        { status: 400 }
      );
    }

    const meeting = await prisma.meeting.create({
      data: {
        meetingNumber: parseInt(meetingNumber),
        meetingTheme,
        meetingDate,
        startTime,
        toastMasterOfDay,
        clubId: parseInt(clubId),
      },
    });

    return NextResponse.json(meeting, { status: 201 });
  } catch (error: any) {
    console.error('Error creating meeting:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create meeting' },
      { status: 500 }
    );
  }
}

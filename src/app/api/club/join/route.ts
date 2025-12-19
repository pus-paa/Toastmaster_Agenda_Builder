import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { clubId, userId } = await req.json();
   
    return NextResponse.json({ success: true, message: 'Joined club successfully.' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to join club.', error: error?.toString() }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createUserWithPhone, getUserByEmailOrPhone } from '@/app/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phoneNumber, password } = body;

    if (!email && !phoneNumber) {
      return NextResponse.json(
        { error: 'Please provide either email or phone number' },
        { status: 400 }
      );
    }

    if (!name || !password) {
      return NextResponse.json(
        { error: 'Name and password are required' },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmailOrPhone(email || phoneNumber);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    const user = await createUserWithPhone(name, email, phoneNumber, password);

    return NextResponse.json({ 
      success: true, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}

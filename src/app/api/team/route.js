import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';

export async function GET() {
  try {
    await dbConnect();
    const team = await TeamMember.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json({ error: 'Ekip yüklenemedi.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const member = await TeamMember.create(data);
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Üye eklenemedi.' }, { status: 500 });
  }
}

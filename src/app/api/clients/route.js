import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Client from '@/models/Client';

export async function GET() {
  try {
    await dbConnect();
    const clients = await Client.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json({ error: 'Müşteriler yüklenemedi.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const client = await Client.create(data);
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Müşteri eklenemedi.' }, { status: 500 });
  }
}

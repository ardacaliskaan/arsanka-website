import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Client from '@/models/Client';

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const data = await request.json();
    const client = await Client.findByIdAndUpdate(params.id, data, { new: true });
    if (!client) {
      return NextResponse.json({ error: 'Müşteri bulunamadı.' }, { status: 404 });
    }
    return NextResponse.json(client);
  } catch (error) {
    return NextResponse.json({ error: 'Hata oluştu.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const client = await Client.findByIdAndDelete(params.id);
    if (!client) {
      return NextResponse.json({ error: 'Müşteri bulunamadı.' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Hata oluştu.' }, { status: 500 });
  }
}

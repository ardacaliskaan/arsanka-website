import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const message = await Message.findById(params.id);
    if (!message) {
      return NextResponse.json({ error: 'Mesaj bulunamadı.' }, { status: 404 });
    }
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: 'Hata oluştu.' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const data = await request.json();
    const message = await Message.findByIdAndUpdate(params.id, data, { new: true });
    if (!message) {
      return NextResponse.json({ error: 'Mesaj bulunamadı.' }, { status: 404 });
    }
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: 'Hata oluştu.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const message = await Message.findByIdAndDelete(params.id);
    if (!message) {
      return NextResponse.json({ error: 'Mesaj bulunamadı.' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Hata oluştu.' }, { status: 500 });
  }
}

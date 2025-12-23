import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const data = await request.json();
    const member = await TeamMember.findByIdAndUpdate(params.id, data, { new: true });
    if (!member) {
      return NextResponse.json({ error: 'Üye bulunamadı.' }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: 'Hata oluştu.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const member = await TeamMember.findByIdAndDelete(params.id);
    if (!member) {
      return NextResponse.json({ error: 'Üye bulunamadı.' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Hata oluştu.' }, { status: 500 });
  }
}

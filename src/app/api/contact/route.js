import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Lütfen zorunlu alanları doldurun.' },
        { status: 400 }
      );
    }

    // MongoDB'ye kaydet
    await dbConnect();
    const newMessage = await Message.create({
      name,
      email,
      phone,
      subject,
      message
    });

    // Email gönder (opsiyonel)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO || 'info@arsanka.com',
        replyTo: email,
        subject: `[Arsanka Web] ${subject || 'Yeni Mesaj'} - ${name}`,
        html: `
          <h2>Yeni İletişim Formu</h2>
          <p><strong>Ad Soyad:</strong> ${name}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone || 'Belirtilmedi'}</p>
          <p><strong>Konu:</strong> ${subject || 'Belirtilmedi'}</p>
          <p><strong>Mesaj:</strong></p>
          <p>${message}</p>
        `,
      });
    }

    return NextResponse.json(
      { success: true, message: 'Mesajınız başarıyla gönderildi.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Hata:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const messages = await Message.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Mesajlar yüklenemedi.' }, { status: 500 });
  }
}

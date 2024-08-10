
import { EmailTemplate } from '@/app/_componants/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
      const { data, error } = await resend.emails.send({
        from: 'Acme <himalaya@resend.dev>',
        to: ['himalayamaharshi@gmail.com'],
        subject: 'Hello world',
        react: EmailTemplate({ firstName: 'John' }),
      });
  
      if (error) {
        console.error('Error from Resend API:', error);
        return NextResponse.json({ error }, { status: 500 });
      }
  
      return NextResponse.json(data);
    } catch (error) {
      console.error('Unhandled error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  

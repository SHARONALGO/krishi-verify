import { NextRequest, NextResponse } from 'next/server';
import { processQuestion } from '@/lib/mandiEngine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question } = body;

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    // Process the question using rule-based engine
    const result = await processQuestion(question);

    return NextResponse.json({
      answer: result.answer,
      language: result.language,
      commodity: result.commodity,
      data: result.result,
    });
  } catch (error) {
    console.error('[Chat API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'KRISHI-VERIFY Chatbot API',
    languages: ['en', 'hi', 'pa'],
  });
}

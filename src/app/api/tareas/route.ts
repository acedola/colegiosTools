import { NextRequest, NextResponse } from 'next/server';

import { messages } from '@/utils/messages';

export async function GET(request: NextRequest) {
  try {
    const apiResponse = await fetch('http://localhost:3001/tareas');
    const jsonData = await apiResponse.json();

    console.log(jsonData);

    return NextResponse.json({ jsonData, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

import { messages } from '@/utils/messages';

export async function GET(request: NextRequest) {
  try {
    const apiResponse = await fetch('http://localhost:3001/userData');
    const jsonData = await apiResponse.json();
    const entidades = jsonData.entidades;
    const nombre = jsonData.nombre;

    return NextResponse.json({ nombre, entidades, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}

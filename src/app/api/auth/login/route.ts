import { NextRequest, NextResponse } from 'next/server';
//import { connectMongoDB } from '@/libs/mongodb';
//import User, { IUser } from '@/models/User';
import { messages } from '@/utils/messages';
import jwt from 'jsonwebtoken';
//import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    //await connectMongoDB();

    const body: Cred = await request.json();
    const { email, password } = body;

    const apiResponse = await fetch('http://localhost:3001/userData');
    const jsonData = await apiResponse.json();

    // // Validamos que se envien todos los campos
    if (!email || !password) {
      return NextResponse.json(
        { message: messages.error.needProps },
        { status: 400 }
      );
    }

    const userFind: boolean = (await email) === jsonData.userid;

    // Validamos que exista el usuario
    if (!userFind) {
      return NextResponse.json(
        { message: messages.error.userNotFound },
        { status: 400 }
      );
    }
    //const isCorrect: boolean = bcrypt.compare(password, userFind.password);

    const isCorrect: boolean = (await password) === jsonData.itoken;

    // Validamos que la contraseña sea la correcta
    if (!isCorrect) {
      return NextResponse.json(
        { message: messages.error.incorrectPassword },
        { status: 400 }
      );
    }

    const { password: ipassword, ...rest } = jsonData;

    const token = jwt.sign({ data: rest }, 'secreto', {
      expiresIn: 86400
    });

    const response = NextResponse.json(
      { userLogged: rest, message: messages.success.userLogged },
      { status: 200 }
    );

    response.cookies.set('auth_cookie', token, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7200,
      path: '/'
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}

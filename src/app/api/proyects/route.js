import dbConnection from "@/libs/db";
import Proyect from "@/models/Proyects";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnection();
  try {
    const getProyects = await Proyect.find();

    return NextResponse.json(getProyects);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request) {
  await dbConnection();
  try {
    const body = await request.json();
    const { title, framework } = body;

    if (!title || !framework) {
      return NextResponse.json({message: "Please provide a title and framework"}, {status: 404});
    } else {
      const addProyect = new Proyect(body);
      await addProyect.save();

      return NextResponse.json(addProyect);
    }
  } catch (error) {
    console.log(error);
  }
}

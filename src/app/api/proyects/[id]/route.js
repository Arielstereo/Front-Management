import dbConnection from "@/libs/db";
import Proyect from "@/models/Proyects";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnection();
  try {
    const { id } = params;

    const getProyect = await Proyect.findById(id);

    return NextResponse.json(getProyect);
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request, { params }) {
  await dbConnection();
  const { id } = params;
  const body = await request.json();
  const { completed, url } = body;

  if (completed && !url) {
    return NextResponse.json("url is requerid!");
  }
  try {
    const updateProyect = await Proyect.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(updateProyect);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request, { params }) {
  await dbConnection();

  try {
    const { id } = params;
    await Proyect.findByIdAndDelete(id);
    return NextResponse.json({
      message: "Proyect deleted!",
    });
  } catch (error) {
    console.log(error);
  }
}

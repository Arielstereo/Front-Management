import dbConnection from "@/libs/db";
import Proyect from "@/models/Proyects";
import Component from "@/models/Components";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  await dbConnection();
  const { id } = params;
  const body = await request.json();
  let { name, description } = body;

  try {
    if (id) {
    
      const addComponent = new Component({ name, description, proyect: id });
      await addComponent.save();

      const proyect = await Proyect.findById(id);
      proyect.components = [...proyect.components, addComponent._id];
      const updateProyect = await proyect.save();

      return NextResponse.json(updateProyect);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request, { params }) {
  await dbConnection();
  const { id } = params;

  try {
    const components = await Proyect.findOne({ _id: id }).populate(
      "components"
    );
    return NextResponse.json(components);
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request, { params }) {
  await dbConnection();

  const { id } = params;
  try {
    const updateComponent = await Component.findByIdAndUpdate(
      id,
      { isCompleted: true },
      { new: true }
    );
    return NextResponse.json(updateComponent);
  } catch (error) {
    console.log(error);
  }
}

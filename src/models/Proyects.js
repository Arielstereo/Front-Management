import { Schema, model, models } from "mongoose";

const ProyectSchema = new Schema(
  {
    title: {
      type: "string",
      required: [true, "Este campo es obligatorio!"],
    },
    framework: {
      type: "string",
      required: [true, "Este campo es obligatorio!"],
    },
    completed: {
      type: "boolean",
    },
    repository: {
      type: "string"
    },
    date: {
      type: "string",
    },
    url: {
      type: "string"
    },
    components: [
      {
        type: Schema.Types.ObjectId,
        ref: "Component",
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default models?.Proyect || model("Proyect", ProyectSchema);

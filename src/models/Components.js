import { Schema, model, models } from "mongoose";

const ComponentSchema = new Schema(
  {
    proyect: {
      type: Schema.Types.ObjectId,
      ref: "Proyect",
    },
    name: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    isCompleted: {
      type: "boolean",
      default: false,
    },
  },
  { versionKey: false }
);

export default models?.Component || model("Component", ComponentSchema);

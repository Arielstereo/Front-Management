"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  DatePicker,
  Input,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import useProyectStore from "@/store/ProyectStore";

const ProyectForm = () => {
  const proyects = useProyectStore((state) => state.proyects);
  const [error, setError] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [dateSelected, setDateSelected] = useState(parseDate("2024-07-01"));

  let formatter = useDateFormatter({ dateStyle: "medium" });
  const resDate = formatter.format(dateSelected.toDate(getLocalTimeZone()));

  const [proyect, setProyect] = useState({
    title: "",
    framework: "",
    completed: false,
    date: "",
    repository: "",
    url: "",
  });

  console.log(proyect);

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      const proyectId = proyects.find((proyect) => proyect._id === params.id);
      if (proyectId) {
        setProyect({
          title: proyectId.title,
          framework: proyectId.framework,
          completed: proyectId.completed,
          date: proyectId.date,
          repository: proyectId.repository,
          url: proyectId.url,
        });
      }
    }
  }, [params.id, proyects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyect((prevProyect) => ({
      ...prevProyect,
      [name]: value,
    }));
  };

  const createProyect = async (e) => {
    e.preventDefault();
    const data = {
      title: proyect.title,
      framework: proyect.framework,
      completed: isCompleted,
      date: resDate,
      repository: `https://github.com/${proyect.repository}`,
      url: proyect.url,
    };
    const { title, framework } = data;

    if (!framework && !title) {
      return setError("Title and framework are required!");
    }
    if (!title) {
      return setError("Title is required");
    }
    if (!framework) {
      return setError("Framework is required!");
    } else {
      const addProyectToDb = await axios.post(
        "http://localhost:3000/api/proyects",
        data
      );
      console.log(addProyectToDb);
      router.push("/proyects");
    }
  };

  const updateProyect = async (e) => {
    e.preventDefault();
    const data = {
      title: proyect.title,
      framework: proyect.framework,
      completed: isCompleted,
      date: resDate,
      repository: `https://github.com/${proyect.repository}`,
      url: proyect.url,
    };
    const { title, framework } = data;

    if (!framework && !title) {
      return setError("Title and framework are required!");
    }
    if (!title) {
      return setError("Title is required");
    }
    if (!framework) {
      return setError("Framework is required!");
    } else {
      await axios.put(`http://localhost:3000/api/proyects/${params.id}`, data);
      router.push("/proyects");

      if (data.completed && data.url !== "") {
        confetti({
          particleCount: 300,
          spread: 400,
          origin: { y: 0.2 },
        });
        setTimeout(() => {
          router.push("/proyects");
        }, "3000");
      } if (data.completed && data.url === "") {
        return setError("url is required");
      }
    }
  };

  return (
    <div className="w-fit">
      <div className="flex justify-center mb-4">
        {error && (
          <span className="px-8 py-2 bg-red-500 text-white">{error}</span>
        )}
      </div>
      <Card className="p-8">
        <CardHeader className="flex justify-between">
          <h1 className="text-2xl font-bold">
            {params.id ? "Update Proyect" : "New Proyect"}
          </h1>
        </CardHeader>
        <CardBody className="flex flex-col gap-8">
          <form onSubmit={params.id ? updateProyect : createProyect} className="w-64">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  onChange={handleChange}
                  id="title"
                  value={updateProyect && proyect.title}
                  name="title"
                  placeholder="Name of your project"
                  isDisabled={isCompleted}
                  size="lg"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Select
                  label="Select library or framework"
                  name="framework"
                  selectedKeys={updateProyect && [proyect.framework]}
                  onChange={handleChange}
                  isDisabled={isCompleted}
                >
                  <SelectItem key="react">React</SelectItem>
                  <SelectItem key="next">Next</SelectItem>
                </Select>
              </div>
                <div>
                  <DatePicker
                    className="max-w-[284px]"
                    label="Demo day"
                    value={dateSelected}
                    onChange={setDateSelected}
                    isDisabled={isCompleted}
                  />
                </div>
              {
                !params.id && (
                  <div>
                  <Input
                    label="Github repository"
                    name="repository"
                    value={updateProyect && proyect.repository}
                    placeholder="username/project name"
                    onChange={handleChange}
                    isDisabled={isCompleted}
                  />
                </div>
                )
              }
              {params.id && (
                <div className="flex flex-col gap-4">
                  <Checkbox
                    isSelected={isCompleted}
                    onValueChange={setIsCompleted}
                  >
                    Deployed
                  </Checkbox>
                  <Input
                    label="url"
                    name="url"
                    value={proyect.url}
                    onChange={handleChange}
                    size="sm"
                  />
                </div>
              )}
            </div>
            <CardFooter className="flex justify-between pt-8">
              <Button
                color="primary"
                type="submit"
                className="w-full"
                isDisabled={isCompleted && !proyect.url}
              >
                {params.id ? "Update" : "Create"}
              </Button>
            </CardFooter>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProyectForm;

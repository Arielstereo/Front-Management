/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Github from "@/components/icons/Github";
import Next from "@/components/icons/Next";
import React from "@/components/icons/React";
import World from "@/components/icons/World";
import ModalComponent from "@/components/modals/Modal";
import ModalForm from "@/components/modals/ModalForm";
import UpdateForm from "@/components/modals/UpdateFormModal";
import useProyectStore from "@/store/ProyectStore";

import {
  Button,
  Checkbox,
  Chip,
  Code,
  Link,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const iconMap = {
    react: <React />,
    next: <Next />,
  };

  const setItem = useProyectStore((state) => state.setProyect);
  const item = useProyectStore((state) => state.proyect);
  const [currentPage, setCurrentPage] = useState(1);
  const componentsPerPage = 5;
  const [component, setComponent] = useState({
    name: "",
    description: "",
  });
  const [components, setComponents] = useState([]);

  const { id } = params;

  useEffect(() => {
    const getProyectData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/components/${id}`
        );
        setItem(res.data);
        setComponents(res.data.components);
      } catch (error) {
        console.error(error);
      }
    };
    getProyectData();
  }, []);

  const checkCompleted = async (componentId) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/components/${componentId}`
      );

      if (res.status === 200) {
        setComponents((prevComponents) =>
          prevComponents.map((comp) =>
            comp._id === componentId ? { ...comp, isCompleted: true } : comp
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastComponent = currentPage * componentsPerPage;
  const indexOfFirstComponent = indexOfLastComponent - componentsPerPage;
  const currentComponents = components.slice(
    indexOfFirstComponent,
    indexOfLastComponent
  );
  return (
    <div className="mt-8 mx-16">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <ModalComponent />
            <UpdateForm item={item} />
          </div>
          {item.completed ? (
            <Button
              href={item.url}
              as={Link}
              color="secondary"
              showAnchorIcon
              variant="ghost"
              target="_blanck"
              startContent={<World />}
            >
              Deploy
            </Button>
          ) : (
            <Button
              href={item.repository}
              as={Link}
              color="secondary"
              showAnchorIcon
              variant="ghost"
              target="_blanck"
              startContent={<Github />}
            >
              Github
            </Button>
          )}
        </div>
        <div className="flex gap-4">
          <Code className="font-bold text-2xl px-4 text-slate-800 dark:text-slate-400">
            {item.title}
          </Code>
          <span className="mt-1">{iconMap[item.framework]}</span>
        </div>
        <div className="flex flex-col gap-2">
          {item.completed ? (
            <Chip color="success">Completed</Chip>
          ) : (
            <Chip color="warning">Pending</Chip>
          )}
          {item.date && (
            <p className="text-slate-400">
              {item.date === "Jul 1, 2024" ? "" : `Demo day: ${item.date} `}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-32 my-20">
        <div className="flex flex-col w-1/2">
          <div className="flex gap-4 justify-between pb-4">
            <h2 className="text-center font-semibold text-xl">
              Components/Pages
            </h2>
            <ModalForm
              component={component}
              setComponent={setComponent}
              setComponents={setComponents}
              params={params}
              item={item}
            />
          </div>
          <div>
            {components.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>DESCRIPTION</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>
                    <span className="text-xl">✅</span>
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {currentComponents &&
                    currentComponents.map((component) => (
                      <TableRow key={component._id}>
                        <TableCell>{component.name + ".jsx"}</TableCell>
                        <TableCell className="text-slate-400">
                          {component.description}
                        </TableCell>
                        <TableCell>
                          {component.isCompleted ? (
                            <Chip variant="shadow" color="success">
                              Completed
                            </Chip>
                          ) : (
                            <Chip variant="bordered" color="warning">
                              In progress
                            </Chip>
                          )}
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            isSelected={component.isCompleted}
                            onValueChange={() => checkCompleted(component._id)}
                          ></Checkbox>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            ) : (
              <span className="text-warning-400 text-lg">
                Components not found!
              </span>
            )}
            <div className="pt-4 flex justify-center">
              <Pagination
                total={Math.ceil(components.length / componentsPerPage)}
                //Math.ceil redondea para arriba para tener las suficientes paginas para mostrar
                color="secondary"
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

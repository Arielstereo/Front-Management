import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Code,
  Divider,
  Link,
} from "@nextui-org/react";

import React from "./icons/React";
import Next from "./icons/Next";
import Image from "next/image";

const CardItems = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <div className="mt-12" key={item._id}>
          <Card
            className="w-[400px] h-full p-2 border border-sky-400 shadow-md shadow-sky-400"
            key={item._id}
          >
            <CardHeader className="flex justify-between">
              <Code className="text-xl">{item.title}</Code>
              <span>{item.framework === "react" ? <React /> : <Next />}</span>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-4">
              <Image
                className="w-full h-64"
                src={
                  item.completed
                    ? item.framework === "react"
                      ? "/gifReact.gif"
                      : "/gifNext.gif"
                    : "/under.gif"
                }
                alt="gif"
                width={400}
                height={400}
              />
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between">
              {item.completed ? (
                <Chip color="success">Completed</Chip>
              ) : (
                <Chip color="warning">Pending</Chip>
              )}
              <Button
                as={Link}
                size="lg"
                href={`/proyects/${item._id}`}
                radius="full"
                className="bg-gradient-to-tr from-blue-600 to-purple-400 text-white shadow-lg"
              >
                View Project
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </>
  );
};

export default CardItems;

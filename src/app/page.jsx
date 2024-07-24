import Code from "@/components/icons/Code";
import Github from "@/components/icons/Github";
import Next from "@/components/icons/Next";
import Vercel from "@/components/icons/Vercel";
import Vite from "@/components/icons/Vite";
import ProyectForm from "@/components/ProyectForm";
import TabComponent from "@/components/Tabs";
import { Card, CardBody, Snippet } from "@nextui-org/react";
import { Ubuntu } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const ubuntu = Ubuntu({
  weight: "700",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <header className="flex flex-col gap-32 my-32">
      <div className="grid grid-cols-2 ml-72 items-center">
        <h1 className={`${ubuntu.className} text-4xl w-[560px]`}>
          With <span className="text-sky-400">Front Management</span> organize
          your React and Next.js projects. Create, edit and manage all the
          information you need.
        </h1>
        <ProyectForm />
      </div>
      <div className="flex justify-center gap-48">
        <div className="flex flex-col gap-12 justify-center">
          <TabComponent
            icon={<Vite />}
            snippet1="npm create vite@latest"
            snippet2="yarn create vite"
            snippet3="pnpm create vite"
          />
          <div className="flex gap-6">
            <Next className="mt-4" />
            <Card>
              <CardBody>
                <Snippet>npx create-next-app@latest</Snippet>
              </CardBody>
            </Card>
          </div>
        </div>
        <h2 className={`${ubuntu.className} text-4xl w-[560px]`}>
          Start your React project with{" "}
          <span className="text-purple-400">Vite</span> or{" "}
          <span className="text-sky-400">Next.js</span>
        </h2>
      </div>
      <div className="flex justify-center gap-4">
        <h2 className={`${ubuntu.className} text-4xl`}>
          Create a new repository in{" "}
          <Link
            className="text-sky-400 hover:text-blue-600"
            href="https://github.com/new"
            target="_blanck"
          >
            Github
          </Link>
        </h2>
        <Github />
      </div>
      <div className="flex justify-center gap-24">
        <Image
          className="border border-sky-400 shadow-lg shadow-sky-400"
          src="/code.png"
          alt="image"
          width={360}
          height={200}
        />
        <div className="flex flex-col gap-6">
          <h2 className={`${ubuntu.className} text-4xl mt-20`}>
            Write the <span className="text-sky-400">code</span>
          </h2>
          <h2 className={`${ubuntu.className} text-4xl`}>
            Create your <span className="text-purple-400">components</span>
          </h2>
          <div className="flex gap-4">
            <h2 className={`${ubuntu.className} text-5xl`}>
              <span className="text-blue-500">Develop</span>
            </h2>
            <Code />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <h2 className={`${ubuntu.className} text-4xl`}>
          ... And deploy in{" "}
          <Link
            className="text-purple-500 hover:text-blue-300"
            href="https://vercel.com"
            target="_blanck"
          >
            Vercel
          </Link>
        </h2>
        <Vercel />
      </div>
    </header>
  );
}

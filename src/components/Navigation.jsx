import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link.js";
import { Toggle } from "./Toggle";
import React from "./icons/React";

const Navigation = () => {
  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="pr-3" justify="center">
        <NavbarBrand className="flex gap-2">
          <React className="animate-spin" />
          <Link href="/" className="font-bold text-md hover:text-sky-400">
            Front Manegement
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem className="flex gap-4">
          <Link className="font-semibold text-lg hover:text-sky-300" href="/proyects">Projects</Link>
          <Link className="font-semibold text-lg hover:text-sky-300" href="/sources">Sources</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex pr-3" justify="end">
        <NavbarItem>
          <Toggle />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="flex sm:hidden gap-4">
        <NavbarMenu>
          <Link href="/proyects">Projects</Link>
          <Link href="/proyects">Sources</Link>
          <NavbarItem>
            <Toggle />
          </NavbarItem>
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
};

export default Navigation;

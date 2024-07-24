"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Moon from "./icons/Moon";
import Sun from "./icons/Sun";
import { Switch } from "@nextui-org/react";

export function Toggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [selected, setSelected] = useState(true)

  const handleChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex gap-4">
      <Switch size="lg"  defaultSelected color="primary" isSelected={selected} onValueChange={setSelected} onChange={handleChange} startContent={<Sun />} endContent={<Moon />}>
      </Switch>
    </div>
  );
}

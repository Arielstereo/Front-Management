"use client";

import {
  Accordion,
  AccordionItem,
  Link,
  Snippet,
} from "@nextui-org/react";
import data from "@/mockup/data.json";
import { useState } from "react";

const SourcePage = () => {
  const [selectedKeys, setSelectedKeys] = useState();
  return (
    <div className="m-32">
      <h1 className="text-4xl text-start mb-8">Sources and <span className="text-sky-400">Docs</span></h1>
      <div className="grid grid-cols-4 mt-16">
        {data.map((item) => (
          <Accordion
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            variant="splitted"
            key={item.id}
          >
            <AccordionItem
              key={item.id}
              title={item.title}
              subtitle={
                <Link isExternal showAnchorIcon href={item.url}>
                  Visit source docs.
                </Link>
              }
              className="mb-4"
            >
              <Snippet>{item.snippet}</Snippet>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default SourcePage;

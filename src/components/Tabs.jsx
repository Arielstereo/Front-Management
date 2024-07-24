"use client";

import { Card, CardBody, Snippet, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";


const TabComponent = ({icon, snippet1, snippet2, snippet3}) => {
  const [selected, setSelected] = useState("npm");
  return (
    <div className="flex gap-4 w-96">
      <div className="mt-16">
        {icon}
      </div>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key="npm" title="npm">
            <Card>
              <CardBody>
                <Snippet>{snippet1}</Snippet>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="yarn" title="yarn">
            <Card>
              <CardBody>
                <Snippet>{snippet2}</Snippet>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="pnpm" title="pnpm">
            <Card>
              <CardBody>
                <Snippet>{snippet3}</Snippet>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default TabComponent;

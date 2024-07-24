"use client"

import { Spinner } from "@nextui-org/react"

const loading = () => {
  return (
    <div className="h-screen w-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
      <Spinner label="Loading..." color="primary"  labelColor="default" size="lg"/>
    </div>
  )
}

export default loading
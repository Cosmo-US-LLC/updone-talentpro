"use client"

import dynamic, { LoadableOptions } from "next/dynamic";
import { LuLoader } from "react-icons/lu";

 const loadable = <T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>,
    { ssr = false, loading = () =><></> }: LoadableOptions = {}
  ) => dynamic(importFunc, { ssr, loading });
  export default loadable;
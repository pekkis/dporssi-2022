"use client";

import dynamic from "next/dynamic";

const LazyLoadedUserInitializer = dynamic(() => import("./UserInitializer"));

export default LazyLoadedUserInitializer;

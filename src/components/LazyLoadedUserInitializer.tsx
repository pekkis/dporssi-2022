import dynamic from "next/dynamic";

const LazyLoadedUserInitializer = dynamic(() => import("./UserInitializer"), {
  suspense: true,
});

export default LazyLoadedUserInitializer;

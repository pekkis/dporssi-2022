import loadable from "@loadable/component";

const LazyLoadedUserInitializer = loadable(() => import("./UserInitializer"));

export default LazyLoadedUserInitializer;

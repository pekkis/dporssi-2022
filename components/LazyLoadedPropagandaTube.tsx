import loadable from "@loadable/component";
import Spinner from "./Spinner";

const LazyLoadedPropagandaTube = loadable(() => import("./PropagandaTube"), {
  fallback: (
    <span>
      <Spinner /> Aivopesua alustetaan...
    </span>
  )
});

export default LazyLoadedPropagandaTube;

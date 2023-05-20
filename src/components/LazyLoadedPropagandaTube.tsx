import dynamic from "next/dynamic";
import Spinner from "./Spinner";

const LazyLoadedPropagandaTube = dynamic(() => import("./PropagandaTube"), {
  ssr: false,
  suspense: false,
  loading: () => (
    <span>
      <Spinner /> Aivopesua alustetaan...
    </span>
  )
});

export default LazyLoadedPropagandaTube;

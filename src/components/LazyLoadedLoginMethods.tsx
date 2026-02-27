import dynamic from "next/dynamic";
import Spinner from "./Spinner";

const LazyLoadedLoginMethods = dynamic(() => import("./LoginMethods"), {
  loading: () => (
    <span>
      <Spinner /> hetkonen...
    </span>
  )
});

export default LazyLoadedLoginMethods;

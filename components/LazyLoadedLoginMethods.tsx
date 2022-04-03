import loadable from "@loadable/component";
import Spinner from "./Spinner";

const LazyLoadedLoginMethods = loadable(() => import("./LoginMethods"), {
  fallback: (
    <span>
      <Spinner /> hetkonen...
    </span>
  )
});

export default LazyLoadedLoginMethods;

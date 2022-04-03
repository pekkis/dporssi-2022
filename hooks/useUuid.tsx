import { useRef } from "react";

import { v4 as uuidv4 } from "uuid";

const useUuid = () => {
  const ref = useRef<string>(uuidv4());
  return ref.current;
};

export default useUuid;

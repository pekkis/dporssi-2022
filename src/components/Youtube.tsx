import { FC } from "react";
import ReactPlayer from "react-player";

type Props = {
  videoId: string;
};

const ReactPlayerAny = ReactPlayer as React.ComponentType<{
  url: string;
  width: string;
  height: string;
}>;

const Youtube: FC<Props> = ({ videoId }) => {
  return (
    <div className="relative pb-[56.25%] h-0">
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <ReactPlayerAny
          width="100%"
          height="100%"
          url={`https://www.youtube.com/watch?v=${videoId}`}
        />
      </div>
    </div>
  );
};

export default Youtube;

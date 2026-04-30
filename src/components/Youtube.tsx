import { FC } from "react";
import ReactPlayer from "react-player";
import { youtubeInner, youtubeWrap } from "./Youtube.css";

type Props = {
  videoId: string;
};

const Youtube: FC<Props> = ({ videoId }) => {
  return (
    <div className={youtubeWrap}>
      <div className={youtubeInner}>
        <ReactPlayer
          width="100%"
          height="100%"
          url={`https://www.youtube.com/watch?v=${videoId}`}
        />
      </div>
    </div>
  );
};

export default Youtube;

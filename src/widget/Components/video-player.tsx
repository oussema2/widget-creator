import { Dash } from "../icons/dash";

const VideoPlayer = ({
  setIsCostumePlayerShowed,
  url,
  text,
}: {
  setIsCostumePlayerShowed: () => void;
  url: string;
  text: string;
}) => {
  console.log(url);
  return (
    <div
      onClick={() => setIsCostumePlayerShowed()}
      style={{
        width: "150px",
        height: "200px",
        border: "5px solid rgb(0, 51, 255)",
        borderRadius: "15px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "40px",
          height: "20px",
          backgroundColor: "rgb(0, 51, 255)",
          position: "absolute",
          top: "16px",
          right: "16px",
          borderRadius: "4px",
        }}
      >
        <Dash />
      </div>
      <video
        style={{
          width: "110%",
          height: "110%",
          objectFit: "cover",
          borderRadius: "15px",
        }}
        autoPlay
        loop
        playsInline
        muted={true}
        src={url}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "calc(50% - 50px)",
          width: "100px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: "18px", color: "white", fontWeight: "bold" }}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;

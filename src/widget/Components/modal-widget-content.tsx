import { useState } from "react";
import { Close } from "../icons/close";

const ModalWidgetContent = ({
  closeModal,
  options,
}: {
  closeModal: () => void;
  options: any;
}) => {
  const [showInnerModal, setShowInnerModal] = useState(false);
  return (
    <div
      className="widget"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: "80",
      }}
    >
      {showInnerModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(10,25,0,0.5)",
            zIndex: "90",
          }}
        >
          <div
            style={{
              width: "250px",
              height: "400px",
              backgroundColor: "white",
              position: "absolute",
              top: "calc(50% - 200px)",
              left: "calc(50% - 125px)",
            }}
          >
            <video
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              autoPlay
              loop
              playsInline
              muted={true}
              src={options.videos[0].source}
            />
            <div
              onClick={() => setShowInnerModal(false)}
              style={{
                position: "absolute",
                padding: "8px",
                borderRadius: "999px",
                backgroundColor: "white",
                right: -46,
                top: 0,
                zIndex: 80,
                cursor: "pointer",
              }}
            >
              <Close fill={"black"} />
            </div>{" "}
          </div>
        </div>
      )}
      <div
        style={{
          width: "80%",
          height: "90%",
          backgroundColor: "white",
          position: "absolute",
          top: "5%",
          left: "10%",
        }}
      >
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          {" "}
          <div
            onClick={() => closeModal()}
            style={{
              position: "absolute",
              padding: "8px",
              borderRadius: "999px",
              backgroundColor: "white",
              left: -46,
              top: 0,
              zIndex: 80,
              cursor: "pointer",
            }}
          >
            <Close fill={"black"} />
          </div>{" "}
          <button onClick={() => setShowInnerModal(true)}>Open Video</button>
        </div>
      </div>
    </div>
  );
};

export default ModalWidgetContent;

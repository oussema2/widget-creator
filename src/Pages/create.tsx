import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Create = () => {
  return (
    <div className="w-full h-screen flex flex-row items-center justify-center bg-gray-900">
      <Button>
        <Link to={"/initiate"}>Create Widget</Link>
      </Button>
    </div>
  );
};

export default Create;

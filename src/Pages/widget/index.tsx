import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/Organisms/side-bar";
import VideosPreviews from "@/Organisms/videos-previews";
import { AppDispatch } from "@/redux/app/store";
import { fetchBrand, fetchWidget } from "@/redux/features/widget/widgetThunks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

const Widget = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    (async () => {
      if (params.id) {
        dispatch(fetchWidget(params.id));
        dispatch(fetchBrand(params.id));
      }
    })();
  }, []);

  return (
    <SidebarProvider>
      <div className="w-full h-screen flex flex-row items-start justify-between overflow-hidden">
        <AppSidebar />
        <Outlet />
        <VideosPreviews />
      </div>
    </SidebarProvider>
  );
};

export default Widget;

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const sideBarPages: { title: string; link: string }[] = [
  { title: "Details", link: "details" },
  { title: "Appearance", link: "appearance" },
  { title: "Brand", link: "brand-settings" },
  { title: "Publish", link: "publish" },
];

const AppSidebar = () => {
  const location = useLocation().pathname.split("/")[3];
  console.log(location);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sideBarPages.map((item) => (
                <SidebarMenuItem
                  className={`${
                    item.link === location ? "bg-slate-200 rounded-[6px]" : ""
                  }`}
                  key={item.title}
                >
                  <SidebarMenuButton asChild>
                    <Link to={item.link}>
                      {/* <item.icon /> */}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

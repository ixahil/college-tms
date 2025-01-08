import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { agentMenu } from "@/configs/agents";
import { Menu } from "../menu";
import { SidebarFooterMenu } from "./sidebar-footer-menu";
import { SidebarWorkspace } from "./sidebar-workspace";
import { getAgent } from "@/lib/api/queries/agent";

export async function AppSidebar({ slug }: { slug: string }) {
  const { data } = await getAgent(slug);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarWorkspace data={data} />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <Menu menu={agentMenu} slug={slug} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterMenu data={data} />
      </SidebarFooter>
    </Sidebar>
  );
}

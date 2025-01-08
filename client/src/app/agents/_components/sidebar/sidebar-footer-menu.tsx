"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { logoutAgent } from "@/lib/api/mutations/agent";
import { ChevronUp, User2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const SidebarFooterMenu = ({ data }: { data: AgentFields | null }) => {
  const router = useRouter();
  const handleLogout = async () => {
    const { error } = await logoutAgent();
    if (!error) router.push("/agents/login");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="border-2">
            <SidebarMenuButton>
              <User2 /> {data?.email}
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem>
              <Button variant={"ghost"} onClick={handleLogout}>
                <span>Sign out</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

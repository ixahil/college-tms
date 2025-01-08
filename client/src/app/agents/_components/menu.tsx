import { buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { IMenu, IMenuItem } from "@/types/globals";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type MenuProp = {
  menu: IMenu;
  slug: string;
};

export const Menu = ({ menu, slug }: MenuProp) => {
  return Object.keys(menu).map((group) => (
    <SidebarGroup key={group}>
      <SidebarGroupLabel>{group}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {menu[group].items.map((item) => (
            <MenuItem item={item} key={item.title} slug={slug} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
};

const MenuItem = ({ item, slug }: { item: IMenuItem; slug: string }) => {
  const activeRoute = false;
  if (!item.items || item.items.length === 0) {
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild tooltip={item.title}>
          <Link
            href={`/agents/${slug}/${item.url}`}
            className={buttonVariants({
              variant: activeRoute ? "sidebarActiveItem" : "sidebarItem",
            })}
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }
  return (
    <Collapsible
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title} className="pl-4">
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <Link
                    href={`/agents/${slug}/${subItem.url}`}
                    className={cn(
                      "w-full",
                      buttonVariants({
                        variant: activeRoute
                          ? "sidebarActiveItem"
                          : "sidebarItem",
                      })
                    )}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

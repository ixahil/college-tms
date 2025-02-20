import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppBreadcrumb } from "../breadcrumb";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-4">
          <SidebarTrigger />
          <AppBreadcrumb />
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ThemeToggle />
          {/* <SignedIn>
            <UserButton />
          </SignedIn>
          <UserNav /> */}
        </div>
      </div>
    </header>
  );
}

import { SidebarProvider } from "@/components/ui/sidebar";
import { getAgent } from "@/lib/api/queries/agent";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Footer } from "../../_components/footer";
import { Header } from "../../_components/header";
import { ThemeProvider } from "../../_components/providers/theme-provider";
import { AppSidebar } from "../../_components/sidebar";

type Props = {
  params: Promise<{ slug: string }>;
  children: ReactNode;
};

const AgentLayout = async ({ params, children }: Props) => {
  const slug = (await params).slug;

  const response = await getAgent(slug);

  const { error } = response;

  if (error) {
    redirect("/agents/login");
  }

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider
        suppressHydrationWarning
        defaultOpen={defaultOpen}
        style={{
          "--sidebar-width": "16rem",
          "--sidebar-width-mobile": "20rem",
        }}
      >
        <AppSidebar slug={slug} />
        <div className={"w-full h-full"}>
          <Header />

          <main
            className={
              "w-full min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300"
            }
          >
            {children}
          </main>
          <footer className={"ease-in-out duration-300"}>
            <Footer />
          </footer>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default AgentLayout;

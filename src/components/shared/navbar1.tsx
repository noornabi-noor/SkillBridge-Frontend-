"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "../theme/modeToggle";
import { PageContainer } from "./../layout/page-container";

// 🔹 TEMP: replace later with Better Auth hook
const isAuthenticated = false;

const menu = [
  { title: "Find Tutors", url: "/find-tutors" },
  { title: "Categories", url: "/categories" },
  { title: "Become a Tutor", url: "/become-tutor" },
  { title: "AllUsers", url: "/allUsers" },
];

function Navbar1() {
  return (
    <section className="border-b">
      <PageContainer className="h-16 flex items-center">
        {/* ================= DESKTOP NAVBAR ================= */}
        <nav className="hidden lg:flex w-full items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-xl font-bold">
            SkillBridge
          </a>

          {/* Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              {menu.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink
                    href={item.url}
                    className="px-4 py-2 text-sm font-medium hover:text-primary"
                  >
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <>
                <Button asChild variant="outline" size="sm">
                  <a href="/login">Login</a>
                </Button>
                <Button asChild size="sm">
                  <a href="/register">Sign Up</a>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <a href="/dashboard">Dashboard</a>
                </Button>
                <Button variant="destructive" size="sm">
                  Logout
                </Button>
              </>
            )}
            <ModeToggle />
          </div>
        </nav>

        {/* ================= MOBILE NAVBAR ================= */}
        <div className="flex lg:hidden w-full items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-lg font-bold">
            SkillBridge
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>SkillBridge</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-4">
                {/* Menu */}
                <div className="flex flex-col gap-3">
                  {menu.map((item) => (
                    <a
                      key={item.title}
                      href={item.url}
                      className="text-sm font-medium"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>

                <div className="border-t pt-4" />

                {/* Auth */}
                {!isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <Button asChild variant="outline">
                      <a href="/login">Login</a>
                    </Button>
                    <Button asChild>
                      <a href="/register">Sign Up</a>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button asChild variant="outline">
                      <a href="/dashboard">Dashboard</a>
                    </Button>
                    <Button variant="destructive">Logout</Button>
                  </div>
                )}

                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </PageContainer>
    </section>
  );
}

export { Navbar1 };

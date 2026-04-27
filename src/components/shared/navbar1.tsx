"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
import { PageContainer } from "../layout/page-container";
import { getCurrentUser } from "@/services/auth/auth";
import { logout } from "@/services/auth/authClient";

const menu = [
  { title: "Find Tutors", url: "/find-tutors" },
  { title: "Categories", url: "/categories" },
  { title: "Become a Tutor", url: "/become-tutor" },
  { title: "About", url: "/about" },
  { title: "Terms", url: "/terms" },
  { title: "Privacy", url: "/privacy" },
];

function Navbar1() {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  if (!mounted) {
    return (
      <section className="border-b">
        <PageContainer className="h-16 flex items-center justify-between">
          <div className="text-xl font-bold">🎓 SkillBridge</div>
          <div className="h-8 w-24" />
        </PageContainer>
      </section>
    );
  }

  return (
    <section className="border-b">
      <PageContainer className="h-16 flex items-center">
        {/* ================= DESKTOP ================= */}
        <nav className="hidden lg:flex w-full items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            🎓 SkillBridge
          </Link>

          {/* Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              {menu.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.url}
                      className="px-4 py-2 text-sm font-medium hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {!user ? (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
            <ModeToggle />
          </div>
        </nav>

        {/* ================= MOBILE ================= */}
        <div className="flex lg:hidden w-full items-center justify-between">
          <Link href="/" className="text-lg font-bold">
            🎓 SkillBridge
          </Link>

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
                {menu.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className="text-sm font-medium"
                  >
                    {item.title}
                  </Link>
                ))}

                <div className="border-t pt-4" />

                {!user ? (
                  <div className="flex flex-col gap-2">
                    <Button asChild variant="outline">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button asChild variant="outline">
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <Button variant="destructive" onClick={handleLogout}>
                      Logout
                    </Button>
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

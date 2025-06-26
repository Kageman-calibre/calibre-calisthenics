
import { Gamepad2 } from "lucide-react";
import { NavigationItem } from "./types";

export const navigationItems: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Programs", href: "/programs" },
  { name: "Studio", href: "/studio" },
  { name: "Skills", href: "/skill-guides" },
  { name: "RPG System", href: "/rpg", icon: Gamepad2 },
];

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
// import { Link } from "@radix-ui/react-navigation-menu";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  {
    lebel: "Home",
    href: "/",
  },
  {
    lebel: "Product",
    href: "/product",
  },
  {
    lebel: "Contact",
    href: "/s",
  },
  {
    lebel: "Support",
    href: "/fs",
  },
  {
    lebel: "Blog",
    href: "/fg",
  },
];

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // event target
      const target = event.target as HTMLElement;
      // screent width
      const screen = window.screen.width;

      // ---**** return if the screen width is larger
      if (screen > 1024) {
        return;
      }

      // return if the user click on the drawer or the navbar
      if (target.closest(".myDrawer") || target.closest(".menuBTn")) {
        return;
      }

      setShowSidebar(false);
    };

    // hide sidebar on clicking outside
    if (showSidebar) {
      document.body.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSidebar, setShowSidebar]);
  return (
    <div className="mx-auto container ">
      <div className="flex  items-center justify-between border-b-2 py-3 ">
        <Link to="/" className="flex items-center">
          <img src="/images/logo.png" className="w-[120px]" />
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <div className="flex justify-end">
              <NavigationMenuItem>
                {navLinks.map(({ href, lebel }, i) => (
                  <Link to={href} key={i}>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {lebel}
                    </NavigationMenuLink>
                  </Link>
                ))}
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="md:hidden flex menuBTn"
        >
          {showSidebar ? <X /> : <Menu />}
        </button>

        {/* sidebar */}
        <div
          className={`${
            showSidebar
              ? "w-[300px] border-r-[1px] px-[20px] pt-[20px]"
              : "w-[0px]"
          } bg-white left-0 top-0 fixed h-screen border-borderColor z-20 overflow-hidden myDrawer`}
          style={{ transition: "0.3s" }}
        >
          <Link to="/" className="flex items-center">
            <img src="/images/logo.png" className="w-[120px]" />
          </Link>
          <div className="w-full flex flex-col mt-[20px]">
            {navLinks.map(({ href, lebel }) => (
              <NavLink
                to={href}
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-primaryMat text-white" : "text-primaryTxt"
                  }  w-full px-[15px] py-[8px] rounded-[5px]`
                }
              >
                {lebel}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

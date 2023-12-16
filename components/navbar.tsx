"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";

// icons
import { MdCamera, MdOutlineUpload, MdSettings } from "react-icons/md";

import { Logo } from "@/components/icons";
import { useParams, usePathname, useRouter } from "next/navigation";
import { User } from "@nextui-org/user";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useDisclosure } from "@nextui-org/modal";
import { Image } from "@nextui-org/react";
// import { ThemeSwitch } from "./theme-switch";

import ImageLogo from "@/public/image/logo-image.png";
import { useEffect, useRef } from "react";

export const Navbar = () => {
  let navRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if(navRef.current) {
      console.log(window.innerHeight, 'windoww-nav', navRef.current.clientHeight)
    }
  },[])

  return (
    <NextUINavbar
      ref={navRef} 
      maxWidth="2xl" 
      position="sticky"
      className=""
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:-top-1",
          "data-[active=true]:after:left-3",
          "data-[active=true]:after:right-3",
          "data-[active=true]:after:h-[4px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex text-default-500 justify-start items-center gap-1"
            href="/"
          >
            <Image alt="logo" src="/image/logo-nav.png" width={150} />
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => {
            if (pathname == item.href) {
              return (
                <NavbarItem isActive key={item.href}>
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "secondary" }),
                      "data-[active=true]:font-medium"
                    )}
                    color="primary"
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              );
            }
            return (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            );
          })}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <div className="w-full max-w-[12rem] relative flex items-center">
          <Button
            type="button"
            variant="solid"
            color="primary"
            className="w-full px-4 py-2 rounded-full text-center flex items-center justify-center group-hover:bg-transparent"
          >
            Import Data
            <div className="absolute p-2 bg-white rounded-full shadow-sm z-10 duration-500 group-hover:translate-x-full -right-2">
              <MdOutlineUpload className="w-10 h-10 bg-green-400 rounded-full p-1 text-white duration-300 group-hover:rotate-90" />
            </div>
          </Button>
        </div>
        {/* <User
          name={<span className="hidden sm:flex">John Doe</span>}
          description={<span className="hidden sm:flex">Administrator</span>}
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            size: "sm",
            color: "secondary",
          }}
          className="transition-transform hidden sm:flex"
        />
        <div className="hidden sm:block border-l h-10 mx-0 sm:mx-2"></div>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button className="focus:outline-none">
              <MdSettings className="w-6 h-6" />
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            color="primary"
            className="text-black"
          >
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">John Doe</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={onOpen}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
      </NavbarContent>

      {/* <NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
						<TwitterIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.discord} aria-label="Discord">
						<DiscordIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.github} aria-label="Github">
						<GithubIcon className="text-default-500" />
					</Link>
				</NavbarItem>

				<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
				<NavbarItem className="hidden md:flex">
					<Button
            isExternal
						as={Link}
						className="text-sm font-normal text-default-600 bg-default-100"
						href={siteConfig.links.sponsor}
						startContent={<HeartFilledIcon className="text-danger" />}
						variant="flat"
					>
						Sponsor
					</Button>
				</NavbarItem>
			</NavbarContent> */}

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button className="focus:outline-none">
              <Avatar
                className="transition-transform"
                color="secondary"
                name="John Doe"
                size="sm"
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                fallback={
                  <MdCamera
                    className="animate-pulse w-6 h-6 text-default-500"
                    fill="currentColor"
                    size={20}
                  />
                }
              />
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            color="primary"
            className="text-black"
          >
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">John Doe</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={onOpen}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="w-full max-w-[12rem] relative flex items-center mx-auto">
          <Button
            type="button"
            variant="solid"
            color="primary"
            className="w-full px-4 py-2 rounded-full text-center flex items-center justify-center group-hover:bg-transparent"
          >
            Import Data
            <div className="absolute p-2 bg-white rounded-full shadow-sm z-10 duration-500 group-hover:translate-x-full -right-2">
              <MdOutlineUpload className="w-10 h-10 bg-green-400 rounded-full p-1 text-white duration-300 group-hover:rotate-90" />
            </div>
          </Button>
        </div>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

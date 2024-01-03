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
import {
  MdCamera,
  MdDelete,
  MdDocumentScanner,
  MdOutlineUpload,
  MdSettings,
  MdUpload,
} from "react-icons/md";

import { Logo } from "@/components/icons";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { User } from "@nextui-org/user";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Image } from "@nextui-org/react";
// import { ThemeSwitch } from "./theme-switch";

import ImageLogo from "@/public/image/logo-image.png";
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { convertBytes } from "@/utils/useFunction";
import { FaCircleNotch } from "react-icons/fa";
import {
  useCarbonFilesApi,
  useCarbonSoilsFilesApi,
  useGHGFilesApi,
  useLittersFilesApi,
  useLocationFilesApi,
  useSoilsFilesApi,
  useTreesFilesApi,
  useWeatherFilesApi,
  useWoodyFilesApi,
} from "@/api/import.api";
import { toast } from "react-toastify";
import { AxiosRequestConfig } from "axios";
import useAxios from "@/hooks/use-axios";
import { useAuth } from "@/stores/auth";

export const Navbar = () => {
  let navRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();

  // import
  const GHGImport = useGHGFilesApi();
  const LocationImport = useLocationFilesApi();
  const SoilsImport = useSoilsFilesApi();
  const WeatherImport = useWeatherFilesApi();
  const CarbonImport = useCarbonFilesApi();
  const CarbonWoodyImport = useWoodyFilesApi();
  const CarbonLittersImport = useLittersFilesApi();
  const CarbonSoilsImport = useCarbonSoilsFilesApi();
  const CarbonTreesImport = useTreesFilesApi();

  const [selected, setSelected] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [loadingImport, setLoadingImport] = useState<boolean>(false);
  const [isImport, setIsImport] = useState<boolean>(false);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const auth = useAuth();
  const axios = useAxios();

  const logout = async (options?: AxiosRequestConfig) => {
    let config = options;
    // cconfi
    setLoading(true);
    try {
      const { data: lists, ...result } = await axios.$post(
        "/auth/logout",
        options
      );
      toast.info("Logout is successfully!");
      setLoading(false);
      await auth.logout();
      await router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navRef.current) {
      console.log(
        window.innerHeight,
        "windoww-nav",
        navRef.current.clientHeight
      );
    }
  }, []);

  console.log(selected, "selected");

  const onCloseImport = () => {
    if (fileRef.current) {
      fileRef.current.value = "";
      setFiles([]);
    }
    setSelected("");
    onOpenChange();
  };

  const onDeleteFiles = (id: any) => {
    if (fileRef.current) {
      fileRef.current.value = "";
      setFiles(files.splice(id, 0));
    }
  };

  const onFilesUpload = async (files: File[]) => {
    // Handle the multiple file upload logic here
    if (!files || files.length == 0) {
      toast.error("Please input your document files!");
      return;
    }

    let formData = new FormData();
    let imagefile = files;
    formData.append("file", imagefile[0]);
    setLoadingImport(true)
    try {
      switch (selected) {
        case "NCS Location":
          return await LocationImport.fetch(formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

        case "GHG Fluxes":
          return await GHGImport.fetch(formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

        case "Soil psychochemical properties":
          return await SoilsImport.fetch(formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

        case "Weather data (AWS)":
          return await WeatherImport.fetch(formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

        case "Woody Debris":
          return await CarbonWoodyImport.fetch(formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

        case "Litters":
          return await CarbonLittersImport.fetch(formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

        case "Carbon Soils":
          return await CarbonSoilsImport.fetch(formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

        case "Carbon Trees":
          return await CarbonTreesImport.fetch(formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

        default:
          break;
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingImport(false)
      onCloseImport()
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      // Convert FileList to Array
      const fileList = Array.from(files);
      setFiles(fileList);
    }
  };

  return (
    <Fragment>
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
              // console.log(pathname.includes(label), item.label, 'href')
              let label = item?.label.toLowerCase();
              if (pathname == item.href || pathname.includes(label)) {
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
            <Dropdown
              showArrow
              radius="sm"
              classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "p-0 border-small border-divider bg-background",
              }}
            >
              <DropdownTrigger>
                <Button
                  disableRipple
                  variant="solid"
                  color="primary"
                  className="w-full px-4 py-2 rounded-full text-center flex items-center justify-center group-hover:bg-transparent"
                >
                  Import Data
                  <div className="absolute p-2 bg-white rounded-full shadow-sm z-10 duration-500 group-hover:translate-x-full -right-2">
                    <MdOutlineUpload className="w-10 h-10 bg-green-400 rounded-full p-1 text-white duration-300 group-hover:rotate-90" />
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Custom item styles"
                // disabledKeys={["profile"]}
                className="p-3"
                color="primary"
                itemClasses={{
                  base: [
                    "rounded-md",
                    "text-default-500",
                    "transition-opacity",
                    "data-[hover=true]:text-foreground",
                    "data-[hover=true]:bg-default-100",
                    "dark:data-[hover=true]:bg-default-50",
                    "data-[selectable=true]:focus:bg-default-50",
                    "data-[pressed=true]:opacity-70",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                }}
              >
                <DropdownSection aria-label="Upload Documents">
                  <DropdownItem
                    key="ghg-flux"
                    onPress={() => {
                      setSelected("GHG Fluxes");
                      onOpen();
                    }}
                    // endContent={<MdUpload className="text-large" />}
                  >
                    GHG Fluxes
                  </DropdownItem>

                  <DropdownItem
                    key="ncs"
                    onPress={() => {
                      setSelected("NCS Location");
                      onOpen();
                    }}
                    // endContent={<MdUpload className="text-large" />}
                  >
                    NCS Location
                  </DropdownItem>

                  <DropdownItem
                    key="soils"
                    onPress={() => {
                      setSelected("Soil psychochemical properties");
                      onOpen();
                    }}
                    // endContent={<MdUpload className="text-large" />}
                  >
                    Soil Psychochemical
                  </DropdownItem>

                  <DropdownItem
                    key="aws"
                    onPress={() => {
                      setSelected("Weather data (AWS)");
                      onOpen();
                    }}
                    // endContent={<MdUpload className="text-large" />}
                  >
                    Weather data (AWS)
                  </DropdownItem>

                  <DropdownItem
                    key="carbon-stock-woody"
                    onPress={() => {
                      setSelected("Woody Debris");
                      onOpen();
                    }}
                  >
                    Woody Debris
                  </DropdownItem>

                  <DropdownItem
                    key="carbon-litters"
                    onPress={() => {
                      setSelected("Litters");
                      onOpen();
                    }}
                  >
                    Litter Mass
                  </DropdownItem>

                  <DropdownItem
                    key="carbon-soils"
                    onPress={() => {
                      setSelected("Carbon Soils");
                      onOpen();
                    }}
                  >
                    Carbon Soils
                  </DropdownItem>

                  <DropdownItem
                    key="carbon-trees"
                    onPress={() => {
                      setSelected("Carbon Trees");
                      onOpen();
                    }}
                  >
                    Carbon Trees
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
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
                  href={item.href}
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>

      {/* modal */}
      <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onCloseImport}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 border-b-2 border-default-200">
            {selected}
          </ModalHeader>
          <ModalBody>
            <div className="w-full flex flex-col gap-2 mb-3">
              <div className="w-full flex flex-col gap-2">
                <div className="font-semibold">Import Document</div>
                {files && files?.length > 0
                  ? files?.map((file, id) => {
                      console.log(file, "result");
                      return (
                        <div key={id} className="w-full grid grid-cols-6 gap-2">
                          <div className="w-full flex max-w-[50px] h-[50px] min-h-[50px] border border-gray shadow-card rounded-lg justify-center items-center">
                            <MdDocumentScanner className="w-6 h-6" />
                          </div>
                          <div className="w-full col-span-4 text-sm">
                            <p>{file?.name}</p>
                            <p>
                              {file?.size
                                ? convertBytes({ bytes: file?.size })
                                : "-"}
                            </p>
                          </div>

                          <div className="w-full max-w-max flex justify-center items-center">
                            <Button
                              type="button"
                              className={`rounded-lg text-sm py-1 px-2 shadow-card hover:opacity-90 active:scale-95 ml-auto`}
                              onClick={() => onDeleteFiles(id)}
                            >
                              <MdDelete className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
              <input
                type="file"
                id="document"
                placeholder="Upload Document"
                autoFocus
                className={`w-full focus:outline-none max-w-max text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-2 file:border-primary file:text-sm file:font-semibold file:bg-violet-50 file:text-primary-700 hover:file:bg-violet-100 ${
                  files?.length > 0 ? "hidden" : ""
                }`}
                onChange={handleFileChange}
                ref={fileRef}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" color="danger" onClick={onCloseImport}>
              <span className="text-xs font-semibold">Discard</span>
            </Button>

            <Button
              type="button"
              className=""
              color="primary"
              onClick={() => onFilesUpload(files).then(router.refresh)}
              disabled={
                GHGImport.fetching ||
                CarbonImport.fetching ||
                LocationImport.fetching ||
                SoilsImport.fetching ||
                WeatherImport.fetching ||
                loadingImport
              }
            >
              {GHGImport.fetching ||
              CarbonImport.fetching ||
              LocationImport.fetching ||
              SoilsImport.fetching ||
              WeatherImport.fetching ||
              loadingImport ? (
                <Fragment>
                  <span className="text-xs">Processing...</span>
                  <FaCircleNotch className="w-4 h-4 animate-spin-1.5" />
                </Fragment>
              ) : (
                <span className="text-xs">Yes, Import it!</span>
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

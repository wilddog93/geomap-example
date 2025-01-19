"use client";

import useAxios from "@/hooks/use-axios";
import { useAuth } from "@/stores/auth";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
  ScrollShadow,
} from "@nextui-org/react";
import { AxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";
import { redirect, useRouter } from "next/navigation";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import {
  MdArrowForward,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const axios = useAxios();
  const auth = useAuth();
  const token = getCookie("token");

  console.log(auth, "auth", token);

  const login = async (body?: any, options?: AxiosRequestConfig) => {
    console.log(body, options, "data");
    setLoading(true)
    try {
      const { data: lists, ...result } = await axios.$post(
        "/auth/login",
        body,
        options
      );
      toast.info("Login is successfully!")
      setLoading(false)
      await auth.login({ token: result?.token?.access_token, refreshToken: result?.token?.refresh_token });
      await router.push("/");
    } catch (error:any) {
      toast.error(error?.response?.data?.message)
      setLoading(false)
    }
  };

  const isFunctionHidden = () => {
    setIsHidden((t) => !t);
  };
  

  // if (token) {
  //   redirect(`/`);
  // }

  console.log(token, "token");

  return (
    <div className="relative overflow-hidden w-full h-screen lg:h-full flex items-center bg-white shadow-default">
      <div
        style={{ 
          backgroundImage: `url(/image/login-img.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative w-full lg:w-2/3 h-full hidden lg:flex min-h-screen">
        <div className="w-full h-full flex flex-col justify-between p-10 z-30">
          <h1 className="text-white drop-shadow-md text-8xl font-bold">
            Melindungi Alam, Melestarikan Kehidupan
          </h1>

          <Card
            radius="none"
            className="bg-gray/10 w-96 backdrop-blur-sm shadow-sm rounded-none"
          >
            <CardBody>
              <p className="text-white text-lg drop-shadow-md">
                Mewujudkan Indonesia yang lestari, menjaga keseimbangan antara
                kebutuhan manusia dan kelestarian alam untuk generasi sekarang
                dan yang akan datang.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>

      <div
        className={`w-full lg:w-1/3 absolute z-10 bg-white h-full transform duration-300 ease-in-out translate-x-0 right-0`}
      >
        <ScrollShadow className="w-full h-full">
          <div className="w-full h-full flex flex-col justify-between">
            <div className="w-full flex flex-col gap-4 justify-center items-center">
              <Image
                radius="none"
                className="mx-auto object-cover object-center px-5 w-96 my-10 lg:my-14"
                src="/image/logo-nav.png"
                alt="Barrier Logo"
              />
              <div className="w-full px-14 mb-5">
                <h3 className="font-bold text-xl lg:text-2xl text-center">
                  Internal Geospatial Dashboard
                </h3>
                <p className="text-center text-sm">
                  NCS Peatland Restoration Science -
                </p>
              </div>

              <form className="w-full flex flex-col justify-center items-center gap-1 mt-5 px-14">
                <label htmlFor="sandi" className="text-sm text-gray-5">
                  Kata sandi
                </label>
                <Input
                  value={password}
                  onChange={(event: ChangeEvent<{ value: string }>) =>
                    setPassword(event?.currentTarget.value)
                  }
                  radius="full"
                  type={isHidden ? "password" : "text"}
                  label=""
                  id="sandi"
                  placeholder="Masukkan kata sandi"
                  labelPlacement="outside"
                  startContent={
                    <div className="p-1 rounded-full bg-white border border-blue-500 text-blue-500">
                      <MdLock className="text-2xl text-current pointer-events-none flex-shrink-0 h-8 w-8" />
                    </div>
                  }
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={isFunctionHidden}
                    >
                      {isHidden ? (
                        <MdVisibility className="text-2xl text-blue-500 pointer-events-none" />
                      ) : (
                        <MdVisibilityOff className="text-2xl text-blue-500 pointer-events-none" />
                      )}
                    </button>
                  }
                  classNames={{
                    input: ["px-10"],
                    inputWrapper: [
                      "px-0 pr-3 bg-transparent border border-stroke",
                    ],
                    mainWrapper: ["text-center mb-5 text-sm"],
                  }}
                />

                <div className="w-full relative flex items-center">
                  <Button
                    type="submit"
                    variant="solid"
                    color="primary"
                    className="w-full px-4 py-2 rounded-full text-center flex items-center justify-center group-hover:bg-transparent"
                    onClick={(e:any) => {
                      e.preventDefault()
                      login({ password })
                    }}
                    isLoading={loading}
                  >
                    {loading ? "Loading..." : "Login"}
                    <div className="absolute p-2 bg-white rounded-full shadow-sm z-10 duration-300 group-hover:translate-x-full -right-2">
                      <MdArrowForward className="w-10 h-10 bg-green-400 rounded-full p-1 text-white" />
                    </div>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ScrollShadow>
      </div>
    </div>
  );
}

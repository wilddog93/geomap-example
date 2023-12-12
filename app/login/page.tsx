"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
  ScrollShadow,
} from "@nextui-org/react";
import { useState } from "react";
import {
  MdArrowForward,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

export default function LoginPage() {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const isFunctionHidden = () => {
    setIsHidden((t) => !t);
  };

  return (
    <div className="relative overflow-hidden w-full h-screen lg:h-full flex items-center bg-white shadow-default">
      <div className="relative w-full lg:w-2/3 h-full">
        <div className="w-full h-full flex flex-col justify-between p-10 absolute z-30">
          <h1 className="text-white drop-shadow-md text-8xl font-bold">
            Melindungi Alam, Melestarikan Kehidupan
          </h1>

          <Card radius="none" className="bg-gray/10 w-96 backdrop-blur-sm shadow-sm rounded-none">
            <CardBody>
              <p className="text-white text-lg drop-shadow-md">
                Mewujudkan Indonesia yang lestari, menjaga keseimbangan antara
                kebutuhan manusia dan kelestarian alam untuk generasi sekarang
                dan yang akan datang.
              </p>
            </CardBody>
          </Card>
        </div>
        <div className="w-full absolute inset-0 z-10">
          <Image
            className="w-full object-cover object-center"
            src="/image/login-img.png"
            alt="Barrier Logo"
            sizes="100vh"
            radius="none"
          />
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
                className="mx-auto object-cover object-center w-80"
                src="/image/login-logo.png"
                alt="Barrier Logo"
              />
              <div className="w-full px-10 mb-5">
                <h3 className="font-bold text-4xl text-center">
                  Internal Geospatial Dashboard
                </h3>
                <p className="text-center">
                  NCS Peatland Restoration Science -
                </p>
              </div>

              <div className="w-full flex flex-col justify-center items-center gap-1 mt-5 px-10">
                <label htmlFor="sandi" className="text-md text-gray-5">
                  Kata sandi
                </label>
                <Input
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
                    mainWrapper: ["text-center mb-5"],
                  }}
                />

                <div className="w-full relative flex items-center">
                  <Button
                    type="button"
                    variant="solid"
                    color="primary"
                    className="w-full px-4 py-2 rounded-full text-center flex items-center justify-center group-hover:bg-transparent"
                  >
                    Login
                    <div className="absolute p-2 bg-white rounded-full shadow-sm z-10 duration-300 group-hover:translate-x-full -right-2">
                      <MdArrowForward className="w-10 h-10 bg-green-400 rounded-full p-1 text-white" />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollShadow>
      </div>
    </div>
  );
}

"use client";
import LoadingPage from "@/app/loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";

export default function Setting() {
  const { data, status } = useSession();
  const [imgSrc, setImgSrc] = useState(data?.user?.image ?? "");
  console.log(data, status);
  function handleImgPreview(e: ChangeEvent<HTMLInputElement>) {
    const newImg = e.target.files?.[0];
    if (!newImg?.type.startsWith("image/")) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(newImg);
    fileReader.onload = () => {
      setImgSrc(fileReader.result as string);
    };
    console.log(e.target.files);
  }
  useEffect(() => {
    if (status != "loading") {
      setImgSrc(data?.user?.image ?? "");
    }
  }, [status]);
  if (status === "loading") return <LoadingPage />;
  return (
    <section className="w-full">
      <h1 className="text-title">Settings</h1>
      <p className="text-subtitle">Manage your user settings</p>

      <Card className="mt-10 w-full max-w-lg">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <section className="w-full flex space-x-5">
            {/* img */}
            <div className="relative h-fit w-fit">
              <div className="w-[100px] h-[100px] rounded-full bg-slate-200 relative overflow-hidden">
                <Image src={imgSrc} alt="profile_pfp" layout="fill" />
              </div>
              <label
                htmlFor="profile_pfp"
                className="flex items-center justify-center absolute w-[40px] h-[35px] border cursor-pointer rounded-full bg-slate-200 -bottom-1 -right-1 "
              >
                <Camera size={20} className="text-slate-500" />
                <input
                  type="file"
                  name="profile_pfp"
                  id="profile_pfp"
                  className="hidden"
                  onChange={(e) => handleImgPreview(e)}
                />
              </label>
            </div>
            <div className="flex-1 gap-y-1 flex justify-center flex-col">
              <h2 className="text-xl font-semibold">{data?.user?.name}</h2>
              <p className="text-sm ">{data?.user?.email}</p>
              <span className="text-sm block px-3 py-1 bg-black text-white rounded-full w-fit mt-2">
                {data?.user?.role}
              </span>
            </div>
          </section>
        </CardContent>
      </Card>
    </section>
  );
}

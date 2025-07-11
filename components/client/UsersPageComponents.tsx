"use client";
import { Pencil, Plus, Trash } from "lucide-react";
import React, { FormEvent, useState } from "react";
import Accordion, { AccordionItem } from "./Accordion";
import { modalClass, useModal } from "../context/ModalContext";
import { cn } from "@/utils/cn";
import { Button } from "../button";
import Input from "../input";
import Modal from "../modal";
import { ActionResponse } from "@/utils/actions/product";
import { addUsers } from "@/utils/actions/user";
import { roleList } from "../context/RoleContext";
import { SelectComponent } from "../select";
import { User } from "@/types/database";

interface UsersPageComponentsProps {
  users: User[];
}
export default function UsersPageComponents({
  users,
}: UsersPageComponentsProps) {
  const { modalState, handleModal } = useModal();
  const detailInit = {
    name: "",
    role: "",
    password: "",
    email: "",
  };
  const [detail, setDetail] = useState(detailInit);
  function handleDetail(key: string[], value: string[]) {
    const keyval = Object.fromEntries(
      key.map((item, index) => [item, value[index]])
    );
    setDetail((prev) => ({ ...prev, ...keyval }));
  }
  async function actionBaseOnType(event: FormEvent): ActionResponse {
    switch (modalState.type) {
      case "add-users":
        return await addUsers(
          new FormData(event.currentTarget as HTMLFormElement)
        );
      default:
        return { status: 0, msg: "" };
    }
  }
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const actionResponse = await actionBaseOnType(event);
    if (actionResponse.status != 200) {
      alert(actionResponse.msg);
      return;
    }
    alert(actionResponse.msg);
    setDetail(detailInit);
    handleModal(modalState.type);
  }
  return (
    <>
      <Accordion className="relative select-none">
        <div
          className="w-10 h-10 flex justify-center cursor-pointer absolute top-5 right-3 items-center rounded-full bg-black text-white"
          onClick={() => handleModal("add-users")}
        >
          <Plus size={20} />
        </div>
        <div className="w-full px-2 text-black">
          <h2 className="text-xl font-semibold">Available Users</h2>
          <p className="font-thin mb-2">List of available users.</p>
        </div>
        {users.map((user, index) => (
          <AccordionItem key={index} categoryName={`${user.name} - ${user.role}`} productlists={[]}>
            <div
              className="absolute right-1 flex gap-x-3"
              onClick={(e) => e.stopPropagation()}
            >
              <Trash
                size={15}
                className="hover:text-red-500 transition-300"
                onClick={() => {
                  handleModal("delete-user");
                  handleDetail(["name"], [user.name]);
                }}
              />
              <Pencil
                size={15}
                className="hover:text-yellow-400 transition-300"
                onClick={() => {
                  handleModal("edit-user");
                  handleDetail(["name", "oldname"], [user.name, user.name]);
                }}
              />
            </div>
          </AccordionItem>
        ))}
      </Accordion>
      <Modal type="add-users" className={cn(modalClass)}>
        <h2 className="text-xl font-semibold">Add Users</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 justify-between"
        >
          <section>
            <section className="my-3">
              <Input
                inputName="name"
                required
                value={detail.name}
                onChange={(e) => handleDetail(["name"], [e.target.value])}
              />
            </section>
            <section className="my-3">
              <Input
                inputName="email"
                required
                type="email"
                value={detail.email}
                onChange={(e) => handleDetail(["email"], [e.target.value])}
              />
            </section>
            <section className="my-3">
              <SelectComponent name="role" defaultValue={roleList[3]}>
                {roleList.map((role, index) => (
                  <option value={role} key={index} className="capitalize">
                    {role}
                  </option>
                ))}
              </SelectComponent>
            </section>
            <section className="my-3">
              <Input
                inputName="password"
                type="password"
                value={detail.password}
                onChange={(e) => handleDetail(["password"], [e.target.value])}
              />
            </section>
          </section>
          <Button className="w-full cursor-pointer">Create</Button>
        </form>
      </Modal>
    </>
  );
}

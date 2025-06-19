"use client";
import { CategoryProductGroup } from "@/utils/neon";
import React, { FormEvent, useState } from "react";
import Accordion, { AccordionItem } from "./Accordion";
import { Plus } from "lucide-react";
import Modal from "../modal";
import { useModal } from "../context/ModalContext";
import Input from "../input";
import { Button } from "../button";
import { addCategory } from "@/utils/actions/category";

interface CategoryPageComponents {
  categories: CategoryProductGroup[];
}
export default function CategoryPageComponents({
  categories,
}: CategoryPageComponents) {
    const {modalState , handleModal} = useModal()
    const detailInit = {
      name: ''
    }
    const [detail, setDetail] = useState(detailInit)
    async function handleSubmit(event: FormEvent){
      event.preventDefault()
      const actionResponse = await addCategory(new FormData(event.currentTarget as HTMLFormElement) )
      if(actionResponse.status != 200){
        alert(actionResponse.msg)
        return
      }
      alert(actionResponse.msg)
      setDetail(detailInit)
      handleModal('add-category')
    }
    function handleDetail(key: 'name' , value: string){
      setDetail(prev => ({ ...prev,[key]: value ,}))
    }
  return (
    <>
      <Accordion className="relative select-none">
        <div className="w-10 h-10 flex justify-center cursor-pointer absolute top-5 right-3 items-center rounded-full bg-black text-white" onClick={() => handleModal('add-category')}>
          <Plus size={20} />
        </div>
        <div className="w-full px-2 text-black">
          <h2 className="text-xl font-semibold">Available Category</h2>
          <p className="font-thin mb-2">
            List of available category and product related.
          </p>
        </div>
        {categories.map((category, index) => (
          <AccordionItem
            categoryName={category.name}
            key={index}
            productlists={category.productlist}
          />
        ))}
      </Accordion>
      <Modal type="add-category" className="text-black p-5 min-w-full min-h-[80%] flex flex-col">
        <h2 className="text-xl font-semibold">Add Category</h2>
        <form action="" className="flex flex-col justify-between flex-1" onSubmit={handleSubmit}>
          <section className="my-3">
        <Input inputName="name" value={detail.name} onChange={(e) => handleDetail('name' , e.target.value) }/>
          </section>
        <Button className="w-full cursor-pointer">Submit</Button>
        </form>
      </Modal>
    </>
  );
}

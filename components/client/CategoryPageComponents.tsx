"use client";
import { CategoryProductGroup } from "@/utils/neon";
import React, { FormEvent, useEffect, useState } from "react";
import Accordion, { AccordionItem } from "./Accordion";
import { Pencil, Plus, Trash } from "lucide-react";
import Modal from "../modal";
import { modalClass, useModal } from "../context/ModalContext";
import Input from "../input";
import { Button } from "../button";
import { addCategory, deleteCategory, editCategory } from "@/utils/actions/category";
import { cn } from "@/utils/cn";
import { ActionResponse } from "@/utils/actions/product";

interface CategoryPageComponents {
  categories: CategoryProductGroup[];
}
export default function CategoryPageComponents({
  categories,
}: CategoryPageComponents) {
    const { modalState,handleModal} = useModal()
    const detailInit = {
      name: '',
      oldname: ''
    }
    const [detail, setDetail] = useState(detailInit)
    async function actionBaseOnType(event: FormEvent) : ActionResponse{
      switch (modalState.type) {
        case 'add-category':
          return await addCategory(new FormData(event.currentTarget as HTMLFormElement) )
          case 'delete-category': 
          return await deleteCategory(new FormData(event.currentTarget as HTMLFormElement))
          case 'edit-category': 
          return await editCategory(new FormData(event.currentTarget as HTMLFormElement))
        default:
          return {status: 0 , msg: ''}
      }
    }
    async function handleSubmit(event: FormEvent){
      event.preventDefault()
      const actionResponse = await actionBaseOnType(event)
      if(actionResponse.status != 200){
        alert(actionResponse.msg)
        return
      }
      alert(actionResponse.msg)
      setDetail(detailInit)
      handleModal(modalState.type)
    }
    function handleDetail(key: string[] , value: string[]){
      const keyval =  Object.fromEntries(
    key.map((item, index) => [item, value[index]])
  );
      setDetail(prev => ({ ...prev, ...keyval}))
    }
    useEffect(() => {
      console.log(detail);
      
    }, [detail])
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
          >
            <div className="absolute right-1 flex gap-x-3" onClick={e => e.stopPropagation()}>
              <Trash size={15} className="hover:text-red-500 transition-300" onClick={() => {
                handleModal('delete-category')
                handleDetail(['name'] , [category.name])
              }}/>
              <Pencil size={15} className="hover:text-yellow-400 transition-300" onClick={() => {
              handleModal('edit-category')
              handleDetail(['name' , 'oldname'] , [category.name , category.name])
              }}/>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
      <Modal type="add-category" className={cn(modalClass)}>
        <h2 className="text-xl font-semibold">Add Category</h2>
        <form action="" className="flex flex-col justify-between flex-1" onSubmit={handleSubmit}>
          <section className="my-3">
        <Input inputName="name" value={detail.name} onChange={(e) => handleDetail(['name'] , [e.target.value]) }/>
          </section>
        <Button className="w-full cursor-pointer">Submit</Button>
        </form>
      </Modal>
      <Modal type="edit-category" className={cn(modalClass)}>
        <h2 className="text-xl font-semibold">Edit Category</h2>
        <form action="" className="flex flex-col justify-between flex-1" onSubmit={handleSubmit}>
          <section className="my-3">
        <Input inputName="name" value={detail.name} onChange={(e) => handleDetail(['name'] , [e.target.value]) }/>
          </section>
          <div className="hidden">
          <Input inputName="oldname" readOnly value={detail.oldname}/>
          </div>
        <Button className="w-full cursor-pointer">Confirm</Button>
        </form>
      </Modal>
      <Modal type="delete-category" className={cn(modalClass)}>
        <h2 className="text-xl font-semibold">Delete Category</h2>
        <form action="" className="flex flex-col justify-between flex-1" onSubmit={handleSubmit}>
          <section className="my-3">
        <Input inputName="name" value={detail.name} readOnly className=""/>
          </section>
          <section className="grid grid-cols-2 gap-x-3">
        <Button className="w-full cursor-pointer" type="button">Cancel</Button>
        <Button className="w-full cursor-pointer bg-red-500" type="submit">Delete</Button>
          </section>
        </form>
      </Modal>
    </>
  );
}

"use client";
import { Category, ImageDB, Product } from "@/types/database";
import { addProduct, deleteProduct, editProduct } from "@/utils/actions/product";
import { cn } from "@/utils/cn";
import { FormatToIDR } from "@/utils/formatter";
import { Funnel, Plus, Search, Upload, UtensilsCrossed, X } from "lucide-react";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import React from "react";
import Modal from "../modal";
import { useModal } from "../context/ModalContext";
import Input from "../input";
import { Button } from "../button";

interface ProductsProps {
  initialProducts: Product[];
  initialCategories: Category[];
  existingPhotos: ImageDB[];
}
type ManageDataInit = {
  name: string;
  price: number;
  category: string;
  imgId: number;
};
interface ManageProductState {
  status: boolean;
  type: "add" | "edit";
  dataInit: ManageDataInit;
}

interface ManageProductProps {
  productStateObj: {
    manageProductState: ManageProductState;
    setManageProductState: Dispatch<SetStateAction<ManageProductState>>;
  };
  initialDatas: ProductsProps;
}
interface ProductCardProps {
  name: string;
  price: string;
  category: string;
  product_url: string;
  imgId: string;
  handleManageTrigger: (
    type: "add" | "edit",
    dataInit?: ManageDataInit
  ) => void;
}
export function Products({
  initialProducts,
  initialCategories,
  existingPhotos,
}: ProductsProps) {
  const [manageProductState, setManageProductState] =
    useState<ManageProductState>({
      status: false,
      type: "add",
      dataInit: {
        name: "",
        price: 0,
        category: initialCategories[0].name,
        imgId: 0,
      },
    });
  const manageDataInit = {
    name: "",
    price: 0,
    category: initialCategories[0].name,
    imgId: 0,
  };
  const { modalState, handleModal } = useModal();
  async function handleDelete(event: FormEvent) {
    event.preventDefault();
    const actionResponse = await deleteProduct(
      new FormData(event.currentTarget as HTMLFormElement)
    );
    if (actionResponse.status != 200) {
      alert(actionResponse.msg);
      return;
    }
    alert(actionResponse.msg);
    handleModal("delete-products");
  }
  function handleManageTrigger(
    type: "add" | "edit",
    dataInit?: ManageDataInit
  ) {
    setManageProductState((prev) => ({
      ...prev,
      status: !prev.status,
      type,
      dataInit: dataInit ? dataInit : prev.dataInit,
    }));
  }
  return (
    <>
      {/* Main Content */}
      <section className="w-full h-fit">
        <h1 className="text-xl font-normal tracking-wide mb-5">All Products</h1>
        {/* search & tab */}
        <div className="w-full flex space-x-1 md:w-1/2">
          <span className="block flex-1 relative">
            <input
              type="text"
              name="search"
              id="search"
              className="pl-[28px] block w-full bg-white border-none text-black px-3 p-1 text-sm rounded-lg "
            />
            <Search
              size={15}
              color="black"
              className="absolute left-2 top-1/2 -translate-y-1/2"
            />
          </span>
          {/* filter btn */}
          <div className="h-[28px] w-[30px] bg-white rounded-md flex items-center justify-center cursor-pointer relative">
            <Funnel size={18} color="black" />
            <span className="block w-[100px] h-fit bg-white hidden text-black text-center absolute top-[115%] rounded-md overflow-hidden">
              <div className="w-full p-1 hover:bg-slate-400/50">All</div>
            </span>
          </div>
          {/* add btn */}
          <div
            className="h-[28px] w-[30px] bg-white rounded-md flex items-center justify-center cursor-pointer relative"
            onClick={() => handleManageTrigger("add" , manageDataInit)}
          >
            <Plus size={18} color="black" />
          </div>
        </div>
        <div className="w-full flex flex-wrap">
          <div className="w-full h-fit mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {initialProducts.length > 0 &&
              initialProducts?.map((product, index) => (
                <ProductCard
                  key={index}
                  name={product.name}
                  price={String(product.price)}
                  category={product.category}
                  product_url={product.product_url}
                  imgId={product.imgid}
                  handleManageTrigger={handleManageTrigger}
                />
              ))}
          </div>
        </div>
      </section>
      {/* add products page */}
      <ManageProduct
        productStateObj={{ manageProductState, setManageProductState }}
        initialDatas={{ initialProducts, initialCategories, existingPhotos }}
      />
      {/* delete modal */}
      <Modal
        type="delete-products"
        className="min-w-full  text-black p-5 space-y-5 flex flex-col sm:min-w-1/2"
      >
        <h2 className="text-lg font-semibold">Delete Products</h2>
        <form
          onSubmit={handleDelete}
          className="flex-1 flex-col justify-between flex"
        >
          <section>
            <Input
              onSubmit={handleDelete}
              inputName="productName"
              labelVal="Product Name"
              className="read-only:cursor-not-allowed read-only:bg-slate-300/50 read-only:text-slate-500"
              value={(modalState.value as { name?: string }).name ?? ""}
              readOnly
              required
            />
            <p className="text-red-400 text-sm">
              Product above will be deleted permanently
            </p>
          </section>
          <section className="w-full grid grid-cols-2 gap-x-2">
            <Button
              className="cursor-pointer bg-red-500"
              type="button"
              onClick={() => handleModal("delete-products")}
            >
              Cancel
            </Button>
            <Button className="cursor-pointer " type="submit">
              Confirm
            </Button>
          </section>
        </form>
      </Modal>
    </>
  );
}
export function ProductCard({
  name,
  price,
  category,
  product_url,
  imgId,
  handleManageTrigger,
}: ProductCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { handleModal } = useModal();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    // close dropdown on click outside of dropdown
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div className="h-[230px] lg:h-[250px] bg-white rounded-xl p-3 text-black relative">
      {/* img */}
      <div className="w-full h-[70%] bg-slate-300 relative overflow-hidden flex justify-center items-center rounded-md">
        <UtensilsCrossed size={70} color="white" />
        {product_url && (
          <Image
            src={product_url}
            alt="product_img"
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      {/* name */}
      <h2 className="text-lg font-semibold mt-1 tracking-wide capitalize">
        {name}
      </h2>
      {/* category */}
      <p className="text-sm capitalize">{category}</p>
      {/* price */}
      <p className="text-sm font-thin">{FormatToIDR(Number(price))}</p>
      {/* dropdown */}
      <div
        className="px-2 py-1 cursor-pointer bg-white select-none rounded-full border absolute top-2 right-2 border-slate-500 flex items-center justify-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Ellipsis size={15} />
        {isOpen && (
          <span
            className="block w-[80px] h-fit text-sm absolute bg-white border border-slate-500 rounded-sm top-[110%] right-0"
            ref={ref}
          >
            <p
              className="p-2 hover:bg-slate-300/20"
              onClick={() =>
                handleManageTrigger("edit", {
                  name,
                  price: Number(price),
                  category,
                  imgId: Number(imgId),
                })
              }
            >
              Edit
            </p>
            <p
              className="p-2 hover:bg-slate-300/20 text-red-500"
              onClick={() => handleModal("delete-products", { name })}
            >
              Delete
            </p>
          </span>
        )}
      </div>
    </div>
  );
}
export function ManageProduct({
  productStateObj,
  initialDatas,
}: ManageProductProps) {
  // general states
  const { manageProductState, setManageProductState } = productStateObj;
  const { initialCategories, existingPhotos } = initialDatas;
  const [imgSrc, setImgSrc] = useState("");
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [detail, setDetail] = useState(manageProductState.dataInit);
  const manageDataInit = {
    name: "",
    price: 0,
    category: initialCategories[0].name,
    imgId: 0,
  };
  // specific state (edit)
  const [oldName, setOldName] = useState(manageProductState.dataInit.name)
  function handleDetail(
    key: "name" | "price" | "category" | "imgId",
    value: string
  ) {
    const onlyDigits = /^[0-9]*$/;
    if (key === "price") {
      if (value !== "" && !onlyDigits.test(value)) return;
    }
    if (key == "imgId") {
      setImgSrc("");
    }
    setDetail((prev) => ({
      ...prev,
      [key]: key === "imgId" ? Number(value) : value,
    }));
  }
  function handleImgPreview(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target.files?.[0];
    if (!target?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.readAsDataURL(target);
    reader.onload = () => {
      setImgSrc(reader.result as string);
    };

    // if(target?.type !== ''){}
  }
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const actionResponse = manageProductState.type === 'add' ? await addProduct(
      new FormData(event.currentTarget as HTMLFormElement) 
    ) : await editProduct( new FormData(event.currentTarget as HTMLFormElement))
    if (actionResponse.status != 200) {
      alert(actionResponse.msg);
      return;
    }
    setDetail(manageDataInit);
    if (imgInputRef.current) {
      imgInputRef.current.value = "";
    }
    setImgSrc("");
    alert(actionResponse.msg);
  }
  useEffect(() => {
    // reinit data on productStateObj changed
    if (manageProductState.dataInit) {
      setDetail(manageProductState.dataInit);
      setOldName(manageProductState.dataInit.name)
    }
  }, [productStateObj]);
  useEffect(() => {
    if (detail.imgId === 0) {
      setImgSrc("");
      return
    }
    // get url from imgid
    const newImgObject = existingPhotos.find((img) => img.id === detail.imgId);

    setImgSrc(newImgObject!.img_url);
  }, [detail.imgId]);
  return (
    <section
      className={cn(
        `w-full fixed top-0 left-0 p-5 h-screen bg-white transition-300 translate-y-[5000px] text-black overflow-y-auto ${
          manageProductState.status && "translate-y-0"
        }`
      )}
    >
      {/* close button */}
      <div
        className="absolute top-5 left-5 cursor-pointer p-2 transition-300 hover:bg-slate-600/20 rounded-full"
        onClick={() =>
          setManageProductState((prev) => ({
            ...prev,
            status: !prev.status,
            dataInit: manageDataInit,
          }))
        }
      >
        <X color="black" />
      </div>
      {/* ---------- */}
      <div className="h-[405px] md:mt-[10%] lg:mt-[5%]">
        <h2 className="mt-[60px] text-2xl font-semibold">
          {manageProductState.type === "add" ? "Add New" : "Edit"} Products
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex gap-5 auto-cols-auto flex-wrap h-full"
        >
          {/* img inputs */}
          <div className="flex flex-col gap-2 w-full md:flex-1">
            <h3 className="text-xl ">Add Image</h3>
            {existingPhotos.length > 0 && (
              <>
                <label htmlFor="existingImgId" className="block">
                  Existing Img
                </label>
                <select
                  name="existingImgId"
                  className="border p-1 rounded-md"
                  id="existingImgId"
                  value={detail.imgId}
                  onChange={(e) => handleDetail("imgId", e.target.value)}
                >
                  <option value={0}>None</option>
                  {existingPhotos?.map((img, index) => (
                    <option value={img.id} key={index}>
                      {img.path}
                    </option>
                  ))}
                </select>
              </>
            )}
            {/* img preview */}
            <label
              htmlFor="imgInput"
              className={cn(
                "w-full lg:h-[400px] h-[300px] rounded-md overflow-hidden relative bg-slate-600/20 backdrop-blur-md flex justify-center items-center cursor-pointer",
                imgSrc && "bg-slate-100/30 cursor-auto"
              )}
            >
              <Upload size={60} />
              {imgSrc && (
                <Image
                  src={imgSrc}
                  alt="img_preview"
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </label>
            {detail.imgId == 0 && (
              <input
                type="file"
                name="imgInput"
                id="imgInput"
                accept=".jpg,.png,.jpeg,.webp"
                className="hidden"
                ref={imgInputRef}
                onChange={(e) => handleImgPreview(e)}
              />
            )}
          </div>
          {/* detail inputs */}
          <div className="flex flex-col justify-between h-full w-full md:flex-1 pb-5 gap-y-3">
            <span className="block w-full">
              <section className="hidden">
                <Input inputName="oldName" value={oldName} readOnly className="hidden"/>
              </section>
              <section>
                <label htmlFor="productName">Name</label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  value={detail.name}
                  onChange={(event) => handleDetail("name", event.target.value)}
                  className="block border w-full rounded-md px-2 py-1"
                />
              </section>
              <section>
                <label
                  htmlFor="productPrice"
                  className="block w-full cursor-text *:border *:px-2 *:py-1 *:rounded-md"
                >
                  Price
                  {detail.price > 0 ? (
                    <p>{FormatToIDR(detail.price)}</p>
                  ) : (
                    <p className="">Rp.0</p>
                  )}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  name="productPrice"
                  id="productPrice"
                  value={detail.price}
                  className="opacity-0 w-0 h-0 absolute"
                  onChange={(event) =>
                    handleDetail("price", event.target.value)
                  }
                />
              </section>
              <section>
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id="category"
                  className="capitalize block w-full border rounded-md cursor-pointer px-2 py-2"
                  value={detail.category}
                  onChange={(e) => handleDetail("category", e.target.value)}
                >
                  {initialCategories?.map((category, index) => (
                    <option value={category.name} key={index} className="index">
                      {category.name}
                    </option>
                  ))}
                </select>
              </section>
            </span>
            <button
              type="submit"
              className="block w-full h-[35px] bg-black text-white px-3 py-1 rounded-xl cursor-pointer"
            >
              {manageProductState.type === 'add' ? 'Add' : 'Edit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

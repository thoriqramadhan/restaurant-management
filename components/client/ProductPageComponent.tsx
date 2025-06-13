"use client";
import { Category, Product } from "@/types/database";
import { addProduct } from "@/utils/actions/product";
import { cn } from "@/utils/cn";
import { FormatToIDR } from "@/utils/formatter";
import { Funnel, Plus, Search, X } from "lucide-react";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import React from "react";

interface ProductsProps {
  initialProducts: Product[];
  initialCategories: Category[];
}
export function Products({
  initialProducts,
  initialCategories,
}: ProductsProps) {
  const [isAddProduct, setIsAddProduct] = useState(false);
console.log(initialProducts)
  return (
    <>
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
          <div className="h-[28px] w-[30px] bg-white rounded-md flex items-center justify-center cursor-pointer relative">
            <Funnel size={18} color="black" />
            <span className="block w-[100px] h-fit bg-white hidden text-black text-center absolute top-[115%] rounded-md overflow-hidden">
              <div className="w-full p-1 hover:bg-slate-400/50">All</div>
            </span>
          </div>
          <div
            className="h-[28px] w-[30px] bg-white rounded-md flex items-center justify-center cursor-pointer relative"
            onClick={() => setIsAddProduct((prev) => !prev)}
          >
            <Plus size={18} color="black" />
          </div>
        </div>
        <div className="w-full flex flex-wrap">
          <div className="w-full h-fit mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-3">
            {initialProducts.length > 0 && initialProducts.map((product , index) => <ProductCard key={index} name={product.name} price={String(product.price)} category={product.category} product_url={product.product_url}/>)}
          </div>
        </div>
      </section>
      <AddProducts
        productStateObj={{ isAddProduct, setIsAddProduct }}
        initialDatas={{ initialProducts, initialCategories }}
      />
    </>
  );
}
interface ProductCardProps {
  name: string,
  price: string,
  category: string,
  product_url: string
}
export function ProductCard({name , price , category, product_url} : ProductCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div className="h-[230px] lg:h-[250px] bg-white rounded-xl p-3 text-black relative">
      <div className="w-full h-[70%] bg-slate-300 relative overflow-hidden">
        {product_url && <Image src={product_url} alt="product_img" layout="fill" objectFit="cover"/>}
      </div>
      <h2 className="text-lg font-semibold mt-1 tracking-wide">{name}</h2>
      <p className="text-sm capitalize">{category}</p>
      <p className="text-sm font-thin">{FormatToIDR(Number(price))}</p>
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
            <p className="p-2 hover:bg-slate-300/20">Edit</p>
            <p className="p-2 hover:bg-slate-300/20 text-red-500">Delete</p>
          </span>
        )}
      </div>
    </div>
  );
}
export function AddProducts({
  productStateObj,
  initialDatas,
}: {
  productStateObj: {
    isAddProduct: boolean;
    setIsAddProduct: Dispatch<SetStateAction<boolean>>;
  };
  initialDatas: ProductsProps;
}) {
  const { isAddProduct, setIsAddProduct } = productStateObj;
  const { initialCategories } = initialDatas;
  const [imgSrc, setImgSrc] = useState("");
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [detail, setDetail] = useState({
    name: "",
    price: 0,
    category: initialCategories[0].name,
  });
  function handleDetail(key: "name" | "price" | "category", value: string) {
    if (key === "price" && (Number(value) < 0 || value.includes("-"))) return;
    setDetail((prev) => ({ ...prev, [key]: value }));
  }
  function handleImgPreview(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target.files?.[0];
    console.log(target);
    if (!target?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.readAsDataURL(target);
    reader.onload = () => {
      setImgSrc(reader.result as string);
    };

    // if(target?.type !== ''){}
  }
  useEffect(() => {
    console.log(detail);
  }, [detail]);
  return (
    <section
      className={cn(
        `w-full fixed top-0 left-0 p-5 h-screen bg-white transition-300 translate-y-[5000px] text-black ${
          isAddProduct && "translate-y-0"
        }`
      )}
    >
      {/* close button */}
      <div
        className="absolute top-5 left-5 cursor-pointer p-2 transition-300 hover:bg-slate-600/20 rounded-full"
        onClick={() => setIsAddProduct((prev) => !prev)}
      >
        <X color="black" />
      </div>
      {/* ---------- */}
      <h2 className="mt-[60px] text-2xl font-semibold">Add New Products</h2>
      <form action={addProduct} className="grid grid-cols-1">
        {/* img inputs */}
        <div className="">
          <h3 className="text-lg">Add Image</h3>
          {/* img preview */}
          {imgSrc && (
            <div className=" w-full md:w-[500px] h-[300px] relative bg-slate-600/20 backdrop-blur-md">
              <Image
                src={imgSrc}
                alt="img_preview"
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
          <input
            type="file"
            name="imgInput"
            id="imgInput"
            accept=".jpg,.png,.jpeg,.webp"
            ref={imgInputRef}
            onChange={(e) => handleImgPreview(e)}
          />
        </div>
        {/* detail inputs */}
        <div className="">
          <section>
            <label htmlFor="productName">Name</label>
            <input
              type="text"
              name="productName"
              id="productName"
              value={detail.name}
              onChange={(event) => handleDetail("name", event.target.value)}
              className="block border"
            />
          </section>
          <section>
            <label htmlFor="productPrice" className="block">Price</label>
            {detail.price > 0 && <p>{FormatToIDR(detail.price)}</p>}
            <input
              type="number"
              name="productPrice"
              id="productPrice"
              value={detail.price}
              className="opacity-0 "
              onChange={(event) => handleDetail("price", event.target.value)}
            />
          </section>

          <select
            name="category"
            id="category"
            className="capitalize"
            value={detail.category}
            onChange={(e) => handleDetail("category", e.target.value)}
          >
            {initialCategories.map((category, index) => (
              <option value={category.name} key={index} className="index">
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="block w-full bg-black text-white px-3 py-1 rounded-xl cursor-pointer"
          >
            Add
          </button>
        </div>
      </form>
    </section>
  );
}

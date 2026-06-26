import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiPackage, FiTag, FiBox } from "react-icons/fi";
import { supabase } from "../services/supabaseClient";
import PageHeader from "../components/PageHeader";

const catMeta = {
  Electronics:{emoji:"💻"},Furniture:{emoji:"🪑"},Apparel:{emoji:"👕"},
  "Home & Living":{emoji:"🏠"},Appliances:{emoji:"🔌"},Sports:{emoji:"⚽"},
};

export default function ProductDetail() {
  const {id} = useParams();
  const [product,setProduct]=useState(null);
  const [load,setLoad]=useState(true);
  const [err,setErr]=useState(null);

  useEffect(()=>{(async()=>{
    setLoad(true);
    const {data,error}=await supabase.from("products").select("*").eq("id",id).single();
    if(error) setErr(error.message);
    else if(!data) setErr("Produk tidak ditemukan.");
    else setProduct(data);
    setLoad(false);
  })()},[id]);

  const rp=n=>"Rp "+Number(n).toLocaleString("id-ID");

  if(load) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-hijau border-t-transparent rounded-full animate-spin"/></div>;

  if(err) return (
    <div className="space-y-5">
      <PageHeader title="Product Detail" breadcrumb={["Products","Detail"]}/>
      <div className="bg-white rounded-[28px] p-12 text-center border border-gray-100 shadow-sm">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Produk Tidak Ditemukan</h2>
        <p className="text-sm text-gray-400 mb-6">{err}</p>
        <Link to="/products" className="inline-flex items-center gap-2 bg-hijau hover:bg-green-600 text-white px-5 py-2.5 rounded-2xl text-sm font-semibold transition-colors"><FiArrowLeft/> Kembali</Link>
      </div>
    </div>
  );

  const m=catMeta[product.category]||{emoji:"📦"};

  return (
    <div className="space-y-5">
      <PageHeader title="Product Detail" breadcrumb={["Products",product.name]}>
        <Link to="/products" className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all"><FiArrowLeft/> Back</Link>
      </PageHeader>
      <div className="bg-white rounded-[28px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-8 py-10 flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center text-4xl">{m.emoji}</div>
          <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{product.name}</p><h1 className="text-2xl font-extrabold text-gray-800">{product.name}</h1><p className="text-sm text-gray-400 mt-1">{product.description}</p></div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {label:"Category",value:product.category,icon:<FiTag size={16}/>,color:"text-blue-500"},
              {label:"Price",value:rp(product.price),icon:<FiPackage size={16}/>,color:"text-hijau"},
              {label:"Stock",value:product.stock+" pcs",icon:<FiBox size={16}/>,color:"text-amber-500"},
              {label:"Status",value:product.stock===0?"Out of Stock":product.stock<10?"Low Stock":"In Stock",icon:<FiBox size={16}/>,color:"text-purple-500"},
            ].map(i=>(
              <div key={i.label} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className={"flex items-center gap-2 "+i.color+" mb-3"}>{i.icon}<span className="text-xs font-bold uppercase tracking-wider text-gray-400">{i.label}</span></div>
                <p className={"text-lg font-bold "+(i.label==="Status"?"":i.label==="Stock"&&product.stock<10?"text-red-500":"text-gray-800")}>
                  {i.label==="Status"?<span className={"inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold "+(product.stock===0?"bg-red-100 text-red-700":product.stock<10?"bg-amber-100 text-amber-700":"bg-emerald-100 text-emerald-700")}>{i.value}</span>:i.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
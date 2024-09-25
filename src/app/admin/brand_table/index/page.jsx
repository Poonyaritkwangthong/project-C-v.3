'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { PiTrashThin } from "react-icons/pi";

export default function Brand() {

    const [brandData, setBrandData] = useState([]);
    console.log(brandData)
    useEffect(() => {
        fetchBrand();
    }, []);
 
    const fetchBrand = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/brands`);
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    setBrandData(data.brands);
                    console.log(data.brands);
                }
            console.log(response.brands);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    text: error,
                });
            }
    }

    const [deleting, setDeleting] = useState(null);
  const handleDelete = async (e, id) => {
    e.preventDefault();
    setDeleting(id);

    try {
      const response = await fetch(`http://localhost:8000/api/brands/` + id, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          text: data.message,
          color: "white",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#005e95",
          background: "rgba(0,0,0,0) linear-gradient(rgba(0, 54, 104, 0.5), rgba(0, 94, 149, 0.5)) repeat scroll 0 0",
        });
        setBrandData(prev => prev.filter(brand => brand.id !== id));
        setDeleting(null);
      } else if (data.status === 400) {
        Swal.fire({
          icon: "warning",
          text: data.message,
          color: "white",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#005e95",
          background: "rgba(0,0,0,0) linear-gradient(rgba(0, 54, 104, 0.5), rgba(0, 94, 149, 0.5)) repeat scroll 0 0",
        });
        setDeleting(null);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "มีข้อผิดพลาดกับดึงข้อมูล",
        color: "white",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#005e95",
        background: "rgba(0,0,0,0) linear-gradient(rgba(0, 54, 104, 0.5), rgba(0, 94, 149, 0.5)) repeat scroll 0 0",
      });
    }
  }

  return (
    <div>
        <div>  
            <Link href="/admin">Back</Link>
        </div>
        <Link href="/admin/brand_table/create"className="btn btn-primary">Create</Link>
      <table className="table table-zebra">
        <thead className="text-sm text-white uppercase">
            <tr>
                <th className="py-3 px-6">id</th>
                <th className="py-3 px-6 w-[10rem]">brand name</th>
                <th className="py-3 px-6">brand image</th>
                <th className="py-3 px-6">brand location</th>
                <th className="py-3 px-6">founded year</th>
                <th className="py-3 px-6">action</th>
            </tr>
        </thead>
        <tbody>
            {brandData.map((brand,index) => (
            <tr key={brand.id}>
                <td className="py-3 px-6">{brand.id}</td>
                <td className="py-3 px-6 w-[12rem] text-center">{brand.b_name}</td>
                <td className="py-3 px-6 w-[15rem]"><img className="w-full " src={`http://localhost:8000/images/brand/${brand.b_img}`} alt="" /></td>
                <td className="py-3 px-6">{brand.b_location}</td>
                <td className="py-3 px-6">{brand.founded_year}</td>
                <td className="border-white">
                <div className="flex justify-center gap-1 items-center ">
                  <Link
                    href={`/admin/brand_table/edit/${brand.id}`}
                    className="btn btn-primary">
                    Edit
                  </Link>
                  <button onClick={(e) => handleDelete(e, brand.id)} >
                    {deleting === brand.id ? "กำลังลบ..." : <PiTrashThin size={25} />}
                  </button>
                </div>
              </td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

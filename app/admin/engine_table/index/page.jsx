'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { PiTrashThin } from "react-icons/pi";

export default function Engine() {

    const [engineData, setEngineData] = useState([]);
    console.log(engineData);
    useEffect(() => {
        fetchEngine();
    }, [])
 
    const fetchEngine = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/engines`);
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    setEngineData(data.engines);
                    console.log(data.engines);
                }
                console.log(response.engines);
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
      const response = await fetch(`http://localhost:8000/api/engines/` + id, {
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
        setEngineData(prev => prev.filter(engine => engine.id !== id));
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
        <Link href="/admin/engine_table/create"className="btn btn-primary">Create</Link>
      <table>
        <thead>
            <tr>
                <th>id</th>
                <th>Engine type</th>
                <th>Engine detail</th>
                <th>Engine HP</th>
                <th>Engine image</th>
                <th>action</th>
            </tr>
        </thead>
        <tbody>
            {engineData.map((engine,index) => (
            <tr key={engine.id} className=" border-b">
                <td>{engine.id}</td>
                <td>{engine.e_type}</td>
                <td>{engine.e_detail}</td>
                <td>{engine.e_hp}</td>
                <td><img className="w-full " src={`http://localhost:8000/images/engine/${engine.e_img}`} alt="" /></td>
                <td className="border-white">
                <div className="flex justify-center gap-1 items-center ">
                  <Link
                    href={`/admin/engine_table/edit/${engine.id}`}
                    className="btn btn-primary">
                    Edit
                  </Link>
                  <button onClick={(e) => handleDelete(e, engine.id)} >
                    {deleting === engine.id ? "กำลังลบ..." : <PiTrashThin size={25} />}
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

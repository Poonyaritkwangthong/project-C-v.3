'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';


export default function CreateCarPage () {
    const [carField, setCarField] = useState({
        c_name: '',
        c_img: '',
        c_detail: '',
        c_engine_id: '',
        c_brand_id: '',
    });

    const [carImage, setCarImage] = useState(null);

    const [error, setError] = useState([]);
    const router = useRouter();
    
    const changeCarFieldHandler = (e) => {
        setCarField({
            ...carField,
            [e.target.name]: e.target.value
        });
    }
console.log(carField);
    
    const ImageUpload = () => {
      document.getElementById('image').click();
    };
    
    const onfilechangeimage = (e) => {
      const file = e.target.files[0];
      setCarField(prev => (
        { ...prev,
          c_img: file,
         }
      ));
    }

    const onSubmitChange = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('c_name', carField.c_name);
      formData.append('c_img', carField.c_img); // รูปภาพจะถูกส่งใน FormData
      formData.append('c_detail', carField.c_detail);
      formData.append('c_engine_id', carField.c_engine_id);
      formData.append('c_brand_id', carField.c_brand_id);
    
      try {
        const response = await fetch(`http://localhost:8000/api/cars`,{
          method: 'POST',
          body: formData, 
        });
    
        const data = await response.json(); 
        if (response.ok) {
          Swal.fire({
            icon: "success",
            text: data.message, 
          });
          router.push('/admin/car_table/index');
        } else if (data.status === 422) {
          setError(data.errors);
          console.log(data.errors);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "Something went wrong!" 
        });
      }
    }

    const [engineData, setEngineData] = useState([]);
    console.log(engineData);
    useEffect(() => {
        fetchEngine();
        fetchBrand();
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

    const [brandData, setBrandData] = useState([]);
 
 
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
   
  return (
    <div>
       <div className="max-w-md mx-auto mt-5">
        <h1 className="text-2xl text-center mb-2">Add New Car</h1>
        <div>
        <form>
        <div className="mb-5">
          <label htmlFor="c_name" className="block text-sm font-medium text-white">
            Car Name
          </label>
          <input
            type="text"
            name="c_name"
            id="c_name"
            className="input input-bordered input-primary w-full max-w-xs text-black p-2"
            placeholder="Car Name..."
            onChange={e => changeCarFieldHandler(e)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="c_img" className="block text-sm font-medium text-white">
            Car Image
          </label>
          <div className='overflow-hidden w-1/3 h-1/2' onClick={ImageUpload}>
          {carField.c_img ? (
               <img className=' w-full h-full object-cover' src={URL.createObjectURL(carField.c_img)} alt="" />
              ) : (
                <img src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg' alt='No Image'/> 
              )}
          </div>
          <button type="button" onClick={ImageUpload}>Upload Image</button>
          <input
          name='c_img'
          id='image'
          hidden
            type="file"
            className="input input-bordered input-primary w-full max-w- text-black p-2"
            placeholder="Car Image"
            onChange={onfilechangeimage}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="c_detail" className="block text-sm font-medium text-white">
            Car detail
          </label>
          <input
            type="text"
            name="c_detail"
            id="c_detail"
            className="input input-bordered input-primary w-full max-w-xs text-black p-2"
            placeholder="Car detail"
            onChange={e => changeCarFieldHandler(e)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="c_engine_id" className="block text-sm font-medium text-white">
           Engine type
          </label>
          <select name="c_engine_id" className='text-black'   onChange={e => changeCarFieldHandler(e)}>
            <option> --เลือกเครื่องยนต์-- </option>
            {engineData.length > 0 ? (
              engineData.map((engine) => (
                <option key={engine.id} value={engine.id}>{engine.e_type}</option>
              ))
            ) : (
              <option>--ไม่มีเครื่องยนต์--</option>
            )}
          </select>
        </div>
        <div className="mb-5">
          <label htmlFor="c_brand_id" className="block text-sm font-medium text-white">
            Car Brand Id
          </label>
          <select name="c_brand_id" className='text-black'   onChange={e => changeCarFieldHandler(e)}>
            <option> --เลือกเเบรนด์-- </option>
            {brandData.length > 0 ? (
              brandData.map((brand) => (
                <option key={brand.id} value={brand.id}>{brand.b_name}</option>
              ))
            ) : (
              <option>--ไม่มีเเบรนด์--</option>
            )}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Add Car</button> 
      </form>
    </div>
    </div>
    </div>
  );
};



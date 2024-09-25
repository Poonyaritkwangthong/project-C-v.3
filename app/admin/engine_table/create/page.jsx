'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Swal from 'sweetalert2';


export default function CreateCarPage () {
    const [engineField, setEngineField] = useState({
        e_type: '',
        e_detail: '',
        e_hp: '',
        e_img: '',
    });

    const [engineImage, setEngineImage] = useState(null);

    const [error, setError] = useState([]);
    const router = useRouter();
    
    const changeEngineFieldHandler = (e) => {
        setEngineField({
            ...engineField,
            [e.target.name]: e.target.value
        });
    }
    console.log(engineField.e_type)
    console.log(engineField.e_detail)
    console.log(engineField.e_hp)
    console.log(engineField.e_img)
    console.log(engineImage)
    
    const ImageUpload = () => {
      document.getElementById('image').click();
    };
    
    const onfilechangeimage = (e) => {
      const file = e.target.files[0];
      setEngineField(prev => (
        { ...prev,
          e_img: file,
         }
      ));
    }

    const onSubmitChange = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('e_type', engineField.e_type);
      formData.append('e_detail', engineField.e_detail); // รูปภาพจะถูกส่งใน FormData
      formData.append('e_hp', engineField.e_hp);
      formData.append('e_img', engineField.e_img);
    
      try {
        const response = await fetch(`http://localhost:8000/api/engines`,{
          method: 'POST',
          body: formData, 
        });
    
        const data = await response.json(); 
        if (response.ok) {
          Swal.fire({
            icon: "success",
            text: data.message, 
          });
          router.push('/admin/engine_table/index');
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
   
  return (
    <div>
       <div className="max-w-md mx-auto mt-5">
        <h1 className="text-2xl text-center mb-2">Add New Engine</h1>
        <div>
        <form>
        <div className="mb-5">
          <label htmlFor="e_type" className="block text-sm font-medium text-white">
            Engine Type
          </label>
          <input
            type="text"
            name="e_type"
            id="e_type"
            className="input input-bordered input-primary w-full max-w-xs text-black p-2"
            placeholder="Engine Type..."
            onChange={e => changeEngineFieldHandler(e)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="e_detail" className="block text-sm font-medium text-white">
            Engine Detail
          </label>
          <input
            type="text"
            name="e_detail"
            id="e_detail"
            className="input input-bordered input-primary w-full max-w-xs text-black p-2"
            placeholder="Engine Detail..."
            onChange={e => changeEngineFieldHandler(e)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="e_hp" className="block text-sm font-medium text-white">
            Engine HP
          </label>
          <input
            type="text"
            name="e_hp"
            id="e_hp"
            className="input input-bordered input-primary w-full max-w-xs text-black p-2"
            placeholder="Engine HP..."
            onChange={e => changeEngineFieldHandler(e)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="e_img" className="block text-sm font-medium text-white">
            Brand Image
          </label>
          <div className='overflow-hidden w-1/3 h-1/2' onClick={ImageUpload}>
          {engineField.e_img ? (
               <img className=' w-full h-full object-cover' src={URL.createObjectURL(engineField.e_img)} alt="" />
              ) : (
                <img src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg' alt='No Image'/> 
              )}
          </div>
          <button type="button" onClick={ImageUpload}>Upload Image</button>
          <input
          name='e_img'
          id='image'
          hidden
            type="file"
            className="input input-bordered input-primary w-full max-w- text-black p-2"
            placeholder="Engine Image"
            onChange={onfilechangeimage}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Add Car</button> 
      </form>
    </div>
    </div>
    </div>
  );
};



'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Swal from 'sweetalert2';


export default function CreateCarPage () {
    const [brandField, setBrandField] = useState({
        b_name: '',
        b_img: '',
        b_location: '',
        founded_year: '',
    });

    const [brandImage, setBrandImage] = useState(null);

    const [error, setError] = useState([]);
    const router = useRouter();
    
    const changeBrandFieldHandler = (e) => {
        setBrandField({
            ...brandField,
            [e.target.name]: e.target.value
        });
    }
    console.log(brandField.b_name)
    console.log(brandField.b_img)
    console.log(brandField.b_location)
    console.log(brandField.founded_year)
    console.log(brandImage)
    
    const ImageUpload = () => {
      document.getElementById('image').click();
    };
    
    const onfilechangeimage = (e) => {
      const file = e.target.files[0];
      setBrandField(prev => (
        { ...prev,
          b_img: file,
         }
      ));
    }

    const onSubmitChange = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('b_name', brandField.b_name);
      formData.append('b_img', brandField.b_img); // รูปภาพจะถูกส่งใน FormData
      formData.append('b_location', brandField.b_location);
      formData.append('founded_year', brandField.founded_year);
    
      try {
        const response = await fetch(`http://localhost:8000/api/brands`,{
          method: 'POST',
          body: formData, 
        });
    
        const data = await response.json(); 
        if (response.ok) {
          Swal.fire({
            icon: "success",
            text: data.message, 
          });
          router.push('/admin/brand_table/index');
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
        <h1 className="text-2xl text-center mb-2">Add New Brand</h1>
        <div>
        <form>
        <div className="mb-5">
          <label htmlFor="b_name" className="block text-sm font-medium text-white">
            Brand Name
          </label>
          <input
            type="text"
            name="b_name"
            id="b_name"
            className="input input-bordered input-primary w-full max-w-xs text-black p-2"
            placeholder="Car Name..."
            onChange={e => changeBrandFieldHandler(e)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="b_img" className="block text-sm font-medium text-white">
            Brand Image
          </label>
          <div className='overflow-hidden w-1/3 h-1/2' onClick={ImageUpload}>
          {brandField.b_img ? (
               <img className=' w-full h-full object-cover' src={URL.createObjectURL(brandField.b_img)} alt="" />
              ) : (
                <img src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg' alt='No Image'/> 
              )}
          </div>
          <button type="button" onClick={ImageUpload}>Upload Image</button>
          <input
          name='b_img'
          id='image'
          hidden
            type="file"
            className="input input-bordered input-primary w-full max-w- text-black p-2"
            placeholder="Brand Image"
            onChange={onfilechangeimage}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="b_location" className="block text-sm font-medium text-white">
            Brand Location
          </label>
          <input
            type="text"
            name="b_location"
            id="b_location"
            className="input input-bordered input-primary w-full max-w-xs text-black p-2"
            placeholder="Brand Location"
            onChange={e => changeBrandFieldHandler(e)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="founded_year" className="block text-sm font-medium text-white">
            Founded Year
          </label>
          <input
            type="date"
            name="founded_year"
            id="founded_year"
            className="input input-bordered input-primary w-full max-w-xs text-black p-2"
            placeholder="Founded Year"
            onChange={e => changeBrandFieldHandler(e)}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Add Car</button> 
      </form>
    </div>
    </div>
    </div>
  );
};



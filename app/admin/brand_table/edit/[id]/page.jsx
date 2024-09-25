
'use client';

import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';



export default function EditCarPage() {
    const { id } = useParams();
    console.log(id);

    const router = useRouter();
    const [brandField, setBrandField] = useState({
        b_name: '',
        b_img: '',
        b_location: '',
        founded_year: '',
    });
    console.log(id)
    console.log(brandField.b_name)
    console.log(brandField.b_img)
    console.log(brandField.b_location)
    console.log(brandField.founded_year)
  

    useEffect(() => {
        fetchBrand();
    }, [id]);

    const fetchBrand = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/brands/${id}`);
            const data = await response.json();
            if (response.ok) {
                console.log(data.brands);
                setBrandField(data.brands);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Something Wrong!"
            });
        }
    }

    const [newImage, setNewImage] = useState(null);

    const changeBrandFieldHandler = (e) => {
        setBrandField({
            ...brandField,
            [e.target.name]: e.target.value
        });
    }

    const ImageUpload = () => {
        document.getElementById('image').click();
      };
      
      const onfilechangeimage = (e) => {
        const file = e.target.files[0];
        setNewImage(file);
        setBrandField(prev => (
          { ...prev,
            b_img: file,
           }
        ));
      }

    const onSubmitChange = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('b_name', brandField.b_name);
        formData.append('b_img', brandField.b_img); // รูปภาพจะถูกส่งใน FormData
        formData.append('b_location', brandField.b_location);
        formData.append('founded_year', brandField.founded_year);

        try {
            const response = await fetch(`http://localhost:8000/api/brands/${id}`, {
                method: 'POST',
                body: formData // แปลงข้อมูล roleField ให้เป็น JSON
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    text: data.message,
                });
                router.push('/admin/brand_table/index')
            } else if (data.stetus === 422) {
                setError(data.errors);
                console.log(data.errors)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Something Wrong!"
            });
        }
    }

    return (
        <div>
            <div className="max-w-md mx-auto mt-5">
                <h1 className="text-2xl text-center mb-2">Edit Brand</h1>
                <form>
                    <div className="mb-3 mt-3">
                        <label className="block text-sm font-medium text-gray-900"> ID:</label>
                        <input className='text-white' type="text" id="id" name="id" value={id} disabled />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="block text-sm font-medium text-gray-900"> Brand Name:</label>
                        <input type="text" className="input input-bordered input-primary w-full max-w-xs text-black p-2" placeholder="Enter Brand Name" name="b_name"
                            value={brandField.b_name} onChange={e => changeBrandFieldHandler(e)} />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="c_img" className="block text-sm font-medium text-white">
                            Brand Image
                        </label>
                        <div className='overflow-hidden w-1/3 h-1/2' onClick={ImageUpload}>
                            {newImage ? ( 
                                <img className=' w-full h-full object-cover' src={URL.createObjectURL(brandField.b_img)} alt="" />
                            ) : brandField.b_img ? (
                                <img className="w-full " src={`http://localhost:8000/images/brand/${brandField.b_img}`} alt="" />
                            ) : (
                                <img src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg' alt='No Image' />
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

                    <div className="mb-3 mt-3">
                        <label className="block text-sm font-medium text-gray-900">Brand Location:</label>
                        <input type="text" className="input input-bordered input-primary w-full max-w-xs text-black p-2"
                            id="b_location" placeholder="Enter Car Detail" name="b_location"
                            value={brandField.b_location} onChange={e => changeBrandFieldHandler(e)} />
                    </div>

                    <div className="mb-3 mt-3">
                        <label className="block text-sm font-medium text-gray-900">Founded Year:</label>
                        <input type="date" className="input input-bordered input-primary w-full max-w-xs text-black p-2"
                            id="founded_year" placeholder="Enter Car Engine Id" name="founded_year"
                            value={brandField.founded_year} onChange={e => changeBrandFieldHandler(e)} />
                    </div>
                   
                    <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Update</button>
                </form>
            </div>
        </div>
    );
}

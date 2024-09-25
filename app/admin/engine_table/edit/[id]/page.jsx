
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Swal from 'sweetalert2';



export default function EditCarPage() {
    const { id } = useParams();
    console.log(id);

    const router = useRouter();
    const [engineField, setEngineField] = useState({
        e_type: '',
        e_detail: '',
        e_hp: '',
        e_img: '',
    });
    console.log(id)
    console.log(engineField.e_type)
    console.log(engineField.e_detail)
    console.log(engineField.e_hp)
    console.log(engineField.e_img)


    useEffect(() => {
        fetchEngine();
    }, [id]);

    const fetchEngine = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/engines/${id}`);
            const data = await response.json();
            if (response.ok) {
                console.log(data.engines);
                setEngineField(data.engines);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Something Wrong!"
            });
        }
    }

    const [newImage, setNewImage] = useState(null);

    const changeEngineFieldHandler = (e) => {
        setEngineField({
            ...engineField,
            [e.target.name]: e.target.value
        });
    }

    const ImageUpload = () => {
        document.getElementById('image').click();
      };
      
      const onfilechangeimage = (e) => {
        const file = e.target.files[0];
        setNewImage(file);
        setEngineField(prev => (
          { ...prev,
            e_img: file,
           }
        ));
      }

    const onSubmitChange = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('e_type', engineField.e_type);
        formData.append('e_detail', engineField.e_detail); // รูปภาพจะถูกส่งใน FormData
        formData.append('e_hp', engineField.e_hp);
        formData.append('e_img', engineField.e_img);

        try {
            const response = await fetch(`http://localhost:8000/api/engines/${id}`, {
                method: 'POST',
                body: formData // แปลงข้อมูล roleField ให้เป็น JSON
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    text: data.message,
                });
                router.push('/admin/engine_table/index')
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
                        <label className="block text-sm font-medium text-gray-900"> Engine Type:</label>
                        <input type="text" className="input input-bordered input-primary w-full max-w-xs text-black p-2" placeholder="Enter Engine Type" name="e_type"
                            value={engineField.e_type} onChange={e => changeEngineFieldHandler(e)} />
                    </div>

                    <div className="mb-3 mt-3">
                        <label className="block text-sm font-medium text-gray-900"> Engine Detail:</label>
                        <input type="text" className="input input-bordered input-primary w-full max-w-xs text-black p-2" placeholder="Enter EngEngine HP" name="e_detail"
                            value={engineField.e_detail} onChange={e => changeEngineFieldHandler(e)} />
                    </div>

                    <div className="mb-3 mt-3">
                        <label className="block text-sm font-medium text-gray-900"> Engine HP:</label>
                        <input type="text" className="input input-bordered input-primary w-full max-w-xs text-black p-2" placeholder="Enter Engine HP" name="e_hp"
                            value={engineField.e_hp} onChange={e => changeEngineFieldHandler(e)} />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="e_img" className="block text-sm font-medium text-white">
                            Brand Image
                        </label>
                        <div className='overflow-hidden w-1/3 h-1/2' onClick={ImageUpload}>
                            {newImage ? ( 
                                <img className=' w-full h-full object-cover' src={URL.createObjectURL(engineField.e_img)} alt="" />
                            ) : engineField.e_img ? (
                                <img className="w-full " src={`http://localhost:8000/images/engine/${engineField.e_img}`} alt="" />
                            ) : (
                                <img src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg' alt='No Image' />
                            )}
                        </div>
                        <button type="button" onClick={ImageUpload}>Upload Image</button>
                        <input
                            name='e_img'
                            id='image'
                            hidden
                            type="file"
                            className="input input-bordered input-primary w-full max-w- text-black p-2"
                            placeholder="Brand Image"
                            onChange={onfilechangeimage}
                        />
                    </div>
                   
                    <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Update</button>
                </form>
            </div>
        </div>
    );
}

import GlobalApi from '@/app/_utils/GlobalApi';
import { Copy } from 'lucide-react';
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function FileShareForm({ file }) {


    const [email, setemail] = useState();
    const { user } = useUser();
    const sendEmail = () => {
        const data = {
            emailToSend: email,
            userName: user?.fullName,
            fileName: File.fileName,
            fileSize: File.fileSize,
            fileType: File.fileType,
            shortUrl: File.ShortUrl
        }
        GlobalApi.SendEmail(data).then(resp => {
            console.log(resp);
        })
    }

    const onCopyClick = () => {
        navigator.clipboard.writeText(file.shortUrl);
        toast.success('URL copied to clipboard!');


    }

    return file && (
        <div className='flex flex-col gap-2'>
            <div>
            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"

/>
                <lable className='text-[14px] text-gray-500'>Show URL </lable>
                <div className='flex gap-5 p-2 border rounded-md justify-between'>
                    <input type='text' value={file.shortUrl}
                        className=' bg-transparent
            outline-none w-full'/>
                    <Copy className='text-grey-400 hover:text-gray-500' onClick={onCopyClick} />

                </div>

            </div>
            <div>
                <lable className='text-[14px] text-gray-500'>Send Email </lable>
                <div className='flex gap-5 p-2 border rounded-md justify-between'>
                    <input type='text'
                        className=' bg-transparent
            outline-none w-full' placeholder='example@gmail.com' />
                    <button className=' rounded bg-blue-600 px-6   py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto' onClick={() => sendEmail()}>Send</button>



                </div>

            </div>



        </div>
    )
}

export default FileShareForm

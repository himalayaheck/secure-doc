// "use client"
// import React,{useState} from 'react'
// import UploadForm from './_componants/UploadForm'
// import { app } from '@/firbaseConfig'
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, getFirestore, setDoc } from "firebase/firestore";
// import { useUser } from '@clerk/nextjs';
// import { generateRandomString } from '@/app/_utils/GenerateRandomStrings';

// function Upload() {
//     const {user}=useUser();
//     const storage=getStorage(app)
//     const [progress, setprogress] = useState(0)
//     const db = getFirestore(app);


//     const uploadFile=(File)=>{
//         const metadata = {
//             contentType:File.type
//           };
//         const storageRef = ref(storage, 'file-upload/'+File?.name);
//         const uploadTask = uploadBytesResumable(storageRef, File, File.type);

//         uploadTask.on('state_changed',
//   (snapshot) => {
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     setprogress(progress)

//     progress==100&&getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         console.log('File available at', downloadURL);
//       });
//     saveInfo(File,downloadURL);
      
   
//   }, )  

//     }
// const saveInfo=async(File,fileUrl)=>{
//     const docID =Date.now.toString();
//     await setDoc(doc(db, "uploadedFile", docID), {
//         fileName:File?.name,
//         fileSize:File?.size,
//         fileType:File?.type,
//         fileUrl:fileUrl,
//         userEmai:user?.primaryEmailAddress.emailAddress,
//         userName:user?.fullName,
//         password:'',
//         shortUrl:process.env.NEXT_PUBLIC_BASE_URL+generateRandomString(4)
//       })
//       ;

// }

//   return (
//     <div className='p-5 px-8 md:px-28'>
//        <h2 className='text-[20px] text-center m-5 '>Start <strong className='text-blue-500'>Uploading</strong>  File and <strong className='text-blue-500'>Share</strong> it...</h2>
//       <UploadForm uploadBtnClick={(File)=>uploadFile(File)} progress={progress}/>
//     </div>
//   )
// }

// export default Upload
"use client"
import React, { useState, useEffect } from 'react';
import UploadForm from './_componants/UploadForm';
import { app } from '@/firbaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from '@clerk/nextjs';
import { generateRandomString } from '@/app/_utils/GenerateRandomStrings';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Upload() {
    const { user } = useUser();
    const storage = getStorage(app);
    const [progress, setProgress] = useState(0);
    const db = getFirestore(app);
    const router = useRouter();
    const [fileDocId, setfileDocId] = useState();
    const [email, setEmail] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            setEmail(user.primaryEmailAddress?.emailAddress);
            setFullName(user.fullName);
        }
    }, [user]);

    useEffect(() => {
        if (uploadSuccess) {
            const timer = setTimeout(() => {
                setUploadSuccess(false);
                router.push('/file-preview/' + fileDocId);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [uploadSuccess]);

    const uploadFile = (File) => {
        const metadata = {
            contentType: File.type
        };
        const storageRef = ref(storage, 'file-upload/' + File.name);
        const uploadTask = uploadBytesResumable(storageRef, File, metadata);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setProgress(progress);
            },
            (error) => {
                console.error('Upload failed:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    saveInfo(File, downloadURL);
                }).catch((error) => {
                    console.error('Error getting download URL:', error);
                });
            }
        );
    };

    const saveInfo = async (File, fileUrl) => {
        const docID = generateRandomString(6).toString();
        await setDoc(doc(db, "uploadedFile", docID), {
            fileName: File.name,
            fileSize: File.size,
            fileType: File.type,
            fileUrl: fileUrl,
            userEmail: email,
            userName: fullName,
            password: '',
            id: docID,
            shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docID
        }).then(resp => {
            console.log('Document successfully written!', resp);
            setfileDocId(docID);
            setUploadSuccess(true);
        }).catch(error => {
            console.error('Error writing document:', error);
        });
    };

    if (uploadSuccess) {
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <Image src='/logo.svg' width={100} height={100} alt='success icon' />
                <h2 className='text-[20px] text-center m-5'>File uploaded successfully!</h2>
            </div>
        );
    }

    return (
        <div className='p-5 px-8 md:px-28'>
            <h2 className='text-[20px] text-center m-5 '>Start <strong className='text-blue-500'>Uploading</strong> File and <strong className='text-blue-500'>Share</strong> it...</h2>
            <UploadForm uploadBtnClick={(File) => uploadFile(File)} progress={progress} />
        </div>
    );
}

export default Upload;


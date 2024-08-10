"use client"
import { app } from '@/firbaseConfig';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { ArrowLeftSquare } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import FileInfo from './_componants/FileInfo';
import FileShareForm from './_componants/FileShareForm';

function FilePreview({params}) {
  const db = getFirestore(app);
  const [file, setfile] = useState();
    useEffect(() => {
    console.log(params?.fileid)
    params?.fileid&&getFileInfo();
    }, [])

  const getFileInfo=async()=>{
    const docRef = doc(db, "uploadedFile", params?.fileid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setfile(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  

  return (
    <div className='py-10 px-20'>
       <Link href='/upload' className='flex gap-3'><ArrowLeftSquare/>Go To Upload</Link>
       <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
        <FileInfo file={file}/>
        <FileShareForm file={file}/>
       </div>
    </div>
  )
}

export default FilePreview  
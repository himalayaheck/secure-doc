import { X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function FilePreview({File,removeFile}) {
  return (
    <div className='flex items-center gap-4 mt-2 justify-between border rounded-md p-2 border-blue-200 '> 
    <div className='flex items-center p-2'>
        <Image src='/file.png' width={50} height={50}
    alt='file'/>
    <div className='text-left'>
        <h2>{File.name}</h2>
        <h2 className='text-[12px] text-gray-400'>{File?.type} / {(File.size/1024/1024).toFixed(2)}MB</h2>
    </div>
    </div>
    
    <X className='cursor-pointer' onClick={()=>removeFile()}/>
    </div>
  )
}

export default FilePreview

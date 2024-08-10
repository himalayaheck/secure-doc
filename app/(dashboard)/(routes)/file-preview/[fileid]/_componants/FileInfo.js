import Image from 'next/image';
import React, { useState, useEffect } from 'react'

function FileInfo({ file }) {
    const [fileType, setfileType] = useState();
    useEffect(() => {
        file && setfileType(file?.fileType.split('/'[0]));
        console.log(fileType);
    }, [file])

    return file && (
        <div className='text-center border
 flex justify-center m-4 flex-col items-center p-2 rounded border-blue-200'>
            <Image src={fileType == 'image' ? file?.fileUrl : '/file.png'}
                width={200} height={200}
                className='h-[200px] rounded-md object-contain' />
            <div className=''>
                <h2>{file.fileName}</h2>
                <h2 className='text-gray-400 text-[13px]'>{file.fileType}</h2>
            </div>
        </div>
    )
}

export default FileInfo


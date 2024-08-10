"use client"
import React,{useState} from 'react'
import AlertMsg from './AlertMsg';
import FilePreview from './FilePreview';
import ProgressBar from './ProgressBar';

function UploadForm({uploadBtnClick,progress}) {
    const [File, setFile] = useState();
    const [errorMsg, seterrorMsg] = useState();

    const onFileSelect=(file)=>{
        console.log(file)
        if (file&&file.size>2000000){
            console.log("size is grater than 2MB")
            seterrorMsg('File Size is grater than 2MB')
            return ;
        }
        seterrorMsg(null)
        setFile(file)
    }
    return (
        <div className='text-center'>

            <div className="flex items-center justify-center w-full">
                <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-gray- dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-12 h-12 mb-4 text-blue-500 dark:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-lg md:text-2xl text-gray-500 dark:text-gray-400"><span className="font-semibold text-blue-500">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (Max Size: 2MB)</p>
                    </div>
                    <input onChange={(event)=>onFileSelect(event.target.files[0])} id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>
           {errorMsg? <AlertMsg msg={errorMsg}/>:null}
              {File?<FilePreview File={File} 
              removeFile={()=>setFile(null)}
              
              />:null}
            
          { progress>0?  <ProgressBar progress={progress}/> :<button onClick={()=>uploadBtnClick(File)}
             disabled={!File} className='p-2 mt-4 bg-blue-500 text-white w-[10%] rounded-full disabled:bg-gray-400 '>Upload</button>}

        </div>
    )
}

export default UploadForm

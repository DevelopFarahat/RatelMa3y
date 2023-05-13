import React from "react";
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import axios from "axios";

export default function CKEDitor({name, ref, blurF,editorConfigProp}) {

    const imageUploadUrl = process.env.REACT_APP_BACK_HOST_URL + '/api/upload-img'
    
    function uploadAdapter(loader){
        return {
            upload: () =>{
                try{
                    return new Promise(async (resolve, reject) => {
                        const body = new FormData();

                        let file = await loader.file;
                        body.append('uploadImg', file);

                        let {data} = await axios.post(imageUploadUrl, body)
                        resolve({default: data})
                    })
                }catch(e){
                    return console.error('error',e)
                }
            },
        }
    }
    
    function uploadPlugin(editor){
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => uploadAdapter(loader)
    }

    return (
            <CKEditor
                editor={Editor}
                config={{
                    ...editorConfigProp,
                    extraPlugins: [ uploadPlugin ]
                }}
                name={name}
                onBlur={blurF}
                ref={ref}
                data=""
            ></CKEditor>)
}


import React, {Component, useState} from 'react';
import './InputVariables.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

const FileUploader = () => {

  const [allFiles, setAllFiles] = useState(false)
  const [Files, setFiles] = useState([])

    function handleUpload (e) {
        let Files = [];
        [...e.target.files].map(file => Files.push(file));
        setAllFiles(true)
        setFiles(Files)
        console.log(Files)
        
    }

  
      return (
          <div>
              <input type="file" className="fileupload" id="fileupl" multiple onChange={(e) => handleUpload(e)}/>
              <label if="showText" for="fileupl">
                { allFiles ? <div style={{display:'flex', flexDirection:'column', alignItems: 'center', width: '130%'}}>{Files.map(file => <p>{file.name}</p>)}</div> : <>
                <p>Elige un archivo...</p><FontAwesomeIcon icon={faUpload}/></>}</label>
          </div>
      )
}

export default FileUploader
import React, { useState } from "react";
import { TbFileUpload } from "react-icons/tb";
import { FaFileAlt, FaPlayCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const FileInput = () => {
  const [files, setFiles] = useState([]);

  const handleUploadClick = () => {
    document.getElementById("fileupload").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFiles([...files, file]);
  };

  const handleFileDelete = (index) => {
    const newFiles = files.filter((file, i) => i !== index);
    setFiles(newFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFiles([...files, file]);
  };

  return (
    <div
      className="bg-white/20 h-[80vh] w-[60%] rounded-md"
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <form
        action=""
        encType="multipart/form-data"
        className="p-5 flex flex-col gap-3"
      >
        {/* Your existing file upload section */}
        <div className="w-full bg-white p-5 rounded-3xl border-[2px] border-dashed border-purple-600 flex flex-col gap-3 items-center">
          <div className="file-upload-icon rounded-full bg-[#EEF2FE] flex items-center justify-center h-[50px] w-[50px]">
            <TbFileUpload className="text-[#4D41E4] font-bold text-3xl" />
          </div>
          <div className="file-upload-text-middle">
            <p className="text-[0.750rem] text-[#586579]">
              <span
                className="font-bold text-[#4D41E4] cursor-pointer"
                onClick={handleUploadClick}
              >
                click here{" "}
              </span>
              to upload your file <span className="font-bold">OR</span> Drag and
              drop your file here
            </p>
          </div>
          <div className="file-upload-supported-format">
            <p className="text-[0.750rem] text-[#CBD1D9]">
              Supported Format: PDF
            </p>
          </div>
          {/* Hidden file input */}
          <input
            type="file"
            className="hidden"
            accept=".pdf"
            id="fileupload"
            name="fileupload"
            onChange={handleFileChange}
          />
        </div>

        {/* Your existing uploaded files section */}
        <div className="overflow-y-scroll max-h-[50vh]">
          {files.length > 0 &&
            files.map((file, index) => (
              <div
                className="mt-3 w-full bg-purple-600 rounded-xl flex flex-col border border-white"
                key={index}
              >
                {/* Displaying file details */}
                <div className="flex w-full p-3">
                  <div className="w-[10%]">
                    <FaFileAlt className="h-[30px] w-[30px]" />
                  </div>
                  <div className="flex flex-col w-[90%]">
                    <div className="flex items-center p-1 w-full justify-between">
                      <p className="font-bold text-white text-xs">
                        {file.name}
                      </p>
                      <div className="flex gap-1">
                        <FaPlayCircle className="h-[20px] w-[20px]" title="summarize" />
                        <MdDelete className="h-[20px] w-[20px]" title="Delete" onClick={() => handleFileDelete(index)} />
                      </div>
                    </div>
                    <div className={`text-gray-400 text-xs font-semibold flex`} style={{ paddingLeft: "10px" }}>
                      {(file.size / 1024).toFixed(2)} KB
                    </div>
                  </div>
                </div>
                <div className="pb-1 px-2 flex items-center justify-center gap-5">
                  <div className="bg-white h-[2px] w-full"></div>
                  <p className="progress-percentage">100%</p>
                </div>
              </div>
            ))}
        </div>
      </form>
    </div>
  );
};

export default FileInput;

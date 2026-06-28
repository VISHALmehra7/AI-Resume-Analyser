import React, { useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { resumeStore } from "../zustand/resumeStore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isLoading, resumeUpload, extractSkillsFromDescription,resumeLink,resumeFile } =
    resumeStore();
  const [jobDescriptionInput, setJobDescriptionInput] = useState({
    description: "",
  });
  const fileRef = useRef(null);
  const navigate = useNavigate();

  async function handleFileUpload() {
    fileRef.current.click();
  }

 
  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    await resumeUpload(file);
    
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(jobDescriptionInput.description.trim()==="")return
    try {
      await extractSkillsFromDescription(jobDescriptionInput);
      setJobDescriptionInput({ description: "" });
      navigate("/analytics");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-pink-200 via-pink-100 to-yellow-100 flex flex-col items-center justify-center gap-4">
      <input
        type="file"
        className="border border-red-300 py-2 px-1 hidden "
        ref={fileRef}
        onChange={handleFileChange}
      />
      <div className="border border-green-200 px-2 py-2 rounded-md  ">
        <div className="flex items-center justify-center gap-4 border border-red-200 py-2 px-3 rounded-md  ">
          <input
            type="text"
            placeholder="Upload Resume.."
            className="placeholder:text-sm focus:outline-none "
          />
          <FaCloudUploadAlt size={23} onClick={handleFileUpload} />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex icen justify-center flex-col gap-4"
      >
        <textarea
          name=""
          placeholder="Enter Job Description"
          id=""
          className="border border-red-500 px-2 py-2 placeholder:text-sm resize-none h-[100px] w-[250px] rounded-md bg-gray-100 focus:outline-none"
          value={jobDescriptionInput.description}
          onChange={(e) =>
            setJobDescriptionInput({
              ...jobDescriptionInput,
              description: e.target.value,
            })
          }
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 px-2 py-2 rounded-md text-white hover:bg-blue-600"
        >
          Analyse Resume
        </button>
      </form>
    </div>
  );
};

export default Home;

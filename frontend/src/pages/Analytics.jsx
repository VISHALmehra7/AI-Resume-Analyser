import React, { useState } from "react";
import AnalyticsCard from "../components/AnalyticsCard";
import { useEffect } from "react";
import { analyticsStore } from "../zustand/analyticsStore";
import { resumeStore } from "../zustand/resumeStore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Analytics = () => {
  const [questionInput, setQuestionInput] = useState({
    question: "",
  });
  const [askedQuestion, setaskedQuestion] = useState("")
  const {
    isLoading,
    getAnalytics,
    missingSkills,
    resumeSkills,
    strongSkills,
    score,
  } = analyticsStore();
  const { resumeLink, isResumeLoading, ragAnswer, ragQuestion } = resumeStore();

  useEffect(() => {
    async function analytics() {
      await getAnalytics();
    }
    analytics();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!questionInput.question) return;
    try {
      setaskedQuestion(questionInput.question)
      await ragQuestion(questionInput);

      setQuestionInput({ question: "" });
      
    } catch (error) {}
  }


  return (
    <div className=" min-h-screen md:h-screen w-full bg-gradient-to-r from-pink-200 via-pink-100 to-yellow-100 overflow-hidden flex flex-col md:flex-row flex-1 p-2 ">
      <div className=" h-screen w-full p-2 ">
        <embed
          className="rounded-xl border-none"
          src={resumeLink}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      </div>
      <div className=" flex flex-col gap-1  min-h-screen md:h-screen md:w-full  md:p-3 overflow-y-scroll  hide-scrollbar ">
        <AnalyticsCard skill={missingSkills} title={"Missing Skills"} />
        <AnalyticsCard skill={strongSkills} title={"Strong Skills"} />
        <AnalyticsCard skill={resumeSkills} title={"Resume Skills"} />
        <div className="bg-green-100 border mx-auto border-green-600 max-w-100 min-h-20 w-full rounded-md m-2 text-green-500 text-center">
          <h1>{"Score"}</h1>
          <span>{score}</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2  w-full h-50 rounded-md relative overflow-y-auto">
            <div className={` text-black ${askedQuestion && "bg-white"} rounded-md w-[70%] wrap-break-word  self-end m-2 p-2`}>
              {askedQuestion}
            </div>

            <div className={`text-white ${ragAnswer && "bg-blue-600"}  rounded-md w-[70%] wrap-break-word  self-start m-2 p-2`}>
             {isResumeLoading ? <AiOutlineLoading3Quarters className="animate-spin " color="blue" /> : ragAnswer}
            </div>
          </div>
          <div className="flex">
            <input
              type="text"
              className="bg-blue-900 w-full p-1 rounded-md text-white font-bold"
              placeholder="Ask Your Question..."
              value={questionInput.question}
              onChange={(e) =>
                setQuestionInput({ ...questionInput, question: e.target.value })
              }
            />
            <button disabled={isResumeLoading} type="submit" className="bg-green-400 p-1 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Analytics;

import React from "react";

const AnalyticsCard = ({ skill = [], title = "" }) => {
  
  return (
    <div className="bg-green-100 border mx-auto border-green-600 max-w-100 min-h-20 w-full rounded-md m-2 text-green-500 text-center">
      <h2 className="text-red-600">{title}</h2>
      <div className="bg-green-100  mx-auto  max-w-100 min-h-20 w-full rounded-md m-2 text-green-500 text-center flex gap-2 flex-wrap items-center justify-center ">
        {skill.map((singleSkill) => (
          <div key={singleSkill}> • {singleSkill}</div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsCard;

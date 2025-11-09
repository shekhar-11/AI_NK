import React, { useState } from "react";
import { transferData } from "./transfer";

const Overview = () => {
  const fieldQuestions = [
    "ID",
    "Expectations",

    "Functionality",
    "Compatibility",

    "Usability",
"Performance",

"Bugs"





   
  ];

  const [descriptions, setDescriptions] = useState(
    fieldQuestions.reduce((acc, q) => ({ ...acc, [q]: "" }), {})
  );

  // const [transferSuccess, setTransferSuccess] = useState(null);

  const [votes, setVotes] = useState(Array(5).fill(null));
  const [approved, setApproved] = useState(false);

  const handleChange = (q, value) => {
    setDescriptions((prev) => ({ ...prev, [q]: value }));
  };

  const [checkDescriptionsFilled, setCheckDescriptionsFilled] = useState(false);
 


  React.useEffect(() => {
    const allFilled = fieldQuestions.every((q) => descriptions[q].trim() !== "");
    setCheckDescriptionsFilled(allFilled);
  }, [descriptions]);

  React.useEffect(() => {
    console.log(descriptions  );
  },[descriptions]);


 const handleVote = (approverIndex, value) => {
  if (checkDescriptionsFilled) {
    setVotes((prev) => {
      const newVotes = [...prev];
      newVotes[approverIndex] = value;
      return newVotes;
    });
  } else {
    alert("Please fill all descriptions before voting.");
  }
};

  const checkApproval = () => {
  const approvedBy = votes.filter((v) => v === 1).length;

  if (approvedBy === 5) {
    saveToFile();
  } else {
    alert("Not enough approvals yet");
  }
};

const saveToFile = async () => {
  const approvedBy = votes.filter((v) => v === 1).length;
  if (approvedBy === 5) {
    try {
      const success = await transferData(descriptions);
      if (success) {
        setApproved(true);
      } else {
        setApproved(false);
        
      }
    } catch (error) {
      console.error("Error during transfer:", error);
      setApproved(false);
     
    }
  }
};



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6">
      <h1 className="text-2xl font-bold mb-8 text-center text-red-600">
        🧾  Review Approval
      </h1>

      {/* Two-column layout: Descriptions (left) and Approvers (right) */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Questions Section */}
        <div className="space-y-5">
          {fieldQuestions.map((q, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-xl p-5 border"
            >
              <p className="font-semibold text-gray-700 mb-2">
                {idx + 1}. {q}
              </p>
              <textarea
                className="w-full border rounded-md p-2 text-sm"
                rows="3"
                placeholder="Enter your description..."
                value={descriptions[q]}
                onChange={(e) => handleChange(q, e.target.value)}
              />
            </div>
          ))}
        </div>

       
        <div className="bg-white shadow-md rounded-xl p-5 border h-fit md:sticky md:top-10 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">
            Approver Votes
          </h2>
          <div className="flex flex-col gap-3">
            {votes.map((v, approverIndex) => (
              <div key={approverIndex} className="flex items-center justify-between">
                <span className="text-sm font-medium">Approver {approverIndex + 1}</span>
                <div className="flex gap-2">
                 <button
  onClick={() => handleVote(approverIndex, 1)}
  disabled={!checkDescriptionsFilled}
  className={`px-2 py-1 text-sm rounded ${
    v === 1
      ? "bg-green-500 text-white"
      : "bg-gray-200 text-gray-800"
  } ${!checkDescriptionsFilled ? "opacity-50 cursor-not-allowed" : ""}`}
>
  +1
</button>

<button
  onClick={() => handleVote(approverIndex, -1)}
  disabled={!checkDescriptionsFilled}
  className={`px-2 py-1 text-sm rounded ${
    v === -1
      ? "bg-red-500 text-white"
      : "bg-gray-200 text-gray-800"
  } ${!checkDescriptionsFilled ? "opacity-50 cursor-not-allowed" : ""}`}
>
  -1
</button>
                </div>
              </div>
            ))}
          </div>
          

          <button
            onClick={checkApproval}
            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md"
          >
             Save Approved Data
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Overview;
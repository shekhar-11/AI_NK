import React, { useState } from "react";

const Overview = () => {
  const fieldQuestions = [
    "ID",
    "Bugs",

"Functionality",

"Performance",

"Usability",

"Expectations",

"Compatibility",

   
  ];

  const [descriptions, setDescriptions] = useState(
    fieldQuestions.reduce((acc, q) => ({ ...acc, [q]: "" }), {})
  );

  const [votes, setVotes] = useState(Array(5).fill(null));
  const [approved, setApproved] = useState(false);

  const handleChange = (q, value) => {
    setDescriptions((prev) => ({ ...prev, [q]: value }));
  };

  const checkDescriptionsFilled = () => {
    for (let q of fieldQuestions) {
      if (!descriptions[q] || descriptions[q].trim() === "") {
        return false;
      }
    }}

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

    if (approvedBy == 5) {
      setApproved(true);
      saveToFile();
    } else {
      alert("Not enough approvals yet");
    }
  };

  const saveToFile = () => {
   console.log("Approved Descriptions:", descriptions);
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
                    className={`px-2 py-1 text-sm rounded ${v === 1
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-800"
                      }`}
                  >
                    +1
                  </button>
                  <button
                    onClick={() => handleVote(approverIndex, -1)}
                    className={`px-2 py-1 text-sm rounded ${v === -1
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-800"
                      }`}
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
            Check & Save Approved Data
          </button>

          {approved && (
            <p className="mt-4 text-green-600 font-semibold text-center">
              ✅ Approved & Saved!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
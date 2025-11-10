import axios from "axios";

export const transferData = async (data)=>{

    try{
            if(!data || Object.keys(data).length === 0){
                console.log("No data to transfer");
                alert("No data to transfer");
           
            }

            else
            {
                 const formattedData = {
                bug_id: data["ID"],
                note_to_reviewers: data["Note to Reviewers"],
                root_cause_analysis: data["Root Cause Analysis"],
                testing: data["Testing Done"],
                impacted_hw: data["Impacted Hardware"],
                performance: data["Performance"],
                comments: data["Additional Comments"],
    };
                await axios.post("api/addData", formattedData)
                .then((response)=>{
                    console.log("Data transferred successfully:", response.data);
                    alert("Data transferred successfully");
                })
                .catch((error)=>{
                    console.error("Error transferring data:", error);
                    alert("Error transferring data");
                });
            }
    }

    catch(err){
    
        console.error("Error transferring data:", err);
        alert("Error transferring data");
        
    }



}
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
                id: data["ID"],
                expectations: data["Expectations"],
                functionality: data["Functionality"],
                compatibility: data["Compatibility"],
                usability: data["Usability"],
                performance: data["Performance"],
                bugs: data["Bugs"],
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
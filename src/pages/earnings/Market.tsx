import React from "react";
import Gig from "../../components/organisms/market/Gig";
import { useFetchData } from "../../hooks/useFetchData";
import { POST_URL } from "../../constant/resource";

const Market = () => {
  const { data, error, loading } = useFetchData<any>(POST_URL + "/all");

  console.log("post", data);
  return (
    <div className="min-h-screen pb-10">
      <h1>Market</h1>
      <div className="flex items-center justify-evenly flex-wrap gap-5">
        {data?.map((eachData: any) => {
          return (
            <div className="w-[30%] p-3">
              <Gig data={eachData} postId={eachData?._id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Market;

import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {

    const {setSearchFilter , setIsSearched} =  useContext(AppContext);
    
    const titleRef = useRef(null);
    const locationRef = useRef(null);

    const onSerach = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value,
        })
        setIsSearched(true);
        // titleRef.current.value = "";
        // locationRef.current.value = "";
    }



  return (
    <div className=" container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from bg-purple-800 to bg-purple-950 text-white py-16 text-center mx-2 rounded-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">Over 10,000+ jobs waiting for you</h2>
        <p className="max-w-3xl mx-auto font-light text-xs md:text-sm lg:text-base mb-8">
          This is the right Place you can find your Dream Job , Tons ans tons of
          opportunities are waiting for to achieve your careeer in reputed
          company And get paid for your work.
        </p>
        <div className="flex items-center justify-between bg-white text-gray-600 rounded max-w-xl pl-4 mx-4 sm:mx-auto">
          <div className=" flex items-center gap-2">
            <img className=" h-4 sm:h-6" src={assets.search_icon} />
            <input
              type="text"
              placeholder="Search for jobs"
              className="  rounded px-4 py-2 w-full max-w-[400px] focus:outline-none "
              ref={titleRef}
            />
          </div>
          <div className="flex items-center gap-2">
            <img className="h-4 sm:h-6" src={assets.location_icon} />
            <input
              type="text"
              placeholder="Location"
              className="  rounded px-4 py-2 w-full max-w-[400px] focus:outline-none "
              ref={locationRef}
            />
          </div>
          <button onClick={onSerach} className="bg-blue-500 px-6 sm:px-9 py-2 rounded text-white hover:bg-blue-700 m-1">
           
            Search
          </button>
        </div>
      </div>

      {/* truetse by sectiom */}

    <div  className="border border-gray-400 shadow-md mx-2 mt-5 p-6 rounded-md  flex ">
        <div className="flex justify-center gap:10 lg:gap-16 flex-wrap">
            <p className="font-medium">Trusted by </p>
            <img className="h-6" src={assets.microsoft_logo}/>
            <img className="h-6" src={assets.walmart_logo}/>
            <img className="h-6" src={assets.samsung_logo}/>
            <img className="h-6" src={assets.accenture_logo}/>
            <img className="h-6" src={assets.adobe_logo}/>
            <img className="h-6" src={assets.amazon_logo}/>

        </div>
    </div>


    </div>
  );
};

export default Hero;

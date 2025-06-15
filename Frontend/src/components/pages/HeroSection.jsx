import React from "react";

function HeroSection() {
  return (
    <section className="bg-white text-black px-6 py-16 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl font-bold mb-4">
          Get Help with Your Government Documents
        </h1>
        <p className="mb-6">
          Apply for Aadhaar, PAN, Ration Card, and more — hassle-free!
        </p>
        {/* <button className="bg-white text-green-800 px-6 py-2 rounded-md font-semibold hover:bg-gray-100">
          Get Started
        </button> */}
      </div>
    </section>
  );
}

export default HeroSection

import React from "react";

function VideoGuide() {
  return (
    <section className="bg-white text-black px-6 py-10 flex justify-center">
      <div className="relative w-72 h-44 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src=""
          alt="Video Guide"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-full p-3 shadow-lg">
            <svg
            //  xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.752 11.168l-4.586-2.65A1 1 0 009 9.342v5.316a1 1 0 001.166.978l4.586-2.65a1 1 0 000-1.738z"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoGuide;

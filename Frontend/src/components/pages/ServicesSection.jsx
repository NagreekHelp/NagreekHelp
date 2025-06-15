import React from "react";

const services = [
  "Aadhaar Card Assistance",
  "PAN Card Assistance",
  "Voter ID",
  "Ration Card",
];

function ServicesSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition"
          >
            <div className="flex justify-center mb-4">
              <div className="bg-primary-green rounded-full w-10 h-10 flex items-center justify-center">
                <svg
                  // xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <div className="text-lg font-semibold text-gray-800 mb-2">
              {service}
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;

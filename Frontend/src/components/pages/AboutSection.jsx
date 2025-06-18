import React from "react";

function AboutSection() {
  return (
    
    <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-10 md:p-16 text-center">
      <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">About Us</h2>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          <span className="font-semibold text-blue-600">Nagreek Help</span> is a digital platform that connects users directly with 
          <span className="font-semibold text-gray-800"> Common Service Centers (CSCs)</span>, allowing anyone to get their government documents created or updated
          from the comfort of their home. No more queues, no more travel—just simple, secure access.
        </p>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-6">
          Inspired by the <span className="text-indigo-600 font-semibold">Digital India</span> mission, our goal is to empower citizens
          and make essential services accessible in just a few clicks.
        </p>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-6">
          For CSC center owners, our platform is a game changer. Receive online document requests, reduce in-store traffic,
          and grow your reach—all while staying organized and efficient.
        </p>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-6">
          Whether you're a user or a CSC partner, <span className="text-green-700 font-semibold">Nagreek Help</span> brings
          speed, ease, and transparency to document processing—right from your doorstep.
        </p>
      </div>
    </section>
  );
}

export default AboutSection;

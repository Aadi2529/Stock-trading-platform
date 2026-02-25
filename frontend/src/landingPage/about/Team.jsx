import React from "react";
import { Linkedin, Github, Twitter } from "lucide-react";

const Team = () => {
  const members = [
    {
      name: "Aditya Thakre",
      role: "Founder & Developer",
      image: "media/images/profile.jpg",
      bio: "Built the platform with a focus on clean UI, realistic simulation, and practical trading education.",
    },
    {
      name: "Product Vision",
      role: "Strategy & Research",
      image: "media/images/profile2.jpg",
      bio: "Focused on creating a structured learning environment for aspiring traders.",
    },
  ];

  return (
    <section className="py-28 bg-[#f8f9fb]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Section Heading */}
        <div className="border-t border-gray-200 pt-16 mb-20 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold">
            The Team Behind The Platform
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            A focused group building a smarter way to learn trading.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-16">

          {members.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />

              <h4 className="mt-6 text-2xl font-semibold">
                {member.name}
              </h4>

              <p className="text-red-500 font-medium mt-2">
                {member.role}
              </p>

              <p className="mt-6 text-gray-600 leading-relaxed text-base">
                {member.bio}
              </p>

              <div className="flex justify-center gap-4 mt-6 text-gray-500">
                <Linkedin className="hover:text-red-500 cursor-pointer transition" size={18} />
                <Github className="hover:text-red-500 cursor-pointer transition" size={18} />
                <Twitter className="hover:text-red-500 cursor-pointer transition" size={18} />
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Team;
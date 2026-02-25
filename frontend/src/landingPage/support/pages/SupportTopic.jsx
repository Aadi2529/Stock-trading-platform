import React from "react";
import { useParams, Link } from "react-router-dom";
import { categoriesData } from "../SupportCategories";
import { ChevronRight } from "lucide-react";

const SupportTopic = () => {
  const { catId, topicSlug } = useParams();

  const cat = categoriesData.find((c) => c.id === catId);

  const topic = cat
    ? cat.items.find(
        (it) =>
          encodeURIComponent(
            String(it).toLowerCase().replace(/[^a-z0-9]+/g, "-")
          ) === topicSlug
      )
    : null;

  return (
    <section className="pt-32 pb-24 bg-[#f8fafc] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/support" className="hover:text-red-500 transition">
            Support
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span>{cat?.title || "Category"}</span>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-700 font-medium">
            {topic || "Topic not found"}
          </span>
        </div>

        {/* Article Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10">

          <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
            {topic || "Topic not found"}
          </h1>

          <p className="text-gray-600 leading-relaxed mb-6">
            This is a placeholder page for the support topic. Replace this with
            real help documentation, step-by-step guides, screenshots, or video
            tutorials.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            You can structure this page like a proper help article with:
          </p>

          <ul className="list-disc pl-6 space-y-3 text-gray-600">
            <li>Clear step-by-step instructions</li>
            <li>Screenshots</li>
            <li>Important notes highlighted</li>
            <li>FAQs at the bottom</li>
          </ul>

          <div className="mt-12">
            <Link
              to="/support"
              className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Back to Support
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SupportTopic;
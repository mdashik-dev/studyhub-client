import React from "react";

const SuccessStories = () => {
  return (
    <section className="py-16 px-4 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Student Success Stories
      </h2>
      <p className="text-lg text-gray-700 mb-12 px-4 max-w-3xl mx-auto">
        Here are some inspiring stories from our students who have found success
        after completing courses at StudyHub. Learn how StudyHub helped them
        achieve their dreams.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="max-w-md bg-white p-6 rounded-lg shadow-md">
          <p className="italic text-lg text-gray-600 mb-4">
            "StudyHub helped me go from a complete beginner to a professional
            web developer in just six months!"
          </p>
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800">John Doe</h4>
            <p className="text-sm text-gray-500">Software Engineer</p>
            <p className="text-sm text-gray-500">
              Graduated: Web Development Bootcamp
            </p>
          </div>
        </div>
        <div className="max-w-md bg-white p-6 rounded-lg shadow-md">
          <p className="italic text-lg text-gray-600 mb-4">
            "I landed my dream job as a data scientist thanks to the
            comprehensive Data Science 101 course!"
          </p>
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800">Jane Smith</h4>
            <p className="text-sm text-gray-500">Data Scientist</p>
            <p className="text-sm text-gray-500">Graduated: Data Science 101</p>
          </div>
        </div>
        <div className="max-w-md bg-white p-6 rounded-lg shadow-md">
          <p className="italic text-lg text-gray-600 mb-4">
            "The tutors at StudyHub made complex topics simple and easy to
            understand. I highly recommend it!"
          </p>
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800">Samuel Lee</h4>
            <p className="text-sm text-gray-500">
              Digital Marketing Specialist
            </p>
            <p className="text-sm text-gray-500">
              Graduated: Digital Marketing Mastery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;

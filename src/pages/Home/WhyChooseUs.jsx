import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-4 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Why Choose StudyHub?
      </h2>
      <p className="text-lg text-gray-700 mb-12 px-4 max-w-3xl mx-auto">
        At StudyHub, we believe in providing high-quality, affordable, and
        flexible learning experiences that cater to students of all backgrounds.
        Here’s why our students love StudyHub:
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="max-w-xs p-6 bg-white text-black rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Affordable Pricing</h3>
          <p>
            StudyHub offers competitive pricing with flexible payment plans,
            making it accessible to students worldwide. Our goal is to make
            education affordable and accessible to everyone.
          </p>
        </div>
        <div className="max-w-xs p-6 bg-white text-black rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Expert Tutors</h3>
          <p>
            Our tutors are industry professionals with years of experience in
            their respective fields. They bring a wealth of knowledge and
            practical expertise to help students succeed in real-world
            applications.
          </p>
        </div>
        <div className="max-w-xs p-6 bg-white text-black rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Flexible Learning</h3>
          <p>
            Learn at your own pace with StudyHub’s flexible learning platform.
            Whether you prefer a self-paced approach or need more structure, we
            offer both live sessions and recorded materials.
          </p>
        </div>
        <div className="max-w-xs p-6 bg-white text-black rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Global Community</h3>
          <p>
            Join a global network of learners and professionals. StudyHub
            fosters a community where students can collaborate, ask questions,
            and network with peers from all over the world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

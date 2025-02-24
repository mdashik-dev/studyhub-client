import React from "react";

const PopularCourses = () => {
  const courses = [
    {
      title: "Introduction to Programming",
      description:
        "Start learning the basics of programming with hands-on exercises and examples.",
    },
    {
      title: "Data Science 101",
      description:
        "Learn how to collect, clean, and analyze data with powerful tools like Python and R.",
    },
    {
      title: "Web Development",
      description:
        "Create modern websites using HTML, CSS, JavaScript, and frameworks like React and Node.js.",
    },
    {
      title: "Digital Marketing",
      description:
        "Master SEO, social media marketing, and content creation to boost your online presence.",
    },
    {
      title: "Graphic Design",
      description:
        "Design stunning graphics and visuals using industry-standard software like Photoshop and Illustrator.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Popular Courses
      </h2>
      <p className="text-lg text-gray-700 mb-8 px-4 max-w-3xl mx-auto">
        Our platform offers a wide range of courses designed to enhance your
        skills and help you reach your career goals. Explore some of our most
        popular courses below:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{course.title}</h3>
            <p className="text-gray-700">{course.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCourses;

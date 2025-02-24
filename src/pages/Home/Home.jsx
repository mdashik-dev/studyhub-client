import React from "react";
import TutorSection from "./TutorSection";
import Banner from "./Banner";
import StudySession from "./StudySession";
import WhyChooseUs from "./WhyChooseUs";
import PopularCourses from "./PopularCourses";
import SuccessStories from "./SuccessStories";
import FAQ from "./FAQ";
import ContactUs from "./ContactUs";

const Home = () => {
  return (
    <div>
      <Banner />
      <StudySession />
      <TutorSection />
      <WhyChooseUs />
      <PopularCourses />
      <SuccessStories />
      <FAQ />
      <ContactUs />
    </div>
  );
};

export default Home;

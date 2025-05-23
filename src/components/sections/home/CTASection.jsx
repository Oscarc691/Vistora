import React from "react";
import { AnimatedSection } from "../../animations/AnimatedSection";
import PrimaryButton from "../../buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="cta"
      className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto text-center"
    >
      <AnimatedSection>
        <div
          className="marble-bg p-10 rounded-lg"
          style={{ backgroundColor: "#800020" }}
        >
          <h2 className="text-4xl lg:text-5xl font-md font-poppins mb-4 text-white">
            Join the Future of Healthcare Claims Management
          </h2>
          <p className="text-gray-100 mb-8 max-w-2xl mx-auto">
            Secure, fast, and claim-centric productivity in just a few steps.
          </p>
          <PrimaryButton
            buttonText={"Get Started"}
            action={() => navigate("/signup")}
          />
        </div>
      </AnimatedSection>
    </section>
  );
};

export default CTASection;

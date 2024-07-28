import React from "react";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "about";
  }, []);
  return (
    <main className="About">
      <h2>About</h2>
      <p style={{ marginTop: "1rem" }}>
        This blog app is a project in the Learn React tutorial series.
      </p>
    </main>
  );
};

export default About;

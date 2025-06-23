import React from "react";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 4,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];

  return (
    <section className="py-16 bg-[#f4f7fc] text-center">
      <h2
        className="font-normal mb-8"
        style={{
          fontFamily: '"Source Sans Pro", Arial, sans-serif',
          fontWeight: 700,
          fontSize: "44px",
          lineHeight: "52px",
          color: "rgb(15, 17, 20)"
          
        }}
      >
        What our students say
      </h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-8">
        {testimonialsData.map((e) => (
          <div
            key={e.id}
            className="p-6 bg-white shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105"
          >
            <div className="w-24 h-24 mx-auto mb-4">
              <img
                src={e.image}
                alt={e.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <p
              className="text-gray-700 italic mb-4"
              style={{
                fontFamily:
                  'OpenSans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                textAlign:"left"
              }}
            >
              {e.message}
            </p>
            <div
              className="font-semibold text-[#0048b0]"
              style={{
                fontFamily:
                  'OpenSans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                textAlign:"left"
              }}
            >
              {e.name}
            </div>
            <div
              className="text-sm text-gray-500"
              style={{
                fontFamily:
                  'OpenSans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                textAlign:"left"
              }}
            >
              {e.position}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;


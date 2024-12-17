import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const About = () => {
  return (
    <div className="about-page">
      {/* Header Section */}
      <section
        className="about-header text-center py-16 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-photo/travel-concept-with-landmarks_23-2149153256.jpg?t=st=1734459512~exp=1734463112~hmac=956199774261d513cea7b1861f7343dcc4bcdc9298fbcf1c82e3028ab2da7f18&w=1800)",
        }}
      >
        {/* Dimmed Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <h1 className="text-white text-4xl font-bold relative z-10">
          Welcome to <span className="text-blue-400">TripGo</span>
        </h1>
        <p className="text-white mt-4 text-lg relative z-10">
          Your Trusted Travel Agency for Seamless Booking Experiences
        </p>
      </section>

      {/* Introduction Section */}
      <section className="about-intro py-16 px-4 bg-light-gray">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            About <span className="text-blue-500"> TripGo</span>
          </h2>
          <p className="text-lg">
            TripGo is a leading travel agency offering personalized booking
            experiences to help travelers plan their perfect vacation. With a
            wide range of tours, activities, and accommodations, we make your
            travel dreams come true.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="our-mission py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Our <span className="text-blue-500"> Mission</span>
          </h2>
          <p className="text-lg">
            Our mission is to provide seamless, reliable, and hassle-free travel
            booking services that empower our customers to explore the world
            with ease. We strive to offer exceptional customer service and the
            best travel deals.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us py-16 bg-light-gray">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Why Choose <span className="text-blue-500"> Us?</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-full md:w-1/3">
              <img
                className="rounded-lg mb-4"
                src="https://img.freepik.com/free-photo/young-woman-sitting-coffee-table-with-laptop-home-working-on-projects_1150-18219.jpg?w=1380&t=st=1689821537~exp=1689822137~hmac=ea537998d858e2d68fa85c2165e8ac9c07eab70f89db67d943e48a3e84665e13"
                alt="Professional Service"
              />
              <h3 className="text-xl font-semibold mb-2">
                Professional Service
              </h3>
              <p>
                We offer expert assistance and personalized guidance to ensure
                your trip is perfectly planned.
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <img
                className="rounded-lg mb-4"
                src="https://img.freepik.com/free-photo/exotic-sunset-beach-ideal-relaxing-place_1150-18313.jpg?w=1380&t=st=1689821972~exp=1689822572~hmac=e4d945a3c49b09012d44a39b1b4b3a22cc2b6f700f9735360b171a320c2f29d5"
                alt="Unique Destinations"
              />
              <h3 className="text-xl font-semibold mb-2">
                Unique Destinations
              </h3>
              <p>
                We curate exclusive travel packages to unique destinations
                across the world, ensuring a one-of-a-kind experience.
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <img
                className="rounded-lg mb-4"
                src="https://img.freepik.com/free-photo/tourist-enjoying-luxury-resort-terrace-with-beautiful-view_1150-18335.jpg?w=1380&t=st=1689822102~exp=1689822702~hmac=573d74584f5e647b90fcbd2e91c8a7f313e0b3f438742970de8763fc7be2f215"
                alt="Affordable Prices"
              />
              <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
              <p>
                We ensure our customers get the best value for their money,
                offering competitive rates for every trip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="our-team py-16 bg-white/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Meet Our <span className="text-blue-500">Team</span>
          </h2>
          <p className="text-lg mb-8">
            Our team is dedicated to making your travel experiences
            unforgettable. We are experts in travel planning and passionate
            about helping you discover the best destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="team-member w-1/3">
              <img
                className="rounded-full mb-4"
                src="https://img.freepik.com/free-photo/smiling-young-travel-agent-holding-travel-book-while-working-office_1150-18351.jpg?w=1380&t=st=1689822301~exp=1689822901~hmac=fd79c254f2a30fc1ad4fa28cc5e225e99f4232f9db184e00d5e20b27ff51d426"
                alt="Team Member 1"
              />
              <h3 className="text-xl font-semibold">Jane Doe</h3>
              <p>Travel Consultant</p>
            </div>
            <div className="team-member w-1/3">
              <img
                className="rounded-full mb-4"
                src="https://img.freepik.com/free-photo/cheerful-young-tourist-student-smiling-camera-outdoor_1150-18412.jpg?w=1380&t=st=1689822402~exp=1689823002~hmac=6177bbd4170abf3788d0bc6fc9ef62ff1b71c5791ec59001c0d50fa04a4d3e78"
                alt="Team Member 2"
              />
              <h3 className="text-xl font-semibold">John Smith</h3>
              <p>Travel Specialist</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info py-16 bg-light-gray text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Get in <span className="text-blue-500"> Touch</span>
          </h2>
          <p className="text-lg mb-4">
            Have any questions or need help with your booking? We're here to
            assist you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Mail className="w-8 h-8 mb-4" />,
                title: "Email",
                content: "contact@tripgo.com",
              },
              {
                icon: <Phone className="w-8 h-8 mb-4" />,
                title: "Phone",
                content: "+91-9130045670",
              },
              {
                icon: <MapPin className="w-8 h-8 mb-4" />,
                title: "Address",
                content: "Ghaziabad,India",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.content}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="mailto:contact@tripgo.com"
              className="inline-block px-8 py-3 bg-white text-blue-500 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

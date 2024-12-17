import React from "react";
import { toast } from "react-toastify";

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    event.target.reset();
    toast("Thank you for subscribing!");
  };

  return (
    <div className="text-center py-12 ">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-6 text-gray-800">
        Subscribe Now for <span className="text-blue-500">Notifications!</span>
      </h1>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        Stay one step ahead with our exclusive travel alerts!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 mx-auto flex items-center gap-4"
      >
        {/* Input Field */}
        <input
          type="email"
          placeholder="Enter your email"
          className="bg-inherit w-full py-3 px-4 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-b from-sky-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-sky-600 hover:to-blue-600 transition ease-in-out duration-200"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;

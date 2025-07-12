import React from 'react';
import Lottie from 'lottie-react';
import Contacts from '../Components/animation/contact.json'

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "af007ffa-2d70-49e2-beea-8cce0a73b31d"); 

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("✅ Form Submitted Successfully!");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult("❌ " + data.message);
    }
  };

  return (
    <div className="w-10/12 mx-auto">
      <h3 className="mt-4 text-4xl text-center">
        <span className="text-gray-500">Contact</span>
        <span className="text-gray-700"> ME</span>
      </h3>
      <div className="flex flex-col md:flex-row gap-10 mt-10">
        <div>
          {/* <img src={contact} alt="image" className="w-full md:h-[600px]" /> */}
          <Lottie animationData={Contacts} loop={true} className="w-full md:h-[600px]"  />
        </div>
        <form onSubmit={onSubmit} className="w-full md:w-1/2">
          <div className="mt-5">
            <label htmlFor="name">Name:</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="border border-gray-500 px-4 py-3 w-full rounded mt-3"
              required
            />
          </div>
          <div className="mt-5">
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="border border-gray-500 px-4 py-3 w-full rounded mt-3"
              required
            />
          </div>
          <div className="mt-5">
            <label htmlFor="message">Query:</label>
            <textarea
              name="message"
              placeholder="Enter your query"
              className="border border-gray-500 px-4 py-3 w-full rounded mt-3"
              rows={8}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="mt-3 px-5 py-3 bg-rose-400 text-white rounded-2xl"
          >
            Submit
          </button>
          <p className="mt-3 text-green-600 font-semibold">{result}</p>
        </form>
      </div>
    </div>
  );
};

export default Contact;

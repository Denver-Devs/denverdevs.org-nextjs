import React, { useState } from "react";
import axios from "axios";
import lscache from "lscache";

const InviteForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [formMessage, setMessage] = useState("");

  const validEmail = (email) => {
    console.log('valid email', email);
    if (!email) return false;
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const setInvalidEmailStatus = () => {
    setMessage("Please enter a valid email.");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`test: ${name}, ${email}, ${reason}`);
    const lambdaURL =
      process.env === "production" ? "/.netlify/functions" : "/localhost:9000";

    if (!validEmail(email)) {
      console.log(email);
      setInvalidEmailStatus();
      return;
    }
    if (email === lscache.get("hasRequestedInvite")) {
      console.log("error");
    } else {
      lscache.set("hasRequestedInvite", email, 120);
      console.log('hoppin in');
      setTimeout(() => {
        axios
          .post(
            // `https://kapgbb2ttf.execute-api.us-east-1.amazonaws.com/dev/invite`,
            `${lambdaURL}/invite-handler`,
            {
              name,
              email,
              originSource,
            }
          )
          .then((response) => {
            console.log(response);
            setMessage(response.data.status);
          })
          .catch((error) => {
            console.error(error);
            setMessage(
              "Uh oh, somethings wrong here (and it's on us) - reach out to help@denverdevs.org."
            );
          });
      }, 1000);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex-row max-w-sm rounded-md p-4">
      <h4>Join us on Slack</h4>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name:
        </label>
        <input
          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
          type="text"
          id="name"
          name="name"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Email:
        </label>
        <input
          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
          type="email"
          id="email"
          name="email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <div className="mb-2">
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-700"
          >
            Why do you want to join?
          </label>
          <textarea
            id="reason"
            defaultValue={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter a brief reason for joining"
            rows="3"
            className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
          <span className="text-xs block py-3 text-gray-500">
            Are you here for recruiting, to promote your product, or to get
            Upwork connections? If so please{" "}
            <a href="#" className="border-b-2">
              read our rules reguarding commercial activity
            </a>
            .
          </span>
        </div>
      </div>

      <input
        type="text"
        name="sneakypizza"
        defaultValue
        style={{ display: "none" }}
        tabIndex="-1"
        autoComplete="off"
      />
      <div className="form-footer">
        <button
          type="submit"
          className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Request invite
        </button>
        <div className="text-xs py-3 text-blue-400">
          By joining, you agree to our Rules and Code of Conduct.
        </div>
      </div>
      <div className="text-sm text-gray-800">
        {formMessage}
      </div>
    </form>
  );
};

export default InviteForm;

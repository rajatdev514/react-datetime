import React, { useState, useEffect } from "react";
// useState: Hook for managing local state (date, time, error).
// useEffect: Hook for side effects — here, it's used to fetch and update the time.
import "./TimeDisplay.css";

const TimeDisplay = () => {
  const [date, setDate] = useState(""); //state variables
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  // Function to fetch current time using timeapi.io
  const fetchTime = async () => {
    try {
      const response = await fetch(
        //Makes a GET request to timeapi.io for the current time in Asia/Kolkata.
        "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Debug:Parses the response JSON and logs it for debugging.
      console.log("API Response:", data);

      // Constructs a JavaScript Date object from individual components.
      const dateTime = new Date(
        data.year,
        data.month - 1, // Month is 0-indexed in JS Date
        data.day,
        data.hour,
        data.minute,
        data.seconds,
        data.milliSeconds
      );

      setDate(dateTime.toDateString());
      setTime(dateTime.toLocaleTimeString()); //formats the time like "4:51:25 PM" (based on browser)
    } catch (err) {
      setError("Failed to fetch time. Please try again later.");
      console.error("Error fetching time:", err);
    }
  };

  useEffect(() => {
    fetchTime(); // Initial fetch

    const interval = setInterval(() => {
      fetchTime(); // Fetch every second
    }, 1000);

    return () => clearInterval(interval); // Clean up interval
  }, []);

  return (
    <div className="time-container">
      <h1>🕒 Current Date & Time</h1>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <h2>Date: {date}</h2>
          <h2>Time: {time}</h2>
        </>
      )}
    </div>
  );
};

export default TimeDisplay;

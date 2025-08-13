import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/navbar";

// --- EventCard Component + Props ---
interface EventCardProps {
  id: string;
  eventNumber: string;
  title: string;
  description?: string;
  imageUrl?: string;
  isComingSoon?: boolean;
  registerLink?: string;
  active?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  imageUrl,
  isComingSoon = false,
  active = false,
}) => {
  return (
    <div
      className={`transition-all duration-500 rounded-2xl  flex flex-col p-10 items-center text-center w-[374px] h-[406.16px]  bg-white/5 backdrop-blur-md border border-white/10 ${
        active ? "scale-105 z-10 shadow-lg" : "opacity-30"
      }`}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="rounded-xl mb-4 w-[196px] h-[225.12px] object-cover"
        />
      )}
      <div className="flex gap-5">
        <h3 className="text-white font-bold text-xl">{title}</h3>{" "}
        <button className="text-purple-400 hover:text-purple-300 transition">
          {" "}
          <img src="./arrow.svg" alt="" />
        </button>
      </div>
      {!isComingSoon && (
        <p className="text-sm text-gray-400 mt-2">{description}</p>
      )}
      {isComingSoon && (
        <p className="text-purple-300 mt-2 font-medium">Stay Tuned...</p>
      )}
    </div>
  );
};

// --- Events Page ---
const Events: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const events: EventCardProps[] = [
    {
      id: "event-1",
      eventNumber: "EVENT 01",
      title: "Saddle Up",
      description:
        "A skill-building event series to gear you up for opportunities.",
      imageUrl: "./saddle up.png",
    },
    {
      id: "event-2",
      eventNumber: "EVENT 02",
      description: "A flash UI/UX hackathon where creativity meets speedy",
      title: "Enter the Flow",
      imageUrl: "./enter the flow.png",
    },
    {
      id: "event-3",
      eventNumber: "EVENT 03",
      title: "Stay Tuned...",
      isComingSoon: true,
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen py-24 px-4 bg-[#0d0b1a] ">
        <h2 className="text-white text-4xl font-bold text-center mb-6">
          Events
        </h2>
        <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">
          From creative challenges to impactful experiences, our events are
          designed to inspire, push boundaries, and open doors to
          new opportunities.
        </p>

        <div className="relative flex items-center justify-center gap-6 ">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-4 z-20 p-2 hover:bg-white/10 rounded-full"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Event Cards */}
          <div className="flex gap-6 overflow-x-auto overflow-y-hidden px-6 snap-x snap-mandatory justify-center">
            {events.map((event, index) => (
              <EventCard
                key={event.id}
                {...event}
                active={index === activeIndex}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-4 z-20 p-2 hover:bg-white/10 rounded-full"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
};

export default Events;

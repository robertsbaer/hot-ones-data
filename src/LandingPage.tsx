import React from 'react';
import { Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl font-bold mb-4 text-red-500 flex items-center justify-center gap-4">
          <Flame size={60} /> Hot Ones Data <Flame size={60} />
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          An interactive exploration of the show with the hottest questions and even hotter wings. Dive into the ultimate spicy food challenge and see which celebrities can handle the heat.
        </p>

        <div className="text-left space-y-8 mb-12">
          <div>
            <h2 className="text-3xl font-semibold mb-2 text-orange-400">The Show: A First We Feast Production</h2>
            <p className="text-gray-400">
              Hot Ones, the hit YouTube show created by Christopher Schonberger and produced by First We Feast, has redefined the celebrity interview. The format is a spicy food challenge where host Sean Evans asks in-depth questions to guests as they eat progressively spicier chicken wings. It's the ultimate test of endurance and composure.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-2 text-orange-400">The Host: Sean Evans</h2>
            <p className="text-gray-400">
              Known for his meticulous research and calm demeanor, Sean Evans has been hailed as one of the most skilled interviewers. He masterfully guides celebrity guests like Gordon Ramsay, Shaq, and Billie Eilish through the spicy gauntlet, creating some of the most memorable moments on YouTube.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-2 text-orange-400">The Legendary Hot Sauces</h2>
            <p className="text-gray-400">
              Each season introduces a new lineup of ten hot sauces, from the mild and flavorful to the notoriously intense, measured in Scoville Heat Units (SHU). This data visualization tracks the heat trends, sauce ingredients, and Scoville ratings across every season of the spicy food challenge.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-2 text-orange-400">The Celebrity Guests</h2>
            <p className="text-gray-400">
              From A-list actors and world-renowned chefs to iconic musicians, Hot Ones has hosted a diverse roster of celebrity guests. Explore data on how stars like Paul Rudd, Charlize Theron, and Key & Peele handled the wings of death, and track their multiple appearances on the show.
            </p>
          </div>
        </div>

        <Link
          to="/data"
          className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-2xl hover:bg-red-700 transition-transform transform hover:scale-105 inline-block"
        >
          Enter the Heat
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
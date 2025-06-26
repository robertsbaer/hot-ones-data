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
          An interactive exploration of the show with the hottest questions and even hotter wings.
        </p>

        <div className="text-left space-y-8 mb-12">
          <div>
            <h2 className="text-3xl font-semibold mb-2 text-orange-400">The Show</h2>
            <p className="text-gray-400">
              Hot Ones, created by Christopher Schonberger and produced by First We Feast, is the internet's most popular interview show. The premise is simple: host Sean Evans interviews celebrities while they both eat a series of progressively spicier chicken wings.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-2 text-orange-400">The Host: Sean Evans</h2>
            <p className="text-gray-400">
              Known for his in-depth research and disarming interview style, Sean Evans has been praised as one of the best interviewers of his generation. He guides guests through the gauntlet of heat, extracting candid and often hilarious responses.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-2 text-orange-400">The Hot Sauces</h2>
            <p className="text-gray-400">
              Each season features a new lineup of ten hot sauces, starting mild and escalating to scorching levels of Scoville Heat Units (SHU). This data visualization tracks the heat trends across every season.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-2 text-orange-400">The Guests</h2>
            <p className="text-gray-400">
              From A-list actors to world-renowned chefs and musicians, Hot Ones has hosted a diverse range of guests. See how they fared against the wings of death and explore their multiple appearances on the show.
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
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Brain, MessageCircle, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const heroElements = heroRef.current.children;
    const featureElements = featuresRef.current.children;

    gsap.fromTo(
      heroElements,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.3, duration: 1, ease: 'power1.inOut' }
    );

    gsap.fromTo(
      featureElements,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, stagger: 0.2, duration: 0.8, ease: 'back.out(1.7)' }
    );
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-950 text-white' : 'bg-gradient-to-br from-indigo-50 to-white'}`}>
      <nav className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Brain className={`${darkMode ? 'text-white' : 'text-indigo-600'}`} size={32} />
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-indigo-800'}`}>Sage</h1>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full hover:bg-gray-600 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} transition-all`}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </nav>

      <main className="flex-grow container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div ref={heroRef} className="space-y-6">
          <h2 className={`text-5xl font-extrabold leading-tight ${darkMode ? 'text-white' : 'text-indigo-900'}`}>
            Your Compassionate AI Companion
          </h2>
          <p className={`text-xl font-light ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Sage provides empathetic, confidential support whenever you need it.
          </p>
          <Link
            to="/chatbot"
            className={`inline-flex items-center px-6 py-3 rounded-full transition-all duration-500 ease-in-out transform hover:scale-105 group ${
              darkMode ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <MessageCircle className="mr-2 group-hover:animate-pulse" />
            Talk to Sage
          </Link>
        </div>

        <div ref={featuresRef} className="grid md:grid-cols-2 gap-6">
          <div
            className={`p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all ${
              darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'
            }`}
          >
            <HeartPulse className={`mx-auto ${darkMode ? 'text-indigo-400' : 'text-indigo-500'} mb-4`} size={48} />
            <h3 className="font-bold text-lg">Emotional Support</h3>
            <p className="font-light">Always available, judgment-free listening</p>
          </div>
          <div
            className={`p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all ${
              darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'
            }`}
          >
            <Brain className={`mx-auto ${darkMode ? 'text-indigo-400' : 'text-indigo-500'} mb-4`} size={48} />
            <h3 className="font-bold text-lg">Mental Wellness</h3>
            <p className="font-light">Personalized strategies for well-being</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

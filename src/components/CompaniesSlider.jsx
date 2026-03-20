import React from 'react';

const companies = [
  "2968109_th1.jpg",
  "3210212_th1.jpg",
  "3472433_th1.jpg",
  "3661900_th1.jpg",
  "3720193_th1.jpg",
  "3762729_th1.jpg",
  "3857827_th1.jpg",
  "5617338_97ad9935ef937ecf7ba4118f2e64937d2d147ed7_th1.jpg",
  "5826744_08bcaecbd594ab200d08568adcb109f6be6c9714_th1.jpg",
  "6264662_27d62235708da4fa3730609d1d17ed6a29be4c72_th1.jpg",
  "6342699_97de0479d7f608dc75c8921a03271991060db2dc_th1.jpg",
  "6362068_f31cb934c0c970e2060fb82c03f4f3f859b51d0c_th1.jpg",
  "6365078_840ca0f58cd1fbd269f72bc88f5dedfd6fc568d0_th1.jpg",
  "6577898_35ec41a45b16cdbd6b7faee95017249e798cd8c9_th1.jpg"
];

// Split the array into two rows for the slider
const row1 = companies.slice(0, 8);
const row2 = companies.slice(8);

const CompaniesSlider = () => {
  return (
    <div className="py-20 relative w-full overflow-hidden bg-gradient-to-b from-transparent via-[#1a0b2e]/60 to-transparent">
      {/* Background glow for galaxy theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center relative z-10">
        <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400 uppercase tracking-[0.25em]">
          Trusted by Top Companies
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400 mx-auto mt-6 rounded-full opacity-60"></div>
      </div>

      {/* Slider Container */}
      <div className="relative flex flex-col gap-10 overflow-hidden">
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none"></div>

        {/* Row 1: Scrolling Left */}
        <div className="flex w-max animate-marquee">
          {/* We map twice to create the infinite effect */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 sm:gap-24 px-8 sm:px-12 items-center shrink-0">
              {row1.map((logo, idx) => (
                <div key={idx} className="grayscale-[0.8] hover:grayscale-0 transition duration-500 opacity-60 hover:opacity-100 flex items-center justify-center h-28 w-48 shrink-0 relative group">
                  <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                  <img src={`/images/companies/${logo}`} alt={`Company Logo ${idx}`} className="max-h-20 max-w-full object-contain mix-blend-screen bg-transparent rounded relative z-10" />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex w-max animate-marquee-reverse">
          {/* We map twice to create the infinite effect */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 sm:gap-24 px-8 sm:px-12 items-center shrink-0">
              {row2.map((logo, idx) => (
                <div key={idx} className="grayscale-[0.8] hover:grayscale-0 transition duration-500 opacity-60 hover:opacity-100 flex items-center justify-center h-28 w-48 shrink-0 relative group">
                  <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                  <img src={`/images/companies/${logo}`} alt={`Company Logo Row2 ${idx}`} className="max-h-20 max-w-full object-contain mix-blend-screen bg-transparent rounded relative z-10" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
        .animate-marquee:hover, .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
};

export default CompaniesSlider;

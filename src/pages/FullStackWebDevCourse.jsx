import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Terminal, Lock, Layout, Clock, Code2, AlertTriangle, ChevronRight, ShoppingCart } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Footer } from '../components/ui/footer-section';
import StudentRegistrationModal from '../components/StudentRegistrationModal';

const syllabusData = [
  { day: "01", topic: "HTML5 Basics", build: "Personal profile page: name, photo, bio, links", tools: "Cursor", highlight: false },
  { day: "02", topic: "CSS Basics", build: "Style Day 1: colours, fonts, spacing, box model", tools: "Copilot", highlight: false },
  { day: "03", topic: "CSS Flexbox", build: "3-column features section — stacks on mobile", tools: "Claude AI", highlight: false },
  { day: "04", topic: "CSS Grid", build: "Photo gallery grid — 3 cols desktop, 1 mobile", tools: "v0 generates", highlight: false },
  { day: "05", topic: "Responsive Design", build: "Days 1–4 working on mobile + tablet + desktop", tools: "Claude AI", highlight: false },
  { day: "06", topic: "JS: Variables & Functions", build: "Tip calculator: bill + % → tip + total", tools: "Copilot", highlight: false },
  { day: "07", topic: "JS: DOM Manipulation", build: "Live character counter for a textarea", tools: "Cursor + Copilot", highlight: false },
  { day: "08", topic: "JS: Fetch API", build: "Fetch a random joke from public API + display", tools: "Claude AI", highlight: false },
  { day: "09", topic: "JS: Forms + Validation", build: "Form: name, email, message — inline errors", tools: "Copilot", highlight: false },
  { day: "10", topic: "React: Setup + Component", build: "Convert Day 1 profile page to React component", tools: "Cursor", highlight: false },
  { day: "11", topic: "React: Props & State", build: "Counter with + and - buttons using useState", tools: "Copilot", highlight: false },
  { day: "12", topic: "React: useEffect", build: "Fetch joke from Day 8 inside useEffect", tools: "Claude AI", highlight: false },
  { day: "13", topic: "React: Lists", build: "Render a list of 5 products from an array", tools: "Copilot", highlight: false },
  { day: "14", topic: "React: React Router", build: "3 pages (Home, About, Contact) + nav links", tools: "Windsurf", highlight: false },
  { day: "15", topic: "MINI PROJECT", build: "React portfolio — 3 pages — deployed to Vercel", tools: "All tools", highlight: true },
  { day: "16", topic: "Node.js Basics", build: "Script reads .txt file and counts words", tools: "Claude AI", highlight: false },
  { day: "17", topic: "Express.js Server", build: "GET / returns Hello, GET /time returns time", tools: "Cursor", highlight: false },
  { day: "18", topic: "REST API: GET", build: "GET /products returns hardcoded JSON list", tools: "Copilot", highlight: false },
  { day: "19", topic: "REST API: POST", build: "POST /products adds item to in-memory list", tools: "Claude AI", highlight: false },
  { day: "20", topic: "REST API: PUT + DELETE", build: "Complete CRUD: update + delete by ID", tools: "Copilot", highlight: false },
  { day: "21", topic: "PostgreSQL Setup", build: "Install Postgres. Create DB and products table", tools: "Claude AI", highlight: false },
  { day: "22", topic: "SQL Queries", build: "SELECT, INSERT, UPDATE, DELETE queries", tools: "Copilot", highlight: false },
  { day: "23", topic: "Connect API to Database", build: "Replace in-memory list with real PG queries", tools: "Cursor + Claude AI", highlight: false },
  { day: "24", topic: "Input Validation", build: "Validate name + price present and correct type", tools: "Claude AI", highlight: false },
  { day: "25", topic: "Error Handling", build: "Global error handler — no raw errors exposed", tools: "Claude AI", highlight: false },
  { day: "26", topic: "JWT Authentication", build: "Register + login routes returning a JWT token", tools: "Windsurf", highlight: false },
  { day: "27", topic: "Protected Routes", build: "Middleware checks JWT on every create request", tools: "Copilot", highlight: false },
  { day: "28", topic: "Password Hashing", build: "bcrypt hash on registration — no plain text", tools: "Claude AI", highlight: false },
  { day: "29", topic: "CORS + Security Headers", build: "Add CORS, Helmet, rate limiting in 3 lines", tools: "Cursor", highlight: false },
  { day: "30", topic: "MINI PROJECT", build: "Full products API with auth deployed on Railway", tools: "All tools", highlight: true },
  { day: "31", topic: "Axios in React", build: "Connect React app to Railway API using Axios", tools: "Claude AI", highlight: false },
  { day: "32", topic: "Login Page in React", build: "Login form -> POST /login -> store JWT", tools: "Copilot", highlight: false },
  { day: "33", topic: "Protected Frontend Routes", build: "Redirect to login if no JWT in storage", tools: "Claude AI", highlight: false },
  { day: "34", topic: "Display API Data", build: "Show products list fetched from live API", tools: "Cursor", highlight: false },
  { day: "35", topic: "Add + Delete in React", build: "Create product form. Delete button per row", tools: "v0 UI", highlight: false },
  { day: "36", topic: "Loading + Error States", build: "Spinner while loading. Error message on fail", tools: "Copilot", highlight: false },
  { day: "37", topic: "React Query", build: "Replace manual fetch with React Query caching", tools: "Windsurf", highlight: false },
  { day: "38", topic: "Backend Tests", build: "3 API tests with Jest + Supertest", tools: "Windsurf", highlight: false },
  { day: "39", topic: "Vercel Deployment", build: "Deploy React frontend to Vercel with prod URL", tools: "Claude AI", highlight: false },
  { day: "40", topic: "Railway Confirmation", build: "Confirm backend + database live on Railway", tools: "Claude AI", highlight: false },
  { day: "41", topic: "Capstone Planning", build: "Data model, routes, React components plan", tools: "Claude AI", highlight: false },
  { day: "42", topic: "Capstone: Backend", build: "API for capstone: 3 resources, CRUD, auth", tools: "Cursor + Windsurf", highlight: false },
  { day: "43", topic: "Capstone: Frontend", build: "React UI for capstone connected to live API", tools: "v0 + Cursor", highlight: false },
  { day: "44", topic: "Capstone: Deploy + Polish", build: "Deploy both ends. Fix all issues. Test flows.", tools: "Claude AI", highlight: false },
  { day: "45", topic: "DEMO + CERTIFICATE", build: "2-min demo. Present to instructor. Certificate", tools: "All tools", highlight: true },
];

export default function FullStackWebDevCourse() {
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] = useState(false);

  return (
    <div className="bg-black min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative z-20 py-16 lg:py-24 overflow-hidden border-b border-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent blur-3xl -z-10" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 text-sm font-medium text-gray-400 mb-4 tracking-widest uppercase">
              <span>Courses</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-purple-400">Development</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              <span className="text-purple-500 mr-4">C-03</span><span className="hidden sm:inline">—</span> Full Stack Web Development
            </h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8">
              <Card className="bg-white/5 border border-purple-500/20 backdrop-blur-md p-5 flex flex-col gap-2">
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Price</div>
                <div className="text-2xl font-bold text-white">Rs. 19,499</div>
              </Card>
              <Card className="bg-white/5 border border-purple-500/20 backdrop-blur-md p-5 flex flex-col gap-2">
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Duration</div>
                <div className="text-xl font-bold text-white">45 days<br/><span className="text-base text-gray-300 font-normal">1 hour per day</span></div>
              </Card>
              <Card className="bg-white/5 border border-purple-500/20 backdrop-blur-md p-5 flex flex-col gap-2 lg:col-span-2">
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Stack</div>
                <div className="text-lg font-medium text-white leading-snug">HTML + CSS + JavaScript + React + Node.js + PostgreSQL</div>
              </Card>
              <Card className="bg-white/5 border border-purple-500/20 backdrop-blur-md p-5 flex flex-col gap-2 lg:col-span-4">
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">AI Tools Used</div>
                <div className="text-lg font-medium text-purple-300">Cursor, GitHub Copilot, v0 by Vercel, Claude AI, Windsurf, Bolt.new, Google Stitch</div>
              </Card>
            </div>
            
            <div className="pt-2">
              <Button 
                onClick={() => setIsRegistrationDialogOpen(true)}
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-6 h-auto text-lg w-full sm:w-auto shadow-lg shadow-purple-500/20 group"
              >
                <ShoppingCart className="w-5 h-5 mr-2 group-hover:-rotate-12 transition-transform" />
                Buy Now — Rs. 19,499
              </Button>
            </div>
            
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl space-y-12">
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-purple-500 font-bold uppercase tracking-widest text-sm">Who This Is For</h2>
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              The most AI-tool-rich course in the curriculum. v0 by Vercel generates React components from text descriptions. Google Stitch designs your screens before you write a line of code. Windsurf scaffolds multi-file backend features. By Day 45 you have a live full-stack application deployed on Vercel and Railway that anyone in the world can visit.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Syllabus Table Section */}
      <section className="py-16 pb-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-purple-500 font-bold uppercase tracking-widest text-sm mb-8 text-center md:text-left">
              45-Day Day-By-Day Overview
            </h2>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-white text-sm">
                    <th className="py-4 px-6 font-bold w-20">DAY</th>
                    <th className="py-4 px-6 font-bold w-1/4">TOPIC</th>
                    <th className="py-4 px-6 font-bold">WHAT YOU BUILD</th>
                    <th className="py-4 px-6 font-bold w-40">AI TOOL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300 text-sm md:text-base">
                  {syllabusData.map((item, idx) => (
                    <tr 
                      key={idx} 
                      className={`hover:bg-white/5 transition-colors ${item.highlight ? 'bg-purple-500/10' : ''}`}
                    >
                      <td className={`py-4 px-6 font-mono ${item.highlight ? 'text-purple-400 font-bold' : 'text-gray-500'}`}>
                        {item.day}
                      </td>
                      <td className={`py-4 px-6 ${item.highlight ? 'text-purple-400 font-bold' : 'text-gray-200 font-medium'}`}>
                        {item.topic}
                      </td>
                      <td className="py-4 px-6">
                        {item.build}
                      </td>
                      <td className={`py-4 px-6 ${item.highlight ? 'text-purple-400 font-bold' : 'text-purple-300 font-medium'}`}>
                        {item.tools}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center mt-6 text-gray-500 text-sm font-medium">
              <span>1 Hour a Day. 45 Days. Job-Ready.</span>
              <span className="hidden sm:inline">1 Hour a Day. 45 Days. Job-Ready.</span>
            </div>

          </motion.div>
        </div>
      </section>

      {/* What You Can Do After Section */}
      <section className="py-16 pb-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-purple-500/20 backdrop-blur-md p-8 md:p-12 rounded-2xl"
          >
            <h2 className="text-purple-500 font-bold uppercase tracking-widest text-sm mb-8">What You Can Do After This Course</h2>
            <ul className="space-y-4 text-xl text-gray-300 font-light list-disc pl-6 marker:text-purple-500">
              <li>Build complete React frontends from scratch</li>
              <li>Design and build REST APIs with Node.js and Express</li>
              <li>Create and query PostgreSQL databases</li>
              <li>Handle user authentication end-to-end with JWT and bcrypt</li>
              <li>Deploy full-stack applications to production</li>
              <li>Work with AI tools to build features significantly faster</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      <StudentRegistrationModal 
        isOpen={isRegistrationDialogOpen} 
        onClose={() => setIsRegistrationDialogOpen(false)} 
        courseName="Full Stack Web Development"
        coursePrice={19499}
      />
    </div>
  );
}

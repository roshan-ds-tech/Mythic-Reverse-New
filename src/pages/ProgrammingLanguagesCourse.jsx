import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Terminal, Code2, Layers, Cpu, Database, ChevronRight, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Footer } from '../components/ui/footer-section';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import StudentRegistrationModal from '../components/StudentRegistrationModal';

const syllabusData = [
  { day: "01", topic: "Variables & Data Types", build: "Store and print 5 different types of data", tools: "Cursor", highlight: false },
  { day: "02", topic: "Operators & Expressions", build: "CLI calculator: + - x ÷", tools: "Copilot", highlight: false },
  { day: "03", topic: "If / Else Conditions", build: "Positive / negative / zero checker", tools: "Claude AI", highlight: false },
  { day: "04", topic: "For & While Loops", build: "FizzBuzz 1 to 30", tools: "Copilot", highlight: false },
  { day: "05", topic: "Functions", build: "Refactor calculator into separate functions", tools: "Cursor Cmd+K", highlight: false },
  { day: "06", topic: "Strings", build: "Word count, reverse, palindrome checker", tools: "Copilot", highlight: false },
  { day: "07", topic: "Arrays / Lists", build: "Sort 5 student names A to Z", tools: "Claude AI", highlight: false },
  { day: "08", topic: "Dictionaries / Maps", build: "Word frequency counter", tools: "Copilot", highlight: false },
  { day: "09", topic: "Nested Data Structures", build: "Contact list: name + phone + email", tools: "Cursor", highlight: false },
  { day: "10", topic: "Error Handling", build: "Divide-by-zero safe calculator", tools: "Claude AI", highlight: false },
  { day: "11", topic: "File Reading", build: "Count lines and words in a .txt file", tools: "Copilot", highlight: false },
  { day: "12", topic: "File Writing", build: "Write word count result to a .txt file", tools: "Cursor", highlight: false },
  { day: "13", topic: "JSON Files", build: "Save and load data as JSON", tools: "Claude AI", highlight: false },
  { day: "14", topic: "Mini Project Planning", build: "Plan CLI To-Do App with Claude AI", tools: "Claude AI", highlight: false },
  { day: "15", topic: "MINI PROJECT", build: "CLI To-Do App with JSON persistence", tools: "All tools", highlight: true },
  { day: "16", topic: "Classes & Objects", build: "BankAccount class: deposit + withdraw", tools: "Cursor", highlight: false },
  { day: "17", topic: "Inheritance", build: "SavingsAccount extends BankAccount", tools: "Copilot", highlight: false },
  { day: "18", topic: "Encapsulation", build: "Private balance + getters/setters", tools: "Claude AI", highlight: false },
  { day: "19", topic: "Interfaces / Abstract Classes", build: "Shape interface: area() + perimeter()", tools: "Cursor", highlight: false },
  { day: "20", topic: "Polymorphism", build: "Circle, Rectangle, Triangle shapes", tools: "Copilot", highlight: false },
  { day: "21", topic: "Modules / Packages", build: "Split Shape code across multiple files", tools: "Claude AI", highlight: false },
  { day: "22", topic: "HTTP GET Request", build: "Fetch live weather from a public API", tools: "Cursor + Claude AI", highlight: false },
  { day: "23", topic: "Parse JSON Response", build: "Extract city, temperature, condition", tools: "Copilot", highlight: false },
  { day: "24", topic: "HTTP POST Request", build: "POST data to jsonplaceholder.typicode.com", tools: "Cursor", highlight: false },
  { day: "25", topic: "Environment Variables", build: "Move API key to .env file", tools: "Claude AI", highlight: false },
  { day: "26", topic: "Async / Await", build: "Rewrite API call with async/await", tools: "Copilot", highlight: false },
  { day: "27", topic: "API Error Handling", build: "Handle network errors + bad responses", tools: "Claude AI", highlight: false },
  { day: "28", topic: "Sorting Algorithms", build: "Bubble Sort + built-in sort comparison", tools: "Claude AI", highlight: false },
  { day: "29", topic: "Binary Search", build: "Binary Search on a sorted list", tools: "Copilot", highlight: false },
  { day: "30", topic: "MINI PROJECT", build: "CLI Weather App: city name → live temperature", tools: "All tools", highlight: true },
  { day: "31", topic: "Advanced Feature 1", build: "Language-specific: decorators / generics / closures", tools: "Claude AI", highlight: false },
  { day: "32", topic: "Advanced Feature 2", build: "Language-specific: type hints / goroutines / ownership", tools: "Claude AI", highlight: false },
  { day: "33", topic: "Unit Testing", build: "5 unit tests for the Weather App", tools: "Windsurf", highlight: false },
  { day: "34", topic: "Fix Failing Tests", build: "Run tests → find failures → fix code", tools: "Claude AI", highlight: false },
  { day: "35", topic: "Code Quality", build: "Linter + Claude AI top-3 suggestions", tools: "Claude AI", highlight: false },
  { day: "36", topic: "Capstone Planning", build: "Define project: inputs, outputs, data structures", tools: "Claude AI", highlight: false },
  { day: "37", topic: "Capstone: Data Layer", build: "Build models and storage structure", tools: "Cursor", highlight: false },
  { day: "38", topic: "Capstone: Core Logic", build: "Main feature — the thing it actually does", tools: "Cursor + Copilot", highlight: false },
  { day: "39", topic: "Capstone: User Input", build: "Menus, validation, clear prompts", tools: "Copilot", highlight: false },
  { day: "40", topic: "Capstone: Error Handling", build: "Nothing should crash on bad input", tools: "Claude AI", highlight: false },
  { day: "41", topic: "Capstone: Testing", build: "Tests for 3 most important functions", tools: "Windsurf", highlight: false },
  { day: "42", topic: "Capstone: README", build: "What it does, install steps, how to run", tools: "Claude AI", highlight: false },
  { day: "43", topic: "Capstone: Polish", build: "Fix TODOs, edge cases, output formatting", tools: "Claude AI", highlight: false },
  { day: "44", topic: "Capstone: Final Review", build: "Full code review — fix top 3 issues", tools: "Claude AI", highlight: false },
  { day: "45", topic: "DEMO + CERTIFICATE", build: "2-min video · Push final code · Certificate", tools: "All tools", highlight: true },
];

const advancedTopics = [
  { lang: "Python", topics: "Decorators, context managers, type hints, dataclasses" },
  { lang: "JavaScript / TypeScript", topics: "Closures, prototype chain, generics, decorators" },
  { lang: "Java / Kotlin", topics: "Streams, lambdas, coroutines, sealed classes" },
  { lang: "Go", topics: "Goroutines, channels, interfaces, error philosophy" },
  { lang: "Rust", topics: "Ownership, borrowing, lifetimes, smart pointers" },
  { lang: "Swift", topics: "Protocols, extensions, Combine framework" },
  { lang: "C / C++", topics: "Pointers, memory management, RAII, templates" },
  { lang: "C#", topics: "LINQ, delegates, events, async/await patterns" },
  { lang: "PHP", topics: "Traits, namespaces, Composer, PSR standards" },
  { lang: "Dart", topics: "Null safety deep dive, mixins, isolates" },
];

export default function ProgrammingLanguagesCourse() {
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] = useState(false);

  const languages = ["Python", "JavaScript", "Java", "C", "C++", "Dart"];

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
              <span className="text-purple-500 mr-4">C-01</span><span className="hidden sm:inline">—</span> Programming Languages
            </h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8">
              <Card className="bg-white/5 border border-purple-500/20 backdrop-blur-md p-5 flex flex-col gap-2">
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Price</div>
                <div className="text-2xl font-bold text-white">Rs. 8,499<br /><span className="text-base text-gray-300 font-normal">per language</span></div>
              </Card>
              <Card className="bg-white/5 border border-purple-500/20 backdrop-blur-md p-5 flex flex-col gap-2">
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Duration</div>
                <div className="text-xl font-bold text-white">45 days<br /><span className="text-base text-gray-300 font-normal">1 hour per day</span></div>
              </Card>
              <Card className="bg-white/5 border border-purple-500/20 backdrop-blur-md p-5 flex flex-col gap-2 lg:col-span-2">
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Stack</div>
                <div className="text-lg font-medium text-white leading-snug">Choose from 13 languages</div>
              </Card>
              <Card className="bg-white/5 border border-purple-500/20 backdrop-blur-md p-5 flex flex-col gap-2 lg:col-span-4">
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">AI Tools Used</div>
                <div className="text-lg font-medium text-purple-300">Cursor, GitHub Copilot, Claude AI, ChatGPT, Windsurf</div>
              </Card>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => setIsEnrollDialogOpen(true)}
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-6 h-auto text-lg w-full sm:w-auto shadow-lg shadow-purple-500/20 group"
              >
                <ShoppingCart className="w-5 h-5 mr-2 group-hover:-rotate-12 transition-transform" />
                Buy Now — Rs. 8,499
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
              Learn any of 13 programming languages — Python, C, C++, Java, JavaScript, TypeScript, PHP, Dart, Kotlin, Swift, Go, Rust, C# — using AI as your co-pilot from Day 1. The same 45-day structure applies to every language. Concepts like data structures, OOP, and APIs are universal. Cursor and Copilot handle syntax differences while you focus on logic and problem-solving.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Syllabus Table Section */}
      <section className="py-16 pb-16">
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

      {/* Advanced Topics by Language Section */}
      <section className="py-8 pb-16 relative z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-purple-500 font-bold uppercase tracking-widest text-sm mb-8 text-center md:text-left">
              Advanced Topics By Language (Days 31–32)
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {advancedTopics.map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-purple-500/10 p-4 rounded-xl flex items-start space-x-4">
                  <div className="mt-1">
                    <Code2 className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{item.lang}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.topics}</p>
                  </div>
                </div>
              ))}
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
            <ul className="space-y-4 text-xl text-gray-300 font-light pl-2">
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-purple-500 mr-3 shrink-0 mt-0.5" />
                <span>Write clean object-oriented code in your chosen language</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-purple-500 mr-3 shrink-0 mt-0.5" />
                <span>Build command-line tools that solve real problems</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-purple-500 mr-3 shrink-0 mt-0.5" />
                <span>Consume and parse live REST APIs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-purple-500 mr-3 shrink-0 mt-0.5" />
                <span>Write unit tests for your own functions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-purple-500 mr-3 shrink-0 mt-0.5" />
                <span>Work comfortably with AI tools every single day</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Language Selection Dialog */}
      <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>Select Your Language</DialogTitle>
            <DialogDescription>
              Choose one programming language to focus on for the 45-day course. You can only select one.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 px-6 pb-2">
            {languages.map((lang) => (
              <label
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${selectedLanguage === lang
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-white/10 bg-white/5 hover:border-purple-500/50'
                  }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedLanguage === lang ? 'border-purple-500 bg-purple-500' : 'border-gray-500'
                    }`}>
                    {selectedLanguage === lang && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-white font-medium">{lang}</span>
                </div>
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-3 px-6 pb-6 pt-2">
            <Button variant="outline" onClick={() => setIsEnrollDialogOpen(false)} className="border-white/20 text-white hover:bg-white/10">
              Cancel
            </Button>
            <Button
              disabled={!selectedLanguage}
              className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
              onClick={() => {
                setIsEnrollDialogOpen(false);
                setIsRegistrationDialogOpen(true);
              }}
            >
              Continue to Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <StudentRegistrationModal
        isOpen={isRegistrationDialogOpen}
        onClose={() => setIsRegistrationDialogOpen(false)}
        courseName="Programming Languages"
        coursePrice={8499}
        selectedLanguage={selectedLanguage}
      />
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Terminal, Lock, Layout, Clock, Code2, AlertTriangle, ChevronRight, ShoppingCart } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Footer } from '../components/ui/footer-section';
import StudentRegistrationModal from '../components/StudentRegistrationModal';

const syllabusData = [
  { day: "01", topic: "Expo Setup", build: "Install Expo. App on phone via Expo Go.", tools: "Bolt.new scaffolds", highlight: false },
  { day: "02", topic: "View, Text, Image", build: "Profile card: avatar, name, bio, 2 stats", tools: "Google Stitch → code", highlight: false },
  { day: "03", topic: "StyleSheet", build: "Style card: colours, rounded corners, shadow", tools: "Copilot", highlight: false },
  { day: "04", topic: "Flexbox in RN", build: "2-column product grid with spacing", tools: "v0 → NativeWind", highlight: false },
  { day: "05", topic: "FlatList", build: "10 movies: title + year in scrollable list", tools: "Cursor", highlight: false },
  { day: "06", topic: "useState", build: "Counter with +, - and reset. Large text.", tools: "Copilot", highlight: false },
  { day: "07", topic: "Pressable + Interactions", build: "Colour-changing buttons. Toggle switch.", tools: "Claude AI", highlight: false },
  { day: "08", topic: "TextInput + Forms", build: "Login form: email, password, submit button", tools: "Copilot", highlight: false },
  { day: "09", topic: "Expo Router: Setup", build: "3 pages: index, about, profile", tools: "Windsurf", highlight: false },
  { day: "10", topic: "Tab Navigation", build: "Bottom tabs: Home, Search, Profile", tools: "Cursor + Claude AI", highlight: false },
  { day: "11", topic: "Stack Navigation", build: "List item → detail screen → back", tools: "Copilot", highlight: false },
  { day: "12", topic: "Zustand", build: "Counter in Zustand — shared across 2 tabs", tools: "Claude AI", highlight: false },
  { day: "13", topic: "Fetch API", build: "Fetch movies from public API into FlatList", tools: "Cursor", highlight: false },
  { day: "14", topic: "Loading + Error States", build: "Spinner while loading. Error on fail.", tools: "Copilot", highlight: false },
  { day: "15", topic: "MINI PROJECT", build: "Movie browser: search, detail, favourites", tools: "All tools", highlight: true },
  { day: "16", topic: "Supabase Setup", build: "Create project. Connect from Expo app.", tools: "Claude AI", highlight: false },
  { day: "17", topic: "Supabase Auth: Register", build: "Registration screen → creates Supabase user", tools: "Cursor", highlight: false },
  { day: "18", topic: "Supabase Auth: Login", build: "Login screen → store session → go to Home", tools: "Copilot", highlight: false },
  { day: "19", topic: "Auth Guard", build: "Redirect to login if no active session", tools: "Claude AI", highlight: false },
  { day: "20", topic: "Supabase: Read Data", build: "Fetch logged-in user's notes from DB", tools: "Windsurf", highlight: false },
  { day: "21", topic: "Supabase: Write Data", build: "Form to create note → insert to notes table", tools: "Cursor", highlight: false },
  { day: "22", topic: "Supabase: Delete Data", build: "Swipe to delete. Only own notes deleted.", tools: "Claude AI", highlight: false },
  { day: "23", topic: "Row Level Security", build: "RLS policy: users see only their own notes", tools: "Claude AI", highlight: false },
  { day: "24", topic: "Realtime Updates", build: "New notes appear without manual refresh", tools: "Cursor + Claude AI", highlight: false },
  { day: "25", topic: "Supabase Storage", build: "Upload profile photo. Show in Profile tab.", tools: "Windsurf", highlight: false },
  { day: "26", topic: "TanStack Query", build: "Replace raw fetch calls with useQuery", tools: "Claude AI", highlight: false },
  { day: "27", topic: "Offline Storage: MMKV", build: "Cache last notes in MMKV — works offline", tools: "Cursor", highlight: false },
  { day: "28", topic: "Push Notifications", build: "Request permission. Show local notification.", tools: "Claude AI", highlight: false },
  { day: "29", topic: "expo-image-picker", build: "Pick photo from gallery. Display in app.", tools: "Copilot", highlight: false },
  { day: "30", topic: "MINI PROJECT", build: "Notes app: Supabase auth + realtime + photos", tools: "All tools", highlight: true },
  { day: "31", topic: "expo-location", build: "GPS coordinates displayed on screen", tools: "Cursor", highlight: false },
  { day: "32", topic: "React Native Maps", build: "Map with pin at user's current location", tools: "Claude AI", highlight: false },
  { day: "33", topic: "Reanimated: Scale", build: "Button scales down on press — Reanimated", tools: "Copilot", highlight: false },
  { day: "34", topic: "Reanimated: Slide", build: "Card slides in from bottom on load", tools: "Claude AI", highlight: false },
  { day: "35", topic: "Gesture Handler", build: "Swipe list item → reveal delete button", tools: "Windsurf", highlight: false },
  { day: "36", topic: "expo-camera", build: "Open camera. Take photo. Show preview.", tools: "Cursor + Claude AI", highlight: false },
  { day: "37", topic: "NativeWind Deep Dive", build: "Restyle a screen entirely with Tailwind classes", tools: "v0 → NativeWind", highlight: false },
  { day: "38", topic: "Performance: React.memo", build: "Wrap list items. Measure FPS before + after.", tools: "Claude AI", highlight: false },
  { day: "39", topic: "EAS Build Setup", build: "eas.json configured. Preview APK built.", tools: "Claude AI", highlight: false },
  { day: "40", topic: "App Icon + Splash", build: "Design in Google Stitch. Apply with Expo.", tools: "Google Stitch", highlight: false },
  { day: "41", topic: "Capstone Planning", build: "Screens, Supabase schema, Expo Router map", tools: "Claude AI + Lovable", highlight: false },
  { day: "42", topic: "Capstone: Auth + Nav", build: "Auth flow + navigation + Supabase tables", tools: "Cursor + Windsurf", highlight: false },
  { day: "43", topic: "Capstone: Core Features", build: "Build the 2 main features of the app", tools: "Cursor + Copilot", highlight: false },
  { day: "44", topic: "Capstone: Polish + Build", build: "Match design. EAS Build. Test on device.", tools: "Claude AI", highlight: false },
  { day: "45", topic: "DEMO + CERTIFICATE", build: "2-min screen record. Share APK. Certificate", tools: "All tools", highlight: true },
];

export default function ReactNativeAppDevCourse() {
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
              <span className="text-purple-500 mr-4">C-05</span><span className="hidden sm:inline">—</span> App Development with React Native
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
                <div className="text-lg font-medium text-white leading-snug">React Native + Expo + Supabase + EAS Build</div>
              </Card>
              <Card className="bg-white/5 border border-purple-500/20 backdrop-blur-md p-5 flex flex-col gap-2 lg:col-span-4">
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">AI Tools Used</div>
                <div className="text-lg font-medium text-purple-300">Cursor, GitHub Copilot, v0, Claude AI, Windsurf, Bolt.new, Lovable, Google Stitch</div>
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
              JavaScript's path to mobile. Bolt.new scaffolds your full Expo project in 30 seconds. v0 generates UI components you adapt to React Native with NativeWind. Supabase gives you a full Postgres backend with authentication, storage, and real-time data — no separate server required. By Day 45 you have a working APK from a real EAS Build.
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
              <li>Build cross-platform mobile apps with React Native and Expo</li>
              <li>Set up a complete Supabase backend with auth and real-time data</li>
              <li>Manage global state with Zustand</li>
              <li>Add native features: camera, GPS, maps, and notifications</li>
              <li>Build and distribute apps via EAS Build</li>
              <li>Implement animations and gesture interactions with Reanimated</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      <StudentRegistrationModal 
        isOpen={isRegistrationDialogOpen} 
        onClose={() => setIsRegistrationDialogOpen(false)} 
        courseName="App Development with React Native" 
      />
    </div>
  );
}

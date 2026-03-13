import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Terminal, Lock, Layout, Clock, Code2, AlertTriangle, ChevronRight, ShoppingCart } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Footer } from '../components/ui/footer-section';
import StudentRegistrationModal from '../components/StudentRegistrationModal';

const syllabusData = [
  { day: "01", topic: "Flutter Setup", build: "Install Flutter + VS Code. Run counter app", tools: "Claude AI", highlight: false },
  { day: "02", topic: "Dart Basics", build: "10 Dart functions in DartPad", tools: "Copilot", highlight: false },
  { day: "03", topic: "Dart OOP", build: "Product class with name, price, discount()", tools: "Cursor", highlight: false },
  { day: "04", topic: "Stateless Widget", build: "Business card: name, job title, email, phone", tools: "Google Stitch → code", highlight: false },
  { day: "05", topic: "Stateful + setState", build: "Counter with +, - and reset buttons", tools: "Copilot", highlight: false },
  { day: "06", topic: "Column + Row Layout", build: "Profile: avatar, name, bio, 3 stats below", tools: "Google Stitch → code", highlight: false },
  { day: "07", topic: "Container + Styling", build: "Colours, rounded corners, shadows", tools: "Copilot", highlight: false },
  { day: "08", topic: "ListView.builder", build: "10 products: name + price in a scrollable list", tools: "Cursor", highlight: false },
  { day: "09", topic: "GridView.builder", build: "Same products in a 2-column grid", tools: "Claude AI", highlight: false },
  { day: "10", topic: "Navigation: Push + Pop", build: "Tap product → detail screen → back button", tools: "Copilot", highlight: false },
  { day: "11", topic: "Bottom Navigation Bar", build: "3 tabs: Home, Search, Profile", tools: "Windsurf", highlight: false },
  { day: "12", topic: "TextFormField + Forms", build: "Login form: email + password with validation", tools: "Claude AI", highlight: false },
  { day: "13", topic: "Themes", build: "Light + dark theme with toggle switch", tools: "Cursor + Claude AI", highlight: false },
  { day: "14", topic: "Images + Icons", build: "Product images from URL. Material icons.", tools: "Copilot", highlight: false },
  { day: "15", topic: "MINI PROJECT", build: "3-screen product app: grid, detail, profile tab", tools: "All tools", highlight: true },
  { day: "16", topic: "Provider State", build: "Counter shared between 2 screens via Provider", tools: "Claude AI", highlight: false },
  { day: "17", topic: "Riverpod Basics", build: "Rewrite Day 16 using Riverpod StateProvider", tools: "Cursor", highlight: false },
  { day: "18", topic: "HTTP with Dio", build: "Fetch products from fakestoreapi.com", tools: "Copilot", highlight: false },
  { day: "19", topic: "FutureBuilder", build: "Loading → data → error states", tools: "Claude AI", highlight: false },
  { day: "20", topic: "JSON Serialisation", build: "Product.fromJson() — parse API response", tools: "Windsurf", highlight: false },
  { day: "21", topic: "Search + Filter", build: "Search bar filtering product list real-time", tools: "Cursor + Riverpod", highlight: false },
  { day: "22", topic: "Firebase Setup", build: "Create Firebase project. Connect to Flutter app", tools: "Claude AI", highlight: false },
  { day: "23", topic: "Firebase Auth", build: "Email + password: register, login, logout", tools: "Cursor", highlight: false },
  { day: "24", topic: "Firestore: Read", build: "Read posts collection. Display in ListView", tools: "Claude AI", highlight: false },
  { day: "25", topic: "Firestore: Write", build: "Form to create new post → save to Firestore", tools: "Copilot", highlight: false },
  { day: "26", topic: "Firestore: Delete", build: "Swipe-to-delete on each post", tools: "Cursor + Claude AI", highlight: false },
  { day: "27", topic: "Firebase Storage", build: "Pick photo from gallery. Upload. Display.", tools: "Windsurf", highlight: false },
  { day: "28", topic: "Push Notifications", build: "Send a test notification to your own device", tools: "Claude AI", highlight: false },
  { day: "29", topic: "SharedPreferences", build: "Save theme preference — persists on restart", tools: "Copilot", highlight: false },
  { day: "30", topic: "MINI PROJECT", build: "Notes app with Firestore + login required", tools: "All tools", highlight: true },
  { day: "31", topic: "Image Picker", build: "Pick image from gallery. Show on screen.", tools: "Cursor + Copilot", highlight: false },
  { day: "32", topic: "Camera", build: "Take a photo with camera. Display preview.", tools: "Claude AI", highlight: false },
  { day: "33", topic: "Geolocation", build: "Get GPS coordinates. Show on screen.", tools: "Cursor", highlight: false },
  { day: "34", topic: "Google Maps", build: "Map with pin at current GPS location", tools: "Claude AI", highlight: false },
  { day: "35", topic: "Local Notifications", build: "Notification 5 seconds after button tap", tools: "Windsurf", highlight: false },
  { day: "36", topic: "AnimatedContainer", build: "Box animates size + colour on button tap", tools: "Copilot", highlight: false },
  { day: "37", topic: "Hero Animation", build: "Product image flies to detail screen + back", tools: "Claude AI", highlight: false },
  { day: "38", topic: "Widget Testing", build: "3 widget tests for product list screen", tools: "Windsurf", highlight: false },
  { day: "39", topic: "App Icon + Splash Screen", build: "Design in Google Stitch. Apply to app.", tools: "Google Stitch", highlight: false },
  { day: "40", topic: "Release APK Build", build: "Build signed APK. Install on Android phone.", tools: "Claude AI", highlight: false },
  { day: "41", topic: "Capstone Planning", build: "Screens, Firebase structure, feature list", tools: "Claude AI + Stitch", highlight: false },
  { day: "42", topic: "Capstone: Auth + Nav", build: "Login/register flow + main navigation shell", tools: "Cursor + Windsurf", highlight: false },
  { day: "43", topic: "Capstone: Core Features", build: "Build the 2 main features of the app", tools: "Cursor + Copilot", highlight: false },
  { day: "44", topic: "Capstone: Polish + Build", build: "Match design. Build release APK. Test.", tools: "Claude AI", highlight: false },
  { day: "45", topic: "DEMO + CERTIFICATE", build: "2-min screen record. Submit APK. Certificate", tools: "All tools", highlight: true },
];

export default function FlutterAppDevCourse() {
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
              <span className="text-purple-500 mr-4">C-04</span><span className="hidden sm:inline">—</span> App Development with Flutter
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
                <div className="text-lg font-medium text-white leading-snug">Dart + Flutter + Firebase — Android and iOS from one codebase</div>
              </Card>
              <Card className="bg-white/5 border border-purple-500/20 backdrop-blur-md p-5 flex flex-col gap-2 lg:col-span-4">
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">AI Tools Used</div>
                <div className="text-lg font-medium text-purple-300">Cursor, GitHub Copilot, Claude AI, Windsurf, Google Stitch, Lovable</div>
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
              Build Android, iOS, and web apps from a single codebase using Dart and Flutter. Google Stitch designs every screen before you write a single widget. Windsurf scaffolds entire multi-screen app structures. By Day 45 you have a signed APK installed on your phone and a project you can submit to Google Play.
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
              <li>Write clean Dart code using null safety</li>
              <li>Build multi-screen Flutter apps with proper navigation</li>
              <li>Manage application state with Riverpod</li>
              <li>Integrate Firebase authentication, Firestore, and Storage</li>
              <li>Access device features: camera, GPS, and notifications</li>
              <li>Build and sign a release APK for Android</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      <StudentRegistrationModal 
        isOpen={isRegistrationDialogOpen} 
        onClose={() => setIsRegistrationDialogOpen(false)} 
        courseName="App Development with Flutter" 
      />
    </div>
  );
}

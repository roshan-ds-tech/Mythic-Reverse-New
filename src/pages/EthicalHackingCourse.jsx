import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { ShieldAlert, Terminal, Lock, Layout, Clock, Code2, AlertTriangle, ChevronRight, ShoppingCart } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Footer } from '../components/ui/footer-section';
import StudentRegistrationModal from '../components/StudentRegistrationModal';

const syllabusData = [
  { day: "01", topic: "Kali Linux Setup", build: "Install VM. Run 10 terminal commands", tools: "Claude AI", highlight: false },
  { day: "02", topic: "Linux File System", build: "Navigate /etc /var /home. Read /etc/passwd", tools: "Claude AI", highlight: false },
  { day: "03", topic: "Bash Scripting 1", build: "Script: print IP, hostname, disk space", tools: "Cursor", highlight: false },
  { day: "04", topic: "Networking: TCP/IP", build: "OSI layers 1–7 + real attack at each layer", tools: "Claude AI", highlight: false },
  { day: "05", topic: "Networking: Ports", build: "Learn 20 key ports. ChatGPT quiz format", tools: "ChatGPT", highlight: false },
  { day: "06", topic: "Wireshark Basics", build: "Capture traffic. Find an HTTP request", tools: "Claude AI", highlight: false },
  { day: "07", topic: "Nmap Basics", build: "Scan local VM. Find open ports + services", tools: "Cursor", highlight: false },
  { day: "08", topic: "Nmap Advanced", build: "-sV version, -O OS, -A all flags", tools: "Claude AI", highlight: false },
  { day: "09", topic: "Google Dorking", build: "Find 5 real examples of exposed files", tools: "Claude AI", highlight: false },
  { day: "10", topic: "Shodan", build: "Search for exposed devices — observe only", tools: "Claude AI", highlight: false },
  { day: "11", topic: "theHarvester", build: "Passive recon on a bug bounty target", tools: "Cursor", highlight: false },
  { day: "12", topic: "Bash Scripting 2", build: "Nmap subnet scan → save output to file", tools: "Cursor", highlight: false },
  { day: "13", topic: "Cryptography", build: "Hash strings. Encrypt a file with OpenSSL", tools: "Claude AI", highlight: false },
  { day: "14", topic: "CVE + CVSS Research", build: "Look up 3 real CVEs. Understand CVSS score", tools: "Claude AI", highlight: false },
  { day: "15", topic: "MINI PROJECT", build: "Full passive recon report on bug bounty target", tools: "All tools", highlight: true },
  { day: "16", topic: "DVWA Setup", build: "Install DVWA. Set security level to Low", tools: "Claude AI", highlight: false },
  { day: "17", topic: "SQL Injection Manual", build: "Inject ' OR '1'='1 into DVWA login", tools: "Claude AI", highlight: false },
  { day: "18", topic: "SQLMap", build: "Run SQLMap on DVWA. Read every finding", tools: "Claude AI", highlight: false },
  { day: "19", topic: "XSS Reflected", build: "Inject script tag into DVWA reflected XSS", tools: "Claude AI", highlight: false },
  { day: "20", topic: "XSS Stored", build: "Store payload — fires on every page load", tools: "Claude AI", highlight: false },
  { day: "21", topic: "Burp Suite Setup", build: "Configure proxy. Intercept a login request", tools: "Claude AI", highlight: false },
  { day: "22", topic: "Burp Repeater", build: "Modify requests manually. Try payloads.", tools: "Claude AI", highlight: false },
  { day: "23", topic: "Local File Inclusion", build: "Exploit LFI in DVWA to read /etc/passwd", tools: "Claude AI", highlight: false },
  { day: "24", topic: "File Upload Attack", build: "Upload PHP web shell to DVWA (local only)", tools: "Claude AI", highlight: false },
  { day: "25", topic: "Brute Force", build: "Hydra on DVWA login (your VM only)", tools: "Cursor", highlight: false },
  { day: "26", topic: "Metasploit Intro", build: "msfconsole. Search. Understand module options", tools: "Claude AI", highlight: false },
  { day: "27", topic: "First Exploit", build: "ms17_010 on Metasploitable 2. Meterpreter shell", tools: "Claude AI", highlight: false },
  { day: "28", topic: "Privilege Escalation", build: "SUID binaries. sudo -l on lab VM", tools: "Claude AI", highlight: false },
  { day: "29", topic: "Password Cracking", build: "Crack 5 MD5 hashes with Hashcat + wordlist", tools: "Claude AI", highlight: false },
  { day: "30", topic: "MINI PROJECT", build: "Full DVWA pentest + 2-page findings report", tools: "All tools", highlight: true },
  { day: "31", topic: "Firewall Rules", build: "5 iptables rules: block and allow ports", tools: "Claude AI", highlight: false },
  { day: "32", topic: "Fail2ban", build: "Block SSH brute force attempts automatically", tools: "Cursor", highlight: false },
  { day: "33", topic: "Log Analysis", build: "Script to find failed logins in auth.log", tools: "Cursor", highlight: false },
  { day: "34", topic: "Snort Rule", build: "Detect a port scan with a custom Snort rule", tools: "Claude AI", highlight: false },
  { day: "35", topic: "Incident Response", build: "5-step response plan for a fake incident", tools: "Claude AI", highlight: false },
  { day: "36", topic: "Secure Code Review", build: "Read 20 lines PHP code. Find and fix vulns", tools: "Claude AI", highlight: false },
  { day: "37", topic: "OWASP Top 10", build: "10 vulns: one sentence each + one fix each", tools: "Claude AI", highlight: false },
  { day: "38", topic: "Report Writing", build: "Write Executive Summary of a pentest report", tools: "Claude AI", highlight: false },
  { day: "39", topic: "TryHackMe Room 1", build: "Complete a beginner TryHackMe room", tools: "Claude AI help", highlight: false },
  { day: "40", topic: "TryHackMe Room 2", build: "Complete an intermediate TryHackMe room", tools: "Claude AI help", highlight: false },
  { day: "41", topic: "Capstone Planning", build: "Choose target. Define scope + methodology", tools: "Claude AI", highlight: false },
  { day: "42", topic: "Capstone: Recon + Scan", build: "Full recon and scanning on capstone target", tools: "Cursor", highlight: false },
  { day: "43", topic: "Capstone: Exploitation", build: "Exploit 1 vuln. Document the attack chain", tools: "Claude AI", highlight: false },
  { day: "44", topic: "Capstone: Write Report", build: "Full 3-page penetration test report", tools: "Claude AI", highlight: false },
  { day: "45", topic: "DEMO + CERTIFICATE", build: "Present report. Explain methodology. Certificate", tools: "All tools", highlight: true },
];

export default function EthicalHackingCourse() {
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] = useState(false);

  useEffect(() => {
    document.title = "Ethical Hacking Course Chennai | Certification";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Join our Ethical Hacking Course in Chennai. Kali Linux certification for Tamil Nadu students (Rs.14999). Cybersecurity training in Bangalore.";
  }, []);

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
              <span className="text-purple-400">Security</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              <span className="text-purple-500 mr-4">C-02</span> Ethical Hacking Cybersecurity Course Bangalore
            </h1>


            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8">
              <Card className="bg-white/5 border border-purple-500/20 backdrop-blur-md p-5 flex flex-col gap-2">
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Price</div>
                <div className="text-2xl font-bold text-white">Rs. 14,999</div>
              </Card>
              <Card className="bg-white/5 border border-purple-500/20 backdrop-blur-md p-5 flex flex-col gap-2">
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Duration</div>
                <div className="text-xl font-bold text-white">45 days<br/><span className="text-base text-gray-300 font-normal">1 hour per day</span></div>
              </Card>
              <Card className="bg-white/5 border border-purple-500/20 backdrop-blur-md p-5 flex flex-col gap-2 lg:col-span-2">
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Stack</div>
                <div className="text-lg font-medium text-white leading-snug">Kali Linux, DVWA, Metasploit, Burp Suite, Wireshark, Nmap</div>
              </Card>
              <Card className="bg-white/5 border border-purple-500/20 backdrop-blur-md p-5 flex flex-col gap-2 lg:col-span-4">
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">AI Tools Used</div>
                <div className="text-lg font-medium text-purple-300">Cursor (scripts), Claude AI, ChatGPT, Windsurf</div>
              </Card>
            </div>
            
            <div className="pt-2">
              <Button 
                onClick={() => setIsRegistrationDialogOpen(true)}
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-6 h-auto text-lg w-full sm:w-auto shadow-lg shadow-purple-500/20 group"
              >
                <ShoppingCart className="w-5 h-5 mr-2 group-hover:-rotate-12 transition-transform" />
                Buy Now — Rs. 14,999
              </Button>
            </div>
            
          </motion.div>
        </div>
      </section>

      {/* Details & Warning Section */}
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
              This **Kali Linux certification for Tamil Nadu students (Rs.14999)** teaches how attacks work — then how to stop them. Practice on local labs (Kali Linux VM + DVWA) or platforms like TryHackMe. Cursor writes automation scripts while Claude AI explains vulnerabilities in plain English. Ideal for freshers and professionals.
            </p>
          </motion.div>


          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-purple-500/10 border border-purple-500/30 p-6 md:p-8 rounded-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
            <div className="flex gap-4">
              <AlertTriangle className="w-8 h-8 text-purple-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-purple-500 font-bold text-lg mb-2">IMPORTANT WARNING</h3>
                <p className="text-gray-200 text-lg leading-relaxed">
                  Every offensive technique is practised exclusively on systems you own or on authorised platforms. Using these techniques on any system without written permission is illegal. This course teaches you to break things so you know how to protect them.
                </p>
              </div>
            </div>
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
              <li>Use Kali Linux as your daily security lab environment</li>
              <li>Find and exploit common web application vulnerabilities</li>
              <li>Conduct a structured penetration test with documentation</li>
              <li>Write professional security reports for technical and non-technical audiences</li>
              <li>Harden a Linux server against the most common attack vectors</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      <StudentRegistrationModal 
        isOpen={isRegistrationDialogOpen} 
        onClose={() => setIsRegistrationDialogOpen(false)} 
        courseName="Ethical Hacking & Cybersecurity"
        coursePrice={14999}
      />
    </div>
  );
}

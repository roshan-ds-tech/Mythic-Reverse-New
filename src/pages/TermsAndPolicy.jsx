import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SparklesCore } from "../components/ui/sparkles";
import { Footer } from "../components/ui/footer-section";
import { ScrollText, Shield, FileText, Cookie, Scale, Globe, GraduationCap } from 'lucide-react';

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const TermsAndPolicy = () => {
    const [activeSection, setActiveSection] = useState('about');
    const [openPrivacy, setOpenPrivacy] = useState(false);

    const sections = [
        { id: 'about', title: 'About', icon: FileText },
        { id: 'terms', title: 'Terms of Service', icon: ScrollText },
        { id: 'privacy', title: 'Privacy Policy', icon: Shield },
        { id: 'courses', title: 'Courses Policy', icon: GraduationCap },
        { id: 'compliance', title: 'Compliance', icon: Scale },
        { id: 'cookies', title: 'Cookies', icon: Cookie },
        { id: 'disclaimer', title: 'Disclaimer', icon: Globe },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(id);
        }
    };

    return (
        <div className="relative min-h-screen bg-black text-white">
            {/* Global Stars - Fixed Background */}
            <div className="global-stars">
                <div className="layer layer-1"></div>
                <div className="layer layer-2"></div>
                <div className="layer layer-3"></div>
            </div>

            {/* Global Sparkles - Fixed overlay */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
                <SparklesCore
                    id="terms-global-sparkles"
                    background="transparent"
                    minSize={0.8}
                    maxSize={1.8}
                    particleDensity={60}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-20 px-4">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-violet-400">
                                TERMS & POLICY
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                                Transparency, compliance, and trust—the foundation of our partnership.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="relative py-20 px-4">
                    <div className="container mx-auto max-w-7xl">
                        <div className="flex gap-8 lg:gap-12">
                            {/* Sticky Sidebar Table of Contents - Desktop Only */}
                            <motion.aside
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="hidden lg:block w-64 shrink-0"
                            >
                                <div className="sticky top-24 space-y-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-sm font-bold text-violet-400 uppercase tracking-wider mb-4">
                                        Quick Navigation
                                    </h3>
                                    {sections.map((section) => {
                                        const Icon = section.icon;
                                        return (
                                            <button
                                                key={section.id}
                                                onClick={() => scrollToSection(section.id)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left ${activeSection === section.id
                                                    ? 'bg-gradient-to-r from-violet-600/20 to-purple-600/20 text-white border border-violet-500/30'
                                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                                <span className="text-sm font-medium">{section.title}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.aside>

                            {/* Main Content Area */}
                            <div className="flex-1 space-y-16">
                                {/* About the Company */}
                                <div id="about" className="scroll-mt-24">
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
                                    >
                                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                                ABOUT THE COMPANY
                                            </h2>
                                        </motion.div>
                                        <div className="prose prose-invert prose-lg max-w-none space-y-4 text-gray-300 leading-relaxed">
                                            <motion.p variants={itemVariants}>
                                                Founded in <strong className="text-white">2023</strong>, we are a professional <strong className="text-violet-400">Digital Marketing & IT Solutions Company</strong> delivering strategic, technology-driven, and performance-oriented solutions.
                                            </motion.p>
                                            <motion.p variants={itemVariants}>
                                                Since inception, we have successfully executed <strong className="text-white">17+ projects</strong>, serving businesses with scalable web technologies, digital growth systems, brand positioning, and high-performance marketing campaigns.
                                            </motion.p>
                                            <motion.p variants={itemVariants}>
                                                Our organization operates on principles of transparency, accountability, technological excellence, and measurable ROI. We aim to build long-term enterprise partnerships through structured processes, compliance adherence, and performance-driven delivery.
                                            </motion.p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Terms of Service */}
                                <div id="terms" className="scroll-mt-24">
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
                                    >
                                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                                                <ScrollText className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                                TERMS OF SERVICE
                                            </h2>
                                        </motion.div>

                                        <div className="space-y-8">
                                            <Section title="1. Binding Agreement">
                                                <p>By accessing this website or engaging our services, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Service.</p>
                                                <p>If you do not agree, you must discontinue use immediately.</p>
                                            </Section>

                                            <Section title="2. Scope of Services">
                                                <p>We provide professional services including, but not limited to:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4">
                                                    <li>Website & Application Development</li>
                                                    <li>Custom Software Solutions</li>
                                                    <li>Branding & Design Systems</li>
                                                    <li>Search Engine Optimization (SEO)</li>
                                                    <li>Performance Marketing & Paid Advertising</li>
                                                    <li>Social Media & Digital Strategy</li>
                                                    <li>IT Consulting & Technical Infrastructure</li>
                                                </ul>
                                                <p className="mt-4">All commercial terms, deliverables, timelines, and payment obligations shall be governed by a separate written agreement, proposal, or Statement of Work (SOW).</p>
                                            </Section>

                                            <Section title="3. Intellectual Property Rights">
                                                <h4 className="text-lg font-bold text-violet-400 mb-2">Company-Owned Assets</h4>
                                                <p>All website content, frameworks, methodologies, proprietary systems, and internal tools remain the exclusive intellectual property of the company.</p>

                                                <h4 className="text-lg font-bold text-violet-400 mb-2 mt-4">Client Deliverables</h4>
                                                <p>Upon full payment of agreed fees, ownership of final deliverables shall transfer to the client, unless otherwise contractually specified.</p>

                                                <h4 className="text-lg font-bold text-violet-400 mb-2 mt-4">Restrictions</h4>
                                                <p>No content from this website may be copied, distributed, modified, reverse-engineered, or commercially exploited without prior written consent.</p>
                                            </Section>

                                            <Section title="4. Commercial Terms">
                                                <ul className="list-disc list-inside space-y-2 ml-4">
                                                    <li>Payment schedules are contractually defined.</li>
                                                    <li>Delays in payment may result in suspension of services.</li>
                                                    <li>Refunds are governed strictly by executed agreements.</li>
                                                    <li>Taxes and statutory charges are applicable as per jurisdiction.</li>
                                                </ul>
                                            </Section>

                                            <Section title="5. Confidentiality & Non-Disclosure">
                                                <p>Both parties agree to maintain strict confidentiality of proprietary, strategic, financial, and operational information exchanged during engagement.</p>
                                                <p>Confidential obligations survive termination of service agreements.</p>
                                            </Section>

                                            <Section title="6. Limitation of Liability">
                                                <p>To the maximum extent permitted by law:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                                                    <li>We shall not be liable for indirect, incidental, special, or consequential damages.</li>
                                                    <li>We do not guarantee specific financial or ranking outcomes unless contractually agreed.</li>
                                                    <li>Total liability shall not exceed the total professional fees paid by the client under the respective agreement.</li>
                                                </ul>
                                            </Section>

                                            <Section title="7. Third-Party Platforms">
                                                <p>Our services may integrate with third-party platforms such as hosting providers, advertising platforms, and analytics systems. We are not responsible for:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                                                    <li>Policy changes</li>
                                                    <li>Platform suspensions</li>
                                                    <li>Service outages</li>
                                                    <li>External data breaches</li>
                                                </ul>
                                                <p className="mt-4">Clients acknowledge third-party platform compliance obligations.</p>
                                            </Section>

                                            <Section title="8. Termination">
                                                <p>We reserve the right to terminate services in cases of:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                                                    <li>Breach of contract</li>
                                                    <li>Non-payment</li>
                                                    <li>Misuse of services</li>
                                                    <li>Unlawful activities</li>
                                                </ul>
                                                <p className="mt-4">Termination terms are governed by signed agreements.</p>
                                            </Section>

                                            <Section title="9. Governing Law & Jurisdiction">
                                                <p>This Agreement shall be governed in accordance with the laws of India.</p>
                                                <p>All disputes shall be subject to the exclusive jurisdiction of competent courts in India.</p>
                                            </Section>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Privacy Policy */}
                                <div id="privacy" className="scroll-mt-24">
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
                                    >
                                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                                                <Shield className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                                PRIVACY POLICY
                                            </h2>
                                        </motion.div>

                                        <div className="space-y-8">
                                            <motion.p variants={itemVariants} className="text-gray-300 leading-relaxed">
                                                We are committed to lawful, fair, and transparent data processing practices.
                                            </motion.p>

                                            <Section title="1. Categories of Data Collected">
                                                <p>We may collect:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                                                    <li>Identification Data (Name, Email, Phone, Company Name)</li>
                                                    <li>Technical Data (IP Address, Browser Type, Device Information)</li>
                                                    <li>Usage Data (Website interaction, analytics behavior)</li>
                                                    <li>Transactional Data (Billing & contractual information)</li>
                                                </ul>
                                                <p className="mt-4">We do not knowingly collect sensitive personal data unless explicitly required for contractual purposes.</p>
                                            </Section>

                                            <Section title="2. Legal Basis for Processing">
                                                <p>Processing is conducted under:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                                                    <li>Consent</li>
                                                    <li>Contractual Necessity</li>
                                                    <li>Legal Obligation</li>
                                                    <li>Legitimate Business Interest</li>
                                                </ul>
                                            </Section>

                                            <Section title="3. Data Security">
                                                <p>We implement:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                                                    <li>Access control mechanisms</li>
                                                    <li>Encrypted communications (SSL/TLS)</li>
                                                    <li>Secure hosting environments</li>
                                                    <li>Administrative safeguards</li>
                                                </ul>
                                                <p className="mt-4">While we maintain industry-standard safeguards, no system can guarantee absolute security.</p>
                                            </Section>

                                            <Section title="4. Data Retention">
                                                <p>Personal data is retained only for:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                                                    <li>Contractual duration</li>
                                                    <li>Legal compliance requirements</li>
                                                    <li>Legitimate business purposes</li>
                                                </ul>
                                                <p className="mt-4">After this period, data is securely deleted or anonymized.</p>
                                            </Section>

                                            <Section title="5. International Data Transfers">
                                                <p>Where applicable, data may be processed outside your jurisdiction with appropriate safeguards in place.</p>
                                            </Section>

                                            <Section title="6. Data Subject Rights">
                                                <p>Users have the right to:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                                                    <li>Access personal data</li>
                                                    <li>Request correction</li>
                                                    <li>Request erasure</li>
                                                    <li>Restrict processing</li>
                                                    <li>Object to processing</li>
                                                    <li>Data portability</li>
                                                </ul>
                                            </Section>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Courses Policy */}
                                <div id="courses" className="scroll-mt-24">
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
                                    >
                                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                                                <GraduationCap className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 uppercase">
                                                COURSES POLICY TERMS & CONDITIONS
                                            </h2>
                                        </motion.div>

                                        <div className="space-y-8">
                                            <motion.p variants={itemVariants} className="text-gray-300 leading-relaxed font-semibold">
                                                MythicReverse – Online Tech Training Programs
                                            </motion.p>
                                            
                                            <Section title="1. Acceptance of Terms">
                                                <p>By enrolling in any course offered by MythicReverse ("Institute", "We", "Us"), the student ("You", "Student") agrees to be legally bound by these Terms & Conditions.</p>
                                                <p>Enrollment in the course constitutes full acceptance of these terms.</p>
                                                <p>If you do not agree, you must not enroll in the program.</p>
                                            </Section>

                                            <Section title="2. Nature of Program">
                                                <p>MythicReverse provides online technical training programs including but not limited to:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4">
                                                    <li>Programming Languages</li>
                                                    <li>Data Structures & Algorithms (DSA)</li>
                                                    <li>Full Stack Web Development</li>
                                                    <li>App Development (Flutter / React Native)</li>
                                                </ul>
                                                <p className="mt-4">All programs are delivered online.</p>
                                                <p>The course is a skill development and training program only.</p>
                                            </Section>

                                            <Section title="3. Enrollment & Minimum Batch Requirement">
                                                <h4 className="text-lg font-bold text-violet-400 mb-2">3.1 Minimum Requirement</h4>
                                                <p>Each course requires a minimum number of enrolled students to commence.</p>
                                                
                                                <h4 className="text-lg font-bold text-violet-400 mb-2 mt-4">3.2 If Requirement Not Met</h4>
                                                <p>If the minimum enrollment requirement is not met within 25 days from the enrollment window opening date:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4">
                                                    <li>The course will not commence.</li>
                                                    <li>The full course fee paid by the student will be refunded.</li>
                                                </ul>

                                                <h4 className="text-lg font-bold text-violet-400 mb-2 mt-4">3.3 If Requirement Met</h4>
                                                <p>If the minimum enrollment requirement is met:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4">
                                                    <li>The official course commencement date will be intimated to students via registered email.</li>
                                                    <li>Students are responsible for checking their email communications.</li>
                                                </ul>
                                            </Section>

                                            <Section title="4. Refund Policy">
                                                <h4 className="text-lg font-bold text-violet-400 mb-2">4.1 Before Course Commencement</h4>
                                                <p>If minimum enrollment is not met within 25 days, full refund will be issued to the original payment method.</p>
                                                
                                                <h4 className="text-lg font-bold text-violet-400 mb-2 mt-4">4.2 After Course Commencement</h4>
                                                <p>Once the course has commenced:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4">
                                                    <li>No refunds shall be provided under any circumstances.</li>
                                                    <li>Fees are non-transferable and non-refundable.</li>
                                                </ul>

                                                <h4 className="text-lg font-bold text-violet-400 mb-2 mt-4">4.3 Failure to Attend</h4>
                                                <p>Non-attendance, partial attendance, or withdrawal after commencement does not entitle the student to any refund.</p>
                                            </Section>

                                            <Section title="5. No Job Guarantee">
                                                <h4 className="text-lg font-bold text-violet-400 mb-2">5.1 What We Provide</h4>
                                                <ul className="list-disc list-inside space-y-2 ml-4">
                                                    <li>Skill training</li>
                                                    <li>Real-world project exposure</li>
                                                    <li>Interview preparation guidance</li>
                                                    <li>Post-interview assistance</li>
                                                </ul>

                                                <h4 className="text-lg font-bold text-violet-400 mb-2 mt-4">5.2 No Guarantee</h4>
                                                <p>Enrollment in this course does NOT guarantee:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4">
                                                    <li>Job placement</li>
                                                    <li>Internship placement</li>
                                                    <li>Salary assurance</li>
                                                    <li>Selection in any company</li>
                                                </ul>

                                                <h4 className="text-lg font-bold text-violet-400 mb-2 mt-4">5.3 Employment Outcomes</h4>
                                                <p>Employment outcomes depend entirely on:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4">
                                                    <li>Individual performance</li>
                                                    <li>Skill level</li>
                                                    <li>Market conditions</li>
                                                    <li>Employer selection criteria</li>
                                                </ul>

                                                <h4 className="text-lg font-bold text-violet-400 mb-2 mt-4">5.4 Acknowledgment</h4>
                                                <p>Students expressly acknowledge and accept that there is no job guarantee associated with this program.</p>
                                            </Section>

                                            <Section title="6. Student Responsibilities">
                                                <p>Students agree to:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4">
                                                    <li>Participate actively in training sessions</li>
                                                    <li>Complete assignments and projects</li>
                                                    <li>Maintain professional conduct</li>
                                                    <li>Not misuse course materials</li>
                                                    <li>Not share proprietary course content</li>
                                                </ul>
                                                <p className="mt-4">Any misconduct may result in termination of access without refund.</p>
                                            </Section>

                                            <Section title="7. Intellectual Property">
                                                <p>All course materials including:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4">
                                                    <li>Videos</li>
                                                    <li>Notes</li>
                                                    <li>Source code</li>
                                                    <li>Projects</li>
                                                    <li>Study materials</li>
                                                </ul>
                                                <p className="mt-4">Are the intellectual property of MythicReverse.</p>
                                                <p>Unauthorized copying, sharing, redistribution, or resale is strictly prohibited.</p>
                                                <p>Legal action may be initiated in case of violation.</p>
                                            </Section>

                                            <Section title="8. Limitation of Liability">
                                                <p>MythicReverse shall not be liable for:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4">
                                                    <li>Internet connectivity issues</li>
                                                    <li>Technical disruptions beyond control</li>
                                                    <li>Student's inability to secure employment</li>
                                                    <li>Indirect or consequential damages</li>
                                                </ul>
                                            </Section>

                                            <Section title="9. Modification of Terms">
                                                <p>MythicReverse reserves the right to modify these terms at any time. Updated terms will be posted on the official website.</p>
                                                <p>Continued enrollment constitutes acceptance of revised terms.</p>
                                            </Section>

                                            <motion.div variants={itemVariants} className="pt-8 border-t border-white/10 mt-8">
                                                <h3 className="text-2xl font-bold text-white mb-6">PRIVACY POLICY: Online Tech Training</h3>
                                                
                                                <div className="space-y-6">
                                                    <div>
                                                        <h4 className="text-lg font-bold text-violet-400 mb-2">1. Information We Collect</h4>
                                                        <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                                                            <li>Name</li>
                                                            <li>Email address</li>
                                                            <li>Phone number</li>
                                                            <li>Payment details</li>
                                                            <li>Course activity data</li>
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-lg font-bold text-violet-400 mb-2">2. Purpose of Data Collection</h4>
                                                        <p className="text-gray-300 mb-2">We collect data to:</p>
                                                        <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                                                            <li>Process enrollments</li>
                                                            <li>Deliver course materials</li>
                                                            <li>Communicate course updates</li>
                                                            <li>Issue certificates</li>
                                                            <li>Improve services</li>
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-lg font-bold text-violet-400 mb-2">3. Payment Information</h4>
                                                        <p className="text-gray-300">Payments are processed through secure third-party payment gateways.</p>
                                                        <p className="text-gray-300">We do not store full card or banking details.</p>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-lg font-bold text-violet-400 mb-2">4. Data Protection</h4>
                                                        <p className="text-gray-300">We implement reasonable security measures to protect personal data from unauthorized access.</p>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-lg font-bold text-violet-400 mb-2">5. Data Sharing</h4>
                                                        <p className="text-gray-300 mb-2">We do not sell or rent personal data. Data may only be shared:</p>
                                                        <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                                                            <li>With payment processors</li>
                                                            <li>If required by law</li>
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-lg font-bold text-violet-400 mb-2">6. Communication Consent</h4>
                                                        <p className="text-gray-300 mb-2">By enrolling, students consent to receive:</p>
                                                        <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                                                            <li>Course-related emails</li>
                                                            <li>Announcements</li>
                                                            <li>Updates</li>
                                                        </ul>
                                                        <p className="text-gray-300 mt-2">Students may opt-out of promotional communications.</p>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-lg font-bold text-violet-400 mb-2">7. Data Retention</h4>
                                                        <p className="text-gray-300">Personal information may be retained for operational, legal, and compliance purposes.</p>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            <motion.div variants={itemVariants} className="bg-violet-900/20 border border-violet-500/30 rounded-2xl p-6 mt-8">
                                                <h3 className="text-xl font-bold text-white mb-4">STUDENT DECLARATION & CONSENT</h3>
                                                <p className="text-gray-300 italic mb-4">Before enrollment, students must acknowledge:</p>
                                                <blockquote className="border-l-4 border-violet-500 pl-4 py-2 bg-black/20 rounded-r-lg text-gray-200">
                                                    "I understand that this course is a skill development program. I understand that job placement is not guaranteed and depends on my individual performance and market conditions. I agree to the refund policy and all Terms & Conditions."
                                                </blockquote>
                                                <p className="text-sm text-violet-300 mt-4 font-medium flex items-center gap-2">
                                                    <span className="w-4 h-4 rounded border border-violet-400 inline-flex items-center justify-center">✓</span>
                                                    A checkbox confirmation must be required before payment.
                                                </p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Compliance */}
                                <div id="compliance" className="scroll-mt-24">
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
                                    >
                                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                                                <Scale className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                                COMPLIANCE – INDIAN IT ACT, 2000
                                            </h2>
                                        </motion.div>

                                        <div className="prose prose-invert prose-lg max-w-none space-y-4 text-gray-300 leading-relaxed">
                                            <motion.p variants={itemVariants}>In accordance with the Information Technology Act, 2000 and applicable rules:</motion.p>
                                            <motion.ul variants={itemVariants} className="list-disc list-inside space-y-2 ml-4">
                                                <li>Reasonable security practices are implemented.</li>
                                                <li>Sensitive personal data is processed lawfully.</li>
                                                <li>Users may request review and correction of information.</li>
                                                <li>A designated Grievance Officer shall address concerns within 30 days.</li>
                                            </motion.ul>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Cookies Policy */}
                                <div id="cookies" className="scroll-mt-24">
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
                                    >
                                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                                                <Cookie className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                                COOKIES POLICY
                                            </h2>
                                        </motion.div>

                                        <div className="prose prose-invert prose-lg max-w-none space-y-4 text-gray-300 leading-relaxed">
                                            <motion.p variants={itemVariants}>We use cookies and analytics tools for:</motion.p>
                                            <motion.ul variants={itemVariants} className="list-disc list-inside space-y-2 ml-4">
                                                <li>Website optimization</li>
                                                <li>Traffic analytics</li>
                                                <li>Performance measurement</li>
                                                <li>Marketing effectiveness</li>
                                            </motion.ul>
                                            <motion.p variants={itemVariants} className="mt-4">Users may control cookies through browser settings. Continued use of the website implies consent.</motion.p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Disclaimer */}
                                <div id="disclaimer" className="scroll-mt-24">
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
                                    >
                                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                                                <Globe className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                                DISCLAIMER
                                            </h2>
                                        </motion.div>

                                        <div className="prose prose-invert prose-lg max-w-none space-y-4 text-gray-300 leading-relaxed">
                                            <motion.ul variants={itemVariants} className="list-disc list-inside space-y-2 ml-4">
                                                <li>All information is provided on an "as-is" basis.</li>
                                                <li>We do not guarantee specific business results unless formally agreed.</li>
                                                <li>Digital marketing performance depends on market conditions and third-party algorithms.</li>
                                                <li>External links are not under our control.</li>
                                            </motion.ul>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Last Updated */}
                                <div className="text-center py-8">
                                    <p className="text-sm text-gray-500">
                                        Last Updated: February 2026
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
};

// Section Component for consistent styling
const Section = ({ title, children }) => {
    return (
        <motion.div
            variants={itemVariants}
            className="space-y-4"
        >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{title}</h3>
            <div className="prose prose-invert max-w-none space-y-3 text-gray-300 leading-relaxed">
                {children}
            </div>
        </motion.div>
    );
};

export default TermsAndPolicy;

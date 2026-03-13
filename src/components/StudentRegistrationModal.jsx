import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CheckCircle2 } from 'lucide-react';

function CustomSelect({ placeholder, options, value, onChange, required }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find(o => o.value === value)?.label;

  return (
    <div ref={ref} className="relative">
      {/* Hidden native input for form validation */}
      <input
        type="text"
        required={required}
        value={value || ''}
        onChange={() => { }}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-10 w-full items-center justify-between rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${value ? 'text-white' : 'text-gray-500'
          }`}
      >
        <span>{selectedLabel || placeholder}</span>
        <svg className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-white/10 bg-neutral-900 py-1 shadow-xl shadow-black/40 animate-in fade-in-0 zoom-in-95">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setIsOpen(false); }}
              className={`flex w-full items-center px-3 py-2.5 text-sm transition-colors ${value === opt.value
                ? 'bg-purple-600/20 text-purple-300'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StudentRegistrationModal({
  isOpen,
  onClose,
  courseName,
  selectedLanguage = null
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gender, setGender] = useState('');
  const [qualification, setQualification] = useState('');
  const [os, setOs] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call or payment gateway redirect
    setTimeout(() => {
      setIsSubmitting(false);
      console.log("Form Submitted", {
        course: courseName,
        language: selectedLanguage,
        // In a real app, collect form data here
      });
      // Redirect to payment or show success
      onClose();
    }, 1500);
  };

  const inputClasses = "flex h-10 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors";
  const selectClasses = "flex h-10 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors appearance-none";
  const labelClasses = "text-sm font-medium text-gray-300 mb-1.5 block";
  const sectionClasses = "space-y-4 pb-6 border-b border-white/10";
  const sectionTitleClasses = "text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">

        <div className="p-6 pb-4 border-b border-white/10 shrink-0 bg-neutral-950/50">
          <DialogTitle className="text-2xl mb-2">Student Registration & Undertaking Form</DialogTitle>
          <DialogDescription className="text-gray-400">
            Please fill in the following details carefully. All information will be kept confidential and used only for academic and administrative purposes.
            {courseName && <div className="mt-2 text-purple-300 font-medium tracking-wide">Course: {courseName} {selectedLanguage && `(${selectedLanguage})`}</div>}
          </DialogDescription>
        </div>

        <div className="overflow-y-auto p-6 flex-1 scrollbar-hide">
          <form id="registration-form" onSubmit={handleSubmit} className="space-y-8">

            {/* SECTION 1 */}
            <div className={sectionClasses}>
              <h3 className={sectionTitleClasses}>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs border border-purple-500/30">1</span>
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Full Name *</label>
                  <input required type="text" className={inputClasses} placeholder="Name" />
                </div>
                <div>
                  <label className={labelClasses}>Date of Birth *</label>
                  <input required type="date" className={inputClasses} />
                </div>
                <div>
                  <label className={labelClasses}>Gender *</label>
                  <CustomSelect
                    required
                    placeholder="Select Gender"
                    value={gender}
                    onChange={setGender}
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' },
                    ]}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Mobile Number *</label>
                  <input required type="tel" className={inputClasses} placeholder="+91 9876543210" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}>Email Address *</label>
                  <input required type="email" className={inputClasses} placeholder="email@example.com" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}>Aadhaar Number *</label>
                  <input required type="text" pattern="[0-9]{12}" title="12 digit Aadhaar number" className={inputClasses} placeholder="1234 5678 9012" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}>Permanent Address *</label>
                  <input required type="text" className={inputClasses} placeholder="123 Main Street, Appt 4B" />
                </div>
                <div>
                  <label className={labelClasses}>City *</label>
                  <input required type="text" className={inputClasses} placeholder="Mumbai" />
                </div>
                <div>
                  <label className={labelClasses}>State *</label>
                  <input required type="text" className={inputClasses} placeholder="Maharashtra" />
                </div>
                <div>
                  <label className={labelClasses}>PIN Code *</label>
                  <input required type="text" className={inputClasses} placeholder="400001" />
                </div>
              </div>
            </div>

            {/* SECTION 2 */}
            <div className={sectionClasses}>
              <h3 className={sectionTitleClasses}>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs border border-purple-500/30">2</span>
                Educational Details
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className={labelClasses}>Highest Qualification *</label>
                  <CustomSelect
                    required
                    placeholder="Select Qualification"
                    value={qualification}
                    onChange={setQualification}
                    options={[
                      { value: 'diploma', label: 'Diploma' },
                      { value: 'ug', label: 'Undergraduate' },
                      { value: 'pg', label: 'Postgraduate' },
                      { value: 'other', label: 'Other' },
                    ]}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Name of College / Institution *</label>
                  <input required type="text" className={inputClasses} placeholder="University Name" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Field of Study / Stream *</label>
                    <input required type="text" className={inputClasses} placeholder="Computer Science" />
                  </div>
                  <div>
                    <label className={labelClasses}>Year of Study / Graduation Year *</label>
                    <input required type="text" className={inputClasses} placeholder="2025" />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3 */}
            <div className={sectionClasses}>
              <h3 className={sectionTitleClasses}>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs border border-purple-500/30">3</span>
                Professional / Technical Background
              </h3>
              <div className="space-y-6">

                <div className="space-y-3">
                  <label className={labelClasses}>Do you have prior coding or technical experience? *</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                      <input required type="radio" name="prior_coding" value="yes" className="w-4 h-4 accent-purple-500 cursor-pointer" />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                      <input required type="radio" name="prior_coding" value="no" className="w-4 h-4 accent-purple-500 cursor-pointer" />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>If yes, specify</label>
                  <input type="text" className={inputClasses} placeholder="e.g. Basic HTML/CSS, Python script kiddie" />
                </div>

                <div className="space-y-3">
                  <label className={labelClasses}>Do you currently work in the tech field? *</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                      <input required type="radio" name="work_in_tech" value="yes" className="w-4 h-4 accent-purple-500 cursor-pointer" />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                      <input required type="radio" name="work_in_tech" value="no" className="w-4 h-4 accent-purple-500 cursor-pointer" />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Current Occupation</label>
                  <input type="text" className={inputClasses} placeholder="e.g. Student, Frontend Developer" />
                </div>

              </div>
            </div>

            {/* SECTION 4 */}
            <div className={sectionClasses}>
              <h3 className={sectionTitleClasses}>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs border border-purple-500/30">4</span>
                Emergency Contact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className={labelClasses}>Parent / Guardian Name *</label>
                  <input required type="text" className={inputClasses} placeholder="Enter Name" />
                </div>
                <div>
                  <label className={labelClasses}>Relationship *</label>
                  <input required type="text" className={inputClasses} placeholder="Mother" />
                </div>
                <div>
                  <label className={labelClasses}>Contact Number *</label>
                  <input required type="tel" className={inputClasses} placeholder="+91 9876543211" />
                </div>
              </div>
            </div>

            {/* SECTION 5 */}
            <div className={sectionClasses}>
              <h3 className={sectionTitleClasses}>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs border border-purple-500/30">5</span>
                Device & Internet Access
              </h3>
              <div className="space-y-6">

                <div className="space-y-3">
                  <label className={labelClasses}>Do you have access to a laptop or desktop? *</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                      <input required type="radio" name="laptop_access" value="yes" className="w-4 h-4 accent-purple-500 cursor-pointer" />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                      <input required type="radio" name="laptop_access" value="no" className="w-4 h-4 accent-purple-500 cursor-pointer" />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Operating System *</label>
                  <CustomSelect
                    required
                    placeholder="Select OS"
                    value={os}
                    onChange={setOs}
                    options={[
                      { value: 'windows', label: 'Windows' },
                      { value: 'macos', label: 'macOS' },
                      { value: 'linux', label: 'Linux' },
                    ]}
                  />
                </div>

                <div className="space-y-3">
                  <label className={labelClasses}>Do you have stable internet access? *</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                      <input required type="radio" name="internet_access" value="yes" className="w-4 h-4 accent-purple-500 cursor-pointer" />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                      <input required type="radio" name="internet_access" value="no" className="w-4 h-4 accent-purple-500 cursor-pointer" />
                      <span>No</span>
                    </label>
                  </div>
                </div>

              </div>
            </div>

            {/* SECTION 6 */}
            <div className={sectionClasses}>
              <h3 className={sectionTitleClasses}>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs border border-purple-500/30">6</span>
                Declaration & Undertaking
              </h3>
              <label className="flex items-start gap-4 cursor-pointer group p-4 border border-white/5 rounded-xl bg-white/5 hover:border-purple-500/30 transition-colors">
                <div className="pt-1">
                  <input required type="checkbox" className="w-5 h-5 rounded accent-purple-500 cursor-pointer" />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                  I hereby declare that the information provided by me in this form is true and accurate. I agree to follow all rules, policies, and guidelines established by MythicReverse. I understand that participation and regular practice are essential for successful completion of training programs. I will not misuse any materials, resources, or tools provided by MythicReverse. I understand that violation of policies may result in suspension or termination from the program.
                </p>
              </label>
            </div>

            {/* SECTION 7 */}
            <div className={sectionClasses + " border-none pb-0"}>
              <h3 className={sectionTitleClasses}>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs border border-purple-500/30">7</span>
                Consent & Signature
              </h3>

              <div className="space-y-4 mb-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="pt-0.5">
                    <input required type="checkbox" className="w-5 h-5 rounded accent-purple-500 cursor-pointer" />
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    I consent to MythicReverse contacting me via phone, email, or messaging platforms for academic communication, announcements, and updates.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="pt-0.5">
                    <input required type="checkbox" className="w-5 h-5 rounded accent-purple-500 cursor-pointer" />
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    I agree to the terms and conditions stated above.
                  </span>
                </label>
              </div>

              <div className="p-5 border border-purple-500/20 rounded-xl bg-purple-500/5 space-y-4">
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  Digital Signature
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Full Name (As Signature) *</label>
                    <input required type="text" className={inputClasses} placeholder="Type your full name" />
                  </div>
                  <div>
                    <label className={labelClasses}>Date *</label>
                    <input required type="date" className={inputClasses} defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>
              </div>

            </div>

          </form>
        </div>

        <div className="p-6 border-t border-white/10 shrink-0 bg-neutral-950 flex justify-end gap-3 z-10">
          <Button type="button" variant="outline" onClick={onClose} className="border-white/20 text-white hover:bg-white/10">
            Cancel
          </Button>
          <Button
            form="registration-form"
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-600 hover:bg-purple-700 text-white min-w-[170px]"
          >
            {isSubmitting ? "Processing..." : "Proceed to Payment"}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}

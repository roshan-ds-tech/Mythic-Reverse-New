import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { supabase } from '../lib/supabase';

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
      <input
        type="text"
        required={required}
        value={value || ''}
        onChange={() => {}}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-10 w-full items-center justify-between rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${value ? 'text-white' : 'text-gray-500'}`}
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
              className={`flex w-full items-center px-3 py-2.5 text-sm transition-colors ${
                value === opt.value
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

const initialForm = {
  fullName: '',
  dob: '',
  gender: '',
  mobile: '',
  email: '',
  aadhaar: '',
  address: '',
  city: '',
  state: '',
  pin: '',
  qualification: '',
  college: '',
  fieldOfStudy: '',
  yearOfStudy: '',
  priorCoding: '',
  priorCodingDetails: '',
  workInTech: '',
  occupation: '',
  guardianName: '',
  relationship: '',
  guardianContact: '',
  laptopAccess: '',
  os: '',
  internetAccess: '',
  signatureName: '',
  signatureDate: new Date().toISOString().split('T')[0],
};

export default function StudentRegistrationModal({
  isOpen,
  onClose,
  courseName,
  selectedLanguage = null
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(initialForm);

  // Helper: bind text/date/tel/email inputs
  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
  // Helper: bind CustomSelect / radio values directly
  const setVal = (field) => (value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('student_registrations')
        .insert([{
          full_name: form.fullName,
          date_of_birth: form.dob,
          gender: form.gender,
          mobile_number: form.mobile,
          email: form.email,
          aadhaar_number: form.aadhaar,
          permanent_address: form.address,
          city: form.city,
          state: form.state,
          pin_code: form.pin,
          highest_qualification: form.qualification,
          college_name: form.college,
          field_of_study: form.fieldOfStudy,
          year_of_study: form.yearOfStudy,
          prior_coding_experience: form.priorCoding,
          prior_coding_details: form.priorCodingDetails,
          works_in_tech: form.workInTech,
          current_occupation: form.occupation,
          guardian_name: form.guardianName,
          guardian_relationship: form.relationship,
          guardian_contact: form.guardianContact,
          has_laptop: form.laptopAccess,
          operating_system: form.os,
          has_internet: form.internetAccess,
          signature_name: form.signatureName,
          signature_date: form.signatureDate,
          course_name: courseName,
          selected_language: selectedLanguage,
        }]);

      if (error) {
        console.error('Supabase error:', error);
        alert('Error saving registration. Please try again.');
      } else {
        alert('Registration saved successfully! Redirecting to payment...');
        setForm(initialForm);
        onClose();
        // TODO: Redirect to payment gateway here
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "flex h-10 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors";
  const labelClasses = "text-sm font-medium text-gray-300 mb-1.5 block";
  const sectionClasses = "space-y-4 pb-6 border-b border-white/10";
  const sectionTitleClasses = "text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">

        <div className="p-6 pb-4 border-b border-white/10 shrink-0 bg-neutral-950/50">
          <DialogTitle className="text-2xl mb-2">Student Registration &amp; Undertaking Form</DialogTitle>
          <DialogDescription className="text-gray-400">
            Please fill in the following details carefully. All information will be kept confidential and used only for academic and administrative purposes.
            {courseName && (
              <span className="block mt-2 text-purple-300 font-medium tracking-wide">
                Course: {courseName} {selectedLanguage && `(${selectedLanguage})`}
              </span>
            )}
          </DialogDescription>
        </div>

        <div className="overflow-y-auto p-6 flex-1 scrollbar-hide">
          <form id="registration-form" onSubmit={handleSubmit} className="space-y-8">

            {/* SECTION 1 — Personal Information */}
            <div className={sectionClasses}>
              <h3 className={sectionTitleClasses}>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs border border-purple-500/30">1</span>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Full Name *</label>
                  <input required type="text" className={inputClasses} placeholder="Name" value={form.fullName} onChange={set('fullName')} />
                </div>
                <div>
                  <label className={labelClasses}>Date of Birth *</label>
                  <input required type="date" className={inputClasses} value={form.dob} onChange={set('dob')} />
                </div>
                <div>
                  <label className={labelClasses}>Gender *</label>
                  <CustomSelect
                    required
                    placeholder="Select Gender"
                    value={form.gender}
                    onChange={setVal('gender')}
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' },
                    ]}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Mobile Number *</label>
                  <input required type="tel" className={inputClasses} placeholder="+91 9876543210" value={form.mobile} onChange={set('mobile')} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}>Email Address *</label>
                  <input required type="email" className={inputClasses} placeholder="email@example.com" value={form.email} onChange={set('email')} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}>Aadhaar Number *</label>
                  <input required type="text" pattern="[0-9]{12}" title="12 digit Aadhaar number" className={inputClasses} placeholder="1234 5678 9012" value={form.aadhaar} onChange={set('aadhaar')} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}>Permanent Address *</label>
                  <input required type="text" className={inputClasses} placeholder="123 Main Street, Appt 4B" value={form.address} onChange={set('address')} />
                </div>
                <div>
                  <label className={labelClasses}>City *</label>
                  <input required type="text" className={inputClasses} placeholder="Mumbai" value={form.city} onChange={set('city')} />
                </div>
                <div>
                  <label className={labelClasses}>State *</label>
                  <input required type="text" className={inputClasses} placeholder="Maharashtra" value={form.state} onChange={set('state')} />
                </div>
                <div>
                  <label className={labelClasses}>PIN Code *</label>
                  <input required type="text" className={inputClasses} placeholder="400001" value={form.pin} onChange={set('pin')} />
                </div>
              </div>
            </div>

            {/* SECTION 2 — Educational Details */}
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
                    value={form.qualification}
                    onChange={setVal('qualification')}
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
                  <input required type="text" className={inputClasses} placeholder="University Name" value={form.college} onChange={set('college')} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Field of Study / Stream *</label>
                    <input required type="text" className={inputClasses} placeholder="Computer Science" value={form.fieldOfStudy} onChange={set('fieldOfStudy')} />
                  </div>
                  <div>
                    <label className={labelClasses}>Year of Study / Graduation Year *</label>
                    <input required type="text" className={inputClasses} placeholder="2025" value={form.yearOfStudy} onChange={set('yearOfStudy')} />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3 — Technical Background */}
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
                      <input required type="radio" name="prior_coding" value="yes" className="w-4 h-4 accent-purple-500 cursor-pointer" checked={form.priorCoding === 'yes'} onChange={set('priorCoding')} />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                      <input required type="radio" name="prior_coding" value="no" className="w-4 h-4 accent-purple-500 cursor-pointer" checked={form.priorCoding === 'no'} onChange={set('priorCoding')} />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>If yes, specify</label>
                  <input type="text" className={inputClasses} placeholder="e.g. Basic HTML/CSS, Python" value={form.priorCodingDetails} onChange={set('priorCodingDetails')} />
                </div>
                <div className="space-y-3">
                  <label className={labelClasses}>Do you currently work in the tech field? *</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                      <input required type="radio" name="work_in_tech" value="yes" className="w-4 h-4 accent-purple-500 cursor-pointer" checked={form.workInTech === 'yes'} onChange={set('workInTech')} />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                      <input required type="radio" name="work_in_tech" value="no" className="w-4 h-4 accent-purple-500 cursor-pointer" checked={form.workInTech === 'no'} onChange={set('workInTech')} />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Current Occupation</label>
                  <input type="text" className={inputClasses} placeholder="e.g. Student, Frontend Developer" value={form.occupation} onChange={set('occupation')} />
                </div>
              </div>
            </div>

            {/* SECTION 4 — Emergency Contact */}
            <div className={sectionClasses}>
              <h3 className={sectionTitleClasses}>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs border border-purple-500/30">4</span>
                Emergency Contact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className={labelClasses}>Parent / Guardian Name *</label>
                  <input required type="text" className={inputClasses} placeholder="Enter Name" value={form.guardianName} onChange={set('guardianName')} />
                </div>
                <div>
                  <label className={labelClasses}>Relationship *</label>
                  <input required type="text" className={inputClasses} placeholder="Mother" value={form.relationship} onChange={set('relationship')} />
                </div>
                <div>
                  <label className={labelClasses}>Contact Number *</label>
                  <input required type="tel" className={inputClasses} placeholder="+91 9876543211" value={form.guardianContact} onChange={set('guardianContact')} />
                </div>
              </div>
            </div>

            {/* SECTION 5 — Device & Internet */}
            <div className={sectionClasses}>
              <h3 className={sectionTitleClasses}>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs border border-purple-500/30">5</span>
                Device &amp; Internet Access
              </h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className={labelClasses}>Do you have access to a laptop or desktop? *</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                      <input required type="radio" name="laptop_access" value="yes" className="w-4 h-4 accent-purple-500 cursor-pointer" checked={form.laptopAccess === 'yes'} onChange={set('laptopAccess')} />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                      <input required type="radio" name="laptop_access" value="no" className="w-4 h-4 accent-purple-500 cursor-pointer" checked={form.laptopAccess === 'no'} onChange={set('laptopAccess')} />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Operating System *</label>
                  <CustomSelect
                    required
                    placeholder="Select OS"
                    value={form.os}
                    onChange={setVal('os')}
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
                      <input required type="radio" name="internet_access" value="yes" className="w-4 h-4 accent-purple-500 cursor-pointer" checked={form.internetAccess === 'yes'} onChange={set('internetAccess')} />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                      <input required type="radio" name="internet_access" value="no" className="w-4 h-4 accent-purple-500 cursor-pointer" checked={form.internetAccess === 'no'} onChange={set('internetAccess')} />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 6 — Declaration */}
            <div className={sectionClasses}>
              <h3 className={sectionTitleClasses}>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs border border-purple-500/30">6</span>
                Declaration &amp; Undertaking
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

            {/* SECTION 7 — Consent & Signature */}
            <div className={sectionClasses + " border-none pb-0"}>
              <h3 className={sectionTitleClasses}>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs border border-purple-500/30">7</span>
                Consent &amp; Signature
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
                <h4 className="text-white font-medium mb-2">Digital Signature</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Full Name (As Signature) *</label>
                    <input required type="text" className={inputClasses} placeholder="Type your full name" value={form.signatureName} onChange={set('signatureName')} />
                  </div>
                  <div>
                    <label className={labelClasses}>Date *</label>
                    <input required type="date" className={inputClasses} value={form.signatureDate} onChange={set('signatureDate')} />
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
            {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}

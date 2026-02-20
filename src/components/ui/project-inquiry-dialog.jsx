import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';
import { Input } from './input';
import { Textarea } from './textarea';
import { Label } from './label';
import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';

export function ProjectInquiryDialog({ open, onOpenChange }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission here
        onOpenChange(false);
        setFormData({
            name: '',
            email: '',
            company: '',
            projectType: '',
            budget: '',
            timeline: '',
            description: ''
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                {/* Close button */}
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>

                <DialogHeader>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <DialogTitle>Start Your Project</DialogTitle>
                    </div>
                    <DialogDescription>
                        Tell us about your vision. We'll turn it into reality.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-3 p-6 pt-0">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-neutral-300">
                                Full Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="h-9 bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-purple-500 focus:ring-purple-500/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-neutral-300">
                                Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="h-9 bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-purple-500 focus:ring-purple-500/20"
                            />
                        </div>
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                        <Label htmlFor="company" className="text-neutral-300">
                            Company / Organization
                        </Label>
                        <Input
                            id="company"
                            name="company"
                            placeholder="Acme Inc."
                            value={formData.company}
                            onChange={handleChange}
                            className="h-9 bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-purple-500 focus:ring-purple-500/20"
                        />
                    </div>

                    {/* Project Type & Budget Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label htmlFor="projectType" className="text-neutral-300">
                                Project Type
                            </Label>
                            <select
                                id="projectType"
                                name="projectType"
                                value={formData.projectType}
                                onChange={handleChange}
                                className="flex h-9 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                            >
                                <option value="" className="bg-neutral-900">Select type</option>
                                <option value="web-app" className="bg-neutral-900">Web Application</option>
                                <option value="mobile-app" className="bg-neutral-900">Mobile App</option>
                                <option value="website" className="bg-neutral-900">Website</option>
                                <option value="ecommerce" className="bg-neutral-900">E-commerce</option>
                                <option value="other" className="bg-neutral-900">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="budget" className="text-neutral-300">
                                Budget Range
                            </Label>
                            <select
                                id="budget"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="flex h-9 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                            >
                                <option value="" className="bg-neutral-900">Select range</option>
                                <option value="<10k" className="bg-neutral-900">&lt; $10,000</option>
                                <option value="10k-50k" className="bg-neutral-900">$10,000 - $50,000</option>
                                <option value="50k-100k" className="bg-neutral-900">$50,000 - $100,000</option>
                                <option value=">100k" className="bg-neutral-900">&gt; $100,000</option>
                            </select>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2">
                        <Label htmlFor="timeline" className="text-neutral-300">
                            Desired Timeline
                        </Label>
                        <Input
                            id="timeline"
                            name="timeline"
                            placeholder="e.g., 3-6 months"
                            value={formData.timeline}
                            onChange={handleChange}
                            className="h-9 bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-purple-500 focus:ring-purple-500/20"
                        />
                    </div>

                    {/* Project Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-neutral-300">
                            Project Description <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Tell us about your project vision, goals, and any specific requirements..."
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-purple-500 focus:ring-purple-500/20 resize-none min-h-[80px]"
                        />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-10 mt-2 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-medium rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-shadow"
                    >
                        <Send className="h-4 w-4" />
                        Send Inquiry
                    </motion.button>

                    <p className="text-xs text-center text-neutral-500">
                        We'll get back to you within 24 hours
                    </p>
                </form>
            </DialogContent>
        </Dialog>
    );
}

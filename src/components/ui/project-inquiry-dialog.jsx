import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';
import { Input } from './input';
import { Textarea } from './textarea';
import { Label } from './label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { motion } from 'framer-motion';
import { X, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        const { error } = await supabase
            .from('client_inquiries')
            .insert([{
                full_name: formData.name,
                email: formData.email,
                company: formData.company,
                project_type: formData.projectType,
                budget_range: formData.budget,
                timeline: formData.timeline,
                project_description: formData.description
            }]);

        setIsSubmitting(false);

        if (error) {
            console.error(error);
            setSubmitError('Something went wrong. Please try again.');
        } else {
            setIsSubmitted(true);
            setFormData({ name: '', email: '', company: '', projectType: '', budget: '', timeline: '', description: '' });
            setTimeout(() => {
                setIsSubmitted(false);
                onOpenChange(false);
            }, 2500);
        }
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
                    {isSubmitted ? (
                        <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
                            <CheckCircle className="h-14 w-14 text-purple-400" />
                            <h3 className="text-xl font-bold text-white">Inquiry Sent!</h3>
                            <p className="text-neutral-400 text-sm">Thanks! We'll get back to you within 24 hours.</p>
                        </div>
                    ) : (
                        <>
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-neutral-300">
                                Full Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
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
                                placeholder="your.name@company.com"
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
                            placeholder="Your Company Name"
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
                            <Select
                                value={formData.projectType || undefined}
                                onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                            >
                                <SelectTrigger className="h-9 bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-purple-500 focus:ring-purple-500/20">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="bg-neutral-900 border-white/10 text-white">
                                    <SelectItem value="website">Website Development</SelectItem>
                                    <SelectItem value="saas">SaaS Development</SelectItem>
                                    <SelectItem value="app">App Development</SelectItem>
                                    <SelectItem value="marketing">Digital Marketing</SelectItem>
                                    <SelectItem value="edtech">EdTech Solutions</SelectItem>
                                    <SelectItem value="consulting">IT Consulting</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="budget" className="text-neutral-300">
                                Budget Range
                            </Label>
                            <Select
                                value={formData.budget || undefined}
                                onValueChange={(value) => setFormData({ ...formData, budget: value })}
                            >
                                <SelectTrigger className="h-9 bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-purple-500 focus:ring-purple-500/20">
                                    <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                                <SelectContent className="bg-neutral-900 border-white/10 text-white">
                                    <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                                    <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                                    <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                                    <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                                    <SelectItem value="100k+">$100,000+</SelectItem>
                                </SelectContent>
                            </Select>
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
                            placeholder="e.g., 2-4 months"
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
                            placeholder="Describe your project goals, features, and ideal outcome..."
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
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        className="w-full h-10 mt-2 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-medium rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-shadow disabled:opacity-60"
                    >
                        {isSubmitting ? (
                            <motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                        ) : (
                            <><Send className="h-4 w-4" />Send Inquiry</>
                        )}
                    </motion.button>

                    {submitError && <p className="text-red-400 text-xs text-center">{submitError}</p>}

                    <p className="text-xs text-center text-neutral-500">
                        We'll get back to you within 24 hours
                    </p>
                    </>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}

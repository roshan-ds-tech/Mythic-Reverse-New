import React from 'react';
import { cn } from '../../lib/utils';
import { Plus } from 'lucide-react';

export function ContactCard({
    title = 'Contact With Us',
    description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
    contactInfo,
    className,
    formSectionClassName,
    children,
    ...props
}) {
    return (
        <div
            className={cn(
                'relative h-full w-full overflow-hidden transition-all duration-500',
                'bg-zinc-950/40 backdrop-blur-xl border border-white/10 group hover:border-purple-500/50',
                'grid md:grid-cols-2 lg:grid-cols-3 rounded-[2rem] shadow-2xl shadow-black',
                className,
            )}
            {...props}
        >
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/10 blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            {/* Decorative Corner Icons */}
            <Plus className="absolute top-6 left-6 h-4 w-4 text-purple-500/40" />
            <Plus className="absolute top-6 right-6 h-4 w-4 text-purple-500/40" />
            <Plus className="absolute bottom-6 left-6 h-4 w-4 text-purple-500/40" />
            <Plus className="absolute bottom-6 right-6 h-4 w-4 text-purple-500/40" />

            {/* Left Content Section */}
            <div className="flex flex-col justify-between lg:col-span-2 relative z-10 border-b border-white/5 md:border-b-0 md:border-r">
                <div className="relative h-full flex flex-col justify-center px-8 py-16 md:p-16 lg:p-20">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold md:text-5xl lg:text-7xl text-white tracking-tighter leading-tight uppercase italic font-black">
                            {title.split(' ').map((word, i) => (
                                <span key={i} className={i % 2 !== 0 ? 'text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400' : ''}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h2>
                        <p className="text-zinc-400 max-w-xl text-lg md:text-xl font-light leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
                        {contactInfo?.map((info, index) => (
                            <ContactInfo key={index} {...info} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Form Section */}
            <div
                className={cn(
                    'bg-white/[0.02] flex h-full w-full items-center p-8 md:p-12 lg:p-16 relative z-10',
                    formSectionClassName,
                )}
            >
                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}

function ContactInfo({
    icon: Icon,
    label,
    value,
    className,
    ...props
}) {
    return (
        <div className={cn('flex flex-col gap-4 group/info', className)} {...props}>
            <div className="w-12 h-12 flex items-center justify-center bg-white/[0.03] border border-white/10 rounded-2xl group-hover/info:border-purple-500/50 group-hover/info:bg-purple-500/5 transition-all duration-300">
                <Icon className="h-6 w-6 text-purple-400 group-hover/info:scale-110 transition-transform duration-300" />
            </div>
            <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-white font-medium text-lg leading-tight">{value}</p>
            </div>
        </div>
    );
}

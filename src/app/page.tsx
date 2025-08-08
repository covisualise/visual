"use client";
import React, { FC, ReactNode, useState, useEffect, useRef } from 'react';
import { Video, Film, Music, Zap, Star, CheckCircle, Globe, Briefcase, Clock, FolderOpen, Award, Menu, X, Mail, Phone } from 'lucide-react';

// Helper for conditional class names
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// Custom Hook for Count-Up Animation
const useCountUp = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    useEffect(() => {
        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(end * progress);
            
            if (frame === totalFrames) {
                setCount(end);
                clearInterval(counter);
            } else {
                setCount(currentCount);
            }
        }, frameRate);

        return () => clearInterval(counter);
    }, [end, duration, frameRate, totalFrames]);

    return count;
};


// UI Components (Inspired by shadcn/ui for clean structure)
// -----------------------------------------------------------------------------

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Card: FC<CardProps> = ({ className, children, ...props }) => (
  <div
    className={cn(
      'rounded-xl border border-cyan-500/20 bg-black/30 text-white shadow-lg backdrop-blur-sm transition-all duration-300',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const CardHeader: FC<CardProps> = ({ className, children, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
    {children}
  </div>
);

const CardTitle: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => (
  <h3 className={cn('font-heading text-2xl font-semibold leading-none tracking-tight', className)} {...props}>
    {children}
  </h3>
);

const CardDescription: FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => (
  <p className={cn('text-sm text-neutral-400', className)} {...props}>
    {children}
  </p>
);

const CardContent: FC<CardProps> = ({ className, children, ...props }) => (
  <div className={cn('p-6 pt-0', className)} {...props}>
    {children}
  </div>
);

const CardFooter: FC<CardProps> = ({ className, children, ...props }) => (
    <div className={cn('flex items-center p-6 pt-0', className)} {...props}>
        {children}
    </div>
);


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button: FC<ButtonProps> = ({ className, variant = 'default', size = 'default', ...props }) => {
  const baseClasses =
    'font-heading inline-flex items-center justify-center rounded-md text-sm font-bold uppercase tracking-wider ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const variants = {
    default: 'bg-orange-600 text-black hover:bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)] hover:shadow-[0_0_25px_rgba(249,115,22,0.8)]',
    destructive: 'bg-red-500 text-destructive-foreground hover:bg-red-500/90',
    outline: 'border-2 border-cyan-400 bg-transparent hover:bg-cyan-400/10 text-cyan-400 hover:text-cyan-300',
    secondary: 'bg-neutral-800 text-secondary-foreground hover:bg-neutral-700',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };

  const sizes = {
    default: 'h-11 px-6 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-12 rounded-md px-8 text-base',
    icon: 'h-10 w-10',
  };

  return <button className={cn(baseClasses, variants[variant], sizes[size], className)} {...props} />;
};

// Custom SVG Icons for Social Media
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path><path d="M19.07 4.93a10 10 0 1 1-14.14 0 10 10 0 0 1 14.14 0z"></path></svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 2L11 13L2 9L22 2zM11 13L22 22L11 13z"></path></svg>
);

// Animation Wrapper Component
const AnimatedSection = ({ children }: { children: ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={cn(
                'transition-all duration-1000 ease-out',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
        >
            {children}
        </div>
    );
};


// Page Sections
// -----------------------------------------------------------------------------

const Navbar = ({ isVisible }: { isVisible: boolean }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = [
        { href: '#features', label: 'Features' },
        { href: '#portfolio', label: 'Portfolio' },
        { href: '#pricing', label: 'Pricing' },
        { href: '#experience', label: 'Experience' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <nav className={cn(
            'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        )}>
            <div className="container mx-auto flex items-center justify-between p-4 bg-black/50 backdrop-blur-lg border-b border-neutral-800">
                <a href="#" className="flex items-center space-x-2">
                    <Film className="h-6 w-6 text-orange-500" />
                    <span className="font-heading font-bold text-xl text-white">Visualise.Co</span>
                </a>
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="text-sm font-medium text-neutral-300 hover:text-orange-500 transition-colors">
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-black/80 backdrop-blur-lg">
                    <div className="container mx-auto flex flex-col items-center space-y-4 p-4">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-neutral-300 hover:text-orange-500 transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

const Hero = () => {
    const words = ['Masterpiece', 'Video Editing', 'Graphics'];
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex(prevIndex => (prevIndex + 1) % words.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto animate-slide-in-up">
                    <div className="inline-block rounded-full bg-neutral-900/50 border border-neutral-700 px-3 py-1 text-sm text-orange-500 mb-4">
                        Professional Video Editing Service
                    </div>
                    <h1 className="font-heading text-4xl font-bold tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl leading-tight glitch" data-text="Craft Your Cinematic Masterpiece">
                        Craft Your Cinematic{' '}
                        <span className="relative inline-block h-[1.2em] w-[12ch] overflow-hidden align-bottom">
                            {words.map((word, index) => (
                                <span
                                    key={word}
                                    className={cn(
                                        'absolute bottom-0 left-0 w-full text-orange-500 transition-all duration-500 ease-in-out',
                                        index === wordIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
                                    )}
                                >
                                    {word}
                                </span>
                            ))}
                        </span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-neutral-300 md:text-xl">
                        From raw footage to breathtaking final cuts. We bring your vision to life with professional editing, color grading, and sound design.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#features">
                            <Button size="lg">Get Started Now</Button>
                        </a>
                        <a href="#portfolio">
                            <Button size="lg" variant="outline">
                                <Film className="mr-2 h-5 w-5" />
                                View Our Work
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Features = () => {
  const features = [
    {
      icon: <Video className="h-8 w-8 text-orange-500" />,
      title: '4K & 8K Editing',
      description: 'Crystal-clear, high-resolution editing for a stunning visual experience on any screen.',
    },
    {
      icon: <Film className="h-8 w-8 text-orange-500" />,
      title: 'Cinematic Color Grading',
      description: 'We set the mood and tone of your video with professional color correction and grading.',
    },
    {
      icon: <Music className="h-8 w-8 text-orange-500" />,
      title: 'Web Development',
      description: 'Immersive audio experiences with custom sound design, mixing, and mastering.',
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-500" />,
      title: 'Motion Graphics & VFX',
      description: 'Engage your audience with custom motion graphics, titles, and subtle visual effects.',
    },
  ];

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-5xl">What We Offer</h2>
            <p className="max-w-[900px] text-neutral-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our comprehensive suite of editing services ensures your final product is polished, professional, and powerful.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="feature-card flex items-center gap-4 p-6 rounded-lg transition-all duration-300">
              <div className="bg-neutral-900 p-3 rounded-full border border-neutral-800">{feature.icon}</div>
              <div className="grid gap-1">
                <h3 className="font-heading text-lg font-bold text-left">{feature.title}</h3>
                <p className="text-sm text-neutral-400 text-left">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ViewWork = () => (
    <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32 text-white">
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-5xl">Explore Our Portfolio</h2>
                    <p className="max-w-[900px] text-neutral-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Take a look at some of the stunning videos we've crafted for our clients.
                    </p>
                </div>
                <div className="mt-6">
                    {/* IMPORTANT: Replace '#' with your actual Google Drive link */}
                    <a href="https://drive.google.com/drive/folders/1N9dABQhRzAaGA3oSDS-PmFL9oMqVWDLW" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" variant="default">
                            <FolderOpen className="mr-2 h-5 w-5" />
                            View on Google Drive
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    </section>
);

const Pricing = () => {
    const plans = [
        {
            title: 'Starter',
            price: '₹15,000',
            description: 'For short personal projects and social media content.',
            features: ['Up to 2 min video', '2-day turnaround', '2 rounds of revisions', '1080p Export','5 Videos'],
            popular: false,
        },
        {
            title: 'Pro',
            price: '₹30,000',
            description: 'Perfect for creators, businesses, and short films.',
            features: ['Up to 15 min video', '4-day turnaround', '3 rounds of revisions', '4K Export', 'Color Grading', '20 Videos'],
            popular: true,
        },
        {
            title: 'Enterprise',
            price: 'Custom',
            description: 'For feature films, documentaries, and large-scale projects.',
            features: ['Unlimited length', 'Dedicated editor', 'Unlimited revisions', '8K+ Export', 'Advanced VFX',],
            popular: false,
        },
    ];

    return (
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 text-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
                        <p className="max-w-[900px] text-neutral-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Choose a plan that fits your needs. No hidden fees, just great results.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
                    {plans.map((plan) => (
                        <Card key={plan.title} className={cn('flex flex-col transition-all duration-300 hover:scale-105 hover:border-orange-500/50 hover:shadow-orange-500/20', plan.popular && 'border-orange-500/50 ring-2 ring-orange-500/50')}>
                            {plan.popular && (
                                <div className="bg-orange-600 text-white text-xs font-bold uppercase tracking-wider text-center py-1 rounded-t-xl">
                                    Most Popular
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle>{plan.title}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="mb-6">
                                    <span className="font-heading text-4xl font-bold">{plan.price}</span>
                                    {plan.title !== 'Enterprise' && <span className="text-neutral-400">/project</span>}
                                </div>
                                <ul className="space-y-3 text-sm">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center">
                                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <a href="#contact" className="w-full">
                                    <Button className="w-full" variant={plan.popular ? 'default' : 'secondary'}>
                                        Contact Us
                                    </Button>
                                </a>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AnimatedStat = ({ value, label, icon }: { value: number, label: string, icon: ReactNode }) => {
    const count = useCountUp(value);
    return (
        <div className="bg-neutral-900/50 border border-neutral-800 flex flex-col items-center text-center p-6 rounded-xl">
            <div className="font-heading text-4xl font-bold text-white mb-2">{count}+</div>
            <div className="flex items-center">
                {icon}
                <p className="text-neutral-400 ml-2">{label}</p>
            </div>
        </div>
    );
};

const Experience = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const stats = [
        { icon: <Globe className="w-8 h-8 text-orange-400" />, value: 150, label: "Clients Worldwide" },
        { icon: <Briefcase className="w-8 h-8 text-orange-400" />, value: 300, label: "Projects Completed" },
        { icon: <Award className="w-8 h-8 text-orange-400" />, value: 5, label: "Years of Experience" },
    ];

    return (
        <section ref={sectionRef} id="experience" className="w-full py-12 md:py-24 lg:py-32 text-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-5xl">Our Achievements</h2>
                        <p className="max-w-[900px] text-neutral-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            We have a track record of delivering exceptional results for a diverse range of clients.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
                    {isVisible && stats.map((stat, index) => (
                        <AnimatedStat key={index} {...stat} />
                    ))}
                </div>
                 <div className="text-center mt-16">
                    <h3 className="font-heading text-2xl font-bold tracking-tighter">Working Hours</h3>
                    <p className="text-neutral-300 mt-2">Monday - Friday: 9:00 AM - 6:00 PM (IST)</p>
                    <p className="text-neutral-400 text-sm mt-1">Available for rush projects on weekends by appointment.</p>
                </div>
            </div>
        </section>
    );
};


const Testimonials = () => {
    const testimonials = [
        { name: 'Alex Johnson', initial: 'AJ', quote: "The final cut was beyond my expectations. The color grading gave my film the exact mood I was looking for. Truly cinematic!" },
        { name: 'Samantha Bee', initial: 'SB', quote: "Incredible turnaround time and the quality was top-notch. They transformed my raw footage into a compelling story." },
        { name: 'Michael Chen', initial: 'MC', quote: "The motion graphics were sleek and professional. It added a layer of polish that took my corporate video to the next level." },
        { name: 'Priya Patel', initial: 'PP', quote: "I was blown away by the sound design. It completely immersed me in the film. I'll definitely be coming back for future projects." },
        { name: 'David Rodriguez', initial: 'DR', quote: "A seamless process from start to finish. Communication was excellent, and they were very receptive to my feedback." },
        { name: 'Emily White', initial: 'EW', quote: "They handled my 8K footage flawlessly. The final export was crisp, clean, and absolutely stunning on a big screen." },
    ];

    const firstColumn = testimonials.slice(0, 3);
    const secondColumn = testimonials.slice(3, 6);

    return (
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 text-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="inline-block rounded-lg bg-neutral-800 px-3 py-1 text-sm text-orange-500">Testimonials</div>
                    <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-5xl">What Our Clients Say</h2>
                    <p className="max-w-[900px] text-neutral-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Real stories from real clients who trust us with their vision.
                    </p>
                </div>
                <div className="relative flex h-[450px] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="flex flex-col gap-6 animate-marquee-up">
                            {firstColumn.map((item, index) => (
                                <TestimonialCard key={index} {...item} />
                            ))}
                             {firstColumn.map((item, index) => (
                                <TestimonialCard key={`dup-1-${index}`} {...item} aria-hidden="true" />
                            ))}
                        </div>
                        <div className="flex flex-col gap-6 animate-marquee-down">
                            {secondColumn.map((item, index) => (
                                <TestimonialCard key={index} {...item} />
                            ))}
                            {secondColumn.map((item, index) => (
                                <TestimonialCard key={`dup-2-${index}`} {...item} aria-hidden="true" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const TestimonialCard = ({ name, initial, quote }: { name: string, initial: string, quote: string }) => (
    <Card className="bg-neutral-900 border-neutral-800 p-6">
        <CardContent className="p-0">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-900/50 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold mr-4">
                    {initial}
                </div>
                <p className="font-semibold text-white">{name}</p>
            </div>
            <p className="text-neutral-300">"{quote}"</p>
        </CardContent>
    </Card>
);

const Contact = () => {
    return (
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 text-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center">
                    <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-5xl">Get In Touch</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-neutral-300 md:text-xl/relaxed">
                        Have a project in mind or just want to say hello? We'd love to hear from you.
                    </p>
                </div>
                <div className="mt-12 max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                    <div className="flex flex-col space-y-4">
                        <input type="text" placeholder="Your Name" className="bg-neutral-900 border border-neutral-800 rounded-md px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        <input type="email" placeholder="Your Email" className="bg-neutral-900 border border-neutral-800 rounded-md px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        <textarea placeholder="Your Message" rows={5} className="bg-neutral-900 border border-neutral-800 rounded-md px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
                        <Button variant="default" size="lg">Send Message</Button>
                    </div>
                    <div className="flex flex-col justify-center space-y-6">
                        <div className="flex items-center space-x-4">
                            <Mail className="w-6 h-6 text-orange-500" />
                            <div>
                                <h3 className="text-lg font-semibold text-white">Email</h3>
                                <a href="mailto:contact@cinecut.com" className="text-neutral-300 hover:text-orange-500">covisualise@gmail.com</a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Phone className="w-6 h-6 text-orange-500" />
                            <div>
                                <h3 className="text-lg font-semibold text-white">Phone</h3>
                                <p className="text-neutral-300">+91 8707690924</p>
                            </div>
                        </div>
                        <div className="flex space-x-4 pt-4">
                           <a href="https://wa.me/+919598822384" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-orange-500 transition-colors"><WhatsAppIcon className="w-8 h-8" /></a>
                           <a href="https://www.instagram.com/visualise._co?igsh=azZzbXVrdWMxemJm" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-orange-500 transition-colors"><InstagramIcon className="w-8 h-8" /></a>
                           <a href="https://t.me/Visualiseco" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-orange-500 transition-colors"><TelegramIcon className="w-8 h-8" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    const navLinks = [
        { href: '#features', label: 'Features' },
        { href: '#pricing', label: 'Pricing' },
        { href: '#experience', label: 'Experience' },
    ];

    return (
        <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400">
            <div className="container mx-auto py-12 px-4 md:px-6 text-center">
                <h2 className="font-heading text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                    Ready to Start Your Next Project?
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-300">
                    Let's collaborate to create something extraordinary.
                </p>
                <div className="mt-8">
                    <a href="#contact">
                        <Button size="lg" variant="default">
                            Let's Talk
                        </Button>
                    </a>
                </div>
            </div>

            <div className="border-t border-neutral-800">
                <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Film className="h-6 w-6 text-orange-500" />
                        <span className="font-heading font-bold text-xl text-white">Visualise.Co</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className="text-sm hover:text-orange-500 transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="https://wa.me/+919598822384" className="text-neutral-400 hover:text-orange-500 transition-colors"><WhatsAppIcon className="w-6 h-6" /></a>
                        <a href="https://www.instagram.com/visualise._co?igsh=azZzbXVrdWMxemJm" className="text-neutral-400 hover:text-orange-500 transition-colors"><InstagramIcon className="w-6 h-6" /></a>
                        <a href="https://t.me/Visualiseco" className="text-neutral-400 hover:text-orange-500 transition-colors"><TelegramIcon className="w-6 h-6" /></a>
                    </div>
                </div>
            </div>

            <div className="bg-black py-4">
                <p className="text-center text-sm text-neutral-500">
                    &copy; {new Date().getFullYear()} CineCut Studios. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};


// Main App Component
// -----------------------------------------------------------------------------

export default function App() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.9) {
        setIsNavbarVisible(true);
      } else {
        setIsNavbarVisible(false);
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        className="glass-cursor"
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&display=swap');
          
          .font-heading {
            font-family: 'Exo 2', sans-serif;
          }

          body {
            cursor: none;
          }
          .glass-cursor {
            position: fixed;
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease-out;
          }
          @keyframes marquee-up {
            from { transform: translateY(0); }
            to { transform: translateY(-50%); }
          }
          @keyframes marquee-down {
            from { transform: translateY(-50%); }
            to { transform: translateY(0); }
          }
          .animate-marquee-up {
            animation: marquee-up 30s linear infinite;
          }
          .animate-marquee-down {
            animation: marquee-down 30s linear infinite;
          }
          @keyframes slide-in-up {
            from {
              transform: translateY(30px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .animate-slide-in-up {
            animation: slide-in-up 1s ease-out 0.2s forwards;
            opacity: 0;
          }
          
          .feature-card:hover {
            background-color: rgba(22, 163, 74, 0.1);
            border-left: 4px solid #f97316;
          }
          .glitch {
            position: relative;
          }
          .glitch:before, .glitch:after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            overflow: hidden;
            clip: rect(0, 900px, 0, 0);
          }
          .glitch:before {
            left: 2px;
            text-shadow: -2px 0 #00ffff;
            animation: glitch-anim-1 2s infinite linear alternate-reverse;
          }
          .glitch:after {
            left: -2px;
            text-shadow: -2px 0 #ff00ff;
            animation: glitch-anim-2 2s infinite linear alternate-reverse;
          }
          @keyframes glitch-anim-1 {
            0% { clip: rect(42px, 9999px, 44px, 0); }
            /* ... more steps ... */
            100% { clip: rect(92px, 9999px, 98px, 0); }
          }
          @keyframes glitch-anim-2 {
            0% { clip: rect(12px, 9999px, 54px, 0); }
            /* ... more steps ... */
            100% { clip: rect(62px, 9999px, 88px, 0); }
          }
        `}
      </style>
      <Navbar isVisible={isNavbarVisible} />
      <main className="bg-black antialiased">
        <div className="bg-black/50">
            <Hero />
            <AnimatedSection><Features /></AnimatedSection>
            <AnimatedSection><ViewWork /></AnimatedSection>
            <AnimatedSection><Pricing /></AnimatedSection>
            <AnimatedSection><Experience /></AnimatedSection>
            <AnimatedSection><Testimonials /></AnimatedSection>
            <AnimatedSection><Contact /></AnimatedSection>
            <Footer />
        </div>
      </main>
    </>
  );
}

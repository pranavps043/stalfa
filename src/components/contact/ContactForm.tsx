"use client";

import React, { useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  motion,
  type MotionValue,
} from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { LocationMap } from "@/components/ui/expand-map";
import {
  Wifi,
  BatteryFull,
  Signal,
  Home,
  Instagram,
  Loader2,
  CheckCircle2,
  XCircle,
  Phone,
} from "lucide-react";
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const EMAILJS_PUBLIC_KEY = '2btwHfBcH1Fcg-d1q';

if (typeof window !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

const cn = (...classes: (string | undefined | null | false)[]): string => 
  classes.filter(Boolean).join(' ');

/* ------------------------------------------------------------------------------------
 TYPE DEFINITIONS
------------------------------------------------------------------------------------ */

interface FormData extends Record<string, unknown> {
  first_name: string;
  last_name: string;
  user_email: string;
  subject: string;
  message: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default';
  size?: 'default';
  asChild?: boolean;
  className?: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  children?: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}

interface HeaderProps {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}

interface TabletCardProps {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}

/* ------------------------------------------------------------------------------------
 BUTTON
------------------------------------------------------------------------------------ */

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      size: { default: "h-10 px-4 py-2" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ 
  className, 
  variant = 'default', 
  size = 'default', 
  asChild = false, 
  ...props 
}, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});
Button.displayName = "Button";

/* ------------------------------------------------------------------------------------
 INPUTS
------------------------------------------------------------------------------------ */

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <input
    ref={ref}
    className="flex h-10 w-full rounded-md border border-white/55 bg-transparent px-3 py-2 text-sm text-white/90 placeholder-white/50 transition-colors hover:border-amber-400/50 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-600/30"
    {...props}
  />
));
Input.displayName = "Input";

const Label = React.forwardRef<HTMLLabelElement, LabelProps>((props, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className="text-sm font-medium leading-none"
    {...props}
  />
));
Label.displayName = "Label";

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => (
  <textarea
    ref={ref}
    className="flex min-h-[60px] w-full rounded-md border border-white/55 bg-transparent px-3 py-2 text-sm text-white/90 placeholder-white/50 transition-colors hover:border-amber-400/50 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
    {...props}
  />
));
Textarea.displayName = "Textarea";

/* ------------------------------------------------------------------------------------
 CONTACT FORM
------------------------------------------------------------------------------------ */

const Contact2 = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await emailjs.send(
        'service_58uv2na',
        'template_x292gcv',
        formData,
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setStatusMessage('Message sent successfully!');
        setFormData({
          first_name: '',
          last_name: '',
          user_email: '',
          subject: '',
          message: ''
        });
        
        setTimeout(() => {
          setSubmitStatus('idle');
          setStatusMessage('');
        }, 5000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Failed to send message. Please try again.');
      console.error('EmailJS Error:', error);
      
      setTimeout(() => {
        setSubmitStatus('idle');
        setStatusMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pt-9 pb-11">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Contact Info Section */}
        <div className="w-full lg:max-w-md flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-semibold pb-4 bg-gradient-to-r from-amber-400 via-yellow-200 to-white text-transparent bg-clip-text">
            Contact Us
          </h2>
          <p className="text-muted-foreground pb-4 sm:pb-6 text-sm sm:text-base">
            We are available for questions, feedback, or collaboration
            opportunities.
          </p>
          <ul className="ml-4 space-y-2 text-sm sm:text-base">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Phone: (123) 34567890</span>
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>Email: email@example.com</span>
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <span>Web: shadcnblocks.com</span>
            </li>
          </ul>
          
          {/* Location Card */}
          <div className="pt-6">
            <p className="text-sm font-bold tracking-wider uppercase mb-3 bg-gradient-to-r from-amber-400 via-yellow-200 to-white text-transparent bg-clip-text">
              Our Location
            </p>
            <LocationMap 
              location="Stalfa, TVM" 
              coordinates="8.5241° N, 76.9366° E"
              className="w-full max-w-xs mx-auto sm:mx-0"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full max-w-lg mx-auto lg:mx-0">
          <div className="rounded-lg border border-white/25 bg-black/60 backdrop-blur-sm p-4 sm:p-5 space-y-3">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <Label htmlFor="first_name" className="text-white/80 text-sm mb-1 block">First Name</Label>
                <Input 
                  id="first_name" 
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First Name" 
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="w-full sm:w-1/2">
                <Label htmlFor="last_name" className="text-white/80 text-sm mb-1 block">Last Name</Label>
                <Input 
                  id="last_name" 
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name" 
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="user_email" className="text-white/80 text-sm mb-1 block">Email</Label>
              <Input 
                id="user_email" 
                name="user_email"
                type="email"
                value={formData.user_email}
                onChange={handleChange}
                placeholder="your.email@example.com" 
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="subject" className="text-white/80 text-sm mb-1 block">Subject</Label>
              <Input 
                id="subject" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?" 
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-white/80 text-sm mb-1 block">Message</Label>
              <Textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..." 
                rows={5} 
                required
                disabled={isSubmitting}
              />
            </div>
            
            {/* Status Message */}
            {submitStatus !== 'idle' && (
              <div className={`flex items-center gap-2 p-3 rounded-md ${
                submitStatus === 'success' 
                  ? 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400' 
                  : 'bg-red-500/20 border border-red-500/50 text-red-400'
              }`}>
                {submitStatus === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <span className="text-sm">{statusMessage}</span>
              </div>
            )}
            
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full mt-2 bg-white text-black hover:bg-black hover:text-white hover:border hover:border-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------------------------
 SERVICES HERO (Placeholder)
------------------------------------------------------------------------------------ */

const ServicesHero = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
    </div>
  );
};

/* ------------------------------------------------------------------------------------
 TABLET HARDWARE
------------------------------------------------------------------------------------ */

const TabletHardware = () => {
  return (
    <div className="absolute top-[6px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
      <div className="h-[6px] w-20 rounded-full bg-gradient-to-b from-neutral-400 to-neutral-700 shadow-inner" />
      <div className="relative h-3.5 w-3.5 rounded-full bg-neutral-900 border border-neutral-600">
        <div className="absolute inset-1 rounded-full bg-neutral-700" />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------------------------
 STATUS BAR
------------------------------------------------------------------------------------ */

const TabletStatusBar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 h-10 px-4 flex items-center justify-between text-white/80 text-[10px] xs:text-xs bg-black/60 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/70 to-transparent blur-sm" />
      
      <div className="relative z-10 flex items-center gap-2">
        <span className="font-medium">9:41</span>
        <Instagram className="w-4 h-4" />
      </div>

      <div className="relative z-10 flex items-center gap-2">
        <Wifi className="w-4 h-4" />
        <Signal className="w-4 h-4" />
        <div className="flex items-center gap-1">
          <BatteryFull className="w-4 h-4" />
          <span>87%</span>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------------------------
 MENU BAR
------------------------------------------------------------------------------------ */

const TabletMenuBar = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 h-14 sm:h-16 bg-black/60 backdrop-blur-md border-t border-white/10 flex items-center justify-around text-white/70">
      <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center border border-white/20">
        <Home className="w-5 h-5 text-white/50" />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------------------------
 SCROLL CONTAINER
------------------------------------------------------------------------------------ */

const ContainerScroll: React.FC<ContainerScrollProps> = ({ titleComponent, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.8], [0.95, 1]), {
    stiffness: 120,
    damping: 25,
    mass: 0.8,
  });

  const rotate = useSpring(useTransform(scrollYProgress, [0, 0.5, 0.9], [15, 5, 0]), {
    stiffness: 120,
    damping: 25,
    mass: 0.8,
  });

  const translate = useSpring(useTransform(scrollYProgress, [0, 0.8], [0, -80]), {
    stiffness: 120,
    damping: 30,
    mass: 0.8,
  });

  return (
    <div ref={containerRef} className="h-[50rem] md:h-[59rem] flex items-start pt-20 md:pt-34 relative">
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <TabletCard rotate={rotate} scale={scale}>
          {children}
        </TabletCard>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------------------------
 HEADER
------------------------------------------------------------------------------------ */

const Header: React.FC<HeaderProps> = ({ translate, titleComponent }) => (
  <motion.div style={{ translateY: translate }} className="max-w-5xl mx-auto text-center">
    {titleComponent}
  </motion.div>
);

/* ------------------------------------------------------------------------------------
 TABLET CARD
------------------------------------------------------------------------------------ */

const TabletCard: React.FC<TabletCardProps> = ({ rotate, scale, children }) => {
  return (
    <motion.div
      style={{ rotateX: rotate, scale }}
      className={`
        relative 
        max-w-6xl 
        mx-auto 
        h-[38rem] 
        md:h-[41rem] 
        w-full 
        rounded-[44px]
        bg-gradient-to-br 
        from-[#3a3a3a] 
        via-[#242424] 
        to-[#0f0f0f]
        shadow-[0_45px_90px_rgba(0,0,0,0.75),inset_0_2px_2px_rgba(255,255,255,0.12),inset_0_-6px_10px_rgba(0,0,0,0.9)]
        px-[12px] 
        pt-[25px] 
        pb-[12px]
      `}
    >
      <div className="absolute inset-[2px] rounded-[40px] border border-white/5 pointer-events-none" />
      <TabletHardware />
      <div className="relative h-full w-full rounded-[20px] sm:rounded-[30px] bg-black overflow-hidden shadow-inner">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(/sample.png)',
            opacity: 0.9
          }}
        />
        <div className="absolute inset-0 bg-black/20">
          <TabletStatusBar />
          <div 
            className="relative z-10 w-full pb-1 px-4 sm:px-6 md:px-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500 transition-colors" 
            style={{ 
              height: 'calc(100% - 3.5rem)',
              scrollbarWidth: 'thin',
              scrollbarColor: '#585858ff transparent',
              msOverflowStyle: 'none',
            }}
          >
            {children}
          </div>
          <TabletMenuBar />
        </div>
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------------------------
 MAIN PAGE
------------------------------------------------------------------------------------ */

export default function ContactPage() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden bg-black">
      <ServicesHero />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative z-10 -mt-10">
        <ContainerScroll
          titleComponent={
            <div className="text-center px-4">
              <p className="text-xs sm:text-sm tracking-widest uppercase text-white/60">
                Let&apos;s connect
              </p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-amber-400 via-yellow-200 to-white text-transparent bg-clip-text" style={{ marginBottom: '-46px' }}>
                Get in Touch
              </h1>
            </div>
          }
        >
          <Contact2 />
        </ContainerScroll>
      </div>
    </div>
  );
}
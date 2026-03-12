'use client';

import {
  HomeIcon,
  User,
  Settings,
  Briefcase,
  Mail,
  X,
  Package,
  FilePenLine,
} from 'lucide-react';

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from 'framer-motion';

import React, {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

/* -------------------- DATA -------------------- */
const data = [
  {
    title: 'Home',
    icon: (
      <HomeIcon className='h-full w-full text-neutral-600 dark:text-yellow-300' />
    ),
    href: '/',
  },
  {
    title: 'About Us',
    icon: (
      <User className='h-full w-full text-neutral-600 dark:text-yellow-300' />
    ),
    href: '/about',
  },
  {
    title: 'Services',
    icon: (
      <Settings className='h-full w-full text-neutral-600 dark:text-yellow-300' />
    ),
    href: '/services',
  },
  {
    title: 'Careers',
    icon: (
      <Briefcase className='h-full w-full text-neutral-600 dark:text-yellow-300' />
    ),
    href: '/careers',
  },
  {
    title: 'Products',
    icon: (
      <Package className='h-full w-full text-neutral-600 dark:text-yellow-300' />
    ),
    href: '/products',
  },
  {
    title: 'Blog',
    icon: (
      <FilePenLine className='h-full w-full text-neutral-600 dark:text-yellow-300' />
    ),
    href: '/blog',
  },
  {
    title: 'Contact Us',
    icon: (
      <Mail className='h-full w-full text-neutral-600 dark:text-yellow-300' />
    ),
    href: '/contact',
  },
];

/* -------------------- TYPES -------------------- */

const DEFAULT_MAGNIFICATION = 70;
const DEFAULT_DISTANCE = 100;
const DEFAULT_PANEL_HEIGHT = 75;

type DockProps = {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  panelHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
};

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  width?: MotionValue<number>;
};

type DockLabelType = React.FC<DockLabelProps> & { displayName?: string };
type DockIconType = React.FC<DockIconProps> & { displayName?: string };

type DocContextType = {
  mouseX: MotionValue;
  spring: SpringOptions;
  magnification: number;
  distance: number;
};

/* -------------------- CONTEXT -------------------- */

const DockContext = createContext<DocContextType | undefined>(undefined);

function useDock() {
  const context = useContext(DockContext);
  if (!context) throw new Error('useDock must be used within DockProvider');
  return context;
}

function DockProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: DocContextType;
}) {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>;
}

/* -------------------- DOCK COMPONENTS -------------------- */

function Dock({
  children,
  className,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const height = 95;

  return (
    <motion.div
      style={{ height, scrollbarWidth: 'none' }}
      className="flex w-full items-end overflow-x-auto"
    >
      <motion.div
        onMouseMove={(event: React.MouseEvent) => {
          const pageX = event.pageX;
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={cn(
          'flex w-full justify-center gap-8 rounded-2xl bg-gray-50 px-4 dark:bg-neutral-900',
          className
        )}
        style={{ height: panelHeight,paddingBottom: 20 }}
        role="toolbar"
        aria-label="Application dock"
      >
        <DockProvider value={{ mouseX, spring, distance, magnification }}>
          {children}
        </DockProvider>
      </motion.div>
    </motion.div>
  );
}

function DockItem({ children, className }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { distance, magnification, mouseX, spring } = useDock();
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val: number) => {
    const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - domRect.x - domRect.width / 2;
  });

  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [45, magnification, 45]
  );

  const width = useSpring(widthTransform, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      className={cn(
        'relative inline-flex items-center justify-center',
        className
      )}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return cloneElement(child, {
            ...(child.type === DockLabel ? { isHovered } : {}),
            ...(child.type === DockIcon ? { width } : {})
          });
        }
        return child;
      })}
    </motion.div>
  );
}

const DockLabel: DockLabelType = ({ children, className, isHovered }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsub = isHovered.on('change', (v: number) => setVisible(v === 1));
    return () => unsub();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'absolute -bottom-7 left-1/2 w-fit whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white',
            className
          )}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
DockLabel.displayName = 'DockLabel';

const DockIcon: DockIconType = ({ children, className, width }) => {
  const fallbackWidth = useMotionValue(0);
  const widthTransform = useTransform(
    width ?? fallbackWidth,
    (val: number) => val / 2
  );

  return (
    <motion.div
      style={{ width: widthTransform }}
      className={cn('flex items-center justify-center', className)}
    >
      {children}
    </motion.div>
  );
};
DockIcon.displayName = 'DockIcon';

/* -------------------- NAVBAR COMPONENT (FINAL EXPORT) -------------------- */
export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [activePath, setActivePath] = useState(() => 
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const navbarRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);



  // Check if mobile/tablet view
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 1280;
      if (!mobile) setIsMobileMenuOpen(false);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && 
          !(event.target as HTMLElement).closest('button[aria-label="Toggle menu"]')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = currentScrollPos > prevScrollPos && currentScrollPos > 10;
      
      if (isScrollingDown && isVisible) {
        setIsVisible(false);
      } else if (!isScrollingDown && !isVisible) {
        setIsVisible(true);
      }
      
      setPrevScrollPos(currentScrollPos);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, prevScrollPos]);

  // Animation variants
  const navVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 },
  };

  const menuContainerVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      },
    },
    closed: {
      x: '100%',
      opacity: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        staggerDirection: -1
      },
    },
  };

  const menuItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { 
        y: { stiffness: 1000, velocity: -100 } 
      }
    },
    closed: {
      y: 50,
      opacity: 0,
       transition: { 
        y: { stiffness: 1000 } 
      }
    },
  };

  const logoVariants = {
    visible: { y: 0, opacity: 1, scale: 1 },
    hidden: { y: -100, opacity: 0, scale: 0.8 },
  };

  const transition = {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300,
  };

  return (
    <>
      {/* Mobile Menu Button - Hidden when menu is open */}
      <AnimatePresence>
        {!isMobileMenuOpen && (
          <motion.button
            className="fixed right-4 top-4 z-50 p-2 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm border border-gray-200 dark:border-neutral-800 xl:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              scale: isVisible ? 1 : 0.8,
              y: isVisible ? 0 : -20 
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5 p-1">
              <motion.span 
                className="w-full h-0.5 bg-neutral-800 dark:bg-white rounded-full"
                layoutId="line1" 
              />
              <motion.span 
                className="w-3/4 h-0.5 bg-neutral-800 dark:bg-white rounded-full ml-auto"
                layoutId="line2" 
              />
              <motion.span 
                className="w-full h-0.5 bg-neutral-800 dark:bg-white rounded-full"
                layoutId="line3" 
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Brand Logo with Scroll Animation */}
      <motion.div
        ref={navbarRef}
        className="fixed left-4 top-4 z-50"
        initial="visible"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={logoVariants}
        transition={transition}
      >
        <Link href="/" className="flex items-center cursor-pointer">
          <motion.div 
            className="h-20 w-20 p-1.5"
            whileHover={{ 
              scale: 1.05,
              rotate: [0, -2, 2, 0],
              transition: { duration: 0.5 }
            }}
          >
            <div className="bg-transparent w-full h-full flex items-center justify-center relative">
              <Image
                src="/logos.png"
                alt="STALFA Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Desktop Navigation - Hidden below 1280px (xl) */}
      <motion.div 
        className="hidden xl:block fixed left-0 right-0 top-0 z-40 px-4 py-2"
        initial="visible"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={navVariants}
        transition={transition}
      >
        <div className="max-w-[600px] mx-auto w-full">
          <Dock className="items-end w-full">
            {data.map((item, idx) => (
              <a 
                key={idx}
                href={item.href}
                className="flex flex-col items-center relative"
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(item.href);
                    target?.scrollIntoView({ behavior: 'smooth' });
                  }
                  setActivePath(item.href);
                }}
              >
                <DockItem
                  className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700 transition-colors duration-200"
                >
                  <DockLabel>{item.title}</DockLabel>
                  <DockIcon>{item.icon}</DockIcon>
                </DockItem>
                {activePath === item.href && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
              </a>
            ))}
          </Dock>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40 xl:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu Content */}
            <motion.div
              ref={mobileMenuRef}
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuContainerVariants}
              className="fixed top-0 right-0 h-full w-full sm:w-80 bg-white dark:bg-neutral-900 shadow-2xl z-50 p-6 overflow-y-auto"
            >
              {/* Close Button Inside Menu */}
              <div className="flex justify-end mb-8">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6 text-neutral-800 dark:text-white" />
                </motion.button>
              </div>

              <div className="flex flex-col space-y-2">
                {data.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.href}
                    variants={menuItemVariants}
                    className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors relative"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActivePath(item.href);
                    }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-2 bg-gray-100 dark:bg-neutral-800 rounded-full">
                      <span className="text-yellow-500 dark:text-yellow-400">
                        {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
                      </span>
                    </div>
                    <span className="text-lg font-medium text-gray-800 dark:text-white">{item.title}</span>
                    {activePath === item.href && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="absolute right-3 w-2 h-2 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30
                        }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
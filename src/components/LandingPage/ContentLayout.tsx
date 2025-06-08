'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface ContentLayoutProps {
  title: string;
  subtitle: string;
  isDoubleBtn: boolean;
  btn1?: { text: string; href: string };
  btn2?: { text: string; href: string };
  btn3?: { text: string; href: string };
  btnBoldText?: string;
  btnClickLink?: string;
  hoverColor?: string;
  children: React.ReactNode;
}

export default function ContentLayout({
  title,
  subtitle,
  isDoubleBtn,
  btn1,
  btn2,
  btn3,
  btnBoldText,
  btnClickLink,
  hoverColor,
  children,
}: ContentLayoutProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentTarget = targetRef.current;

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);
      });
    }, observerOptions);

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div ref={targetRef} />
      <section
        ref={sectionRef}
        className={cn(
          'text-center transition-all duration-700 ease-in-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        )}
      >
        <h1
          className={cn(
            'text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl transition-all duration-700 delay-100',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            'mt-6 text-lg leading-8 text-gray-600 transition-all duration-700 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
          )}
        >
          {subtitle}
        </p>
        <div
          className={cn(
            'mt-10 flex items-center justify-center gap-x-6 transition-all duration-700 delay-300',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
          )}
        >
          {isDoubleBtn ? (
            <>
              {btn1 && (
                <Link href={btn1.href}>
                  <Button className="px-6 py-6 text-base">{btn1.text}</Button>
                </Link>
              )}
              {btn2 && (
                <Link href={btn2.href}>
                  <Button variant="outline" className="px-6 py-6 text-base">
                    {btn2.text}
                  </Button>
                </Link>
              )}
              {btn3 && (
                <Link href={btn3.href}>
                  <Button variant="outline" className="px-6 py-6 text-base">
                    {btn3.text}
                  </Button>
                </Link>
              )}
            </>
          ) : (
            btnClickLink && (
              <Link href={btnClickLink}>
                <Button className={cn('px-6 py-6 text-base', hoverColor)}>{btnBoldText}</Button>
              </Link>
            )
          )}
        </div>
      </section>
      <div
        className={cn(
          'transition-all duration-700 delay-400',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        )}
      >
        {children}
      </div>
    </div>
  );
}

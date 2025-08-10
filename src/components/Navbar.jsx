import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Award, Palette, Users, Clock, Trophy, Phone, BarChart3, Vote } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', icon: Award },
    { name: 'Drawing Competition', href: '#drawing-competition', icon: Palette },
    { name: 'Teacher Awards', href: '#teacher-awards', icon: Users },
    { name: 'Timeline', href: '#timeline', icon: Clock },
    { name: 'Prizes', href: '#prizes', icon: Trophy },
    { name: 'Results', href: '/results', icon: BarChart3, isRoute: true },
    { name: 'Vote', href: '/vote', icon: Vote, isRoute: true },
    { name: 'Contact', href: '#contact', icon: Phone }
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('/')) {
      // Handle route navigation
      window.location.href = href;
    } else {
      // Handle section scrolling
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };
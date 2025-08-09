import React from 'react';
import { Award, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Drawing Competition', href: '#drawing-competition' },
    { name: 'Teacher Awards', href: '#teacher-awards' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl blur opacity-20"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Ignite & Inspire Karnataka</h3>
                <p className="text-slate-400">State-Level Competition & Awards 2025-26</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-md mb-6">
              Celebrating artistic excellence and educational leadership across Karnataka through 
              innovative competitions and meaningful recognition programs.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-slate-300">
              <div className="font-semibold">INFINATE Learners Corner</div>
              <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
              <div>GMK Finance</div>
              <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
              <div>Resource Brain Corporation</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-slate-300 hover:text-amber-400 transition-colors duration-300 text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Kotresh G M</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>1234567890</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Karnataka, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Dates Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6 mb-12">
          <div className="text-center">
            <h4 className="text-xl font-bold text-amber-400 mb-4">Mark Your Calendar</h4>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-white font-semibold">Aug 10, 2025</div>
                <div className="text-slate-300">Drawing Registration Opens</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold">Aug 15, 2025</div>
                <div className="text-slate-300">Teacher Nominations Open</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold">Nov 1, 2025</div>
                <div className="text-slate-300">State Level Finals</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold">Dec 2025</div>
                <div className="text-slate-300">Grand Award Ceremony</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800">
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2025 INFINATE Learners Corner. All rights reserved. | Ignite & Inspire Karnataka
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-all duration-300 group"
          >
            <span className="text-sm">Back to Top</span>
            <div className="w-8 h-8 bg-slate-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
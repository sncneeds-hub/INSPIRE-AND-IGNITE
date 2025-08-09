import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Award, Palette, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23374151%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-amber-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-60 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full mb-8 transform hover:scale-105 transition-all duration-300">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300 text-sm font-medium">State-Level Competition & Awards 2025-2026</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Ignite & Inspire
            </span>
            <br />
            <span className="text-slate-100">Karnataka</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Celebrating artistic excellence and educational leadership across Karnataka through 
            <span className="text-amber-400 font-semibold"> Canvas of Creativity </span>
            drawing competition and 
            <span className="text-blue-400 font-semibold"> Pillars of Excellence </span>
            awards
          </p>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/40 transition-all duration-300 group">
              <Palette className="w-8 h-8 text-amber-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-white mb-1">5 Categories</h3>
              <p className="text-slate-400">Pre-school to PUC</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/40 transition-all duration-300 group">
              <Award className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-white mb-1">4 Levels</h3>
              <p className="text-slate-400">School to State</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/40 transition-all duration-300 group">
              <Users className="w-8 h-8 text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-white mb-1">Statewide</h3>
              <p className="text-slate-400">All Karnataka Schools</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Drawing Competition
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105">
              Teacher Awards
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Organizer Info */}
          <div className="mt-16 text-center">
            <p className="text-slate-400 mb-4">Proudly presented by</p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-300">
              <div className="font-semibold text-lg">INFINATE Learners Corner</div>
              <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
              <div className="font-medium">GMK Finance</div>
              <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
              <div className="font-medium">Resource Brain Corporation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
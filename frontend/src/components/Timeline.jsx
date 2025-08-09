import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, CheckCircle, Clock, ArrowDown } from 'lucide-react';

const Timeline = () => {
  const events = [
    {
      date: "August 10, 2025",
      event: "Drawing Competition Registration Opens",
      description: "Online portal opens for Canvas of Creativity drawing competition. Schools can register students across all categories.",
      status: "upcoming",
      type: "drawing",
      icon: Calendar
    },
    {
      date: "August 15, 2025", 
      event: "Teacher Awards Nominations Open",
      description: "Nomination portal opens for Pillars of Excellence Awards. Public voting and support begins simultaneously.",
      status: "upcoming",
      type: "awards",
      icon: Calendar
    },
    {
      date: "August 31, 2025",
      event: "Drawing Competition Registration Closes",
      description: "Final deadline for all school registrations for the drawing competition. No extensions will be provided.",
      status: "upcoming", 
      type: "drawing",
      icon: Clock
    },
    {
      date: "September 1-10, 2025",
      event: "School Level Competitions",
      description: "Individual schools conduct internal competitions. Maximum 3 winners per category advance to Taluk level.",
      status: "upcoming",
      type: "drawing", 
      icon: CheckCircle
    },
    {
      date: "September 15-30, 2025",
      event: "Taluk Level Competitions", 
      description: "School winners compete at taluk level. Top 3 per category from each taluk proceed to district level.",
      status: "upcoming",
      type: "drawing",
      icon: CheckCircle
    },
    {
      date: "October 1-31, 2025",
      event: "District Level Competitions",
      description: "Taluk winners compete at district level. Best 3 per category advance to the state finals in Bengaluru.",
      status: "upcoming",
      type: "drawing",
      icon: CheckCircle
    },
    {
      date: "November 1, 2025",
      event: "State Level Finals & Nominations Close",
      description: "Grand finale of drawing competition in Bengaluru. Teacher awards nominations and public voting also closes.",
      status: "upcoming",
      type: "both",
      icon: CheckCircle
    },
    {
      date: "November 2-30, 2025", 
      event: "Expert Review & Evaluation",
      description: "Educational experts review teacher and school nominations, considering public support for final shortlisting.",
      status: "upcoming",
      type: "awards",
      icon: Clock
    },
    {
      date: "December 1st Week, 2025",
      event: "Grand Award Ceremony",
      description: "Ultimate celebration in Bengaluru with prize distribution for both competitions, cultural programs, and felicitation.",
      status: "upcoming",
      type: "both",
      icon: CheckCircle
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'drawing':
        return 'from-amber-400 to-orange-500';
      case 'awards':
        return 'from-indigo-500 to-purple-600';
      case 'both':
        return 'from-emerald-500 to-teal-600';
      default:
        return 'from-slate-400 to-slate-600';
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'drawing':
        return { text: 'Drawing Competition', bg: 'bg-amber-100 text-amber-800' };
      case 'awards':
        return { text: 'Teacher Awards', bg: 'bg-indigo-100 text-indigo-800' };
      case 'both':
        return { text: 'Both Programs', bg: 'bg-emerald-100 text-emerald-800' };
      default:
        return { text: 'General', bg: 'bg-slate-100 text-slate-800' };
    }
  };

  return (
    <section id="timeline" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge className="mb-6 px-6 py-2 bg-slate-800 text-slate-300 border border-slate-700 text-lg font-medium">
            <Clock className="w-5 h-5 mr-2" />
            Event Timeline
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Program Timeline 2025-26
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Stay updated with all key dates and milestones for both Canvas of Creativity drawing competition 
            and Pillars of Excellence awards program across Karnataka.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 via-indigo-500 to-emerald-500 opacity-30"></div>
            
            <div className="space-y-8">
              {events.map((event, index) => {
                const IconComponent = event.icon;
                const typeBadge = getTypeBadge(event.type);
                const typeColor = getTypeColor(event.type);
                
                return (
                  <div key={index} className="relative flex items-start gap-8 group">
                    {/* Timeline Dot */}
                    <div className={`relative z-10 w-16 h-16 bg-gradient-to-r ${typeColor} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                      {/* Glow effect */}
                      <div className={`absolute -inset-2 bg-gradient-to-r ${typeColor} rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                    </div>

                    {/* Event Card */}
                    <Card className="flex-1 bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <Badge className={`px-3 py-1 ${typeBadge.bg} font-medium`}>
                            {typeBadge.text}
                          </Badge>
                          <div className="text-amber-400 font-bold text-lg">
                            {event.date}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                          {event.event}
                        </h3>
                        
                        <p className="text-slate-300 leading-relaxed">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Connecting Arrow for mobile */}
                    {index < events.length - 1 && (
                      <div className="absolute left-8 top-20 transform -translate-x-1/2 opacity-30">
                        <ArrowDown className="w-4 h-4 text-slate-400 animate-bounce" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-amber-400 mb-4">Important Reminder</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                All dates are firm and no extensions will be provided. Please ensure timely registration and participation 
                to be part of this prestigious statewide initiative celebrating artistic talent and educational excellence.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
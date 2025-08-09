import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Users, 
  Building2, 
  Award,
  Calendar,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const Contact = () => {
  const organizers = [
    {
      name: "INFINATE Learners Corner",
      role: "Primary Organizing Body",
      description: "Dedicated to promoting education and skill development initiatives across Karnataka",
      icon: Award,
      color: "from-amber-400 to-orange-500"
    },
    {
      name: "GMK Finance",
      role: "Financial Partner", 
      description: "Providing essential support for program execution and prize disbursements",
      icon: Building2,
      color: "from-emerald-500 to-teal-600"
    },
    {
      name: "Resource Brain Corporation",
      role: "Technology Partner",
      description: "Leading tech company offering technological expertise for online registration and voting platforms",
      icon: Globe,
      color: "from-indigo-500 to-purple-600"
    }
  ];

  const quickLinks = [
    {
      title: "Registration Portal",
      description: "Access online registration forms",
      available: "Opens Aug 10 & 15, 2025",
      status: "upcoming",
      icon: Calendar
    },
    {
      title: "Competition Guidelines", 
      description: "Detailed rules and regulations",
      available: "Available Now",
      status: "active",
      icon: Award
    },
    {
      title: "Public Voting Platform",
      description: "Vote for teacher nominations",
      available: "Opens Aug 15, 2025", 
      status: "upcoming",
      icon: Users
    }
  ];

  const contactInfo = [
    {
      type: "Primary Contact",
      name: "Kotresh G M",
      phone: "1234567890",
      available: "For all queries and support",
      icon: Phone,
      color: "text-emerald-600"
    }
  ];

  const importantDates = [
    { event: "Drawing Registration Opens", date: "August 10, 2025" },
    { event: "Teacher Nominations Open", date: "August 15, 2025" },
    { event: "State Level Finals", date: "November 1, 2025" },
    { event: "Grand Award Ceremony", date: "December 1st Week, 2025" }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge className="mb-6 px-6 py-2 bg-slate-800 text-slate-300 border border-slate-700 text-lg font-medium">
            <Phone className="w-5 h-5 mr-2" />
            Contact & Information
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Connect with our team for queries, support, and updates about the Canvas of Creativity 
            drawing competition and Pillars of Excellence awards program.
          </p>
        </div>

        {/* Organizers Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Our Partners & Collaborators</h3>
            <p className="text-lg text-slate-300">Dedicated organizations making this initiative possible</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {organizers.map((org, index) => {
              const IconComponent = org.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${org.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{org.name}</h4>
                    <Badge variant="outline" className="mb-4 border-slate-600 text-slate-300">
                      {org.role}
                    </Badge>
                    <p className="text-slate-300 leading-relaxed">{org.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Contact Information</h3>
            <p className="text-lg text-slate-300">Reach out to our support team for assistance</p>
          </div>

          {contactInfo.map((contact, index) => {
            const IconComponent = contact.icon;
            return (
              <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-white mb-2">{contact.type}</h4>
                      <p className="text-xl text-emerald-400 font-semibold mb-1">{contact.name}</p>
                      <p className="text-lg text-slate-300 mb-2">📞 {contact.phone}</p>
                      <p className="text-slate-400">{contact.available}</p>
                    </div>
                    <div className="text-right">
                      <Button 
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                        onClick={() => window.open(`tel:${contact.phone}`, '_blank')}
                      >
                        Call Now
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Quick Access</h3>
            <p className="text-lg text-slate-300">Important portals and resources</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {quickLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{link.title}</h4>
                    <p className="text-slate-300 mb-3 text-sm">{link.description}</p>
                    <Badge 
                      variant={link.status === 'active' ? 'default' : 'secondary'}
                      className={link.status === 'active' ? 'bg-emerald-600' : 'bg-slate-600'}
                    >
                      {link.available}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Important Dates Reminder */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-amber-400 mb-4">Important Dates to Remember</h3>
                <p className="text-slate-300">Mark your calendar for these key program milestones</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {importantDates.map((date, index) => (
                  <div key={index} className="flex items-center gap-4 bg-slate-800/30 rounded-lg p-4">
                    <div className="w-3 h-3 bg-amber-400 rounded-full flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-semibold">{date.event}</p>
                      <p className="text-amber-400">{date.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Stay Updated
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16">
          <p className="text-slate-400 text-lg">
            For sponsorship opportunities and partnership inquiries, please contact our team directly.
          </p>
          <p className="text-slate-500 mt-2">
            We look forward to celebrating artistic excellence and educational leadership across Karnataka.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
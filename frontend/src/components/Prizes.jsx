import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, Medal, Award, Star, Gift, Users, GraduationCap, School } from 'lucide-react';

const Prizes = () => {
  const drawingPrizes = [
    {
      level: "State Level Winners",
      category: "All Categories",
      prizes: [
        {
          position: "1st Prize",
          amount: "₹5,000",
          items: ["Trophy", "Certificate of Excellence", "Cash Prize", "Goodies"],
          color: "from-yellow-400 to-amber-500",
          icon: Trophy
        },
        {
          position: "2nd Prize", 
          amount: "₹3,000",
          items: ["Trophy", "Certificate of Excellence", "Cash Prize", "Goodies"],
          color: "from-slate-300 to-slate-500",
          icon: Medal
        },
        {
          position: "3rd Prize",
          amount: "₹2,000", 
          items: ["Trophy", "Certificate of Excellence", "Cash Prize", "Goodies"],
          color: "from-amber-600 to-orange-700",
          icon: Award
        }
      ]
    }
  ];

  const participationRecognition = [
    {
      level: "State Level",
      recognition: "Participation certificates for all finalists competing in Bengaluru",
      icon: Star,
      color: "from-emerald-400 to-teal-500"
    },
    {
      level: "District Level", 
      recognition: "Certificates of achievement and felicitation at grand ceremony",
      icon: Award,
      color: "from-blue-400 to-indigo-500"
    },
    {
      level: "Taluk Level",
      recognition: "Certificates of achievement for all winners",
      icon: Medal, 
      color: "from-purple-400 to-violet-500"
    },
    {
      level: "School Level",
      recognition: "Recognition and encouragement from individual schools",
      icon: School,
      color: "from-amber-400 to-orange-500"
    }
  ];

  const teacherAwardPrizes = [
    {
      category: "Best Teachers",
      amount: "₹7,500",
      items: ["Prestigious Award Plaque", "Certificate of Recognition", "Cash Prize", "Goodies Package"],
      description: "Recognizing excellence across Primary, Secondary, and PUC levels",
      icon: GraduationCap,
      color: "from-indigo-500 to-purple-600"
    },
    {
      category: "Best Schools",
      amount: "₹15,000", 
      items: ["Award Trophy", "Certificate of Excellence", "Cash Prize", "Recognition Package"],
      description: "Overall excellence and arts promotion categories",
      icon: School,
      color: "from-emerald-500 to-teal-600"
    }
  ];

  const additionalBenefits = [
    {
      title: "Statewide Recognition",
      description: "Winners featured in program publications and media coverage",
      icon: Star
    },
    {
      title: "Networking Opportunities",
      description: "Connect with education leaders and artistic mentors across Karnataka",
      icon: Users
    },
    {
      title: "Exhibition Platform",
      description: "Winning artworks displayed in prestigious venues and events",
      icon: Award
    },
    {
      title: "Future Opportunities",
      description: "Priority consideration for future programs and scholarships",
      icon: Trophy
    }
  ];

  return (
    <section id="prizes" className="py-24 bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge className="mb-6 px-6 py-2 bg-amber-100 text-amber-800 text-lg font-medium">
            <Trophy className="w-5 h-5 mr-2" />
            Prizes & Recognition
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Celebrating Excellence
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive recognition and meaningful prizes for outstanding performance in both 
            Canvas of Creativity drawing competition and Pillars of Excellence awards program.
          </p>
        </div>

        {/* Drawing Competition Prizes */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Drawing Competition Prizes</h3>
            <p className="text-lg text-slate-600">State-level winners across all categories</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {drawingPrizes[0].prizes.map((prize, index) => {
              const IconComponent = prize.icon;
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <CardContent className="p-8 text-center relative">
                    {/* Background Decoration */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${prize.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-20 h-20 bg-gradient-to-r ${prize.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      
                      <h4 className="text-2xl font-bold text-slate-900 mb-2">
                        {prize.position}
                      </h4>
                      
                      <div className="text-3xl font-bold text-emerald-600 mb-6">
                        {prize.amount}
                      </div>
                      
                      <div className="space-y-3">
                        {prize.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                            <Star className="w-4 h-4 text-amber-500 flex-shrink-0" />
                            <span className="text-slate-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Participation Recognition */}
          <div className="max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold text-slate-900 text-center mb-8">Participation Recognition</h4>
            <div className="grid md:grid-cols-2 gap-6">
              {participationRecognition.map((recognition, index) => {
                const IconComponent = recognition.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${recognition.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h5 className="text-lg font-bold text-slate-900 mb-2">{recognition.level}</h5>
                        <p className="text-slate-700">{recognition.recognition}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Teacher Awards Prizes */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Teacher & School Awards</h3>
            <p className="text-lg text-slate-600">Recognizing educational excellence and leadership</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teacherAwardPrizes.map((award, index) => {
              const IconComponent = award.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <CardContent className="p-8 text-center relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${award.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-r ${award.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <h4 className="text-2xl font-bold text-slate-900 mb-2">
                        {award.category}
                      </h4>
                      
                      <p className="text-slate-600 mb-4">{award.description}</p>
                      
                      <div className="text-3xl font-bold text-emerald-600 mb-6">
                        {award.amount}
                      </div>
                      
                      <div className="space-y-3">
                        {award.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                            <Star className="w-4 h-4 text-amber-500 flex-shrink-0" />
                            <span className="text-slate-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Additional Benefits</h3>
            <p className="text-lg text-slate-600">Beyond monetary rewards - long-term value and recognition</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h4>
                    <p className="text-slate-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
            <CardContent className="p-12">
              <Trophy className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-4">Total Prize Pool</h3>
              <p className="text-xl mb-6 opacity-90">
                Over ₹50,000 in cash prizes plus trophies, certificates, and recognition for hundreds of participants
              </p>
              <p className="text-lg opacity-80">
                Join us in celebrating artistic talent and educational excellence across Karnataka
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Prizes;
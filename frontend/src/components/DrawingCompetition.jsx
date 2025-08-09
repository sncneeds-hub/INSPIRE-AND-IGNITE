import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Palette, 
  Users, 
  Trophy, 
  Calendar, 
  MapPin, 
  Star,
  ArrowRight,
  CheckCircle,
  Target
} from 'lucide-react';

const DrawingCompetition = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      name: "Pre-school",
      icon: "🎨",
      grades: "Ages 3-5",
      theme: "My Dream World",
      themeKannada: "ನನ್ನ ಕನಸಿನ ಲೋಕ",
      description: "Encourage imagination about an ideal world, featuring elements like nature, magical creatures, or futuristic fun.",
      color: "from-pink-400 to-rose-500",
      bgColor: "bg-pink-50 border-pink-200"
    },
    {
      name: "Junior Artists",
      icon: "✨",
      grades: "Grades 1-4",
      theme: "Nature & Me: Karnataka's Green Beauty",
      themeKannada: "ಪ್ರಕೃತಿ ಮತ್ತು ನಾನು: ಕರ್ನಾಟಕದ ಹಸಿರು ಸೌಂದರ್ಯ",
      description: "Depict the natural beauty of Karnataka (forests, rivers, mountains, wildlife) and your connection to it.",
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-50 border-emerald-200"
    },
    {
      name: "Young Creators",
      icon: "🌟",
      grades: "Grades 5-7",
      theme: "Future Karnataka: Smart Cities & Sustainable Living",
      themeKannada: "ಭವಿಷ್ಯ ಕರ್ನಾಟಕ: ಸ್ಮಾರ್ಟ್ ನಗರ ಮತ್ತು ಶಾಶ್ವತ ಜೀವನ",
      description: "Envision how technology, innovation, and sustainable practices can shape Karnataka's future.",
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50 border-blue-200"
    },
    {
      name: "Aspiring Innovators",
      icon: "💡",
      grades: "Grades 8-10",
      theme: "Cultural Tapestry of Karnataka: Unity in Diversity",
      themeKannada: "ಕರ್ನಾಟಕದ ಸಾಂಸ್ಕೃತಿಕ ವೈವಿಧ್ಯ: ಏಕತೆಯ ಬೆಳಕು",
      description: "Express the rich cultural heritage of Karnataka, including festivals, traditions, and unity.",
      color: "from-purple-400 to-violet-500",
      bgColor: "bg-purple-50 border-purple-200"
    },
    {
      name: "Master Visionaries",
      icon: "🚀",
      grades: "PUC I & II",
      theme: "Innovation & Leadership in Modern Karnataka",
      themeKannada: "ಆಧುನಿಕ ಕರ್ನಾಟಕದಲ್ಲಿ ನಾವೀನ್ಯತೆ ಮತ್ತು ನಾಯಕತ್ವ",
      description: "Showcase leadership, innovation, and vision for Karnataka's future through advanced artistic expression.",
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50 border-amber-200"
    }
  ];

  const phases = [
    {
      phase: "Phase 1",
      level: "School Level",
      duration: "Sept 1-10, 2025",
      icon: MapPin,
      description: "Internal school competitions to identify promising artists. Maximum 3 winners per category."
    },
    {
      phase: "Phase 2", 
      level: "Taluk Level",
      duration: "Sept 15-30, 2025",
      icon: Users,
      description: "Winners from various schools compete at taluk level. Top 3 per category advance."
    },
    {
      phase: "Phase 3",
      level: "District Level", 
      duration: "Oct 1-31, 2025",
      icon: Star,
      description: "Taluk winners compete at district level. Best 3 per category proceed to state level."
    },
    {
      phase: "Phase 4",
      level: "State Level",
      duration: "Nov 1, 2025",
      icon: Trophy,
      description: "Grand finale in Bengaluru. District winners compete for ultimate state recognition."
    }
  ];

  const rules = [
    "All artwork must be original and created solely by the participant",
    "Entry fee of ₹20 per student for drawing competition",
    "Participants may use any drawing medium (pencils, crayons, watercolors, etc.)",
    "Drawing sheets will be provided at Taluk, District, and State levels", 
    "No external assistance or electronic devices permitted during competition",
    "Specific time limits will be allocated for drawing at each level"
  ];

  return (
    <section id="drawing-competition" className="py-24 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge className="mb-6 px-6 py-2 bg-amber-100 text-amber-800 text-lg font-medium">
            <Palette className="w-5 h-5 mr-2" />
            Canvas of Creativity
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            State-Level Drawing Competition
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Foster artistic talent among students across Karnataka through a progressive four-phase competition structure, 
            celebrating creativity from school level to state recognition in Bengaluru.
          </p>
        </div>

        {/* Competition Categories */}
        <div className="mb-20">
          <div className="flex justify-center mb-8">
            <h3 className="text-3xl font-bold text-slate-900 relative">
              Competition Categories
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
            </h3>
          </div>

          {/* Category Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <Button
                key={index}
                onClick={() => setActiveCategory(index)}
                variant={activeCategory === index ? "default" : "outline"}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === index 
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105` 
                    : "hover:bg-slate-100"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>

          {/* Active Category Details */}
          <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl">
            <CardContent className={`p-8 ${categories[activeCategory].bgColor}`}>
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${categories[activeCategory].color} text-white text-2xl mb-4 shadow-lg`}>
                  {categories[activeCategory].icon}
                </div>
                <h4 className="text-3xl font-bold text-slate-900 mb-2">
                  {categories[activeCategory].name}
                </h4>
                <Badge variant="outline" className="text-lg px-4 py-1">
                  {categories[activeCategory].grades}
                </Badge>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h5 className="text-xl font-semibold text-slate-900 mb-2">Theme:</h5>
                <p className="text-lg text-slate-800 font-medium mb-2">
                  {categories[activeCategory].theme}
                </p>
                <p className="text-lg text-slate-600 mb-4">
                  {categories[activeCategory].themeKannada}
                </p>
                <p className="text-slate-700 leading-relaxed">
                  {categories[activeCategory].description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Competition Phases */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Competition Phases</h3>
            <p className="text-lg text-slate-600">Progressive structure ensuring fair selection and maximum participation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, index) => {
              const IconComponent = phase.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="mb-3 bg-slate-100 text-slate-700">{phase.phase}</Badge>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{phase.level}</h4>
                    <p className="text-amber-600 font-semibold mb-3">{phase.duration}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{phase.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Rules & Guidelines */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Rules & Guidelines</h3>
            <p className="text-lg text-slate-600">Important guidelines to ensure fair and transparent competition</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {rules.map((rule, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-slate-700">{rule}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Registration Opens Aug 10, 2025
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-slate-500 mt-4">Entry Fee: ₹20 per student</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DrawingCompetition;
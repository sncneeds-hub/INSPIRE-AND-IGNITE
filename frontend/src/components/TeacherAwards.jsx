import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Users, 
  Award, 
  GraduationCap,
  School,
  Heart,
  ArrowRight,
  CheckCircle,
  Star,
  Calendar,
  DollarSign
} from 'lucide-react';

const TeacherAwards = () => {
  const teacherCategories = [
    {
      title: "Best Primary School Teacher",
      grades: "Grades 1-7",
      icon: Heart,
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-50",
      description: "Recognizing excellence in foundational education and nurturing young minds during their crucial developmental years."
    },
    {
      title: "Best Secondary School Teacher", 
      grades: "Grades 8-10",
      icon: GraduationCap,
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50",
      description: "Honoring teachers who guide students through critical academic transitions and skill development phases."
    },
    {
      title: "Best Pre-University College Teacher",
      grades: "Grades 11-12",
      icon: Award,
      color: "from-purple-400 to-violet-500", 
      bgColor: "bg-purple-50",
      description: "Celebrating educators who prepare students for higher education and career pathways with excellence."
    }
  ];

  const schoolAwardCategories = [
    {
      categoryTitle: "Academic Excellence Awards",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      icon: GraduationCap,
      awards: [
        {
          title: "Vidya Vardhanam (VV)",
          description: "Awarded to schools demonstrating consistent growth and excellence in academic achievements."
        },
        {
          title: "Gyana Shikhar (GS)",
          description: "Recognizes schools that have reached the pinnacle of knowledge through outstanding student performance."
        },
        {
          title: "Shiksha Pratibha (SP)",
          description: "Honors schools nurturing exceptional talent and brilliance in education."
        }
      ]
    },
    {
      categoryTitle: "Innovation & Infrastructure Awards",
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50",
      icon: Star,
      awards: [
        {
          title: "Navonmesh Vidyalaya (NV)",
          description: "Given to schools pioneering innovative teaching methods and creative learning approaches."
        },
        {
          title: "Adhunik Bhavanam (AB)",
          description: "Recognizes schools with state-of-the-art infrastructure and excellent learning environments."
        },
        {
          title: "Digital Jyoti (DJ)",
          description: "Awarded to schools excelling in the use of digital technology and e-learning tools."
        }
      ]
    },
    {
      categoryTitle: "Holistic Development Awards",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      icon: School,
      awards: [
        {
          title: "Sarvanga Vikas Vidyalaya (SVV)",
          description: "Honors schools promoting balanced growth in academics, sports, arts, and character building."
        },
        {
          title: "Manav Seva Vidyalaya (MSV)",
          description: "Given to schools actively encouraging social responsibility, inclusion, and community service."
        },
        {
          title: "Samskara Vidyalaya (SkaV)",
          description: "Recognizes schools fostering strong values, discipline, and cultural heritage among students."
        }
      ]
    }
  ];

  const eligibilityRequirements = [
    {
      category: "Teachers",
      requirements: [
        "Minimum 5 years of teaching experience in recognized Karnataka school",
        "Demonstrated excellence in teaching and innovative pedagogy",
        "Positive impact on student learning and development",
        "Active involvement in co-curricular activities and school initiatives",
        "Clean disciplinary record"
      ]
    },
    {
      category: "Schools", 
      requirements: [
        "Recognized school in Karnataka with minimum 10 years of operation",
        "Excellence in academic results and comprehensive programs",
        "Well-maintained infrastructure and facilities",
        "Active community engagement and social responsibility",
        "For Arts category: Specific initiatives for fostering artistic talent"
      ]
    }
  ];

  const nominationProcess = [
    {
      step: "1",
      title: "Nomination Opens",
      date: "August 15, 2025",
      description: "Online portal opens for teacher and school nominations with detailed forms and requirements."
    },
    {
      step: "2", 
      title: "Public Voting",
      date: "Aug 15 - Nov 1, 2025",
      description: "Community members can vote and show support for nominated teachers and schools through official portal."
    },
    {
      step: "3",
      title: "Expert Review",
      date: "Nov 2-30, 2025", 
      description: "Educational experts review nominations, considering public support, and shortlist candidates for evaluation."
    },
    {
      step: "4",
      title: "Final Selection",
      date: "December 2025",
      description: "Winners announced and honored at the grand award ceremony in Bengaluru with prizes and recognition."
    }
  ];

  const prizes = [
    {
      category: "Best Teachers",
      amount: "₹7,500",
      items: ["Prestigious Award Plaque", "Certificate of Recognition", "Cash Prize", "Goodies Package"],
      icon: GraduationCap
    },
    {
      category: "Best Schools", 
      amount: "₹15,000",
      items: ["Award Trophy", "Certificate of Excellence", "Cash Prize", "Recognition Package"],
      icon: School
    }
  ];

  return (
    <section id="teacher-awards" className="py-24 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge className="mb-6 px-6 py-2 bg-indigo-100 text-indigo-800 text-lg font-medium">
            <Users className="w-5 h-5 mr-2" />
            Pillars of Excellence
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Best Teachers & School Awards
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Recognizing and celebrating outstanding contributions of teachers and schools in nurturing talent 
            and promoting holistic education across Karnataka through prestigious awards and community recognition.
          </p>
        </div>

        {/* Teacher Award Categories */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Teacher Award Categories</h3>
            <p className="text-lg text-slate-600">Honoring educational excellence across all academic levels</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teacherCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden">
                  <CardContent className={`p-8 ${category.bgColor}`}>
                    <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 text-center mb-2">
                      {category.title}
                    </h4>
                    <Badge variant="outline" className="mx-auto block w-fit mb-4">
                      {category.grades}
                    </Badge>
                    <p className="text-slate-700 text-center leading-relaxed">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* School Award Categories */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">School Award Categories</h3>
            <p className="text-lg text-slate-600">Celebrating institutional excellence across multiple dimensions</p>
          </div>

          <div className="space-y-12">
            {schoolAwardCategories.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <div key={categoryIndex} className="max-w-6xl mx-auto">
                  {/* Category Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${category.color} text-white rounded-full shadow-lg mb-4`}>
                      <CategoryIcon className="w-6 h-6" />
                      <h4 className="text-xl font-bold">{category.categoryTitle}</h4>
                    </div>
                  </div>

                  {/* Awards Grid */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {category.awards.map((award, awardIndex) => (
                      <Card key={awardIndex} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full">
                        <CardContent className={`p-8 ${category.bgColor} h-full flex flex-col`}>
                          <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <CategoryIcon className="w-8 h-8 text-white" />
                          </div>
                          
                          <h5 className="text-xl font-bold text-slate-900 text-center mb-4 flex-shrink-0">
                            {award.title}
                          </h5>
                          
                          <p className="text-slate-700 text-center leading-relaxed flex-grow">
                            {award.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Eligibility Requirements */}
        <div className="mb-20 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Eligibility Criteria</h3>
            <p className="text-lg text-slate-600">Requirements for nomination consideration</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {eligibilityRequirements.map((section, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    {section.category === "Teachers" ? (
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                    ) : (
                      <School className="w-6 h-6 text-amber-600" />
                    )}
                    {section.category}
                  </h4>
                  <div className="space-y-4">
                    {section.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-700">{req}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nomination Process Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Nomination Process</h3>
            <p className="text-lg text-slate-600">Step-by-step journey from nomination to recognition</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {nominationProcess.map((step, index) => (
              <div key={index} className="relative group">
                <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-indigo-600 font-semibold mb-3 text-sm">{step.date}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
                
                {/* Connecting Arrow */}
                {index < nominationProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-slate-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Prize Information */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Awards & Recognition</h3>
            <p className="text-lg text-slate-600">Celebrating excellence with meaningful recognition and prizes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {prizes.map((prize, index) => {
              const IconComponent = prize.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <CardContent className="p-8 bg-gradient-to-br from-slate-50 to-gray-100">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 text-center mb-2">
                      {prize.category}
                    </h4>
                    <div className="text-center mb-6">
                      <span className="text-3xl font-bold text-emerald-600">{prize.amount}</span>
                      <p className="text-slate-600">Cash Prize</p>
                    </div>
                    <div className="space-y-3">
                      {prize.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                          <Star className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <span className="text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Nominate Excellence?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join us in recognizing outstanding educators and institutions across Karnataka
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Calendar className="w-5 h-5 mr-2" />
              Nominations Open Aug 15, 2025
            </Button>
            <div className="text-center">
              <p className="font-semibold">Nomination Fees:</p>
              <p className="text-sm opacity-90">Teachers: ₹250 | Schools: ₹1,000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherAwards;

import { useState } from 'react';
import { ChevronRight, Clock, Target, AlertTriangle, CheckCircle, Star, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { skillsDatabase, SkillGuide } from '../data/skillsDatabase';

const SkillGuides = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillGuide | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500 text-white';
      case 'intermediate': return 'bg-yellow-500 text-white';
      case 'advanced': return 'bg-orange-500 text-white';
      case 'expert': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'static': return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      case 'dynamic': return 'bg-green-500/10 border-green-500/20 text-green-400';
      case 'strength': return 'bg-red-500/10 border-red-500/20 text-red-400';
      case 'flexibility': return 'bg-purple-500/10 border-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/10 border-gray-500/20 text-gray-400';
    }
  };

  if (selectedSkill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={() => setSelectedSkill(null)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
            <span>Back to Skill Guides</span>
          </button>

          {/* Skill Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <Badge className={getDifficultyColor(selectedSkill.difficulty)}>
                {selectedSkill.difficulty.toUpperCase()}
              </Badge>
              <Badge variant="outline" className={getCategoryColor(selectedSkill.category)}>
                {selectedSkill.category.toUpperCase()}
              </Badge>
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-4">{selectedSkill.name}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {selectedSkill.description}
            </p>
          </div>

          {/* Skill Image */}
          <div className="mb-12">
            <img
              src={selectedSkill.image}
              alt={selectedSkill.name}
              className="w-full max-w-2xl mx-auto rounded-xl shadow-2xl"
            />
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progressions">Progressions</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="mistakes">Mistakes</TabsTrigger>
              <TabsTrigger value="tips">Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Target className="h-5 w-5 mr-2 text-orange-400" />
                      Prerequisites
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedSkill.prerequisites.map((prereq, index) => (
                        <li key={index} className="text-gray-300 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                          {prereq}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-blue-400" />
                      Primary Muscles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.musclesWorked.map((muscle, index) => (
                        <Badge key={index} variant="outline" className="text-orange-400 border-orange-400">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800/50 border-slate-700 mt-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-purple-400" />
                    Training Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{selectedSkill.timeline}</p>
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <p className="text-sm text-gray-400">
                      <strong className="text-white">Note:</strong> Timeline varies based on current strength level, 
                      training frequency, and individual progress. Consistency is key to achieving this skill.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progressions">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Step-by-Step Progressions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {selectedSkill.progressions.map((progression, index) => (
                      <AccordionItem key={index} value={`progression-${index}`}>
                        <AccordionTrigger className="text-white hover:text-orange-400">
                          <div className="flex items-center space-x-3">
                            <span className="bg-orange-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                              {index + 1}
                            </span>
                            <span>{progression.name}</span>
                            <Badge className={getDifficultyColor(progression.difficulty)}>
                              {progression.difficulty}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pl-9">
                            <p className="text-gray-300">{progression.description}</p>
                            <div>
                              <h5 className="text-white font-medium mb-2">Instructions:</h5>
                              <ul className="space-y-1">
                                {progression.instructions.map((instruction, instrIndex) => (
                                  <li key={instrIndex} className="text-gray-300 text-sm flex">
                                    <span className="text-orange-400 mr-2">•</span>
                                    {instruction}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-slate-900/50 p-3 rounded-lg">
                              <p className="text-sm">
                                <span className="text-orange-400 font-medium">Target:</span>
                                <span className="text-gray-300 ml-2">{progression.targetHold}</span>
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="training">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Training Protocol</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Recommended Training Schedule</h4>
                    <div className="bg-slate-900/50 p-4 rounded-lg">
                      <p className="text-gray-300">{selectedSkill.trainingProtocol.frequency}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Sets and Reps</h4>
                    <div className="bg-slate-900/50 p-4 rounded-lg">
                      <p className="text-gray-300">{selectedSkill.trainingProtocol.sets}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Rest Between Sets</h4>
                    <div className="bg-slate-900/50 p-4 rounded-lg">
                      <p className="text-gray-300">{selectedSkill.trainingProtocol.rest}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mistakes">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                    Common Mistakes to Avoid
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedSkill.commonMistakes.map((mistake, index) => (
                      <div key={index} className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                        <h5 className="text-red-400 font-medium mb-2">{mistake.mistake}</h5>
                        <p className="text-gray-300 text-sm">{mistake.correction}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tips">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-400" />
                    Pro Tips for Success
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedSkill.tips.map((tip, index) => (
                      <div key={index} className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg">
                        <p className="text-gray-300 text-sm flex">
                          <span className="text-yellow-400 mr-2">💡</span>
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
            <Star className="h-4 w-4 text-orange-400" />
            <span className="text-orange-400 text-sm font-medium">Comprehensive Guides</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Master Advanced
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Calisthenics Skills
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Detailed progressions, training protocols, and expert tips for the most challenging bodyweight movements
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsDatabase.map((skill) => (
            <Card
              key={skill.id}
              className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg border-slate-600/30 hover:border-orange-500/40 transition-all duration-500 cursor-pointer overflow-hidden group"
              onClick={() => setSelectedSkill(skill)}
            >
              <div className="relative">
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                
                <div className="absolute top-4 left-4 flex space-x-2">
                  <Badge className={getDifficultyColor(skill.difficulty)}>
                    {skill.difficulty}
                  </Badge>
                  <Badge variant="outline" className={getCategoryColor(skill.category)}>
                    {skill.category}
                  </Badge>
                </div>

                <div className="absolute bottom-4 right-4">
                  <ChevronRight className="h-6 w-6 text-white/80 group-hover:text-orange-400 transition-colors" />
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                  {skill.name}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {skill.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{skill.timeline}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-4 w-4" />
                    <span>{skill.progressions.length} steps</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillGuides;

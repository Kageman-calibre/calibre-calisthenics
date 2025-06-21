
import { useState, useEffect } from 'react';
import { AlertTriangle, TrendingDown, Target, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Weakness {
  id: string;
  area: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  recommendations: string[];
  affectedSkills: string[];
  detectedFrom: string[];
}

const WeaknessDetection = () => {
  const [weaknesses, setWeaknesses] = useState<Weakness[]>([]);
  const [selectedWeakness, setSelectedWeakness] = useState<Weakness | null>(null);

  useEffect(() => {
    // Simulate weakness detection based on performance data
    const mockWeaknesses: Weakness[] = [
      {
        id: 'grip-strength',
        area: 'Grip Strength',
        description: 'Your grip strength is limiting your pulling exercises. Dead hang times are below average.',
        severity: 'high',
        recommendations: [
          'Increase dead hang frequency to 3x per week',
          'Add farmers walks to routine',
          'Practice different grip positions',
          'Use grip strengthening tools'
        ],
        affectedSkills: ['Pull-ups', 'Muscle-ups', 'Front Lever'],
        detectedFrom: ['Short dead hang times', 'Early grip failure in pull-ups']
      },
      {
        id: 'core-stability',
        area: 'Core Stability',
        description: 'Core weakness is affecting your handstand progression and L-sit holds.',
        severity: 'medium',
        recommendations: [
          'Add hollow body holds to warm-up',
          'Practice plank variations daily',
          'Focus on L-sit progressions',
          'Include anti-extension exercises'
        ],
        affectedSkills: ['Handstand', 'L-Sit', 'Front Lever', 'Planche'],
        detectedFrom: ['Wobbly handstands', 'Short L-sit holds', 'Arched back in planks']
      },
      {
        id: 'shoulder-mobility',
        area: 'Shoulder Mobility',
        description: 'Limited shoulder mobility is restricting your handstand and overhead positions.',
        severity: 'medium',
        recommendations: [
          'Daily shoulder dislocations with band',
          'Wall handstand chest-to-wall practice',
          'Overhead reaching stretches',
          'Thoracic spine mobility work'
        ],
        affectedSkills: ['Handstand', 'Handstand Push-up', 'Bridge'],
        detectedFrom: ['Arched handstand', 'Limited overhead reach']
      }
    ];
    
    setWeaknesses(mockWeaknesses);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'medium': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'low': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <TrendingDown className="h-4 w-4" />;
      case 'low': return <Target className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Weakness Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weaknesses.map((weakness) => (
          <Card
            key={weakness.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 bg-slate-800/50 border-slate-700 hover:border-orange-500/40 ${
              selectedWeakness?.id === weakness.id ? 'ring-2 ring-orange-500/50' : ''
            }`}
            onClick={() => setSelectedWeakness(weakness)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center justify-between">
                <span className="text-lg">{weakness.area}</span>
                <Badge className={getSeverityColor(weakness.severity)}>
                  {getSeverityIcon(weakness.severity)}
                  <span className="ml-1 capitalize">{weakness.severity}</span>
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">{weakness.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-gray-400 text-xs font-medium mb-2">AFFECTED SKILLS</h4>
                  <div className="flex flex-wrap gap-1">
                    {weakness.affectedSkills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {weakness.affectedSkills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{weakness.affectedSkills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Recommendations */}
      {selectedWeakness && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              {getSeverityIcon(selectedWeakness.severity)}
              {selectedWeakness.area} - Action Plan
              <Badge className={getSeverityColor(selectedWeakness.severity)}>
                {selectedWeakness.severity} priority
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-white font-medium mb-2">What we detected:</h4>
              <ul className="space-y-1">
                {selectedWeakness.detectedFrom.map((detection, index) => (
                  <li key={index} className="text-gray-300 text-sm flex">
                    <span className="text-red-400 mr-2">•</span>
                    {detection}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-2">Recommended Actions:</h4>
              <ul className="space-y-2">
                {selectedWeakness.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-gray-300 text-sm flex">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-2">Skills that will improve:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedWeakness.affectedSkills.map((skill) => (
                  <Badge key={skill} className="bg-green-500/20 text-green-400">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Add to Routine
              </Button>
              <Button variant="outline" className="border-slate-600 text-gray-300">
                Create Custom Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeaknessDetection;


import { useState, useEffect } from 'react';
import { Shield, Camera, Mic, Bell, MapPin, Heart, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Permission {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  required: boolean;
  granted: boolean;
}

const AppPermissions = () => {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 'camera',
      name: 'Kamera',
      description: 'För att ta framstegsfoton och form-analys',
      icon: <Camera className="h-5 w-5" />,
      required: false,
      granted: false
    },
    {
      id: 'microphone',
      name: 'Mikrofon',
      description: 'För röststyrning under träning',
      icon: <Mic className="h-5 w-5" />,
      required: false,
      granted: false
    },
    {
      id: 'notifications',
      name: 'Notifieringar',
      description: 'För träningspåminnelser och uppdateringar',
      icon: <Bell className="h-5 w-5" />,
      required: true,
      granted: false
    },
    {
      id: 'location',
      name: 'Plats',
      description: 'För utomhusträning och närliggande gym',
      icon: <MapPin className="h-5 w-5" />,
      required: false,
      granted: false
    },
    {
      id: 'health',
      name: 'Hälsodata',
      description: 'För integration med hälsoappar',
      icon: <Heart className="h-5 w-5" />,
      required: false,
      granted: false
    }
  ]);

  const { toast } = useToast();

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    // Simulera kontroll av behörigheter
    const updatedPermissions = permissions.map(permission => ({
      ...permission,
      granted: Math.random() > 0.5 // Simulerad behörighetsstatus
    }));
    setPermissions(updatedPermissions);
  };

  const requestPermission = async (permissionId: string) => {
    try {
      // Simulera behörighetsförfrågan
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const success = Math.random() > 0.3; // Simulerad framgång
      
      setPermissions(prev => 
        prev.map(p => 
          p.id === permissionId 
            ? { ...p, granted: success }
            : p
        )
      );

      toast({
        title: success ? "Behörighet beviljad" : "Behörighet nekad",
        description: success 
          ? `${permissions.find(p => p.id === permissionId)?.name} behörighet har beviljats.`
          : `${permissions.find(p => p.id === permissionId)?.name} behörighet nekades.`,
        variant: success ? "default" : "destructive"
      });
    } catch (error) {
      toast({
        title: "Fel",
        description: "Kunde inte begära behörighet",
        variant: "destructive"
      });
    }
  };

  const requestAllPermissions = async () => {
    for (const permission of permissions) {
      if (!permission.granted) {
        await requestPermission(permission.id);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  };

  const grantedCount = permissions.filter(p => p.granted).length;
  const requiredCount = permissions.filter(p => p.required && p.granted).length;
  const totalRequired = permissions.filter(p => p.required).length;

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-white">Appbehörigheter</CardTitle>
              <p className="text-gray-400">
                {grantedCount} av {permissions.length} behörigheter beviljade
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-2">
              <Badge variant={requiredCount === totalRequired ? "default" : "destructive"}>
                Obligatoriska: {requiredCount}/{totalRequired}
              </Badge>
              <Badge variant="outline">
                Totalt: {grantedCount}/{permissions.length}
              </Badge>
            </div>
            <Button
              onClick={requestAllPermissions}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Begär alla behörigheter
            </Button>
          </div>

          <div className="space-y-4">
            {permissions.map((permission) => (
              <div
                key={permission.id}
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    permission.granted 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {permission.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-white font-medium">{permission.name}</h3>
                      {permission.required && (
                        <Badge variant="destructive" className="text-xs">
                          Obligatorisk
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">
                      {permission.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {permission.granted ? (
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm">Beviljad</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 text-red-400">
                        <XCircle className="h-5 w-5" />
                        <span className="text-sm">Nekad</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => requestPermission(permission.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Begär
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppPermissions;

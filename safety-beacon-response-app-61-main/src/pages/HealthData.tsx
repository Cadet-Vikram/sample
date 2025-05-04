
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Heart, Thermometer, Droplets, LineChart } from "lucide-react";
import { useSensors } from "@/context/SensorContext";
import { ResponsiveContainer, LineChart as Chart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function HealthData() {
  const { sensors } = useSensors();
  
  // Mock historical data for charts
  const generateMockData = (baseValue: number, range: number) => {
    return Array.from({ length: 24 }, (_, i) => {
      const hour = i;
      const value = baseValue + (Math.random() - 0.5) * range;
      return { hour: `${hour}:00`, value: parseFloat(value.toFixed(1)) };
    });
  };
  
  const mockData = {
    Temperature: generateMockData(98.6, 2),
    HeartRate: generateMockData(72, 20),
    BloodPressure: generateMockData(120, 30),
    Oxygen: generateMockData(98, 5),
    Glucose: generateMockData(105, 25)
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <Activity className="mr-2 h-6 w-6" /> Health Data
        </h1>
        <p className="text-muted-foreground">Track and analyze your health metrics</p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
          <TabsTrigger value="heart">Heart Rate</TabsTrigger>
          <TabsTrigger value="blood">Blood Pressure</TabsTrigger>
          <TabsTrigger value="oxygen">Oxygen</TabsTrigger>
          <TabsTrigger value="glucose">Glucose</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Thermometer className="h-4 w-4 mr-2" /> Temperature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <Chart data={mockData.Temperature}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="hour" />
                      <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </Chart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Heart className="h-4 w-4 mr-2" /> Heart Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <Chart data={mockData.HeartRate}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="hour" />
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#ff0000" activeDot={{ r: 8 }} />
                    </Chart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="temperature">
          <Card>
            <CardHeader>
              <CardTitle>Temperature History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <Chart data={mockData.Temperature}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="hour" />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </Chart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Similar content for other tabs */}
      </Tabs>
    </div>
  );
}

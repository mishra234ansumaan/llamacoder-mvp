import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { 
  Home,
  Map,
  User,
  Truck,
  Menu,
  X,
  Trophy,
  Camera
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { MapView } from './components/Mapview';
import { Profile } from './components/Profile';
import { Worker } from './components/Worker';
import { Leaderboard } from './components/Leaderboard';
import { AIScanner } from './components/AIScanner';

function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'map' | 'profile' | 'worker' | 'leaderboard' | 'scanner'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add mobile detection and touch optimization
  useEffect(() => {
    // Prevent zoom on double tap for mobile
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);

    // Handle viewport issues on mobile
    const handleResize = () => {
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport && window.innerWidth < 768) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'bg-blue-500' },
    { id: 'map', label: 'Map View', icon: Map, color: 'bg-green-500' },
    { id: 'scanner', label: 'AI Scanner', icon: Camera, color: 'bg-indigo-500' },
    { id: 'worker', label: 'Worker', icon: Truck, color: 'bg-orange-500' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, color: 'bg-purple-500' },
    { id: 'profile', label: 'Profile', icon: User, color: 'bg-pink-500' },
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return <MapView />;
      case 'scanner':
        return <AIScanner />;
      case 'worker':
        return <Worker />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg border-b border-purple-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-white rounded-lg p-2 mr-3">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
              </div>
              <h1 className="text-xl font-bold text-white">LiveWaste</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "default" : "ghost"}
                    onClick={() => setActiveView(item.id as any)}
                    className={`flex items-center gap-2 ${
                      activeView === item.id 
                        ? 'bg-white text-purple-600 hover:bg-purple-50' 
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:bg-white/20 p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "default" : "ghost"}
                    onClick={() => {
                      setActiveView(item.id as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full justify-start flex items-center gap-2 ${
                      activeView === item.id 
                        ? 'bg-white text-purple-600' 
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {renderActiveView()}
      </main>
    </div>
  );
}

export default App;
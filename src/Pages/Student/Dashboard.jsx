import { useState, useEffect } from 'react';
import { 
  Search, Home, Book, Users, MessageSquare, Bell, 
  Calendar, Users2, Settings, Download, BarChart2, 
  ChevronLeft, ChevronRight, Plus, Clock
} from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import profile from '../assets/profile.png';

// Mock Data
const activityData = [
  { day: 'Su', hours: 1 },
  { day: 'Mo', hours: 2 },
  { day: 'Tu', hours: 3 },
  { day: 'We', hours: 5 },
  { day: 'Th', hours: 3 },
  { day: 'Fr', hours: 4 },
  { day: 'Sa', hours: 2 },
];

const courseData = [
  {
    id: 1,
    title: 'Content Writing',
    lessons: 21,
    rating: 4.6,
    type: 'Data Research',
    icon: '📝',
    iconBg: 'bg-orange-100'
  },
  {
    id: 2,
    title: 'Usability Testing',
    lessons: 18,
    rating: 5.0,
    type: 'UX/UI Design',
    icon: '🔍',
    iconBg: 'bg-green-100'
  },
  {
    id: 3,
    title: 'Photography',
    lessons: 14,
    rating: 4.8,
    type: 'Art and Design',
    icon: '📷',
    iconBg: 'bg-blue-100'
  }
];

const scheduleData = [
  { title: 'Design System', type: 'Lecture - Class', icon: '🎨' },
  { title: 'Typography', type: 'Lecture - Test', icon: '🔤' },
  { title: 'Color Style', type: 'Lecture - Test', icon: '🎨' },
  { title: 'Visual Design', type: 'Lecture - Test', icon: '📊' },
];

const assignmentsData = [
  { 
    title: 'Methods of data', 
    date: '05 July, 10:00 AM', 
    status: 'in-progress', 
    icon: '🧩' 
  },
  { 
    title: 'Market Research', 
    date: '14 June, 02:45 AM', 
    status: 'completed', 
    icon: '📊' 
  },
  { 
    title: 'Data Collection', 
    date: '13 May, 10:00 AM', 
    status: 'upcoming', 
    icon: '📋' 
  },
];

const takingCoursesData = [
  {
    title: '3D Design Course',
    instructor: 'Manuel Andrew',
    progress: 45,
    remainingTime: '08h 45min',
    icon: '🧊',
    iconBg: 'bg-purple-100'
  },
  {
    title: 'Development Basics',
    instructor: 'Isabella Verhan',
    progress: 75,
    remainingTime: '04h 12min',
    icon: '🚀',
    iconBg: 'bg-red-100'
  }
];

// Generate calendar data for August 2023
const generateCalendar = () => {
  const calendar = [];
  const daysInMonth = 31; // August has 31 days
  const firstDay = 2; // Tuesday (0 = Sunday, 1 = Monday, etc.)
  
  // Add empty cells for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    calendar.push({ day: '', isToday: false, hasEvent: false });
  }
  
  // Add the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendar.push({ 
      day: i, 
      isToday: i === 24, // Assume 24th is today
      hasEvent: [4, 12, 18, 24, 29].includes(i) // Days with events
    });
  }
  
  return calendar;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userName, setUserName] = useState('Gokul');
  const [isLoading, setIsLoading] = useState(true);
  const [calendarData, setCalendarData] = useState([]);
  
  // Animation effects when component mounts
  useEffect(() => {
    setCalendarData(generateCalendar());
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animated entry class based on loading state
  const entryClass = isLoading 
    ? 'opacity-0 translate-y-4' 
    : 'opacity-100 translate-y-0';
  
  if(isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-purple-200">
        <div className="text-2xl font-bold text-purple-800 animate-pulse">
          Loading Edurays...
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center items-center w-screen h-full bg-purple-200 p-5">
      <div className="w-[95%] max-h-screen bg-white rounded-3xl shadow-xl overflow-hidden flex transition-all duration-500 ease-in-out">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white p-6 flex flex-col">
          <div className="flex items-center mb-8">
            <h1 className="text-white text-xl font-bold">Edurays</h1>
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-3 rounded-xl ${activeTab === 'dashboard' ? 'bg-green-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <Home size={18} className="mr-3" />
                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-3 rounded-xl ${activeTab === 'courses' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                  onClick={() => setActiveTab('courses')}
                >
                  <Book size={18} className="mr-3" />
                  <span>My Courses</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-3 rounded-xl ${activeTab === 'classes' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                  onClick={() => setActiveTab('classes')}
                >
                  <Users size={18} className="mr-3" />
                  <span>My Classes</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-3 rounded-xl ${activeTab === 'messages' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                  onClick={() => setActiveTab('messages')}
                >
                  <MessageSquare size={18} className="mr-3" />
                  <span>Messages</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-3 rounded-xl ${activeTab === 'notifications' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell size={18} className="mr-3" />
                  <span>Notifications</span>
                  <span className="ml-auto w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs">1</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-3 rounded-xl ${activeTab === 'calendars' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                  onClick={() => setActiveTab('calendars')}
                >
                  <Calendar size={18} className="mr-3" />
                  <span>Calendars</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-3 rounded-xl ${activeTab === 'community' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                  onClick={() => setActiveTab('community')}
                >
                  <Users2 size={18} className="mr-3" />
                  <span>Community</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-3 rounded-xl ${activeTab === 'settings' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings size={18} className="mr-3" />
                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </nav>

        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 transition-all duration-300 ease-in-out">
            <h1 className={`text-2xl text-black font-bold transition-all duration-500 ${entryClass}`}>
              Welcome back {userName} 👋
            </h1>
            <div className="flex items-center">
              <div className="relative mr-4">
                <input 
                  type="text" 
                  placeholder="Search courses" 
                  className="bg-gray-100 text-black rounded-lg pl-8 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
              </div>
              <div className="w-10 h-10 bg-purple-200 rounded-full overflow-hidden">
                <img src={profile} alt="User avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-12 gap-6">
            {/* New Courses Section */}
            <div className={`col-span-12 transition-all duration-500 delay-100 ${entryClass}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-black text-xl font-bold">New Courses</h2>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-700">View All</a>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {courseData.map(course => (
                  <div key={course.id} className="bg-blue-950 rounded-xl p-4 shadow hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-10 h-10 ${course.iconBg} rounded-lg flex items-center justify-center text-lg`}>
                        {course.icon}
                      </div>
                      <div className="flex items-center">
                         <div className="text-yellow-400 mr-1">★</div>
                         <span className="text-sm font-medium">{course.rating}</span>
                     </div>

                     </div>
                    <h3 className="font-bold mb-1">{course.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{course.lessons} Lessons</p>
                    <p className="text-xs text-gray-400">{course.type}</p>

                  </div>
                ))}
              </div>
            </div>
            
            {/* Hours Activity */}
            <div className={`col-span-6 transition-all duration-500 delay-200 ${entryClass}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-black text-xl font-bold">Hours Activity</h2>
                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
                  <span className="text-sm text-gray-600 mr-2">Weekly</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow">
                <div className="flex items-center mb-2">
                  <BarChart2 size={16} className="text-green-500 mr-2" />
                  <span className="text-sm font-medium text-green-500">+6% increase from last month</span>
                </div>
                
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} />
                      <Tooltip 
                        cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                        content={({ payload, label }) => {
                          if (payload && payload.length) {
                            return (
                              <div className="bg-gray-900 text-white p-2 rounded-lg shadow-lg text-xs">
                                <p>{`${label}: ${payload[0].value} hours`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar 
                        dataKey="hours" 
                        fill="#E5E7EB" 
                        radius={[4, 4, 0, 0]} 
                        barSize={24}
                        animationDuration={1500}
                      />
                      <Bar 
                        dataKey="hours" 
                        fill="#10B981" 
                        radius={[4, 4, 0, 0]} 
                        barSize={24} 
                        animationDuration={1500}
                        fillOpacity={0}
                        stroke="#10B981"
                        strokeWidth={2}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* Daily Schedule */}
            <div className={`col-span-6 transition-all duration-500 delay-300 ${entryClass}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-black text-xl font-bold">Daily Schedule</h2>
                <div className="flex">
                  <button className="mr-1">
                    <ChevronLeft size={20} className="text-gray-400" />
                  </button>
                  <button>
                    <ChevronRight size={20} className="text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow">
                <div className="mb-4">
                  <div className="grid grid-cols-7 mb-2 text-center">
                    <div className="text-xs text-gray-500">S</div>
                    <div className="text-xs text-gray-500">M</div>
                    <div className="text-xs text-gray-500">T</div>
                    <div className="text-xs text-gray-500">W</div>
                    <div className="text-xs text-gray-500">T</div>
                    <div className="text-xs text-gray-500">F</div>
                    <div className="text-xs text-gray-500">S</div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {calendarData.map((day, index) => (
                      <div 
                        key={index}
                        className={`py-1 text-xs font-medium rounded-full ${
                          day.isToday 
                            ? 'bg-green-500 text-white' 
                            : day.hasEvent 
                              ? 'text-orange-500' 
                              : 'text-gray-700'
                        }`}
                      >
                        {day.day}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {scheduleData.map((item, index) => (
                    <div key={index} className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-lg mr-3">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-black font-medium text-sm">{item.title}</h4>
                        <p className="text-xs text-gray-500">{item.type}</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Assignments */}
            <div className={`col-span-6 transition-all duration-500 delay-400 ${entryClass}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-black text-xl font-bold">Assignments</h2>
                <button className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <Plus size={16} className="text-white" />
                </button>
              </div>
              
              <div className="space-y-3">
                {assignmentsData.map((item, index) => (
                  <div key={index} className="bg-black rounded-xl p-4 shadow flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg mr-3">
                      {item.icon}
                    </div>
                    <div className="flex-1 start-0">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {item.date}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      item.status === 'in-progress' 
                        ? 'bg-blue-100 text-blue-700' 
                        : item.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status === 'in-progress' 
                        ? 'In progress' 
                        : item.status === 'completed' 
                          ? 'Completed' 
                          : 'Upcoming'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Courses You're Taking */}
            <div className={`col-span-6 transition-all duration-500 delay-500 ${entryClass}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-black text-xl font-bold">Course You're Taking</h2>
                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
                  <span className="text-sm text-gray-600 mr-2">Active</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-3">
                {takingCoursesData.map((course, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow">
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 ${course.iconBg} rounded-lg flex items-center justify-center text-lg mr-3`}>
                        {course.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-black font-medium text-sm">{course.title}</h4>
                        <p className="text-xs text-gray-500">{course.instructor}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs text-gray-500">
                        Remaining: {course.remainingTime}
                      </div>
                      <div className="text-xs font-medium">
                        {course.progress}%
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-green-500 h-1.5 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Premium Banner */}
          <div className={`mt-6 transition-all duration-500 delay-600 ${entryClass}`}>
            <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Go Premium</h3>
                <p className="text-gray-400 text-sm">Explore 25k+ courses with premium membership!</p>
              </div>
              <div className="flex items-center">
                <div className="w-24 h-24 relative mr-4">
                  <img src="/api/placeholder/96/96" alt="Premium illustration" className="w-full h-full object-cover" />
                </div>
                <button className="bg-yellow-400 text-gray-900 rounded-lg px-4 py-2 font-medium hover:bg-yellow-300 transition-colors duration-200">
                  Get Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
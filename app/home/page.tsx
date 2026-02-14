'use client';

import { useState } from 'react';
import {
  Heart,
  Bone,
  Baby,
  Activity,
  Stethoscope,
  Brain,
  Eye,
  Syringe,
  Clock,
  Users,
  ArrowRight,
  Search,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

// Department data with corrected icons
const departments = [
  {
    id: 'MED-001',
    name: 'General Medicine',
    icon: Stethoscope,
    color: 'from-blue-500 to-cyan-400',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    stats: {
      queue: 12,
      waiting: '15-20 min',
      doctors: 4
    },
    description: 'Primary care and internal medicine'
  },
  {
    id: 'ORT-002',
    name: 'Orthopedics',
    icon: Bone,
    color: 'from-green-500 to-emerald-400',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    stats: {
      queue: 8,
      waiting: '10-15 min',
      doctors: 3
    },
    description: 'Bone, joint, and muscle care'
  },
  {
    id: 'PED-003',
    name: 'Pediatrics',
    icon: Baby,
    color: 'from-yellow-500 to-orange-400',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200',
    stats: {
      queue: 15,
      waiting: '20-25 min',
      doctors: 5
    },
    description: 'Specialized care for children'
  },
  {
    id: 'CAR-004',
    name: 'Cardiology',
    icon: Heart,
    color: 'from-red-500 to-pink-400',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    stats: {
      queue: 6,
      waiting: '8-12 min',
      doctors: 3
    },
    description: 'Heart and cardiovascular system'
  },
  {
    id: 'NEU-005',
    name: 'Neurology',
    icon: Brain,
    color: 'from-purple-500 to-violet-400',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    stats: {
      queue: 4,
      waiting: '5-10 min',
      doctors: 2
    },
    description: 'Brain and nervous system'
  },
  {
    id: 'OPH-006',
    name: 'Ophthalmology',
    icon: Eye,
    color: 'from-indigo-500 to-blue-400',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-200',
    stats: {
      queue: 7,
      waiting: '10-15 min',
      doctors: 2
    },
    description: 'Eye care and vision'
  },
  {
    id: 'DEN-007',
    name: 'Dentistry',
    icon: Syringe,
    color: 'from-pink-500 to-rose-400',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-700',
    borderColor: 'border-pink-200',
    stats: {
      queue: 9,
      waiting: '12-18 min',
      doctors: 3
    },
    description: 'Dental and oral health'
  },
  {
    id: 'EME-008',
    name: 'Emergency',
    icon: Activity,
    color: 'from-orange-500 to-red-400',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
    stats: {
      queue: 3,
      waiting: 'Immediate',
      doctors: 6
    },
    description: '24/7 emergency care'
  }
];

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  // Filter departments based on search
  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                Department Selection
              </h1>
              <p className="text-gray-600 mt-1">
                Select a department to join the queue or check waiting times
              </p>
            </div>

            {/* Search Bar and My Bookings Button */}
            <div className="flex gap-3 items-center">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
                />
              </div>
              <Link
                href="/bookings"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all whitespace-nowrap"
              >
                My Bookings
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-blue-600 font-medium">Total Departments</p>
              <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm text-green-600 font-medium">Active Queues</p>
              <p className="text-2xl font-bold text-gray-900">
                {departments.reduce((acc, dept) => acc + dept.stats.queue, 0)}
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-sm text-purple-600 font-medium">Available Doctors</p>
              <p className="text-2xl font-bold text-gray-900">
                {departments.reduce((acc, dept) => acc + dept.stats.doctors, 0)}
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-sm text-orange-600 font-medium">Est. Wait Time</p>
              <p className="text-2xl font-bold text-gray-900">~15 min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredDepartments.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No departments found</h3>
            <p className="text-gray-600">Try adjusting your search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDepartments.map((dept) => {
              const Icon = dept.icon;
              const isSelected = selectedDepartment === dept.id;

              return (
                <div
                  key={dept.id}
                  className={`relative group cursor-pointer transform hover:scale-105 transition-all duration-300 ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                    }`}
                  onClick={() => setSelectedDepartment(dept.id)}
                >
                  {/* Card */}
                  <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border-2 ${dept.borderColor} transition-all`}>
                    {/* Colored Top Bar */}
                    <div className={`h-2 bg-gradient-to-r ${dept.color}`}></div>

                    <div className="p-6">
                      {/* Header with Icon */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${dept.bgColor} ${dept.textColor}`}>
                          {dept.id}
                        </span>
                      </div>

                      {/* Department Info */}
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{dept.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{dept.description}</p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <Clock className="w-4 h-4 text-gray-600 mx-auto mb-1" />
                          <p className="text-xs text-gray-500">Queue</p>
                          <p className="font-bold text-gray-900">{dept.stats.queue}</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <Users className="w-4 h-4 text-gray-600 mx-auto mb-1" />
                          <p className="text-xs text-gray-500">Doctors</p>
                          <p className="font-bold text-gray-900">{dept.stats.doctors}</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <Activity className="w-4 h-4 text-gray-600 mx-auto mb-1" />
                          <p className="text-xs text-gray-500">Wait</p>
                          <p className="font-bold text-gray-900">{dept.stats.waiting}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Link
                          href={`/queue/${dept.id.toLowerCase()}`}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center gap-1"
                        >
                          Join Queue
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                          className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle info/view details
                          }}
                        >
                          Details
                        </button>
                      </div>

                      {/* Live Indicator */}
                      <div className="absolute top-2 right-2 flex items-center gap-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs text-gray-500">Live</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Action Button for Selected Department */}
      {selectedDepartment && (
        <div className="fixed bottom-6 right-6 animate-bounce">
          <Link
            href={`/queue/${selectedDepartment.toLowerCase()}`}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl flex items-center gap-2 transition-all duration-300"
          >
            <span>Proceed with selected department</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </div>
  );
}
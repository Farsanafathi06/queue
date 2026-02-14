'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  User, 
  Clock, 
  Calendar,
  Star,
  MapPin,
  Phone,
  Mail,
  Award,
  ChevronRight,
  X
} from 'lucide-react';
import Link from 'next/link';
// We'll load the appointment component at runtime using useEffect to avoid interop issues

// Mock data for doctors
const doctorsData = {
  'med-001': {
    name: 'General Medicine',
    doctors: [
      {
        id: 'DOC-101',
        name: 'Dr. Sarah Johnson',
        qualification: 'MD - Internal Medicine',
        experience: '12 years',
        specialization: 'General Physician',
        languages: ['English', 'Hindi'],
        availability: 'Mon-Fri, 9AM-5PM',
        rating: 4.8,
        patients: 2450,
        image: '/doctors/doctor1.jpg',
        currentToken: 24,
        nextToken: 25,
        averageWaitTime: '15 mins',
        consultationFee: '₹500',
        education: 'MBBS, MD from AIIMS Delhi',
        about: 'Experienced general physician specializing in preventive healthcare and chronic disease management.',
        schedule: [
          { day: 'Monday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'] },
          { day: 'Tuesday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'] },
          { day: 'Wednesday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'] },
          { day: 'Thursday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'] },
          { day: 'Friday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'] },
        ]
      },
      {
        id: 'DOC-102',
        name: 'Dr. Michael Chen',
        qualification: 'MD - Family Medicine',
        experience: '8 years',
        specialization: 'Family Medicine',
        languages: ['English', 'Mandarin'],
        availability: 'Mon-Sat, 10AM-6PM',
        rating: 4.6,
        patients: 1800,
        image: '/doctors/doctor2.jpg',
        currentToken: 15,
        nextToken: 16,
        averageWaitTime: '10 mins',
        consultationFee: '₹450',
        education: 'MBBS, MD from CMC Vellore',
        about: 'Dedicated family medicine specialist focused on comprehensive primary care.',
        schedule: [
          { day: 'Monday', slots: ['10:00 AM', '11:00 AM', '12:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'] },
          { day: 'Tuesday', slots: ['10:00 AM', '11:00 AM', '12:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'] },
          { day: 'Wednesday', slots: ['10:00 AM', '11:00 AM', '12:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'] },
          { day: 'Thursday', slots: ['10:00 AM', '11:00 AM', '12:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'] },
          { day: 'Friday', slots: ['10:00 AM', '11:00 AM', '12:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'] },
          { day: 'Saturday', slots: ['10:00 AM', '11:00 AM', '12:00 PM'] },
        ]
      },
      {
        id: 'DOC-103',
        name: 'Dr. Priya Sharma',
        qualification: 'MD - Internal Medicine',
        experience: '15 years',
        specialization: 'Geriatric Care',
        languages: ['English', 'Hindi', 'Punjabi'],
        availability: 'Mon-Wed-Fri, 2PM-8PM',
        rating: 4.9,
        patients: 3200,
        image: '/doctors/doctor3.jpg',
        currentToken: 8,
        nextToken: 9,
        averageWaitTime: '8 mins',
        consultationFee: '₹600',
        education: 'MBBS, MD from KEM Hospital Mumbai',
        about: 'Senior physician with expertise in geriatric medicine and chronic disease management.',
        schedule: [
          { day: 'Monday', slots: ['2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'] },
          { day: 'Wednesday', slots: ['2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'] },
          { day: 'Friday', slots: ['2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'] },
        ]
      }
    ]
  },
  'ort-002': {
    name: 'Orthopedics',
    doctors: [
      {
        id: 'DOC-201',
        name: 'Dr. James Wilson',
        qualification: 'MS - Orthopedics',
        experience: '14 years',
        specialization: 'Joint Replacement',
        languages: ['English'],
        availability: 'Mon-Thu, 9AM-4PM',
        rating: 4.7,
        patients: 2100,
        image: '/doctors/doctor4.jpg',
        currentToken: 12,
        nextToken: 13,
        averageWaitTime: '20 mins',
        consultationFee: '₹800',
        education: 'MBBS, MS Ortho from Christian Medical College',
        about: 'Specialist in hip and knee replacement surgeries with advanced training in arthroscopy.',
        schedule: [
          { day: 'Monday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
          { day: 'Tuesday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
          { day: 'Wednesday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
          { day: 'Thursday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
        ]
      }
    ]
  }
};

export default function DoctorsPage() {
  const params = useParams();
  const departmentId = params.departmentId as string;
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [AppointmentComponent, setAppointmentComponent] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    import('../../components/appointment')
      .then((m) => {
        const Comp = (m as any)?.default ?? (m as any);
        if (mounted) setAppointmentComponent(() => Comp);
      })
      .catch((err) => console.error('Failed to load appointment component', err));
    return () => { mounted = false; };
  }, []);

  const department = doctorsData[departmentId as keyof typeof doctorsData];

  if (!department) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Department not found</h2>
          <Link href="/departments" className="text-blue-600 hover:underline mt-2 inline-block">
            Back to Departments
          </Link>
        </div>
      </div>
    );
  }

  const handleDoctorClick = (doctor: any) => {
    setSelectedDoctor(doctor);
    setShowTokenModal(true);
  };

  const handleAppointmentClick = (doctor: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDoctor(doctor);
    setShowAppointmentModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/departments" className="hover:text-blue-600">Departments</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{department.name}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Our Specialists</h1>
              <p className="text-gray-600 mt-1">
                {department.doctors.length} doctors available in {department.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {department.doctors.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => handleDoctorClick(doctor)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              {/* Doctor Card */}
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                    {doctor.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.qualification}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                      <span className="text-sm text-gray-500">({doctor.patients} patients)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">{doctor.specialization}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">{doctor.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span className="text-gray-700">Available {doctor.availability}</span>
                  </div>
                </div>

                {/* Token Status */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-600">Current Token</p>
                      <p className="text-2xl font-bold text-blue-600">#{doctor.currentToken}</p>
                    </div>
                    <div className="w-px h-10 bg-gray-300"></div>
                    <div>
                      <p className="text-xs text-gray-600">Next Token</p>
                      <p className="text-2xl font-bold text-green-600">#{doctor.nextToken}</p>
                    </div>
                    <div className="w-px h-10 bg-gray-300"></div>
                    <div>
                      <p className="text-xs text-gray-600">Wait Time</p>
                      <p className="text-sm font-bold text-orange-600">{doctor.averageWaitTime}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={(e) => handleAppointmentClick(doctor, e)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                  >
                    Take Appointment
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-all">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Token Details Modal */}
      {showTokenModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Token Status</h3>
                  <p className="text-gray-600">{selectedDoctor.name}</p>
                </div>
                <button
                  onClick={() => setShowTokenModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Current Token Display */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6">
                <p className="text-sm opacity-90 mb-2">Current Serving Token</p>
                <div className="text-5xl font-bold mb-2">#{selectedDoctor.currentToken}</div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs opacity-75">Next Token</p>
                    <p className="text-2xl font-bold">#{selectedDoctor.nextToken}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-75">Est. Wait Time</p>
                    <p className="text-2xl font-bold">{selectedDoctor.averageWaitTime}</p>
                  </div>
                </div>
              </div>

              {/* Token History */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Recent Tokens</h4>
                <div className="space-y-2">
                  {[selectedDoctor.currentToken - 2, selectedDoctor.currentToken - 1, selectedDoctor.currentToken].map((token) => (
                    <div key={token} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Token #{token}</span>
                      <span className="text-sm text-gray-600">
                        {token === selectedDoctor.currentToken ? 'Current' : 'Completed'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowTokenModal(false);
                    setShowAppointmentModal(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all"
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => setShowTokenModal(false)}
                  className="flex-1 border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Modal */}
      {AppointmentComponent && (
        <AppointmentComponent
          isOpen={showAppointmentModal}
          onClose={() => setShowAppointmentModal(false)}
          doctor={selectedDoctor}
        />
      )}
    </div>
  );
}
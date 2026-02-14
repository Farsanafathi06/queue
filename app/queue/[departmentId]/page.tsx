"use client";

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

// Mock data for doctors (copied from home/doctorlist to provide immediate functionality)
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
  const [AppointmentComponent, setAppointmentComponent] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    import('../../components/appointment')
      .then((m) => {
        const Comp = (m as any)?.default ?? (m as any);
        if (mounted) setAppointmentComponent(() => Comp);
      })
      .catch((err) => {
        console.error('Failed to load appointment component', err);
      });
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
    setShowAppointmentModal(true);
  };

  const handleAppointmentClick = (doctor: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDoctor(doctor);
    setShowAppointmentModal(true);
  };

  // Compute next available appointment date/time from doctor's schedule
  const getNextAppointment = (doctor: any) => {
    if (!doctor?.schedule || doctor.schedule.length === 0) return 'No upcoming slots';

    const today = new Date();
    const weekdayIndex = today.getDay(); // 0 (Sun) - 6 (Sat)
    const dayNameFromIndex = (i: number) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][i];

    // Format date consistently for SSR/client hydration
    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // Try to find a slot for today or the next 7 days
    for (let offset = 0; offset < 7; offset++) {
      const checkDate = new Date();
      checkDate.setDate(today.getDate() + offset);
      const dayName = dayNameFromIndex(checkDate.getDay());
      const daySchedule = doctor.schedule.find((s: any) => s.day === dayName);
      if (daySchedule && daySchedule.slots && daySchedule.slots.length > 0) {
        const slot = daySchedule.slots[0];
        // Format into a friendly string with consistent date format
        const formatted = `${dayName}, ${formatDate(checkDate)} at ${slot}`;
        return formatted;
      }
    }

    return 'No upcoming slots';
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

      {/* Doctors List - full width cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          {department.doctors.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => handleDoctorClick(doctor)}
              className="w-full bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-all duration-200"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                      {doctor.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.qualification} • {doctor.specialization}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="font-medium">{doctor.rating}</span>
                        <span>•</span>
                        <span>{doctor.patients} patients</span>
                      </div>
                    </div>
                  </div>


                  <div className="flex flex-col items-start md:items-end gap-3">
                    <div className="text-sm text-gray-600">Next appointment</div>
                    <div className="font-medium text-gray-900">{getNextAppointment(doctor)}</div>
                    <button
                      onClick={(e) => handleAppointmentClick(doctor, e)}
                      className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-6 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-cyan-700 transition-all"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>

                {/* Details row */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Current Token</p>
                    <p className="text-xl font-bold text-blue-600">#{doctor.currentToken}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Next Token</p>
                    <p className="text-xl font-bold text-green-600">#{doctor.nextToken}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Est. Wait</p>
                    <p className="text-xl font-bold text-orange-600">{doctor.averageWaitTime}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



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

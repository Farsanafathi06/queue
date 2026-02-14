"use client";

import { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle, Timer } from 'lucide-react';

interface AppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    doctor: {
        id: string;
        name: string;
        qualification: string;
        specialization: string;
        consultationFee: string;
        nextToken?: number;
        averageWaitTime?: string;
        schedule?: Array<{
            day: string;
            slots: string[];
        }>;
    } | null;
}

export default function AppointmentModal({ isOpen, onClose, doctor }: AppointmentModalProps) {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [patientName, setPatientName] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [reason, setReason] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [assignedToken, setAssignedToken] = useState<number>(0);

    if (!isOpen || !doctor) return null;


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate token assignment (in real app, this would come from backend)
        const tokenNumber = doctor.nextToken || Math.floor(Math.random() * 100) + 1;
        setAssignedToken(tokenNumber);

        // Create appointment object
        const appointment = {
            id: `APT-${Date.now()}`, // Unique ID
            doctorId: doctor.id,
            doctorName: doctor.name,
            doctorQualification: doctor.qualification,
            doctorSpecialization: doctor.specialization,
            consultationFee: doctor.consultationFee,
            patientName,
            patientPhone,
            patientEmail,
            selectedDate,
            selectedSlot,
            reason,
            tokenNumber,
            currentToken: (doctor as any).currentToken || 1, // Store current token at booking time
            averageWaitTime: doctor.averageWaitTime || '15 mins',
            bookedAt: new Date().toISOString(),
            status: 'confirmed' // confirmed, completed, cancelled
        };

        // Save to localStorage
        try {
            const existingBookings = localStorage.getItem('appointments');
            const bookings = existingBookings ? JSON.parse(existingBookings) : [];
            bookings.push(appointment);
            localStorage.setItem('appointments', JSON.stringify(bookings));
            console.log('Appointment saved to localStorage:', appointment);
        } catch (error) {
            console.error('Error saving appointment to localStorage:', error);
        }

        // Show confirmation screen
        setShowConfirmation(true);
    };


    const handleClose = () => {
        // Reset all states
        setSelectedDate('');
        setSelectedSlot('');
        setPatientName('');
        setPatientPhone('');
        setPatientEmail('');
        setReason('');
        setShowConfirmation(false);
        setAssignedToken(0);
        onClose();
    };

    // Calculate estimated arrival time based on token and slot
    const getEstimatedArrivalTime = () => {
        if (!selectedSlot || !assignedToken) return 'N/A';

        // Parse the selected slot time (e.g., "9:00 AM")
        const [time, period] = selectedSlot.split(' ');
        const [hours, minutes] = time.split(':').map(Number);

        // Convert to 24-hour format
        let hour24 = hours;
        if (period === 'PM' && hours !== 12) hour24 += 12;
        if (period === 'AM' && hours === 12) hour24 = 0;

        // Estimate: arrive 15 minutes before the slot time
        const arrivalHour = hour24;
        const arrivalMinute = Math.max(0, minutes - 15);

        // Format back to 12-hour format
        const displayHour = arrivalHour > 12 ? arrivalHour - 12 : (arrivalHour === 0 ? 12 : arrivalHour);
        const displayPeriod = arrivalHour >= 12 ? 'PM' : 'AM';
        const displayMinute = String(arrivalMinute).padStart(2, '0');

        return `${displayHour}:${displayMinute} ${displayPeriod}`;
    };

    // Generate available dates (next 7 days)
    const getAvailableDates = () => {
        const dates = [];
        const today = new Date();

        // Format date consistently for SSR/client hydration
        const formatDate = (date: Date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];

            // Check if doctor has schedule for this day
            const hasSchedule = doctor.schedule?.some(s => s.day === dayName);

            if (hasSchedule) {
                dates.push({
                    value: date.toISOString().split('T')[0],
                    label: `${dayName}, ${formatDate(date)}`,
                    dayName
                });
            }
        }

        return dates;
    };

    const availableDates = getAvailableDates();

    // Get slots for selected date
    const getAvailableSlots = () => {
        if (!selectedDate) return [];

        const selectedDateObj = availableDates.find(d => d.value === selectedDate);
        if (!selectedDateObj) return [];

        const daySchedule = doctor.schedule?.find(s => s.day === selectedDateObj.dayName);
        return daySchedule?.slots || [];
    };

    const availableSlots = getAvailableSlots();

    // Show confirmation screen after booking
    if (showConfirmation) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                        {/* Success Header */}
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-12 h-12 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h3>
                            <p className="text-gray-600">Your token has been assigned</p>
                        </div>

                        {/* Token Display */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6">
                            <p className="text-sm opacity-90 mb-2 text-center">Your Token Number</p>
                            <div className="text-6xl font-bold text-center mb-4">#{assignedToken}</div>
                            <div className="border-t border-white/20 pt-4">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Timer className="w-5 h-5" />
                                    <p className="text-sm opacity-90">Best Time to Arrive</p>
                                </div>
                                <p className="text-2xl font-bold text-center">{getEstimatedArrivalTime()}</p>
                                <p className="text-xs opacity-75 text-center mt-2">on {selectedDate}</p>
                            </div>
                        </div>

                        {/* Appointment Details */}
                        <div className="space-y-3 mb-6">
                            <h4 className="font-semibold text-gray-900">Appointment Details</h4>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Doctor:</span>
                                    <span className="font-medium text-gray-900">{doctor.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Patient:</span>
                                    <span className="font-medium text-gray-900">{patientName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Date:</span>
                                    <span className="font-medium text-gray-900">{availableDates.find(d => d.value === selectedDate)?.label}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Time Slot:</span>
                                    <span className="font-medium text-gray-900">{selectedSlot}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Fee:</span>
                                    <span className="font-medium text-gray-900">{doctor.consultationFee}</span>
                                </div>
                            </div>
                        </div>

                        {/* Important Note */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <p className="text-sm text-yellow-800">
                                <strong>Important:</strong> Please arrive at {getEstimatedArrivalTime()} to avoid missing your token.
                                Bring a valid ID and any relevant medical records.
                            </p>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Show appointment booking form
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Book Appointment</h3>
                            <p className="text-gray-600 mt-1">{doctor.name}</p>
                            <p className="text-sm text-gray-500">{doctor.qualification} • {doctor.specialization}</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>

                    {/* Consultation Fee */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700">Consultation Fee</span>
                            <span className="text-2xl font-bold text-blue-600">{doctor.consultationFee}</span>
                        </div>
                    </div>

                    {/* Appointment Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Patient Details */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900">Patient Details</h4>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <User className="w-4 h-4 inline mr-1" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={patientName}
                                    onChange={(e) => setPatientName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Phone className="w-4 h-4 inline mr-1" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={patientPhone}
                                    onChange={(e) => setPatientPhone(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Mail className="w-4 h-4 inline mr-1" />
                                    Email (Optional)
                                </label>
                                <input
                                    type="email"
                                    value={patientEmail}
                                    onChange={(e) => setPatientEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Date Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Calendar className="w-4 h-4 inline mr-1" />
                                Select Date
                            </label>
                            <select
                                required
                                value={selectedDate}
                                onChange={(e) => {
                                    setSelectedDate(e.target.value);
                                    setSelectedSlot(''); // Reset slot when date changes
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            >
                                <option value="">Choose a date</option>
                                {availableDates.map((date) => (
                                    <option key={date.value} value={date.value}>
                                        {date.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Time Slot Selection */}
                        {selectedDate && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Clock className="w-4 h-4 inline mr-1" />
                                    Select Time Slot
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {availableSlots.map((slot) => (
                                        <button
                                            key={slot}
                                            type="button"
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`py-2 px-3 rounded-lg border transition-all ${selectedSlot === slot
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                                }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Reason for Visit */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Reason for Visit (Optional)
                            </label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                placeholder="Brief description of your concern"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={!selectedDate || !selectedSlot}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Confirm Appointment
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

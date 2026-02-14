"use client";

import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

interface Appointment {
    id: string;
    doctorId: string;
    doctorName: string;
    doctorQualification: string;
    doctorSpecialization: string;
    consultationFee: string;
    patientName: string;
    patientPhone: string;
    patientEmail: string;
    selectedDate: string;
    selectedSlot: string;
    reason: string;
    tokenNumber: number;
    currentToken: number;
    averageWaitTime: string;
    bookedAt: string;
    status: string;
}

export default function MyBookingsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    useEffect(() => {
        // Load appointments from localStorage
        try {
            const stored = localStorage.getItem('appointments');
            if (stored) {
                const bookings = JSON.parse(stored);
                setAppointments(bookings);
            }
        } catch (error) {
            console.error('Error loading appointments:', error);
        }
    }, []);

    // Calculate estimated wait time based on current token and assigned token
    const calculateWaitTime = (currentToken: number, assignedToken: number, avgTime: string) => {
        const tokensAhead = Math.max(0, assignedToken - currentToken);

        // Parse average time (e.g., "15 mins" -> 15)
        const avgMinutes = parseInt(avgTime) || 15;
        const estimatedMinutes = tokensAhead * avgMinutes;

        if (estimatedMinutes === 0) {
            return 'Your turn now!';
        } else if (estimatedMinutes < 60) {
            return `~${estimatedMinutes} minutes`;
        } else {
            const hours = Math.floor(estimatedMinutes / 60);
            const mins = estimatedMinutes % 60;
            return `~${hours}h ${mins}m`;
        }
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Format booking timestamp
    const formatBookingTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleString();
    };

    if (selectedAppointment) {
        // Detail view
        const tokensAhead = Math.max(0, selectedAppointment.tokenNumber - selectedAppointment.currentToken);
        const waitTime = calculateWaitTime(selectedAppointment.currentToken, selectedAppointment.tokenNumber, selectedAppointment.averageWaitTime);

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
                <div className="max-w-2xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => setSelectedAppointment(null)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to My Bookings
                    </button>

                    {/* Appointment Detail Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-6">
                            {/* Status Badge */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
                                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    {selectedAppointment.status}
                                </span>
                            </div>

                            {/* Token Status */}
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm opacity-90 mb-1">Current Token</p>
                                        <p className="text-4xl font-bold">#{selectedAppointment.currentToken}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm opacity-90 mb-1">Your Token</p>
                                        <p className="text-4xl font-bold">#{selectedAppointment.tokenNumber}</p>
                                    </div>
                                </div>
                                <div className="border-t border-white/20 pt-4">
                                    <p className="text-sm opacity-90 mb-1">Estimated Wait Time</p>
                                    <p className="text-2xl font-bold">{waitTime}</p>
                                    <p className="text-xs opacity-75 mt-1">
                                        {tokensAhead} {tokensAhead === 1 ? 'person' : 'people'} ahead of you
                                    </p>
                                </div>
                            </div>

                            {/* Doctor Information */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Doctor Information</h3>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Name:</span>
                                        <span className="font-medium text-gray-900">{selectedAppointment.doctorName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Qualification:</span>
                                        <span className="font-medium text-gray-900">{selectedAppointment.doctorQualification}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Specialization:</span>
                                        <span className="font-medium text-gray-900">{selectedAppointment.doctorSpecialization}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Consultation Fee:</span>
                                        <span className="font-medium text-gray-900">{selectedAppointment.consultationFee}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Patient Information */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Patient Information</h3>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Name:</span>
                                        <span className="font-medium text-gray-900">{selectedAppointment.patientName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Phone:</span>
                                        <span className="font-medium text-gray-900">{selectedAppointment.patientPhone}</span>
                                    </div>
                                    {selectedAppointment.patientEmail && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Email:</span>
                                            <span className="font-medium text-gray-900">{selectedAppointment.patientEmail}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Appointment Schedule */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Appointment Schedule</h3>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Date:</span>
                                        <span className="font-medium text-gray-900">{formatDate(selectedAppointment.selectedDate)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Time Slot:</span>
                                        <span className="font-medium text-gray-900">{selectedAppointment.selectedSlot}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Booked On:</span>
                                        <span className="font-medium text-gray-900">{formatBookingTime(selectedAppointment.bookedAt)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Reason (if provided) */}
                            {selectedAppointment.reason && (
                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">Reason for Visit</h3>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-700">{selectedAppointment.reason}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // List view
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href="/home"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                            <Calendar className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
                            <p className="text-gray-600 mt-1">
                                {appointments.length} {appointments.length === 1 ? 'appointment' : 'appointments'} found
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Appointments List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {appointments.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                        <p className="text-gray-600 mb-4">Book your first appointment to see it here</p>
                        <Link
                            href="/home"
                            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all"
                        >
                            Browse Departments
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {appointments.map((appointment) => {
                            const tokensAhead = Math.max(0, appointment.tokenNumber - appointment.currentToken);
                            const waitTime = calculateWaitTime(appointment.currentToken, appointment.tokenNumber, appointment.averageWaitTime);

                            return (
                                <div
                                    key={appointment.id}
                                    onClick={() => setSelectedAppointment(appointment)}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
                                >
                                    <div className="p-6">
                                        {/* Token Badge */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg">
                                                <p className="text-xs opacity-90">Token</p>
                                                <p className="text-2xl font-bold">#{appointment.tokenNumber}</p>
                                            </div>
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                {appointment.status}
                                            </span>
                                        </div>

                                        {/* Doctor Info */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{appointment.doctorName}</h3>
                                        <p className="text-sm text-gray-600 mb-4">{appointment.doctorSpecialization}</p>

                                        {/* Appointment Details */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <User className="w-4 h-4 text-gray-500" />
                                                <span>{appointment.patientName}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Calendar className="w-4 h-4 text-gray-500" />
                                                <span>{formatDate(appointment.selectedDate)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Clock className="w-4 h-4 text-gray-500" />
                                                <span>{appointment.selectedSlot}</span>
                                            </div>
                                        </div>

                                        {/* Wait Time */}
                                        <div className="bg-blue-50 rounded-lg p-3">
                                            <p className="text-xs text-blue-600 mb-1">Estimated Wait</p>
                                            <p className="text-lg font-bold text-blue-700">{waitTime}</p>
                                            <p className="text-xs text-gray-600">{tokensAhead} ahead</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

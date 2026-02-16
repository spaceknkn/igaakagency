'use client';

import { useState, useEffect } from 'react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    artistName: string;
}

export default function BookingModal({ isOpen, onClose, artistName }: BookingModalProps) {
    const [formData, setFormData] = useState({
        // Event Details
        artist: artistName,
        eventDate: '',
        currency: 'USD$',
        budget: '',
        willPayTravel: false,
        willPayAccommodation: false,
        willPayTransportation: false,
        venueName: '',
        venueCapacity: '',
        venueAddress: '',
        venueCity: '',
        venueState: '',
        venueZipCode: '',
        venueCountry: '',
        performanceTime: '',
        setDuration: '',
        // Buyer Details
        messageToAgent: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyOrganization: '',
        country: '',
        // Opt-in
        receiveEmails: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setFormData(prev => ({ ...prev, artist: artistName }));
    }, [artistName]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Build email body
        const emailBody = `
BOOKING REQUEST
================

EVENT DETAILS
--------------
Artist: ${formData.artist}
Event Date: ${formData.eventDate}
Budget: ${formData.currency} ${formData.budget}
Will pay for travel: ${formData.willPayTravel ? 'Yes' : 'No'}
Will pay for accommodation: ${formData.willPayAccommodation ? 'Yes' : 'No'}
Will pay for ground transportation: ${formData.willPayTransportation ? 'Yes' : 'No'}
Venue Name: ${formData.venueName}
Venue Capacity: ${formData.venueCapacity}
Venue Address: ${formData.venueAddress}
Venue City: ${formData.venueCity}
Venue State/Province: ${formData.venueState}
Venue Zip Code: ${formData.venueZipCode}
Venue Country: ${formData.venueCountry}
Performance Time: ${formData.performanceTime}
Set Duration: ${formData.setDuration} minutes

BUYER DETAILS
--------------
Message to Agent: ${formData.messageToAgent}
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Company/Organization: ${formData.companyOrganization}
Country: ${formData.country}
Receive announcements: ${formData.receiveEmails ? 'Yes' : 'No'}
        `.trim();

        const subject = `Booking Request - ${formData.artist}`;
        const mailtoLink = `mailto:igaakagency@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

        window.location.href = mailtoLink;

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                onClose();
            }, 2000);
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/70" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-[1020px] bg-white my-4 mx-4 shadow-2xl" style={{ minHeight: '80vh' }}>
                {/* Header */}
                <div className="bg-neutral-900 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-white text-lg font-bold tracking-wide uppercase">
                        Booking Request
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-neutral-300 transition-colors text-2xl leading-none"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 md:p-10">
                    <div className="flex flex-col md:flex-row gap-10">
                        {/* Left Column - Event Details */}
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-black mb-6">Event Details</h3>

                            {/* Artist */}
                            <div className="mb-5">
                                <label className="block text-xs text-neutral-500 mb-1">Artist *</label>
                                <input
                                    type="text"
                                    name="artist"
                                    value={formData.artist}
                                    onChange={handleChange}
                                    required
                                    className="w-full border-b border-neutral-300 pb-2 text-sm text-black bg-transparent focus:outline-none focus:border-[#F5A623] transition-colors"
                                />
                            </div>

                            {/* Event Date */}
                            <div className="mb-5">
                                <label className="block text-xs text-neutral-500 mb-1">Event Date *</label>
                                <input
                                    type="date"
                                    name="eventDate"
                                    value={formData.eventDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full border-b border-neutral-300 pb-2 text-sm text-black bg-transparent focus:outline-none focus:border-[#F5A623] transition-colors"
                                />
                            </div>

                            {/* Budget */}
                            <div className="mb-5">
                                <div className="flex items-end gap-3">
                                    <div className="w-24">
                                        <select
                                            name="currency"
                                            value={formData.currency}
                                            onChange={handleChange}
                                            className="w-full border-b border-neutral-300 pb-2 text-sm text-black bg-transparent focus:outline-none focus:border-[#F5A623] transition-colors"
                                        >
                                            <option value="USD$">USD$</option>
                                            <option value="EUR€">EUR€</option>
                                            <option value="KRW₩">KRW₩</option>
                                            <option value="GBP£">GBP£</option>
                                            <option value="JPY¥">JPY¥</option>
                                            <option value="CNY¥">CNY¥</option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-xs text-neutral-500 mb-1">Budget *</label>
                                        <input
                                            type="text"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-b border-neutral-300 pb-2 text-sm text-black bg-transparent focus:outline-none focus:border-[#F5A623] transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Toggle Switches */}
                            <div className="space-y-3 mb-5">
                                <ToggleSwitch
                                    label="Will also pay for travel (Flights, Train, Bus)"
                                    name="willPayTravel"
                                    checked={formData.willPayTravel}
                                    onChange={handleChange}
                                />
                                <ToggleSwitch
                                    label="Will also pay for accommodation"
                                    name="willPayAccommodation"
                                    checked={formData.willPayAccommodation}
                                    onChange={handleChange}
                                />
                                <ToggleSwitch
                                    label="Will also pay for ground transportation"
                                    name="willPayTransportation"
                                    checked={formData.willPayTransportation}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Venue Fields */}
                            <FormField label="Venue Name" name="venueName" value={formData.venueName} onChange={handleChange} required />
                            <FormField label="Venue Capacity" name="venueCapacity" value={formData.venueCapacity} onChange={handleChange} required />
                            <FormField label="Venue Address" name="venueAddress" value={formData.venueAddress} onChange={handleChange} required />
                            <FormField label="Venue City" name="venueCity" value={formData.venueCity} onChange={handleChange} required />
                            <FormField label="Venue State / Province" name="venueState" value={formData.venueState} onChange={handleChange} required />
                            <FormField label="Venue Zip Code" name="venueZipCode" value={formData.venueZipCode} onChange={handleChange} required />
                            <FormField label="Venue Country" name="venueCountry" value={formData.venueCountry} onChange={handleChange} required />
                            <FormField label="Performance Time" name="performanceTime" value={formData.performanceTime} onChange={handleChange} required />
                            <FormField label="Set Duration (In Minutes)" name="setDuration" value={formData.setDuration} onChange={handleChange} required />
                        </div>

                        {/* Right Column - Buyer Details */}
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-black mb-6">Buyer Details</h3>

                            {/* Message to Agent */}
                            <div className="mb-5">
                                <label className="block text-xs text-neutral-500 mb-1">Message to Agent</label>
                                <textarea
                                    name="messageToAgent"
                                    value={formData.messageToAgent}
                                    onChange={handleChange}
                                    rows={2}
                                    className="w-full border-b border-neutral-300 pb-2 text-sm text-black bg-transparent focus:outline-none focus:border-[#F5A623] transition-colors resize-none"
                                />
                            </div>

                            <FormField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            <FormField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            <FormField label="Email" name="email" value={formData.email} onChange={handleChange} required type="email" />
                            <FormField label="Phone" name="phone" value={formData.phone} onChange={handleChange} required type="tel" />
                            <FormField label="Company/Organization" name="companyOrganization" value={formData.companyOrganization} onChange={handleChange} required />
                            <FormField label="Country" name="country" value={formData.country} onChange={handleChange} required />
                        </div>
                    </div>

                    {/* Email Opt-in */}
                    <div className="mt-8 mb-6">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="receiveEmails"
                                checked={formData.receiveEmails}
                                onChange={handleChange}
                                className="w-4 h-4 border-2 border-neutral-300 rounded accent-[#F5A623]"
                            />
                            <span className="text-sm text-neutral-600">
                                Would you like to receive emails with new announcements and upcoming tours?
                            </span>
                        </label>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#F5A623] hover:bg-[#E09515] text-white px-6 py-2.5 text-sm font-bold tracking-wider uppercase transition-colors disabled:opacity-50 rounded-sm"
                        >
                            {isSubmitting ? 'Sending...' : submitted ? 'Sent!' : 'REQUEST BOOKING'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-neutral-500 hover:text-black text-sm font-medium tracking-wider uppercase transition-colors"
                        >
                            CANCEL
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Reusable form field component
function FormField({
    label, name, value, onChange, required = false, type = 'text'
}: {
    label: string; name: string; value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean; type?: string;
}) {
    return (
        <div className="mb-5">
            <label className="block text-xs text-neutral-500 mb-1">
                {label}{required ? ' *' : ''}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full border-b border-neutral-300 pb-2 text-sm text-black bg-transparent focus:outline-none focus:border-[#F5A623] transition-colors"
            />
        </div>
    );
}

// Toggle switch component
function ToggleSwitch({
    label, name, checked, onChange
}: {
    label: string; name: string; checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="sr-only"
                />
                <div className={`w-10 h-5 rounded-full transition-colors ${checked ? 'bg-[#F5A623]' : 'bg-neutral-300'}`} />
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
            </div>
            <span className="text-sm text-neutral-600">{label}</span>
        </label>
    );
}

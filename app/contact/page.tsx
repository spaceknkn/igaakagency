export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                    Contact Us
                </h1>

                <div className="prose prose-invert max-w-none">
                    <p className="text-xl text-neutral-400 mb-12">
                        Get in touch with IGAAK for booking inquiries, management questions, or partnership opportunities.
                    </p>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-white text-xl font-bold mb-2">General Inquiries</h3>
                            <p className="text-neutral-400">
                                For general questions and information
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white text-xl font-bold mb-2">Artist Booking</h3>
                            <p className="text-neutral-400">
                                To book our artists for events and performances
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white text-xl font-bold mb-2">Management</h3>
                            <p className="text-neutral-400">
                                For artist management and representation inquiries
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

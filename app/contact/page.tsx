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

                    <div className="space-y-10">
                        <div>
                            <h3 className="text-neutral-500 font-medium mb-1 uppercase tracking-widest text-[10px]">General & Booking Inquiries</h3>
                            <div>
                                <a 
                                    href="mailto:igaakagency@gmail.com" 
                                    className="text-xl md:text-2xl font-normal text-white hover:text-[#F5A623] transition-colors break-all"
                                >
                                    igaakagency@gmail.com
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-neutral-500 font-medium mb-1 uppercase tracking-widest text-[10px]">WhatsApp</h3>
                            <div>
                                <a 
                                    href="https://wa.me/message/WLHQVP4M627VF1" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xl md:text-2xl font-normal text-white hover:text-[#25D366] transition-colors break-all"
                                >
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>

                        <div className="pt-10 border-t border-neutral-900">
                            <p className="text-neutral-600 text-xs">
                                Located in Seoul, South Korea. Operating globally.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

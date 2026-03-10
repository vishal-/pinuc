export interface Provider {
    id: string;
    name: string;
    slug: string;
    providerType: "individual" | "agency";
    serviceCategory: "home-repair" | "tutors" | "events";
    servicesOffered: string[];
    description: string;
    experienceYears: number;
    location: string;
    locality: string;
    rating: number;
    reviewCount: number;
    pricing: Array<{ service: string; price: number }>;
    portfolioImages: string[];
    phone: string;
    email: string;
}

export const providers: Provider[] = [
    // Electricians
    {
        id: "p1",
        name: "Raj Electrical Services",
        slug: "raj-electrician-dwarka-delhi",
        providerType: "individual",
        serviceCategory: "home-repair",
        servicesOffered: ["wiring installation", "fan installation", "switchboard repair"],
        description: "Experienced residential electrician providing repair and installation services in Dwarka and nearby areas.",
        experienceYears: 8,
        location: "Delhi",
        locality: "Dwarka",
        rating: 4.7,
        reviewCount: 128,
        pricing: [
            { service: "Fan Installation", price: 300 },
            { service: "Wiring Repair", price: 500 },
            { service: "Switchboard Repair", price: 800 }
        ],
        portfolioImages: ["/images/electric1.jpg", "/images/electric2.jpg"],
        phone: "+919876543210",
        email: "raj@electrical.com"
    },
    {
        id: "p2",
        name: "Power Solutions Delhi",
        slug: "power-solutions-electrician-rohini-delhi",
        providerType: "agency",
        serviceCategory: "home-repair",
        servicesOffered: ["electrical wiring", "light installation", "safety inspections"],
        description: "Professional electrical services providing comprehensive solutions for homes and offices across Rohini.",
        experienceYears: 12,
        location: "Delhi",
        locality: "Rohini",
        rating: 4.8,
        reviewCount: 245,
        pricing: [
            { service: "Light Installation", price: 200 },
            { service: "Full House Wiring", price: 3000 },
            { service: "Safety Inspection", price: 500 }
        ],
        portfolioImages: ["/images/electric3.jpg", "/images/electric4.jpg"],
        phone: "+919876543211",
        email: "info@powersolutions.com"
    },
    {
        id: "p3",
        name: "Ashok Electrician",
        slug: "ashok-electrician-saket-delhi",
        providerType: "individual",
        serviceCategory: "home-repair",
        servicesOffered: ["appliance repair", "earthing installation", "wiring"],
        description: "Trusted electrician in Saket with 6 years of experience in residential electrical repairs.",
        experienceYears: 6,
        location: "Delhi",
        locality: "Saket",
        rating: 4.5,
        reviewCount: 87,
        pricing: [
            { service: "Appliance Repair", price: 400 },
            { service: "Earthing Installation", price: 600 },
            { service: "Wiring", price: 500 }
        ],
        portfolioImages: ["/images/electric5.jpg"],
        phone: "+919876543212",
        email: "ashok@email.com"
    },
    {
        id: "p4",
        name: "Delhi Electrical Hub",
        slug: "delhi-electrical-hub-electrician-gurgaon-delhi",
        providerType: "agency",
        serviceCategory: "home-repair",
        servicesOffered: ["commercial wiring", "industrial setup", "maintenance"],
        description: "Full-service electrical company offering commercial and residential solutions throughout Delhi.",
        experienceYears: 15,
        location: "Delhi",
        locality: "Gurgaon",
        rating: 4.9,
        reviewCount: 356,
        pricing: [
            { service: "Commercial Wiring", price: 5000 },
            { service: "Maintenance Contract", price: 1000 }
        ],
        portfolioImages: ["/images/electric6.jpg", "/images/electric7.jpg"],
        phone: "+919876543213",
        email: "delhi@electricalhub.com"
    },
    {
        id: "p5",
        name: "Sunny Electricals",
        slug: "sunny-electricals-electrician-noida-delhi",
        providerType: "individual",
        serviceCategory: "home-repair",
        servicesOffered: ["cctv wiring", "internet cabling", "maintenance"],
        description: "Specialized in modern electrical solutions including CCTV and internet installations in Noida.",
        experienceYears: 5,
        location: "Delhi",
        locality: "Noida",
        rating: 4.6,
        reviewCount: 95,
        pricing: [
            { service: "CCTV Wiring", price: 2000 },
            { service: "Internet Cabling", price: 1500 }
        ],
        portfolioImages: ["/images/electric8.jpg"],
        phone: "+919876543214",
        email: "sunny@electricals.com"
    },

    // Plumbers
    {
        id: "p6",
        name: "Quick Plumbing Solutions",
        slug: "quick-plumbing-plumber-dwarka-delhi",
        providerType: "individual",
        serviceCategory: "home-repair",
        servicesOffered: ["pipe repair", "tap fitting", "drain cleaning"],
        description: "Fast and reliable plumbing services for residential and commercial needs in Dwarka.",
        experienceYears: 7,
        location: "Delhi",
        locality: "Dwarka",
        rating: 4.6,
        reviewCount: 110,
        pricing: [
            { service: "Pipe Repair", price: 400 },
            { service: "Tap Fitting", price: 200 },
            { service: "Drain Cleaning", price: 300 }
        ],
        portfolioImages: ["/images/plumber1.jpg"],
        phone: "+919876543215",
        email: "quickplumb@email.com"
    },
    {
        id: "p7",
        name: "Pro Plumbers Delhi",
        slug: "pro-plumbers-plumber-rohini-delhi",
        providerType: "agency",
        serviceCategory: "home-repair",
        servicesOffered: ["bathroom renovation", "kitchen setup", "water supply"],
        description: "Expert plumbing team specializing in full bathroom and kitchen renovations.",
        experienceYears: 10,
        location: "Delhi",
        locality: "Rohini",
        rating: 4.7,
        reviewCount: 167,
        pricing: [
            { service: "Bathroom Renovation", price: 8000 },
            { service: "Kitchen Setup", price: 6000 }
        ],
        portfolioImages: ["/images/plumber2.jpg", "/images/plumber3.jpg"],
        phone: "+919876543216",
        email: "proplumbers@delhi.com"
    },

    // Carpenters
    {
        id: "p8",
        name: "Woodcraft Carpentry",
        slug: "woodcraft-carpentry-carpenter-saket-delhi",
        providerType: "individual",
        serviceCategory: "home-repair",
        servicesOffered: ["custom furniture", "door repair", "shelving"],
        description: "Skilled carpenter providing custom woodwork and furniture solutions in Saket.",
        experienceYears: 9,
        location: "Delhi",
        locality: "Saket",
        rating: 4.8,
        reviewCount: 98,
        pricing: [
            { service: "Custom Furniture", price: 5000 },
            { service: "Door Repair", price: 300 },
            { service: "Shelving", price: 2000 }
        ],
        portfolioImages: ["/images/carpenter1.jpg", "/images/carpenter2.jpg"],
        phone: "+919876543217",
        email: "woodcraft@carpentry.com"
    },
    {
        id: "p9",
        name: "Elite Furniture Solutions",
        slug: "elite-furniture-carpenter-gurgaon-delhi",
        providerType: "agency",
        serviceCategory: "home-repair",
        servicesOffered: ["modular kitchen", "wardrobe design", "interior carpentry"],
        description: "Premium carpentry services specializing in modular designs and interior solutions.",
        experienceYears: 13,
        location: "Delhi",
        locality: "Gurgaon",
        rating: 4.9,
        reviewCount: 234,
        pricing: [
            { service: "Modular Kitchen", price: 15000 },
            { service: "Wardrobe Design", price: 8000 }
        ],
        portfolioImages: ["/images/carpenter3.jpg", "/images/carpenter4.jpg"],
        phone: "+919876543218",
        email: "elite@furniture.com"
    },

    // Math Tutors
    {
        id: "p10",
        name: "Amit Kumar - Math Expert",
        slug: "amit-kumar-math-tutor-rohini-delhi",
        providerType: "individual",
        serviceCategory: "tutors",
        servicesOffered: ["algebra", "geometry", "calculus", "board exam prep"],
        description: "Experienced math tutor specializing in board exams and competitive exam preparation.",
        experienceYears: 5,
        location: "Delhi",
        locality: "Rohini",
        rating: 4.8,
        reviewCount: 156,
        pricing: [
            { service: "1-on-1 Session", price: 500 },
            { service: "Monthly Course", price: 4000 }
        ],
        portfolioImages: ["/images/tutor1.jpg"],
        phone: "+919876543219",
        email: "amit.mathtutor@email.com"
    },
    {
        id: "p11",
        name: "Delhi Academy Tutors",
        slug: "delhi-academy-tutors-math-tutor-dwarka-delhi",
        providerType: "agency",
        serviceCategory: "tutors",
        servicesOffered: ["JEE coaching", "NEET math", "class 10-12"],
        description: "Comprehensive tutoring academy with experienced teachers for competitive exams.",
        experienceYears: 12,
        location: "Delhi",
        locality: "Dwarka",
        rating: 4.9,
        reviewCount: 312,
        pricing: [
            { service: "JEE Coaching", price: 8000 },
            { service: "Class Session", price: 600 }
        ],
        portfolioImages: ["/images/tutor2.jpg", "/images/tutor3.jpg"],
        phone: "+919876543220",
        email: "academy@tutors.com"
    },
    {
        id: "p12",
        name: "Priya Sharma - Math Tuition",
        slug: "priya-sharma-math-tutor-saket-delhi",
        providerType: "individual",
        serviceCategory: "tutors",
        servicesOffered: ["cbse math", "icse math", "foundation"],
        description: "Personalized math tutoring for CBSE and ICSE students with focus on fundamentals.",
        experienceYears: 6,
        location: "Delhi",
        locality: "Saket",
        rating: 4.7,
        reviewCount: 89,
        pricing: [
            { service: "Per Session", price: 400 },
            { service: "Monthly Package", price: 3500 }
        ],
        portfolioImages: ["/images/tutor4.jpg"],
        phone: "+919876543221",
        email: "priya.tutor@classes.com"
    },

    // Science Tutors
    {
        id: "p13",
        name: "Science Hub Coaching",
        slug: "science-hub-coaching-science-tutor-gurgaon-delhi",
        providerType: "agency",
        serviceCategory: "tutors",
        servicesOffered: ["physics", "chemistry", "biology", "lab guidance"],
        description: "Complete science coaching with hands-on experiment guidance and concept clarity.",
        experienceYears: 10,
        location: "Delhi",
        locality: "Gurgaon",
        rating: 4.8,
        reviewCount: 201,
        pricing: [
            { service: "Individual Class", price: 550 },
            { service: "Monthly Plan", price: 4500 }
        ],
        portfolioImages: ["/images/tutor5.jpg"],
        phone: "+919876543222",
        email: "sciencehub@coaching.com"
    },
    {
        id: "p14",
        name: "Rajesh Physics Tuition",
        slug: "rajesh-physics-tutor-noida-delhi",
        providerType: "individual",
        serviceCategory: "tutors",
        servicesOffered: ["mechanics", "thermodynamics", "waves", "electromagnetism"],
        description: "Physics specialist with focus on problem-solving and concept understanding.",
        experienceYears: 8,
        location: "Delhi",
        locality: "Noida",
        rating: 4.6,
        reviewCount: 73,
        pricing: [
            { service: "Per Session", price: 500 },
            { service: "Monthly Coaching", price: 4000 }
        ],
        portfolioImages: ["/images/tutor6.jpg"],
        phone: "+919876543223",
        email: "rajesh.physics@email.com"
    },

    // Music Teachers
    {
        id: "p15",
        name: "Melody Music School",
        slug: "melody-music-school-music-teacher-dwarka-delhi",
        providerType: "agency",
        serviceCategory: "tutors",
        servicesOffered: ["classical vocals", "western vocals", "piano", "guitar"],
        description: "Professional music academy offering classical and contemporary music training.",
        experienceYears: 11,
        location: "Delhi",
        locality: "Dwarka",
        rating: 4.7,
        reviewCount: 145,
        pricing: [
            { service: "Group Class", price: 1000 },
            { service: "Individual Lesson", price: 700 }
        ],
        portfolioImages: ["/images/music1.jpg", "/images/music2.jpg"],
        phone: "+919876543224",
        email: "melody@musicschool.com"
    },
    {
        id: "p16",
        name: "Sanjay Guitar Classes",
        slug: "sanjay-guitar-classes-music-teacher-saket-delhi",
        providerType: "individual",
        serviceCategory: "tutors",
        servicesOffered: ["acoustic guitar", "electric guitar", "music theory"],
        description: "Experienced guitar instructor teaching from basics to advanced levels.",
        experienceYears: 7,
        location: "Delhi",
        locality: "Saket",
        rating: 4.6,
        reviewCount: 64,
        pricing: [
            { service: "Per Lesson", price: 500 },
            { service: "Monthly Plan", price: 2000 }
        ],
        portfolioImages: ["/images/music3.jpg"],
        phone: "+919876543225",
        email: "sanjay.guitar@music.com"
    },
    {
        id: "p17",
        name: "Nandini Classical Voice",
        slug: "nandini-classical-voice-music-teacher-rohini-delhi",
        providerType: "individual",
        serviceCategory: "tutors",
        servicesOffered: ["hindustani classical", "semi-classical", "devotional"],
        description: "Classical vocalist with training in Hindustani music tradition.",
        experienceYears: 9,
        location: "Delhi",
        locality: "Rohini",
        rating: 4.8,
        reviewCount: 108,
        pricing: [
            { service: "Lesson", price: 600 },
            { service: "Monthly", price: 5000 }
        ],
        portfolioImages: ["/images/music4.jpg"],
        phone: "+919876543226",
        email: "nandini.voice@classical.com"
    },

    // Photographers
    {
        id: "p18",
        name: "CaptureLife Photography",
        slug: "capturelife-photography-photographer-saket-delhi",
        providerType: "individual",
        serviceCategory: "events",
        servicesOffered: ["weddings", "portraits", "events", "candid"],
        description: "Creative photographer specializing in candid wedding and portrait photography.",
        experienceYears: 6,
        location: "Delhi",
        locality: "Saket",
        rating: 4.8,
        reviewCount: 187,
        pricing: [
            { service: "Wedding Package", price: 25000 },
            { service: "Event Shoot", price: 8000 },
            { service: "Portrait Session", price: 2000 }
        ],
        portfolioImages: ["/images/photo1.jpg", "/images/photo2.jpg"],
        phone: "+919876543227",
        email: "capturelife@photo.com"
    },
    {
        id: "p19",
        name: "Delhi Studios Pro",
        slug: "delhi-studios-pro-photographer-gurgaon-delhi",
        providerType: "agency",
        serviceCategory: "events",
        servicesOffered: ["pre-wedding", "corporate", "product", "videography"],
        description: "Professional photography and videography services for all occasions.",
        experienceYears: 13,
        location: "Delhi",
        locality: "Gurgaon",
        rating: 4.9,
        reviewCount: 289,
        pricing: [
            { service: "Wedding Package", price: 50000 },
            { service: "Videography Add-on", price: 15000 }
        ],
        portfolioImages: ["/images/photo3.jpg", "/images/photo4.jpg"],
        phone: "+919876543228",
        email: "delhistudios@pro.com"
    },
    {
        id: "p20",
        name: "Moment Capture Studios",
        slug: "moment-capture-studios-photographer-dwarka-delhi",
        providerType: "agency",
        serviceCategory: "events",
        servicesOffered: ["candid", "traditional", "cinematic", "drone"],
        description: "High-end photography with drone coverage and cinematic videography.",
        experienceYears: 10,
        location: "Delhi",
        locality: "Dwarka",
        rating: 4.7,
        reviewCount: 156,
        pricing: [
            { service: "Complete Wedding", price: 40000 },
            { service: "Drone Coverage", price: 5000 }
        ],
        portfolioImages: ["/images/photo5.jpg"],
        phone: "+919876543229",
        email: "moment@capture.com"
    },

    // Makeup Artists
    {
        id: "p21",
        name: "Priya's Bridal Makeup",
        slug: "priyas-bridal-makeup-makeup-artist-rohini-delhi",
        providerType: "individual",
        serviceCategory: "events",
        servicesOffered: ["bridal makeup", "party makeup", "airbrush", "trials"],
        description: "Expert bridal makeup artist with 8 years of experience in traditional and modern styles.",
        experienceYears: 8,
        location: "Delhi",
        locality: "Rohini",
        rating: 4.8,
        reviewCount: 203,
        pricing: [
            { service: "Bridal Makeup", price: 3000 },
            { service: "Party Makeup", price: 1500 },
            { service: "Makeup Trial", price: 500 }
        ],
        portfolioImages: ["/images/makeup1.jpg", "/images/makeup2.jpg"],
        phone: "+919876543230",
        email: "priyas.makeup@artist.com"
    },
    {
        id: "p22",
        name: "Glamour Makeup Studio",
        slug: "glamour-makeup-studio-makeup-artist-noida-delhi",
        providerType: "agency",
        serviceCategory: "events",
        servicesOffered: ["bridal", "bridesmaid", "groom", "makeup lessons"],
        description: "Full-service makeup studio with professional makeup artists for all occasions.",
        experienceYears: 12,
        location: "Delhi",
        locality: "Noida",
        rating: 4.9,
        reviewCount: 267,
        pricing: [
            { service: "Wedding Special", price: 5000 },
            { service: "Party Makeup", price: 2000 }
        ],
        portfolioImages: ["/images/makeup3.jpg"],
        phone: "+919876543231",
        email: "glamour@makeup.studio"
    },
    {
        id: "p23",
        name: "Ritu Beauty Artistry",
        slug: "ritu-beauty-artistry-makeup-artist-saket-delhi",
        providerType: "individual",
        serviceCategory: "events",
        servicesOffered: ["hd makeup", "contouring", "bridal", "editorial"],
        description: "Creative makeup artist specializing in HD makeup and editorial looks.",
        experienceYears: 6,
        location: "Delhi",
        locality: "Saket",
        rating: 4.7,
        reviewCount: 127,
        pricing: [
            { service: "HD Makeup", price: 2500 },
            { service: "Bridal Package", price: 4000 }
        ],
        portfolioImages: ["/images/makeup4.jpg"],
        phone: "+919876543232",
        email: "ritu.beauty@artistry.com"
    },

    // Event Planners
    {
        id: "p24",
        name: "Grand Events India",
        slug: "grand-events-india-event-planner-gurgaon-delhi",
        providerType: "agency",
        serviceCategory: "events",
        servicesOffered: ["weddings", "corporate events", "birthday", "venue management"],
        description: "Complete event management services for weddings, corporate and social events.",
        experienceYears: 14,
        location: "Delhi",
        locality: "Gurgaon",
        rating: 4.9,
        reviewCount: 342,
        pricing: [
            { service: "Wedding Planning", price: 50000 },
            { service: "Corporate Event", price: 30000 },
            { service: "Birthday Party", price: 15000 }
        ],
        portfolioImages: ["/images/event1.jpg", "/images/event2.jpg"],
        phone: "+919876543233",
        email: "grand@events.india"
    },
    {
        id: "p25",
        name: "Perfect Occasions",
        slug: "perfect-occasions-event-planner-dwarka-delhi",
        providerType: "individual",
        serviceCategory: "events",
        servicesOffered: ["small gatherings", "birthday", "anniversary", "decoration"],
        description: "Personalized event planning focusing on small to medium gatherings.",
        experienceYears: 5,
        location: "Delhi",
        locality: "Dwarka",
        rating: 4.6,
        reviewCount: 94,
        pricing: [
            { service: "Full Event Planning", price: 10000 },
            { service: "Decoration Only", price: 5000 }
        ],
        portfolioImages: ["/images/event3.jpg"],
        phone: "+919876543234",
        email: "perfect@occasions.com"
    },
    {
        id: "p26",
        name: "Elite Event Management",
        slug: "elite-event-management-event-planner-rohini-delhi",
        providerType: "agency",
        serviceCategory: "events",
        servicesOffered: ["destination weddings", "conferences", "exhibitions"],
        description: "Premium event management for large-scale weddings and corporate events.",
        experienceYears: 11,
        location: "Delhi",
        locality: "Rohini",
        rating: 4.8,
        reviewCount: 215,
        pricing: [
            { service: "Destination Wedding", price: 100000 },
            { service: "Conference", price: 40000 }
        ],
        portfolioImages: ["/images/event4.jpg"],
        phone: "+919876543235",
        email: "elite@events.management"
    }
];

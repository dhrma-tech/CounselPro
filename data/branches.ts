import { Branch } from '@/lib/types';

export const branches: Branch[] = [
  // --- COMPUTER & IT VERTICAL ---
  {
    slug: 'computer-science-engineering',
    name: 'Computer Science Engineering',
    domain: 'CS & IT',
    description: 'The fundamental backbone of the digital economy, focusing on computational systems, software architecture, and algorithmic efficiency.',
    longDescription: 'The discipline of Computer Science Engineering (CSE) emerged globally in the mid-20th century, evolving from theoretical mathematics, logic, and electrical engineering into an independent, indispensable academic powerhouse. In the Indian context, the post-1990s economic liberalization acted as a massive catalyst, transforming the nation into a premier global IT services hub. CSE grads manage complex sectors ranging from decentralized fintech and healthcare technology to global cloud infrastructure.',
    coreSubjects: ['Programming Languages (C++, Java, Python)', 'Data Structures and Algorithms', 'Operating Systems', 'Database Management Systems', 'Computer Networks', 'Software Engineering', 'Machine Learning Fundamentals'],
    specializationTracks: ['Artificial Intelligence & Machine Learning', 'Cybersecurity', 'Cloud Computing', 'Blockchain Technology', 'Data Science & Big Data', 'AR/VR'],
    careerPaths: ['Software Developer', 'System Analyst', 'Database Administrator', 'DevOps Engineer', 'Cloud Architect'],
    skillRequirements: {
      technical: ['OOPS languages', 'Full-stack frameworks', 'Version control', 'API integration'],
      soft: ['Agile project management', 'Analytical reasoning', 'Cross-functional collaboration', 'Creative problem-solving']
    },
    topColleges: ['IIT Bombay', 'IIT Delhi', 'IIIT Hyderabad', 'NIT Trichy', 'COEP Pune']
  },
  {
    slug: 'information-technology',
    name: 'Information Technology',
    domain: 'CS & IT',
    description: 'Applied discipline of deploying, managing, and securing digital systems within complex business environments.',
    longDescription: 'While frequently conflated with Computer Science, IT represents a distinct pragmatic divergence. If computer science is the study of theory, IT is the applied discipline of managing enterprise systems. Modern industry relies on IT engineers to architect solutions, maintain secure data repositories, and ensure seamless communication networks across multinational corporate footprints.',
    coreSubjects: ['Human-Computer Interaction', 'Web Services and E-Commerce', 'Middleware Technologies', 'Sensor Networks', 'Software Testing & QA', 'Scripting Languages'],
    specializationTracks: ['Enterprise Cybersecurity', 'IT Service Management', 'Mobile App Development', 'Computer Forensics', 'Cloud Administration', 'Game Development'],
    careerPaths: ['IT Systems Analyst', 'Network Administrator', 'Cloud Operations Engineer', 'Information Security Specialist', 'Database Administrator'],
    skillRequirements: {
      technical: ['TCP/IP, DNS configuration', 'SQL/NoSQL Admin', 'AWS/Azure Management', 'Systems Analysis'],
      soft: ['Business requirement analysis', 'Client communication', 'Crisis management', 'Enterprise problem-solving']
    },
    topColleges: ['NSUT Delhi', 'DTU', 'NIT Karnataka', 'Walchand Sangli']
  },
  {
    slug: 'software-engineering',
    name: 'Software Engineering',
    domain: 'CS & IT',
    description: 'Systematic approach to developing, operating, and maintaining complex enterprise-scale software systems.',
    longDescription: 'Applying rigorous engineering principles to the entire software development lifecycle (SDLC). In India, the IT sector relies on formally trained software engineers to build scalable, secure, and reliable enterprise applications. As software systems grow increasingly complex, the demand for engineers who understand agile methodologies, software testing, and CI/CD pipelines continues to surge dramatically, ensuring codebases remain maintainable and secure.',
    coreSubjects: ['SDLC', 'Object-Oriented Programming', 'Software Testing & QA', 'Database Systems', 'Web Technologies', 'Software Architecture'],
    specializationTracks: ['Full-Stack Development', 'Mobile App Development', 'Cloud-Native Architecture', 'DevOps/DevSecOps', 'Enterprise Software Architecture'],
    careerPaths: ['Full-Stack Developer', 'Software Architect', 'DevOps Engineer', 'Quality Assurance (QA) Engineer', 'Mobile App Developer'],
    skillRequirements: {
      technical: ['Java, Python, JS Proficiency', 'Git', 'Agile frameworks', 'API integration'],
      soft: ['Collaborative teamwork', 'Adaptable problem-solving', 'User-centric design thinking']
    },
    topColleges: ['DTU Delhi', 'NSUT Delhi', 'BITS Pilani', 'NIT Surathkal']
  },
  {
    slug: 'cyber-security-engineering',
    name: 'Cyber Security Engineering',
    domain: 'CS & IT',
    description: 'Protecting digital landscapes from complex threats through advanced cryptography and network defense.',
    longDescription: 'Cyber Security Engineering focuses on safeguarding organizational data and infrastructure from malicious attacks. In an era of rampant data breaches, these engineers design impenetrable firewalls, manage cryptographic keys, and conduct ethical hacking to identify vulnerabilities before they are exploited. India’s push for digital sovereignty has made this field critically important for defense and finance.',
    coreSubjects: ['Cryptography', 'Network Security', 'Ethical Hacking', 'Digital Forensics', 'Application Security', 'Risk Management'],
    specializationTracks: ['Cloud Security', 'Threat Intelligence', 'Industrial Cybersecurity', 'Incident Response', 'Security Orchestration'],
    careerPaths: ['Security Architect', 'Chief Information Security Officer', 'Vulnerability Researcher', 'Cyber Forensic Expert'],
    skillRequirements: {
      technical: ['Kali Linux', 'Burp Suite', 'Advanced Cryptography', 'SIEM tools'],
      soft: ['Ethical integrity', 'Attention to detail', 'Strategic mindset']
    },
    topColleges: ['IIT Hyderabad', 'NIT Trichy', 'IIIT Delhi', 'National Forensic Sciences University']
  },
  {
    slug: 'ioe-engineering',
    name: 'Internet of Things (IoT) Engineering',
    domain: 'CS & IT',
    description: 'Architecting interconnected ecosystems where sensors and devices communicate to create smart environments.',
    longDescription: 'IoT Engineering is the science of connecting physical devices to the digital world. It is the backbone of Smart Cities and Industrial 4.0. Engineers design low-power wireless networks that allow everything from heart monitors to thousands of factory sensors to transmit data seamlessly, enabling real-time monitoring and autonomous decision-making.',
    coreSubjects: ['Sensor Technology', 'Wireless Communications', 'IoT Architecture', 'Cloud Computing', 'Embedded Systems', 'Data Analytics'],
    specializationTracks: ['Smart Homes', 'Industrial IoT (IIoT)', 'Connected Health', 'IoT Security', 'Precision Agriculture'],
    careerPaths: ['IoT Solution Architect', 'Embedded Hardware Developer', 'Sensor Systems Engineer', 'IoT Security Specialist'],
    skillRequirements: {
      technical: ['MQTT/CoAP protocols', 'Arduino/Raspberry Pi', 'Python', 'Cloud integration'],
      soft: ['Systemic thinking', 'Cross-functional collaboration', 'Innovation']
    },
    topColleges: ['IIT Madras', 'NIT Warangal', 'BITS Pilani', 'VJTI Mumbai']
  },
  {
    slug: 'robotics-automation',
    name: 'Robotics & Automation',
    domain: 'Mechanical',
    description: 'Integrating mechanical design with AI and control theory to build intelligent, autonomous machines.',
    longDescription: 'Robotics and Automation is at the frontier of manufacturing and service industries. It involves designing robotic arms for assembly lines, autonomous drones for delivery, and surgical robots for medicine. High relevance in India’s automotive and logistics sectors where efficiency depends on precise, repetitive motion and cognitive AI integration.',
    coreSubjects: ['Robot Kinematics', 'Control Systems Theory', 'Machine Vision', 'Mechatronics', 'Artificial Intelligence', 'CAD/CAM'],
    specializationTracks: ['Industrial Robotics', 'Humanoid Robots', 'Collaborative Robots (Cobots)', 'Medical Robotics', 'Swarm Intelligence'],
    careerPaths: ['Robotics Engineer', 'Automation Lead', 'Machine Vision Engineer', 'UAV Designer'],
    skillRequirements: {
      technical: ['ROS (Robot OS)', 'C++', 'SolidWorks', 'PLC Programming'],
      soft: ['Spatial visualization', 'Critical problem solving', 'Future-oriented thinking']
    },
    topColleges: ['IIT Bombay', 'IIT Kanpur', 'IISc Bangalore', 'NIT Surathkal']
  },
  {
    slug: 'information-science',
    name: 'Information Science Engineering',
    domain: 'CS & IT',
    description: 'Focusing on the secure storage, retrieval, and management of organizational information systems.',
    longDescription: 'ISE is intrinsically aligned with leveraging technology to solve complex enterprise data challenges. It distinguishes itself by its focus on information management systems rather than just pure hardware or algorithms. In India, ISE grads manage massive ERP systems and cloud databases while securing vital organizational information.',
    coreSubjects: ['Information Management', 'Database Design', 'Cryptography', 'Web Technologies', 'Software Engineering'],
    specializationTracks: ['ERP Systems', 'Information Security', 'Cloud Data Management', 'Blockchain Systems'],
    careerPaths: ['Information Security Analyst', 'Database Administrator', 'Systems Integrator', 'IT Consultant'],
    skillRequirements: {
      technical: ['Advanced SQL', 'Network configuration', 'Systems architecture', 'Secure coding'],
      soft: ['Strategic business alignment', 'Analytical communication']
    },
    topColleges: ['BMSCE Bangalore', 'MSRIT Bangalore', 'RVCE Bangalore', 'PES University']
  },
  {
    slug: 'computer-engineering',
    name: 'Computer Engineering',
    domain: 'CS & IT',
    description: 'Intersection of electrical engineering and CS, designing microscopic silicon chips and massive supercomputer clusters.',
    longDescription: 'Computer Engineering focuses on the seamless integration of hardware and software. Professionals design microarchitectures, memory hierarchies, and motherboard layouts that allow software to execute efficiently. Important for semiconductor manufacturing and the hardware infrastructure of IoT.',
    coreSubjects: ['Computer Architecture', 'Digital Logic Design', 'Microprocessors', 'Operating Systems', 'VLSI Design', 'Computer Networks'],
    specializationTracks: ['Semiconductor Design', 'High-Performance Computing', 'Embedded Hardware', 'ASIC Design'],
    careerPaths: ['Hardware Engineer', 'VLSI Designer', 'Systems Architect', 'ASIC Design Engineer'],
    skillRequirements: {
      technical: ['VHDL/Verilog', 'PCB layout', 'Assembly languages', 'Circuit analysis'],
      soft: ['Precision', 'Analytical rigor', 'Physical troubleshooting']
    },
    topColleges: ['IIT Bombay', 'IIT Delhi', 'VJTI Mumbai', 'NIT Trichy']
  },

  // --- AI & DATA VERTICAL ---
  {
    slug: 'ai-engineering',
    name: 'Artificial Intelligence Engineering',
    domain: 'CS & IT',
    description: 'Building systems capable of autonomous learning, pattern recognition, and predictive decision-making.',
    longDescription: 'AI engineering evolved from computer science into a dominant discipline driving the Fourth Industrial Revolution. AI engineers architect neural networks powering NLP, computer vision, and generative platforms. It creates adaptive systems that continuously improve, making it a future-proof path.',
    coreSubjects: ['Machine Learning Algorithms', 'Deep Learning & Neural Networks', 'NLP', 'Cognitive Computing', 'Advanced Linear Algebra & Statistics'],
    specializationTracks: ['Generative AI', 'Computer Vision', 'Robotics Intelligence', 'AI in Healthcare'],
    careerPaths: ['AI Solutions Architect', 'Deep Learning Engineer', 'NLP Scientist', 'Computer Vision Engineer'],
    skillRequirements: {
      technical: ['Python/R', 'TensorFlow/PyTorch', 'Cloud AI services', 'Algorithm optimization'],
      soft: ['Abstract problem-solving', 'Ethical AI governance', 'Learning agility']
    },
    topColleges: ['IIT Hyderabad', 'IIT Jodhpur', 'IIT Madras', 'IIIT Bangalore']
  },
  {
    slug: 'ai-ml-engineering',
    name: 'Artificial Intelligence & Machine Learning',
    domain: 'CS & IT',
    description: 'Specialized development of algorithms that parse vast datasets to uncover hidden patterns and achieve predictive automation.',
    longDescription: 'A subset of CS dedicated entirely to algorithms that learn from data. Graduates design recommendation engines, trading bots, and predictive models. It focuses heavily on statistical modeling and optimization.',
    coreSubjects: ['Foundations of ML', 'DSA', 'Statistical Modeling', 'Reinforcement Learning', 'Optimization Techniques'],
    specializationTracks: ['Predictive Analytics', 'Autonomous Systems', 'Fraud Detection', 'AI in FinTech'],
    careerPaths: ['ML Engineer', 'AI Data Scientist', 'Applied ML Researcher', 'MLOps Engineer'],
    skillRequirements: {
      technical: ['Python', 'Scikit-learn', 'Neural network architectures', 'MLOps'],
      soft: ['Mathematical intuition', 'Critical data analysis', 'Persistence']
    },
    topColleges: ['VTU Karnataka', 'Anna University', 'GGSIPU Delhi', 'Thapar University']
  },
  {
    slug: 'data-science-engineering',
    name: 'Data Science Engineering',
    domain: 'CS & IT',
    description: 'Extracting actionable, strategic intelligence from massive, unstructured data lakes to dictate business strategy.',
    longDescription: 'Data Science Engineering addresses the explosion of Big Data. It combines rigorous statistical analysis with domain-specific business acumen. Data scientists utilize predictive modeling to optimize supply chains and personalize healthcare.',
    coreSubjects: ['Data Mining & Warehousing', 'Big Data Analytics', 'Statistical Inference', 'DBMS', 'Data Visualization'],
    specializationTracks: ['Business Intelligence', 'Big Data Architecture', 'Financial Analytics', 'Bioinformatics'],
    careerPaths: ['Data Scientist', 'Big Data Engineer', 'Data Architect', 'Business Intelligence Analyst'],
    skillRequirements: {
      technical: ['Hadoop/Spark', 'SQL/NoSQL', 'Python/R', 'Tableau/PowerBI'],
      soft: ['Storytelling with data', 'Sharp business acumen', 'Curiosity']
    },
    topColleges: ['IIIT Bangalore', 'IIT Guwahati', 'BITS Pilani', 'VIT Vellore']
  },

  // --- ELECTRONICS & CIRCUIT VERTICAL ---
  {
    slug: 'electronics-telecommunication',
    name: 'Electronics & Telecommunication',
    domain: 'Electronics',
    description: 'Hardware design and advanced communication protocols powering 5G and satellite infrastructure.',
    longDescription: 'ENTC traces origins to radio and radar, evolving through the semiconductor revolution. Spurred by domestic semiconductor initiatives, it drives innovations in 5G/6G, satellite systems, and smart devices.',
    coreSubjects: ['VLSI Design', 'DSP', 'Embedded Systems', 'Wireless Communication', 'Optical Communication', 'Microwave & Antennas'],
    specializationTracks: ['VLSI Chip Design', 'IoT Hardware Architecture', 'RF Engineering', 'Telecommunication Networks'],
    careerPaths: ['VLSI Design Engineer', 'Network Telemetry Engineer', 'RF Engineer', 'Embedded Systems Engineer'],
    skillRequirements: {
      technical: ['Verilog/VHDL', 'PCB Design', 'ASIC design', 'Comm protocols'],
      soft: ['Precision', 'Analytical thinking', 'Troubleshooting']
    },
    topColleges: ['IIT Madras', 'IIT Kharagpur', 'VJTI Mumbai', 'NIT Surathkal']
  },
  {
    slug: 'telecommunication-engineering',
    name: 'Telecommunication Engineering',
    domain: 'Electronics',
    description: 'Establishing the digital backbone for seamless global connectivity and 5G network architecture.',
    longDescription: 'Forms the invisible backbone of the digital economy. Telecom engineers are at the forefront of deploying 5G and building infrastructure for IoT. Expertise ensures seamless global information transmission across optical fibers and wireless waves.',
    coreSubjects: ['Digital Communication', 'Electromagnetic Waves', 'Optical Fiber Communication', 'Signal Processing', 'Information Theory'],
    specializationTracks: ['5G/6G Architecture', 'Satellite Communications', 'RF Engineering', 'Optical Networking'],
    careerPaths: ['Network Planning Engineer', 'RF Engineer', 'Broadcast Engineer', 'Wireless Specialist'],
    skillRequirements: {
      technical: ['TCP/IP, LTE', 'RF circuit design', 'Signal analysis', 'Fiber optic technology'],
      soft: ['Adaptability', 'Troubleshooting', 'Project management']
    },
    topColleges: ['RVCE Bangalore', 'BMSCE Bangalore', 'BIT Mesra', 'Anna University']
  },
  {
    slug: 'electronics-instrumentation',
    name: 'Electronics & Instrumentation Engineering',
    domain: 'Electronics',
    description: 'The science of precise measurement and automated control of industrial processes.',
    longDescription: 'Bridge between electronics and control engineering. Focused on designing automated systems in oil & gas, pharma, and power generation sectors. EIE translates physical processes into digital analytics for optimization.',
    coreSubjects: ['Microcontrollers', 'Industrial Instrumentation', 'Process Control', 'DSP', 'VLSI Design', 'Sensors'],
    specializationTracks: ['Industrial Automation', 'Bio-medical Instrumentation', 'Smart Sensors', 'Process Automation'],
    careerPaths: ['Instrumentation Engineer', 'Automation Specialist', 'Control Systems Analyst', 'Sensor Network Developer'],
    skillRequirements: {
      technical: ['PLC/SCADA', 'Sensor calibration', 'Control loop tuning', 'MATLAB'],
      soft: ['Meticulous attention to detail', 'Analytical reasoning']
    },
    topColleges: ['NIT Trichy', 'NIT Rourkela', 'COEP Pune', 'VJTI Mumbai']
  },
  {
    slug: 'embedded-systems-engineering',
    name: 'Embedded Systems Engineering',
    domain: 'Electronics',
    description: 'Designing task-specific computer systems integrated directly into mechanical and electrical devices.',
    longDescription: 'Embedded systems are the "brains" inside everything from ABS in cars to pacemakers. It requires mastery of hardware architecture and firmware development to optimize for extreme power efficiency and real-time processing.',
    coreSubjects: ['Microcontroller Architecture', 'RTOS', 'Digital Logic Design', 'Embedded C/C++', 'Interfacing Protocols'],
    specializationTracks: ['Automotive Embedded', 'IoT Edge Devices', 'Medical Electronics', 'Avionics'],
    careerPaths: ['Embedded Software Engineer', 'Firmware Developer', 'IoT Hardware Architect', 'Embedded Hardware Engineer'],
    skillRequirements: {
      technical: ['Embedded C/C++', 'RTOS management', 'PCB design', 'Hardware debugging'],
      soft: ['Precise logical thinking', 'Systemic troubleshooting']
    },
    topColleges: ['IIT Bombay', 'IIIT Hyderabad', 'NIT Calicut', 'PSG Tech']
  },
  {
    slug: 'electrical-electronics',
    name: 'Electrical & Electronics Engineering (EEE)',
    domain: 'Electrical',
    description: 'Bridging high-voltage power generation with microscopic electronic circuits and microprocessors.',
    longDescription: 'EEE graduates possess the dual capability of designing heavy power transformers while understanding the microprocessors that control them. Crucial for EV battery management and handling renewable energy on smart grids.',
    coreSubjects: ['Power Systems', 'Electrical Machines', 'Electromagnetic Fields', 'Power Electronics', 'Digital Electronics', 'Control Systems'],
    specializationTracks: ['Renewable Energy Systems', 'EV Powertrains', 'Smart Grids', 'Power System Automation'],
    careerPaths: ['Power Systems Engineer', 'Electrical Design Engineer', 'Control Systems Engineer', 'Renewable Energy Consultant'],
    skillRequirements: {
      technical: ['Circuit design (CAD)', 'MATLAB/Simulink', 'High-voltage safety', 'C/C++'],
      soft: ['Complex problem-solving', 'Systems-level thinking']
    },
    topColleges: ['BITS Pilani', 'NIT Warangal', 'VJTI Mumbai', 'Anna University']
  },

  // --- ELECTRICAL & ENERGY VERTICAL ---
  {
    slug: 'electrical-engineering',
    name: 'Electrical Engineering',
    domain: 'Electrical',
    description: 'Foundational discipline powering national grids and driving the transition to renewable power.',
    longDescription: 'Undergoing a paradigm shift towards renewable energy integration and smart grids. Electrical engineers are architects of bi-directional energy networks, ensuring stable power distribution for a billion people.',
    coreSubjects: ['Power Systems', 'Power Electronics', 'Control Systems', 'Electrical Machines', 'Circuit Theory', 'High Voltage Engineering'],
    specializationTracks: ['Renewable Energy', 'Electric Vehicles', 'Smart Grid Tech', 'Industrial Power'],
    careerPaths: ['Power Distribution Engineer', 'Electrical Test Engineer', 'Power Designer', 'Maintenance Engineer'],
    skillRequirements: {
      technical: ['MATLAB/Simulink', 'CAD tools', 'Safety compliance', 'C/C++'],
      soft: ['Safety adherence', 'Project management', 'System analysis']
    },
    topColleges: ['IIT Kanpur', 'IIT Roorkee', 'VJTI Mumbai', 'BITS Pilani']
  },
  {
    slug: 'energy-engineering',
    name: 'Energy Engineering',
    domain: 'Electrical',
    description: 'Tackling global sustainability challenges through green hydrogen and utility-scale solar innovation.',
    longDescription: 'Synthesizes principles from multiple fields to build a clean, resilient power grid. Front and center in the green revolution, energy engineers work on wind energy integration and carbon-neutral energy conversion.',
    coreSubjects: ['Thermodynamics', 'Renewable Energy Systems', 'Energy Economics', 'Power Plant Engineering', 'EIA'],
    specializationTracks: ['Solar & Wind', 'Green Hydrogen', 'Smart Grid Integration', 'Energy Auditing'],
    careerPaths: ['Energy Auditor', 'Renewable Energy Engineer', 'Sustainability Manager', 'Energy Policy Analyst'],
    skillRequirements: {
      technical: ['Energy modeling', 'Carbon footprinting', 'Power conversion'],
      soft: ['Systems thinking', 'Environmental advocacy', 'Project management']
    },
    topColleges: ['IIT Bombay', 'IIT Delhi', 'UPES Dehradun', 'NIT Rourkela']
  },
  {
    slug: 'power-engineering',
    name: 'Power Engineering',
    domain: 'Electrical',
    description: 'Managing the monumental macroscopic systems that electrify nations and prevent large-scale blackouts.',
    longDescription: 'Deals with the macroscopic systems of energy generation and distribution. Tasks include designing steam turbines and integrating intermittent renewable energy into legacy national grids.',
    coreSubjects: ['Power System Analysis', 'High Voltage Engineering', 'Power Electronics', 'Electrical Machines', 'Switchgear'],
    specializationTracks: ['Smart Grid Operations', 'HVDC Transmission', 'Power Generation Science'],
    careerPaths: ['Power Grid Engineer', 'Substation Manager', 'Distribution Engineer', 'Power Plant Operator'],
    skillRequirements: {
      technical: ['ETAP Simulation', 'High-voltage safety', 'Grid telemetry'],
      soft: ['Safety consciousness', 'Crisis management', 'Coordination']
    },
    topColleges: ['IIT BHU', 'NIT Nagpur', 'Anna University', 'GGSIPU Delhi']
  },

  // --- MECHANICAL & AEROSPACE VERTICAL ---
  {
    slug: 'mechanical-engineering',
    name: 'Mechanical Engineering',
    domain: 'Mechanical',
    description: 'The versatile "mother branch", spanning thermodynamics to robotics and additive manufacturing.',
    longDescription: 'Formalized during the Industrial Revolution, modern mechanical engineering spans classical thermodynamics to complex robotics. It has evolved to incorporate additive manufacturing and computational simulation.',
    coreSubjects: ['Thermodynamics', 'Fluid Dynamics', 'Mechanics of Solids', 'Structural Analysis', 'Kinematics', 'Heat Transfer'],
    specializationTracks: ['Robotics', 'EV Technology', 'Sustainable Energy', 'Mechatronics', 'Biomechanics'],
    careerPaths: ['Mechanical Design Engineer', 'Manufacturing Engineer', 'R&D Specialist', 'Maintenance Engineer'],
    skillRequirements: {
      technical: ['CAD/CAM proficiency', 'FEA/CFD software', '3D modeling'],
      soft: ['Spatial reasoning', 'Teamwork', 'Creative problem-solving']
    },
    topColleges: ['IIT Kanpur', 'IIT Roorkee', 'NIT Warangal', 'COEP Pune']
  },
  {
    slug: 'aerospace-engineering',
    name: 'Aerospace Engineering',
    domain: 'Mechanical',
    description: 'High-stakes design of spacecraft and advanced missiles with ISRO/DRDO relevance.',
    longDescription: 'Dedicated to spacecraft and advanced systems. Requires uncompromising adherence to precision. A single point of failure is catastrophic. Modern focus on re-usable rockets and satellite systems.',
    coreSubjects: ['Aerodynamics', 'Flight Mechanics', 'Aerospace Structures', 'Propulsion', 'Control Systems'],
    specializationTracks: ['Avionics', 'Astrodynamics', 'Propulsion Systems', 'Composite Materials'],
    careerPaths: ['Aerospace Designer', 'Propulsion Engineer', 'Avionics Designer', 'Space Scientist'],
    skillRequirements: {
      technical: ['CFD/FEA mastery', 'Systems engineering', 'Aviation regulations'],
      soft: ['Meticulous detail', 'Decision making', 'Resilience']
    },
    topColleges: ['IIT Bombay', 'IIT Kanpur', 'IIT Madras', 'IIST Trivandrum']
  },
  {
    slug: 'aeronautical-engineering',
    name: 'Aeronautical Engineering',
    domain: 'Other',
    description: 'Exclusive focus on flight machines within Earth atmosphere, rooted in fluid dynamics and jet propulsion.',
    longDescription: 'Focused exclusively on aircraft, helicopters, and UAVs. Aeronautical engineers optimize aerodynamic efficiency and reduce aircraft weight through advanced composites for commercial and military aviation.',
    coreSubjects: ['Aerodynamics', 'Aircraft Structures', 'Flight Mechanics', 'Jet Propulsion', 'CFD'],
    specializationTracks: ['Aeroacoustics', 'Aircraft Design', 'Unmanned Aerial Vehicles (UAVs)', 'Avionics'],
    careerPaths: ['Aeronautical Design Engineer', 'Flight Test Engineer', 'Aircraft Maintenance Engineer', 'Aerodynamics Specialist'],
    skillRequirements: {
      technical: ['CFD/FEA software', 'CAD modeling', 'DGCA/FAA regulations'],
      soft: ['Precision', 'Safety protocol adherence']
    },
    topColleges: ['Anna University', 'MIT Chennai', 'PEC Chandigarh', 'BIT Mesra']
  },
  {
    slug: 'automobile-engineering',
    name: 'Automobile Engineering',
    domain: 'Mechanical',
    description: 'Architecting the EV revolution and autonomous driving ecosystems.',
    longDescription: 'Undergoing radical disruption through the shift to electric vehicles and autonomous systems. Engineers must operate at the intersection of mechanics, CS, and sustainable energy.',
    coreSubjects: ['Vehicle Dynamics', 'Automotive Transmission', 'Engine Design', 'Electrical Systems', 'Thermodynamics'],
    specializationTracks: ['EV Technologies', 'Autonomous Systems', 'Battery Management'],
    careerPaths: ['Automotive Design Engineer', 'Vehicle Dynamics Engineer', 'Production Head', 'Quality Analyst'],
    skillRequirements: {
      technical: ['CAD/CAM', 'Ansys Simulation', 'Embedded C', 'Battery Chemistry'],
      soft: ['Adaptability', 'Analytical thinking']
    },
    topColleges: ['IIT Madras', 'PSG Tech Coimbatore', 'VJTI Mumbai', 'NIT Warangal']
  },

  // --- CIVIL VERTICAL ---
  {
    slug: 'civil-engineering',
    name: 'Civil Engineering',
    domain: 'Civil',
    description: 'Planning and building the physical world, from massive public works to smart, sustainable infrastructure.',
    longDescription: 'Historically focused on dams and bridges, it is now undergoing a digital renaissance through Smart Cities and sustainable design, employing BIM and digital twins.',
    coreSubjects: ['Structural Analysis', 'Geotechnical Engineering', 'Hydraulics', 'Construction Materials', 'Surveying'],
    specializationTracks: ['Environmental Engineering', 'Smart Infrastructure', 'Water Resources', 'Construction MGMT'],
    careerPaths: ['Structural Design Engineer', 'Site Engineer', 'Geotechnical Consultant', 'Urban Planner'],
    skillRequirements: {
      technical: ['AutoCAD', 'BIM Software', 'FEA', 'Hydrology modeling'],
      soft: ['Risk assessment', 'Lifecycle management', 'Regulatory compliance']
    },
    topColleges: ['IIT Bombay', 'IIT Delhi', 'NIT Trichy', 'VJTI Mumbai']
  },
  {
    slug: 'structural-engineering',
    name: 'Structural Engineering',
    domain: 'Civil',
    description: 'The critical backbone of civil works, calculating the strength and seismic stability of built environments.',
    longDescription: 'Structural engineers design skyscrapers, dams, and tunnels to withstand massive loads and seismic activity. They employ computational modeling to transform architectural visions into enduring physical realities.',
    coreSubjects: ['Advanced Structural Analysis', 'Reinforced Concrete Design', 'Steel Design', 'Earthquake Engineering', 'FEA'],
    specializationTracks: ['Seismic Design', 'Bridge Engineering', 'Tall Building Design', 'Offshore Structures'],
    careerPaths: ['Structural Design Engineer', 'Bridge Engineer', 'Seismic Analyst', 'Infrastructure Consultant'],
    skillRequirements: {
      technical: ['STAAD.Pro, ETABS', 'Building codes', 'Material stress analysis'],
      soft: ['Uncompromising safety', 'Spatial visualization']
    },
    topColleges: ['IIT Bombay', 'IIT Roorkee', 'VJTI Mumbai', 'COEP Pune']
  },
  {
    slug: 'construction-engineering',
    name: 'Construction Engineering',
    domain: 'Civil',
    description: 'Managing trillions of dollars in mega-projects, turning blueprints into physical reality.',
    longDescription: 'Bridges civil engineering with deep project management and logistics. Construction engineers orchestrate massive workforces and supply chains to deliver infrastructure on time and under budget.',
    coreSubjects: ['Construction Planning', 'Equipment & Methods', 'Estimation', 'Surveying', 'Safety Management'],
    specializationTracks: ['BIM', 'Civil Infrastructure', 'Sustainable Construction', 'Real Estate MGMT'],
    careerPaths: ['Construction Project Manager', 'Site Engineer', 'Quality Control Engineer', 'BIM Coordinator'],
    skillRequirements: {
      technical: ['Primavera/MS Project', 'BIM software', 'Cost estimation'],
      soft: ['Leadership', 'Crisis management', 'Resource negotiation']
    },
    topColleges: ['NICMAR', 'IIT Madras', 'NIT Trichy', 'Anna University']
  },
  {
    slug: 'transportation-engineering',
    name: 'Transportation Engineering',
    domain: 'Civil',
    description: 'Optimizing global mobility through mass transit design and intelligent transportation systems.',
    longDescription: 'Focuses on the movement of people and goods. Transportation engineers plan superhighways and metro systems to alleviate urban congestion and connect remote economies.',
    coreSubjects: ['Highway Engineering', 'Traffic Management', 'Pavement Design', 'Railway Engineering', 'Airport & Harbor'],
    specializationTracks: ['ITS', 'Traffic Simulation', 'Mass Transit Infrastructure', 'Logistics Design'],
    careerPaths: ['Transportation Engineer', 'Traffic Analyst', 'Highway Designer', 'Urban Mobility Planner'],
    skillRequirements: {
      technical: ['GIS mapping', 'Traffic simulation', 'Material testing'],
      soft: ['Public policy awareness', 'Macro systemic thinking']
    },
    topColleges: ['IIT Roorkee', 'IIT Delhi', 'NIT Warangal', 'VJTI Mumbai']
  },
  {
    slug: 'geotechnical-engineering',
    name: 'Geotechnical Engineering',
    domain: 'Civil',
    description: 'Science of understanding soil behavior to prevent catastrophic foundation failures and landslides.',
    longDescription: 'Analyzes earth materials to design stable foundations for tall buildings and tunnels. Critical for building in challenging terrains like the Himalayas or coastal subsea developments.',
    coreSubjects: ['Soil Mechanics', 'Foundation Engineering', 'Rock Mechanics', 'Geo-environmental Engineering', 'Testing'],
    specializationTracks: ['Tunneling', 'Earthquake Geotechnics', 'Offshore Geotechnics'],
    careerPaths: ['Geotechnical Consultant', 'Foundation Design Engineer', 'Seismology Analyst'],
    skillRequirements: {
      technical: ['Plaxis modeling', 'GIS', 'Slope stability analysis'],
      soft: ['Meticulous risk assessment', 'Analytical reasoning']
    },
    topColleges: ['IIT Bombay', 'IIT Roorkee', 'IISc Bangalore', 'COEP Pune']
  },
  {
    slug: 'environmental-engineering',
    name: 'Environmental Engineering',
    domain: 'Civil',
    description: 'Protecting ecosystems through sustainable waste management, water remediation, and air quality control.',
    longDescription: 'Environmental engineers apply engineering principles to protect the public and the environment. They design water treatment plants, develop renewable energy strategies, and create systems for hazardous waste remediation to ensure a sustainable future.',
    coreSubjects: ['Hydraulic Engineering', 'Waste Management', 'Air Pollution Control', 'Environmental Chemistry', 'EIA'],
    specializationTracks: ['Water Remediation', 'Renewable Energy Systems', 'Hazardous Waste Management', 'Sustainability Policy'],
    careerPaths: ['Environmental Consultant', 'Water Quality Engineer', 'Sustainability Manager', 'Project Analyst'],
    skillRequirements: {
      technical: ['EIA modeling', 'Waste treatment tech', 'GIS', 'Regulatory knowledge'],
      soft: ['Ethical reasoning', 'Systems thinking', 'Environmental advocacy']
    },
    topColleges: ['IIT Delhi', 'IIT Kharagpur', 'NEERI (Research)', 'NIT Nagpur']
  },

  // --- BIO & CHEMICAL VERTICAL ---
  {
    slug: 'chemical-engineering',
    name: 'Chemical Engineering',
    domain: 'Chemical',
    description: 'Industrial transformation of raw materials into high-value pharmaceutical and fuel products.',
    longDescription: 'Formalized to sustain agriculture and medicine. Chemical engineers are now pivoting toward eco-sustainability, developing biomass conversion and hydrogen storage technologies.',
    coreSubjects: ['Chemical Kinetics', 'Process Thermodynamics', 'Mass/Energy Balances', 'Process Safety', 'Heat Transfer'],
    specializationTracks: ['Biochemical', 'Nanotechnology', 'Polymer Science', 'Alternative Energy'],
    careerPaths: ['Process Engineer', 'Petroleum Specialist', 'Analytical Chemist', 'Pharma Supervisor'],
    skillRequirements: {
      technical: ['Aspen Plus, COMSOL', 'Hazard analysis', 'Reaction optimization'],
      soft: ['Resource management', 'Operational decision making', 'Interpersonal coordination']
    },
    topColleges: ['ICT Mumbai', 'IIT Madras', 'IIT Guwahati', 'NIT Warangal']
  },
  {
    slug: 'biotechnology-engineering',
    name: 'Biotechnology Engineering',
    domain: 'Other',
    description: 'Integrating biology with process engineering to create personalized gene therapies and vaccines.',
    longDescription: 'Driving force behind modern medicine. Biotechnology engineers work on fermentation technology and bioinformatics to create sustainable biofuels and high-efficiency vaccines.',
    coreSubjects: ['Microbiology', 'Biochemistry', 'Bioprocess Engineering', 'Bioinformatics', 'Immunology'],
    specializationTracks: ['Medical Biotech', 'Industrial Biotech', 'Plant/Animal Biotech'],
    careerPaths: ['Bioprocess Engineer', 'Clinical Researcher', 'Bioinformatics Analyst', 'QC Engineer'],
    skillRequirements: {
      technical: ['Fermentation tech', 'Genetic sequencing', 'Data analytics', 'Compliance'],
      soft: ['Ethical reasoning', 'Analytical thinking']
    },
    topColleges: ['IIT Delhi', 'DTU Delhi', 'VIT Vellore', 'NIT Rourkela']
  },
  {
    slug: 'biomedical-engineering',
    name: 'Biomedical Engineering',
    domain: 'Other',
    description: 'Applying engineering principles to medical sciences for MRI systems and artificial organs.',
    longDescription: 'Convergence of engineering and biology. Biomedical engineers create minimally invasive surgical tools and wearable monitors, transforming global healthcare standards.',
    coreSubjects: ['Human Anatomy', 'Biomaterials', 'Medical Imaging', 'Instrumentation', 'Biomechanics'],
    specializationTracks: ['Tissue Engineering', 'Telemedicine', 'Nanotechnology in Medicine'],
    careerPaths: ['Clinical Engineer', 'Medical Device Designer', 'Healthcare Tech Consultant'],
    skillRequirements: {
      technical: ['Calibration', 'PCB troubleshooting', 'FDA/ISO regulations'],
      soft: ['Compassion', 'Critical problem-solving']
    },
    topColleges: ['IIT Bombay', 'IIT Hyderabad', 'NIT Raipur', 'MIT Manipal']
  },
  {
    slug: 'genetic-engineering',
    name: 'Genetic Engineering',
    domain: 'Other',
    description: 'CRISPR-Cas9 application to rewrite the code of life for cancer therapies and drought-resistant crops.',
    longDescription: 'Molecular level DNA manipulation. Genetic engineers pioneer gene therapies and modify crop genomes to combat global food insecurity and hereditary diseases.',
    coreSubjects: ['DNA Structure', 'Gene Expression', 'Molecular Biology', 'Genome Engineering', 'Immunology'],
    specializationTracks: ['Synthetic Biology', 'Medical Genetics', 'Synthetic Genomics'],
    careerPaths: ['Genetic Engineer', 'Research Scientist', 'Bioinformatics Specialist'],
    skillRequirements: {
      technical: ['CRISPR Application', 'Gene Splicing', 'Computational Modeling'],
      soft: ['Ethical integrity', 'Meticulous observation']
    },
    topColleges: ['IIT Madras', 'VIT Vellore', 'SRM University', 'IISER']
  },

  // --- INDUSTRIAL SPECIALTIES VERTICAL ---
  {
    slug: 'mechatronics-engineering',
    name: 'Mechatronics Engineering',
    domain: 'Mechanical',
    description: 'Synergistic integration of mechanics, electronics, and AI for smart, autonomous manufacturing.',
    longDescription: 'Cornerstone of Industry 4.0. Mechatronics combines mechanical components with intelligent control and computer science for robotic assembly and smart systems.',
    coreSubjects: ['Microcontrollers', 'Automatic Control', 'Kinematics', 'Sensors & Actuators', 'Robot Programming'],
    specializationTracks: ['Industrial Automation', 'Medical Robotics', 'Autonomous Vehicles'],
    careerPaths: ['Robotics Engineer', 'Automation Lead', 'Control Systems Analyst'],
    skillRequirements: {
      technical: ['PLC Programming', 'Electro-mechanical design', 'C++/Python'],
      soft: ['Multidisciplinary teamwork', 'System design']
    },
    topColleges: ['MANIT Bhopal', 'MIT Manipal', 'VIT Vellore', 'COEP Pune']
  },
  {
    slug: 'manufacturing-engineering',
    name: 'Manufacturing Engineering',
    domain: 'Mechanical',
    description: 'Optimizing production through Six Sigma and industrial robotics for scalable factory output.',
    longDescription: 'Manufacturing engineers bridge corporate strategy with assembly line reality, utilizing lean methodologies to maximize efficiency and minimize product defects.',
    coreSubjects: ['Machining Processes', 'Operations Management', 'Industrial Robotics', 'Quality Control'],
    specializationTracks: ['Lean Manufacturing', 'Digital Manufacturing', 'Automation Integration'],
    careerPaths: ['Manufacturing Lead', 'Process Engineer', 'Production Manager'],
    skillRequirements: {
      technical: ['Lean/Six Sigma', 'ERP software', 'Process mapping'],
      soft: ['Leadership', 'Commercial awareness']
    },
    topColleges: ['BIT Mesra', 'NIT Warangal', 'IIT Madras', 'COEP Pune']
  },
  {
    slug: 'instrumentation-control',
    name: 'Instrumentation & Control',
    domain: 'Other',
    description: 'The industrial "nervous system", managing precise sensors and logic controllers for automated safety.',
    longDescription: 'Focuses on the precise sensors and distributed control systems (DCS) that automate refineries and power plants, ensuring safe and efficient batch production.',
    coreSubjects: ['Sensors', 'Control Systems Theory', 'Digital Signal Processing', 'Microprocessors'],
    specializationTracks: ['DCS Operations', 'Biomedical Instrumentation', 'MEMS'],
    careerPaths: ['Control Systems Engineer', 'PLC Programmer', 'Automation Specialist'],
    skillRequirements: {
      technical: ['PLC programming', 'Sensor calibration', 'Control loop tuning'],
      soft: ['Meticulous troubleshooting', 'Analytical reasoning']
    },
    topColleges: ['COEP Pune', 'NSUT Delhi', 'NIT Trichy', 'SIT Tumkur']
  },
  {
    slug: 'metallurgical-engineering',
    name: 'Metallurgical Engineering',
    domain: 'Other',
    description: 'Engineering high-performance alloys by manipulating crystal lattice structures at the atomic level.',
    longDescription: 'Critical for aerospace and electronics. Metallurgical engineers dictate macroscopic properties of metals through thermodynamic discovery and lattice manipulation.',
    coreSubjects: ['Physical Metallurgy', 'Extractive Metallurgy', 'Mineral Processing', 'Phase Diagrams'],
    specializationTracks: ['Corrosion Science', 'Nanomaterials', 'Computational Materials'],
    careerPaths: ['Process Metallurgist', 'Welding Engineer', 'Materials Scientist'],
    skillRequirements: {
      technical: ['Electron microscopy', 'X-ray diffraction', 'Failure analysis'],
      soft: ['Research acumen', 'Analytical rigor']
    },
    topColleges: ['IIT Bombay', 'IIT Kharagpur', 'VNIT Nagpur', 'MGIT Hyderabad']
  },
  {
    slug: 'polymer-science',
    name: 'Polymer Science & Technology',
    domain: 'Other',
    description: 'Synthesizing biodegradable plastics and advanced elastomers for medical and automotive industries.',
    longDescription: 'Deals with chemically synthesizing plastics and rubbers. Modern focus is on biodegradable polymers and high-performance composites to replace legacy materials.',
    coreSubjects: ['Polymer Chemistry', 'Polymer Physics', 'Processing', 'Material Characterization'],
    specializationTracks: ['Biomaterials', 'Nanomaterials', 'Sustainable Polymers'],
    careerPaths: ['Polymer Engineer', 'R&D Scientist', 'Production Manager'],
    skillRequirements: {
      technical: ['Chemical synthesis', 'Rheology', 'Thermal analysis'],
      soft: ['Environmental focus', 'Analytical thinking']
    },
    topColleges: ['HBTU Kanpur', 'ICT Mumbai', 'NIT Calicut', 'CIPT Lucknow']
  },
  {
    slug: 'plastics-engineering',
    name: 'Plastics Engineering',
    domain: 'Other',
    description: 'Industrial transformation of resins into durable products through injection molding and tool design.',
    longDescription: 'Focuses on the transformation of raw resins into net-shaped durable goods. Engineers design complex steel molds and optimize molding cycles for the global FMCG market.',
    coreSubjects: ['Plastic Materials', 'Injection Molding', 'Tool & Die Design', 'Testing'],
    specializationTracks: ['Circular Economy', 'Tooling Design', 'Bioplastics'],
    careerPaths: ['Molding Engineer', 'Quality Control Engineer', 'Tool Design Lead'],
    skillRequirements: {
      technical: ['CAD/CAE', 'Injection molding physics', 'Characterization'],
      soft: ['Creative problem solving', 'Sustainability']
    },
    topColleges: ['CIPET', 'HBTU Kanpur', 'VJTI Mumbai', 'LPU Jalandhar']
  },
  {
    slug: 'rubber-technology',
    name: 'Rubber Technology',
    domain: 'Other',
    description: 'Chemical compounding for the tire industry and high-end medical latex applications.',
    longDescription: 'Specializes in the chemical processing of natural and synthetic rubber. Essential for the global tire market and advanced medical adhesives.',
    coreSubjects: ['Rubber Chemistry', 'Polymer Blends', 'Vulcanization', 'Compounding'],
    specializationTracks: ['Tire Tech', 'Rubber-to-Metal Bonding', 'Recycling'],
    careerPaths: ['Rubber Technologist', 'Process Engineer', 'Quality Controller'],
    skillRequirements: {
      technical: ['Tensile testing', 'Rheometric analysis', 'Industrial safety'],
      soft: ['Detail focus', 'Rigorous observation']
    },
    topColleges: ['IIT Kharagpur', 'Anna University', 'MIT Manipal', 'LD College Ahmedabad']
  },
  {
    slug: 'textile-technology',
    name: 'Textile Technology',
    domain: 'Other',
    description: 'Engineering technical fabrics for defense, aerospace, and sustainable medical applications.',
    longDescription: 'An economically vital branch for India. It has evolved from simple weaving to high-performance technical textiles used in defense and medical gear.',
    coreSubjects: ['Yarn Manufacture', 'Fabric Manufacture', 'Chemistry', 'Textile Testing'],
    specializationTracks: ['Technical Textiles', 'Apparel Engineering', 'Sustainable Finishing'],
    careerPaths: ['Textile Engineer', 'Process Controller', 'Fabric Development MGMT'],
    skillRequirements: {
      technical: ['Chemical optimization', 'Loom mechanisms', 'Material testing'],
      soft: ['Commercial awareness', 'Sustainability focus']
    },
    topColleges: ['VJTI Mumbai', 'DKTE Ichalkaranji', 'IIT Delhi', 'Anna University']
  },
  {
    slug: 'fashion-technology',
    name: 'Fashion Technology',
    domain: 'Other',
    description: 'Integrating industrial CAD and 3D body scanning for global garment supply chain optimization.',
    longDescription: 'Strips away pure aesthetics for garment manufacturing technology. Engineers optimize factory output through 3D scanning and apparel CAD integration.',
    coreSubjects: ['Garment Construction', 'Pattern Making', 'Digital Illustration', 'Marketing'],
    specializationTracks: ['E-Textiles', 'Sustainable Fashion', '3D Prototyping'],
    careerPaths: ['Fashion Technologist', 'Apparel Manager', 'CAD Designer'],
    skillRequirements: {
      technical: ['CAD/CAM', 'Supply chain systems', 'Automated knitting'],
      soft: ['Forecasting', 'Creative planning']
    },
    topColleges: ['NIFT', 'PSG Tech', 'Anna University', 'TIT&S Bhiwani']
  },
  {
    slug: 'printing-packaging',
    name: 'Printing & Packaging Technology',
    domain: 'Other',
    description: 'Structural engineering of eco-friendly containers and high-speed reproduction mechanics.',
    longDescription: 'Packaging represents a multi-billion dollar sector. High relevance in FMCG and pharma to minimize environmental impact with biodegradable structural designs.',
    coreSubjects: ['Typography', 'Packaging Design', 'Reproduction', 'Flexography', 'Color Management'],
    specializationTracks: ['Flexible Packaging', '3D Printing', 'Security Printing'],
    careerPaths: ['Packaging Lead', 'Print Technologist', 'Quality Manager'],
    skillRequirements: {
      technical: ['Color management', 'Design software', 'Supply chain'],
      soft: ['Detail mindset', 'Aesthetic logic']
    },
    topColleges: ['PVG Pune', 'Anna University', 'Manipal Institute', 'GJUS&T Hisar']
  },
  {
    slug: 'leather-technology',
    name: 'Leather Technology',
    domain: 'Other',
    description: 'Bridging chemical refining with export-driven fashion through sustainable tanning innovations.',
    longDescription: 'Leather technology is an export powerhouse for India. Modern engineering pivots to zero-wastewater discharge and eco-friendly tanning to ensure long-term environmental viability.',
    coreSubjects: ['Chemistry of Leather', 'Effluent Treatment', 'Goods Design', 'Testing'],
    specializationTracks: ['Eco-tanning', 'Footwear Design', 'Synthetic Leather'],
    careerPaths: ['Leather Technologist', 'Quality Checker', 'Footwear Designer'],
    skillRequirements: {
      technical: ['Process optimization', 'Effluent management', 'Apparel CAD'],
      soft: ['Regulatory compliance', 'Export awareness']
    },
    topColleges: ['CLRI Chennai', 'Anna University', 'HBTU Kanpur', 'Heritage Kolkata']
  },
  {
    slug: 'ceramic-engineering',
    name: 'Ceramic Engineering',
    domain: 'Other',
    description: 'Science of non-metallic, inorganic materials for heat-resistant aerospace components and biocompatible implants.',
    longDescription: 'Ceramic engineers focus on designing and manufacturing items from inorganic, non-metallic materials. Beyond pottery, this field is critical for high-temperature turbine blades, semiconductor packaging, and orthopedic implants that integrate with human bone.',
    coreSubjects: ['Glass Technology', 'Advanced Ceramics', 'Material Science', 'Thermodynamics', 'Ceramic Processing'],
    specializationTracks: ['Electronic Ceramics', 'Refractory Engineering', 'Bioceramics', 'Glazing & Surface Tech'],
    careerPaths: ['Ceramic Technologist', 'Refractory Engineer', 'R&D Materials Scientist', 'Production Lead'],
    skillRequirements: {
      technical: ['Sintering physics', 'XRD/SEM characterization', 'Sol-gel techniques'],
      soft: ['Precision focus', 'Material problem-solving']
    },
    topColleges: ['IIT BHU', 'NIT Rourkela', 'HBTU Kanpur', 'GCECT Kolkata']
  },
  {
    slug: 'surface-coating',
    name: 'Surface Coating Technology',
    domain: 'Chemical',
    description: 'Advanced polymer and pigment science to protect automotive and industrial assets from corrosion.',
    longDescription: 'Specifically focused on the synthesis and application of paints, coatings, and varnishes. Surface coating engineers protect trillion-dollar infrastructure from environmental decay through corrosion-resistant polymer layers.',
    coreSubjects: ['Polymer Science', 'Pigment Technology', 'Coating Processes', 'Corrosion Science', 'Formulation Chemistry'],
    specializationTracks: ['Automotive Coatings', 'High-Performance Specialty Coatings', 'Eco-friendly Paints'],
    careerPaths: ['Paint Technologist', 'QA Coating Specialist', 'R&D Formulation Chemist'],
    skillRequirements: {
      technical: ['Rheology', 'Corrosion testing', 'Polymerization control'],
      soft: ['Color perception', 'Analytical mindset']
    },
    topColleges: ['ICT Mumbai', 'HBTU Kanpur', 'CIPT Lucknow', 'Gujarat University']
  },

  // --- NATURAL RESOURCES VERTICAL ---
  {
    slug: 'agricultural-engineering',
    name: 'Agricultural Engineering',
    domain: 'Other',
    description: 'Precision farming using drone tech and automated irrigation to secure food safety.',
    longDescription: 'Integrates physics with farming to solve food production and water waste challenges. Modern "precision farming" uses automated drones and sophisticated hydrology models to improve yield.',
    coreSubjects: ['Soil Science', 'Farm Machinery', 'Post-Harvest Tech', 'Hydrology'],
    specializationTracks: ['Agri-Tech', 'Bio-resource Engineering', 'Remediation'],
    careerPaths: ['Farm Machinery Engineer', 'Agri-Tech Consultant', 'Water Engineer'],
    skillRequirements: {
      technical: ['GIS & Remote Sensing', 'CAD', 'Hydrology modeling'],
      soft: ['Environmental stewardship', 'Problem-solving']
    },
    topColleges: ['PAU Ludhiana', 'IIT Kharagpur', 'TNAU Coimbatore', 'GBPUAT Pantnagar']
  },
  {
    slug: 'food-technology',
    name: 'Food Tech Engineering',
    domain: 'Other',
    description: 'Process engineering for food preservation, combatting global wastage through biochemical and structural innovation.',
    longDescription: 'Food Technology Engineering is the scientific discipline that applies principles of chemical and process engineering to the selection, preservation, processing, and distribution of safe and healthy food. It is increasingly relevant in the modern era as the world shifts toward sustainable, plant-based alternatives and needs robust biochemical solutions to combat the $1 trillion global food wastage crisis. In India, it is a vital engine of the rural-industrial economy, bridging agricultural produce with global retail chains.',
    coreSubjects: ['Food Chemistry & Microbiology', 'Unit Operations in Food Processing', 'Biochemical Engineering', 'Food Preservation Technology', 'Dairy & Meat Technology', 'Food Packaging Science', 'Quality Assurance & HACCP'],
    specializationTracks: ['Sustainable Packaging Solutions', 'Functional Food Product Development', 'Novel Food Processing (High-Pressure)', 'Nutri-genomics', 'Fermentation Engineering'],
    careerPaths: ['Food Process Engineer', 'R&D Product Scientist', 'Quality Manager (Regulatory)', 'Supply Chain Technologist', 'Food Safety Auditor'],
    skillRequirements: {
      technical: ['HACCP/FSMS Certification', 'Preservation Scaling', 'Analytical lab techniques', 'ISO 22000 Standards', 'Food Rheology'],
      soft: ['Sensory evaluation', 'Strict hygiene discipline', 'Analytical rigor', 'Regulatory awareness']
    },
    topColleges: ['CFTRI Mysore', 'NIFTEM Sonepat', 'ICT Mumbai', 'LPU Jalandhar', 'IISER Thiruvananthapuram']
  },
  {
    slug: 'dairy-technology',
    name: 'Dairy Technology Engineering',
    domain: 'Other',
    description: 'Perishable commodity science focusing on automated pasteurization and nutritional fortification.',
    longDescription: 'India is the world\'s largest producer. Dairy engineers focus on high-efficiency processing and nutritional fortification of perishable commodities.',
    coreSubjects: ['Dairy Engineering', 'Microbiology', 'Process Equipment', 'Refrigeration'],
    specializationTracks: ['Plant Management', 'Product Fortification', 'Supply Chain'],
    careerPaths: ['Dairy Technologist', 'Production Lead', 'Quality Officer'],
    skillRequirements: {
      technical: ['Biochemical analysis', 'Plant thermodynamics', 'Hygiene standards'],
      soft: ['Observation', 'Process discipline']
    },
    topColleges: ['NDRI Karnal', 'AAU Anand', 'Dairy Tech Raipur']
  },
  {
    slug: 'petroleum-engineering',
    name: 'Petroleum Engineering',
    domain: 'Other',
    description: 'Extraction science using 3D seismic mapping to recover deep-water energy resources.',
    longDescription: 'Critical for national baseload energy. Petroleum engineers use supercomputers and 3D mapping to maximize hydrocarbon recovery from extreme subsurface formations.',
    coreSubjects: ['Drilling Engineering', 'Reservoir Simulation', 'Well Engineering', 'Petroleum Geology'],
    specializationTracks: ['Reservoir Sci', 'Deep-water Drilling', 'Extraction Optimization'],
    careerPaths: ['Drilling Engineer', 'Reservoir Analyst', 'Production Manager'],
    skillRequirements: {
      technical: ['PETREL Simulation', 'Geosteering', 'Risk analysis'],
      soft: ['Stress management', 'High-stakes logic']
    },
    topColleges: ['IIT ISM Dhanbad', 'UPES Dehradun', 'Jaisalmer Institute', 'IIT Madras']
  },
  {
    slug: 'mining-engineering',
    name: 'Mining Engineering',
    domain: 'Other',
    description: 'Safe extraction of rare-earth elements and fossils using automated remote machinery.',
    longDescription: 'Mining engineers underpin global supply chains. Modern focus is on remote, automated machinery to keep humans away from high-risk underground conditions.',
    coreSubjects: ['Mine Ventilation', 'Rock Mechanics', 'Drilling', 'Mine Planning', 'Mineral Processing'],
    specializationTracks: ['Safe Mining', 'Mineral Economics', 'Geotechnical'],
    careerPaths: ['Mining Engineer', 'Operations Manager', 'Drilling Lead'],
    skillRequirements: {
      technical: ['3D spatial modeling', 'CAD', 'Environmental risk analysis'],
      soft: ['Crisis management', 'Industrial safety']
    },
    topColleges: ['IIT ISM Dhanbad', 'VNIT Nagpur', 'IIT Kharagpur', 'NIT Rourkela']
  },

  // --- SCIENTIFIC & INTERDISCIPLINARY ---
  {
    slug: 'nanotechnology-engineering',
    name: 'Nanotechnology Engineering',
    domain: 'Other',
    description: 'Manipulating matter at the molecular scale for targeted medicine and aerospace materials.',
    longDescription: 'Operates at the absolute frontier of modern science at the atomic scale. Nanotechnologists pioneer cancer-attacking drug delivery and ultra-efficient energy storage.',
    coreSubjects: ['Quantum Mechanics', 'Synthesis', 'SEM/TEM Characterization', 'Nanoelectronics'],
    specializationTracks: ['Nano-medicine', 'Nanoelectronics', 'Energy Storage'],
    careerPaths: ['Nanotechnologist', 'Research Scientist', 'Materials Engineer'],
    skillRequirements: {
      technical: ['Electron microscopy', 'Cleanroom protocols', 'Molecular modeling'],
      soft: ['Analytical rigor', 'Visionary thinking']
    },
    topColleges: ['IIT Bombay', 'IIT Roorkee', 'Amrita University', 'SRM University']
  },
  {
    slug: 'nuclear-engineering',
    name: 'Nuclear Engineering',
    domain: 'Other',
    description: 'Harnessing the atomic nucleus for clean, concentrated baseload electricity and medical therapy.',
    longDescription: 'Provides concentrated, carbon-neutral electricity with negligible footprints. Nuclear engineers manage high-stakes reactor systems with uncompromising safety adherence.',
    coreSubjects: ['Nuclear Physics', 'Reactor Systems', 'Radiation Detection', 'Nuclear Safety'],
    specializationTracks: ['Reactor Design', 'Radiation Safety', 'Nuclear Medicine'],
    careerPaths: ['Nuclear Engineer', 'Reactor Operator', 'Radiation Safety Officer'],
    skillRequirements: {
      technical: ['Advanced Physics', 'Regulatory compliance', 'Simulation'],
      soft: ['Extreme precision', 'Safety ethics']
    },
    topColleges: ['BARC Training', 'IIT Bombay', 'PDPU Gandhinagar', 'IIT Kanpur']
  },
  {
    slug: 'geoinformatics-engineering',
    name: 'Geoinformatics Engineering',
    domain: 'Other',
    description: 'Merging geography with CS to map disaster zones and power GPS navigation infrastructure.',
    longDescription: 'Relies on satellite telemetry and cyberinfrastructure to visualize spatial data. Essential for smart-city planning, GPS navigation, and automated disaster management.',
    coreSubjects: ['Remote Sensing', 'GIS', 'Photogrammetry', 'Spatial Analytics'],
    specializationTracks: ['Satellite Vision', 'Geospatial AI', 'Climate Mapping'],
    careerPaths: ['GIS Analyst', 'Remote Sensing Lead', 'Spatial Data Scientist'],
    skillRequirements: {
      technical: ['Spatial programming', 'Data interpretation', 'AutoCAD'],
      soft: ['Logical reasoning', 'Visual communication']
    },
    topColleges: ['IIT Bombay', 'IIT Kanpur', 'Anna University', 'IIRS Dehradun']
  },
  {
    slug: 'fire-safety',
    name: 'Fire & Safety Engineering',
    domain: 'Other',
    description: 'Designing proactive sprinkler systems and risk assessments to protect industrial assets and human life.',
    longDescription: 'The science of proactively designing installations to protect life. Safety engineers implement smoke ventilation and automated suppression systems across industrial zones.',
    coreSubjects: ['Fire Science', 'Dynamics', 'Safety Design', 'Disaster Management', 'Risk Assessment'],
    specializationTracks: ['Industrial Safety', 'Health Inspection', 'Compliance'],
    careerPaths: ['Safety Engineer', 'System Designer', 'Risk Consultant'],
    skillRequirements: {
      technical: ['Hazard analysis', 'Legal compliance', 'Suppression system logic'],
      soft: ['Crisis handling', 'Ethical responsibility']
    },
    topColleges: ['CUSAT Kochi', 'IPS Academy Indore', 'NFSC Nagpur', 'IIT Gandhinagar']
  },
  {
    slug: 'quantum-engineering',
    name: 'Quantum Engineering',
    domain: 'Other',
    description: 'Paradigm shift in processing, utilizing superposition to solve billion-variable cryptographic problems.',
    longDescription: 'Transitions from binary logic to superposition. Essential for the Epoch of digital security and algorithmic processing in drug discovery and high-end finance.',
    coreSubjects: ['Quantum Mechanics', 'Linear Algebra', 'Algorithms', 'Quantum Electronics'],
    specializationTracks: ['Cryptography', 'Hardware', 'Sensing'],
    careerPaths: ['Quantum Hardware Lead', 'Algorithm Developer', 'Research Scientist'],
    skillRequirements: {
      technical: ['Qiskit/Cirq', 'Python', 'Discrete Math'],
      soft: ['Analytical depth', 'Abstract logic']
    },
    topColleges: ['IISc Bangalore', 'IIT Bombay', 'IISER Pune', 'IIT Madras']
  },
  {
    slug: 'photonics-engineering',
    name: 'Photonics Engineering',
    domain: 'Other',
    description: 'Managing light signals to drive zero-latency fiber internet backbones and night-vision gear.',
    longDescription: 'Focuses on photon manipulation. Drives internet high-speed backbones and autonomous LIDAR. Replaces legacy copper with zero-latency optical fibers.',
    coreSubjects: ['Optics', 'Electromagnetic Theory', 'Communications', 'Quantum Optics'],
    specializationTracks: ['Optoelectronics', 'Biophotonics', 'Integrated Circuits'],
    careerPaths: ['Photonics Engineer', 'Optical Systems Designer', 'Laser Engineer'],
    skillRequirements: {
      technical: ['Optical simulation', 'Signal analysis', 'CAD'],
      soft: ['Precision mindset', 'Creative logic']
    },
    topColleges: ['CUSAT Kochi', 'IIT Delhi', 'IIT Madras', 'IISc Bangalore']
  },
  {
    slug: 'plasma-engineering',
    name: 'Plasma Engineering',
    domain: 'Other',
    description: 'Ionized gas physics for the future of fusion power and silicon microchip etching.',
    longDescription: 'Fundamental mechanism for etching transistors into chips. Holds the key to humanity\'s energy crisis through fusion energy research.',
    coreSubjects: ['Electrodynamics', 'Plasma Physics', 'Stats Mechanics', 'Fluid Dynamics'],
    specializationTracks: ['Thermonuclear Fusion', 'Semiconductor Processing'],
    careerPaths: ['Plasma Scientist', 'Fusion Analyst', 'Process Engineer'],
    skillRequirements: {
      technical: ['Vacuum technology', 'Plasma diagnostics', 'Confinement logic'],
      soft: ['Safety priority', 'Collaborative research']
    },
    topColleges: ['IPR Gandhinagar', 'IIT Delhi', 'IIT Kanpur', 'BIT Mesra']
  },
  {
    slug: 'cryogenic-engineering',
    name: 'Cryogenic Engineering',
    domain: 'Other',
    description: 'Production and management of temperatures below -150°C for LNG transport and ISRO rocket propulsion.',
    longDescription: 'A major ISRO milestone. Engineers build systems where precision is non-negotiable for cooling quantum computers and handling cryogenic LNG.',
    coreSubjects: ['Cryophysics', 'Thermodynamics', 'Fluid Mechanics', 'Superconductivity'],
    specializationTracks: ['Superconducting Magnets', 'Propulsion Technology'],
    careerPaths: ['Cryogenic Engineer', 'Spacecraft Propulsion Lead', 'LNG Designer'],
    skillRequirements: {
      technical: ['Low-temp handling', 'Vacuum tech', 'CFD modeling'],
      soft: ['Rigorous behavior', 'Precise logic']
    },
    topColleges: ['IIT Kharagpur', 'IIT Bombay', 'NIT Rourkela', 'ISRO-linked']
  },
  {
    slug: 'computational-engineering',
    name: 'Computational Engineering',
    domain: 'Mechanical',
    description: 'Creating virtual replicas of assets to predict wear and optimize high-end physics-based R&D.',
    longDescription: 'Interdisciplinary branch merging applied math and CS to solve complex problems through simulation, reducing costs in automotive and aerospace R&D.',
    coreSubjects: ['Numerical Methods', 'HPC', 'Applied Math', 'Mechanics'],
    specializationTracks: ['Digital Twins', 'CFD', 'FEA Modeling'],
    careerPaths: ['Computational Engineer', 'Simulation Lead', 'R&D Analyst'],
    skillRequirements: {
      technical: ['C++/Python', 'MATLAB', 'Physics modeling'],
      soft: ['Interdisciplinary logic', 'Analytical depth']
    },
    topColleges: ['IIT Madras', 'IIT Kanpur', 'IIT Hyderabad', 'NIT Trichy']
  },
  {
    slug: 'earthquake-engineering',
    name: 'Earthquake Engineering',
    domain: 'Civil',
    description: 'Design and modeling of structures capable of absorbing massive kinetic energy without failure.',
    longDescription: 'Civil sub-discipline dedicated to mitigate seismic hazard. Essential for skyscrapers and critical plants in high-risk zones globally.',
    coreSubjects: ['Dynamics', 'Seismology', 'Reinforced Concrete', 'Soil Mechanics'],
    specializationTracks: ['Retrofitting', 'Base Isolation', 'Warning Systems'],
    careerPaths: ['Seismic Designer', 'Disaster Consultant', 'Vulnerability Analyst'],
    skillRequirements: {
      technical: ['ETABS/SAP2000', 'Codal rules', 'Modeling'],
      soft: ['Risk priority', 'Safety focus']
    },
    topColleges: ['IIT Roorkee', 'IIT Bombay', 'IIT Delhi', 'IIIT Hyderabad']
  },
  {
    slug: 'hydrology-engineering',
    name: 'Hydrology Engineering',
    domain: 'Civil',
    description: 'Climatic and geomorphic mapping to predict extreme monsoon impacts and groundwater recharge rates.',
    longDescription: 'Study of movement and distribution of water across atmosphere and surface. Engineers monitor aquifer contamination and calculated flood frequencies.',
    coreSubjects: ['Fluid Mechanics', 'Hydrology', 'Meteorology', 'GIS'],
    specializationTracks: ['Climate Data', 'Watershed MGMT', 'Flood Forecasting'],
    careerPaths: ['Hydrologist', 'Water Analyst', 'Climate Policy Advisor'],
    skillRequirements: {
      technical: ['Modeling software', 'GIS', 'Statistical analysis'],
      soft: ['Environmental logic', 'Reporting']
    },
    topColleges: ['IIT Roorkee', 'NIT Warangal', 'IIT Bombay', 'Anna University']
  },
  {
    slug: 'remote-sensing-engineering',
    name: 'Remote Sensing Engineering',
    domain: 'Other',
    description: 'Invisible backbone of spatial planning using satellite image processing and photogrammetry.',
    longDescription: 'Interpret information without physical contact. Drives precision agriculture, urban tracking, and mineral detection through massive telemetry processing.',
    coreSubjects: ['Image Processing', 'Photogrammetry', 'GIS', 'EM Radiation'],
    specializationTracks: ['ISRO Integration', 'Microwave Sensing', 'Agricultural Mapping'],
    careerPaths: ['RS Engineer', 'GIS Analyst', 'Data Scientist'],
    skillRequirements: {
      technical: ['ENVI/ERDAS', 'Spatial coding', 'Satellite comms'],
      soft: ['Analytical rigor', 'Presentation']
    },
    topColleges: ['IIRS Dehradun', 'IIT Bombay', 'Anna University', 'IIST Trivandrum']
  },
  {
    slug: 'disaster-management-engineering',
    name: 'Disaster Management Engineering',
    domain: 'Other',
    description: 'Designing early warning networks and disaster-resistant codes to prepare for severe natural events.',
    longDescription: 'Replaces reactive relief with proactive structural resilience. Coordinates early warning networks and enforces building code adherence to minimize loss.',
    coreSubjects: ['Risk Mapping', 'Vulnerability', 'GIS', 'Emergency Ops', 'Logistics'],
    specializationTracks: ['Early Warning', 'Post-disaster reconstruction', 'Risk Reduction'],
    careerPaths: ['Disaster Specialist', 'Risk Analyst', 'Emergency Officer'],
    skillRequirements: {
      technical: ['Zonation mapping', 'Rapid assessment', 'Comm systems'],
      soft: ['Crisis logic', 'High-stress management']
    },
    topColleges: ['TISS Mumbai', 'IIT Roorkee', 'NIT Nagpur', 'Anna University']
  },
  {
    slug: 'process-engineering',
    name: 'Process Engineering',
    domain: 'Chemical',
    description: 'Masterminding the efficiency of massive oil refineries and continuous-flow food plants.',
    longDescription: 'Transforms laboratory science into profitable industrial production. Optimizes yields while minimizing energy, waste, and operational hazard in real-time.',
    coreSubjects: ['Mass Balances', 'Thermodynamics', 'Transport Phenomena', 'Plant Design'],
    specializationTracks: ['Petrochemicals', 'Pharma Scaling', 'Bio-flows'],
    careerPaths: ['Process Engineer', 'Plant Manager', 'Operation Lead'],
    skillRequirements: {
      technical: ['Aspen HYSYS', 'P&ID logic', 'Six Sigma'],
      soft: ['Teamwork', 'Efficiency logic']
    },
    topColleges: ['ICT Mumbai', 'IIT Madras', 'IIT Bombay', 'NIT Warangal']
  },
  {
    slug: 'quality-engineering',
    name: 'Quality Engineering',
    domain: 'Other',
    description: 'Designing excellence into the manufacturing process to eliminate product recalls at the source.',
    longDescription: 'Replaces end-of-line inspection with proactive process quality. Relies on statistical control and Six Sigma to ensure units from brakes to software code function perfectly.',
    coreSubjects: ['Metrology', 'TQM', 'Reliailibty', 'Stats Control'],
    specializationTracks: ['ISO Compliance', 'Software QA', 'Auto Standards'],
    careerPaths: ['Quality Manager', 'Reliability Analyst', 'Continuous Improvement Lead'],
    skillRequirements: {
      technical: ['Six Sigma Black Belt', 'Minitab', 'Audit logic'],
      soft: ['Detail focus', 'High integrity']
    },
    topColleges: ['NIFFT Ranchi', 'IIT Delhi', 'BITS Pilani', 'NIT Rourkela']
  },
  {
    slug: 'supply-chain-engineering',
    name: 'Supply Chain Engineering',
    domain: 'Other',
    description: 'Data-driven science of just-in-time delivery and logistics corridor design.',
    longDescription: 'Design resilient shipping corridors through mathematical modeling. Supply chain engineers automate inventory and fleets for global e-commerce fulfillment.',
    coreSubjects: ['Logistics', 'Inventory Control', 'Analytics', 'Transport'],
    specializationTracks: ['E-comm Logistics', 'Cold Chain', 'Global Procurement'],
    careerPaths: ['SC Analyst', 'Logistics Lead', 'Procurement Manager'],
    skillRequirements: {
      technical: ['SAP ERP', 'Optimization modeling', 'Databases'],
      soft: ['Negotiation', 'Strategic logic']
    },
    topColleges: ['NITIE Mumbai', 'BITS Pilani', 'IIT Delhi', 'NIT Trichy']
  },
  {
    slug: 'cloud-computing-engineering',
    name: 'Cloud Computing Engineering',
    domain: 'CS & IT',
    description: 'Architecting 99.99% uptime internet-based infrastructure for global digital enterprises.',
    longDescription: 'Transitioning the world from local servers to scalable cloud clusters. Managed deployments across AWS and Azure for massive data loads and secure storage.',
    coreSubjects: ['Distributed Logic', 'Virtualization', 'Cloud Security', 'Networks'],
    specializationTracks: ['Serverless', 'Cloud Security', 'Edge Computing'],
    careerPaths: ['Cloud Solution Architect', 'Admin', 'Security Lead'],
    skillRequirements: {
      technical: ['Cloud platforms', 'K8s', 'Linux Admin', 'Docker'],
      soft: ['Cost logic', 'Systems thinking']
    },
    topColleges: ['IIT Bombay', 'BITS Pilani', 'VIT Vellore', 'NIT Rourkela']
  },
  {
    slug: 'devops-engineering',
    name: 'DevOps Engineering',
    domain: 'CS & IT',
    description: 'CI/CD pipeline architecture to enable high-frequency secure software releases.',
    longDescription: 'Bridges frictional gap between Dev and Ops. DevOps engineers create pipelines to release software daily without risk, managing massive container workflows.',
    coreSubjects: ['CI/CD', 'Infra as Code', 'Scripting', 'Automation'],
    specializationTracks: ['SRE', 'DevSecOps', 'Release Automation'],
    careerPaths: ['DevOps Lead', 'SRE', 'Automation Architect'],
    skillRequirements: {
      technical: ['Jenkins/Terraform', 'Kubernetes', 'Python scripting'],
      soft: ['Communication', 'Crisis response']
    },
    topColleges: ['NSUT Delhi', 'DTU', 'NIT Karnataka', 'IIIT Bangalore']
  },
  {
    slug: 'blockchain-engineering',
    name: 'Blockchain Engineering',
    domain: 'CS & IT',
    description: 'Immutable ledger architecture for trustless finance and secure global supply traceability.',
    longDescription: 'Design decentralized systems for transparency. Blockchain engineers create smart contracts and nodes that operate autonomously without central governing authority.',
    coreSubjects: ['Cryptography', 'Decentralized Networks', 'Smart Contracts', 'Algorithms'],
    specializationTracks: ['DeFi', 'Web3 Architecture', 'Enterprise Ledgers'],
    careerPaths: ['Blockchain Dev', 'Contract Engineer', 'Crypto Architect'],
    skillRequirements: {
      technical: ['Solidity/Rust', 'Hashing', 'Network nodes'],
      soft: ['Security priority', 'Trustless logic']
    },
    topColleges: ['IIT Madras', 'IIT Hyderabad', 'BITS Pilani', 'IIIT Bangalore']
  },
  {
    slug: 'ar-vr-engineering',
    name: 'AR/VR Engineering',
    domain: 'CS & IT',
    description: 'Spatial computing for industrial training systems and immersive digital medical platforms.',
    longDescription: 'Redefines human-computer interaction through immersive environments. VR engineers build flight simulators while AR engineers overlay industrial schematics on physical assets.',
    coreSubjects: ['Computer Graphics', 'Spatial Logic', 'HCI', 'Machine Vision'],
    specializationTracks: ['Medical VR', 'Industrial AR', 'Gaming'],
    careerPaths: ['XR Developer', 'Immersive Tech Lead', 'Simulation Analyst'],
    skillRequirements: {
      technical: ['Unity/Unreal', '3D math', 'Modeling', 'C#'],
      soft: ['Innovation', 'User empathy']
    },
    topColleges: ['IIT Hyderabad', 'IIT Madras', 'IIIT Hyderabad', 'UPES Dehradun']
  },
  {
    slug: 'battery-technology-engineering',
    name: 'Battery Technology Engineering',
    domain: 'Other',
    description: 'Electrochemical innovation creating high-density solid-state batteries for the global EV fleet.',
    longDescription: 'Paramount discipline for carbon neutrality. Battery engineers optimize storage density and prevent thermal runaway, driving the next EPOCH of electric mobility.',
    coreSubjects: ['Electrochemistry', 'Materials', 'Power Electronics', 'BMS Logic'],
    specializationTracks: ['Solid-state', 'BMS Strategy', 'Recycling'],
    careerPaths: ['Research Lead', 'BMS Engineer', 'Storage Analyst'],
    skillRequirements: {
      technical: ['Simulation', 'Electrochemical logic', 'BMS coding'],
      soft: ['Innovation', 'Environment focus']
    },
    topColleges: ['IIT Madras', 'IIT Hyderabad', 'IIT Bombay', 'IIST Trivandrum']
  },
  {
    slug: 'pharmaceutical-engineering',
    name: 'Pharmaceutical Engineering',
    domain: 'Other',
    description: 'Process engineering for medical drug synthesis, ensuring high-purity massive scale production.',
    longDescription: 'Combines chemical engineering and life science. Pharmaceutical engineers design the systems that synthesize life-saving drugs at scale while maintaining uncompromising purity and regulatory compliance.',
    coreSubjects: ['Drug Formulation', 'Pharmacokinetics', 'Process Scaling', 'GMP Compliance', 'Reaction Engineering'],
    specializationTracks: ['Biopharma', 'Drug Delivery Systems', 'Quality Compliance'],
    careerPaths: ['Pharma Process Engineer', 'R&D Formulation scientist', 'QA Manager'],
    skillRequirements: {
      technical: ['GMP knowledge', 'Biochemical analysis', 'Regulatory software'],
      soft: ['High ethics', 'Precise focus']
    },
    topColleges: ['ICT Mumbai', 'NIPER (Multiple)', 'Anna University', 'BITS Pilani']
  },
  {
    slug: 'marine-engineering',
    name: 'Marine Engineering',
    domain: 'Other',
    description: 'Engineering systems for deep-sea vessels and offshore energy structures in corrosive oceanic environments.',
    longDescription: 'Deals with the design, construction, and operation of ships and offshore platforms. Marine engineers maintain colossal diesel engines and power systems that traverse global oceans in extreme conditions.',
    coreSubjects: ['Ship Dynamics', 'Marine Engines', 'Naval Architecture', 'Fluid Mechanics', 'Oceanography'],
    specializationTracks: ['Vessel Operation', 'Naval Systems', 'Offshore Energy'],
    careerPaths: ['Marine Engineer', 'Naval Architect', 'Shipyard Manager', 'Offshore Specialist'],
    skillRequirements: {
      technical: ['Large engine maintenance', 'Hydrodynamics', 'Safety protocols'],
      soft: ['Resilience', 'Teamwork', 'Crisis handling']
    },
    topColleges: ['IMU (Multiple)', 'TMI Pune', 'IIT Kharagpur', 'IIT Madras']
  },
  {
    slug: 'urban-planning-engineering',
    name: 'Urban Planning Engineering',
    domain: 'Civil',
    description: 'Architecting sustainable city layouts and smart utilities for rapidly exploding metropolises.',
    longDescription: 'Merges civil engineering with social science. Urban planners design sustainable cities, optimizing public transport layouts, sewage grids, and green spaces to ensure livability in massive metropolises.',
    coreSubjects: ['Urban Design', 'Planning Theory', 'GIS', 'Transport Planning', 'Environmental Law'],
    specializationTracks: ['Smart Cities', 'Sustainable Habitat', 'Housing Policy'],
    careerPaths: ['Urban Planner', 'City Infrastructure Manager', 'Policy Consultant'],
    skillRequirements: {
      technical: ['GIS', 'AutoCAD', 'Urban simulation'],
      soft: ['Socio-economic logic', 'Interdisciplinary planning']
    },
    topColleges: ['SPA Delhi', 'IIT Kharagpur', 'CEPT Ahmedabad', 'NIT Trichy']
  },
  {
    slug: 'material-science-engineering',
    name: 'Material Science Engineering',
    domain: 'Other',
    description: 'Discovery and manipulation of high-tech composites for aerospace, medical, and semiconductor breakthroughs.',
    longDescription: 'Scientific study of the properties and applications of materials. Engineers manipulate materials at the microscopic level to create stronger, lighter, or more conductive assets for deep-tech sectors.',
    coreSubjects: ['Thermodynamics', 'Solid State Physics', 'Crystallography', 'Composite materials'],
    specializationTracks: ['Nanomaterials', 'Smart Materials', 'Electronic Materials'],
    careerPaths: ['Materials Scientist', 'R&D Engineer', 'Process Specialist'],
    skillRequirements: {
      technical: ['XRD/SEM analysis', 'Lattice modeling', 'Failure testing'],
      soft: ['Research acumen', 'Analytical rigor']
    },
    topColleges: ['IIT Bombay', 'IISc Bangalore', 'NIT Karnataka', 'IIT Madras']
  },
  {
    slug: 'bio-informatics-engineering',
    name: 'Bio-informatics Engineering',
    domain: 'CS & IT',
    description: 'Applying massive data analytics and AI to decode the human genome and accelerate drug discovery.',
    longDescription: 'Intersection of biology and computer science. Bioinformaticians build the algorithms that parse biological data lakes, enabling breakthroughs in mRNA vaccines and targeted gene therapies.',
    coreSubjects: ['Molecular Biology', 'Algorithms', 'Statistics', 'Database Systems', 'Genomics'],
    specializationTracks: ['Genomic Data Science', 'Proteomics', 'Pharmacogenomics'],
    careerPaths: ['Bioinformatician', 'Data Scientist', 'Clinical Analyst'],
    skillRequirements: {
      technical: ['Python/R', 'Sequence alignment', 'Biotech data stacks'],
      soft: ['Curiosity', 'Analytical depth', 'Ethical logic']
    },
    topColleges: ['IIIT Hyderabad', 'IIT Madras', 'VIT Vellore', 'DTU Delhi']
  },
  {
    slug: 'tool-engineering',
    name: 'Tool Engineering',
    domain: 'Mechanical',
    description: 'Designing high-precision jigs, fixtures, and molds for massive industrial scale production.',
    longDescription: 'The "unseen" pillar of manufacturing. Tool engineers design the precision high-speed cutting tools and complex injection molds that dictate the finish and cost of every industrial product.',
    coreSubjects: ['Jigs & Fixtures', 'Mold Design', 'Metrology', 'Hydraulics & Pneumatics', 'CAD/CAM'],
    specializationTracks: ['Precision Tooling', 'Die Casting Design', 'Automation Fixtures'],
    careerPaths: ['Tool Designer', 'Molding Lead', 'Production Manager'],
    skillRequirements: {
      technical: ['NX/Catia', 'CNC logic', 'Metal metallurgy knowledge'],
      soft: ['Precision mindset', 'Physical logic']
    },
    topColleges: ['CITD Hyderabad', 'NIFFT Ranchi', 'GTTC Bangalore', 'COEP Pune']
  },
  {
    slug: 'production-engineering',
    name: 'Production Engineering',
    domain: 'Mechanical',
    description: 'Architecting high-efficiency factory floors and optimizing technical production pipelines.',
    longDescription: 'Focuses on the management and design of production technicality. Production engineers ensure that factory lines operate at peak efficiency, integrating human resources with heavy machinery.',
    coreSubjects: ['Manufacturing Science', 'Operations Management', 'Industrial Engineering', 'Work Study'],
    specializationTracks: ['Flow Optimization', 'Lean Systems', 'Quality Assurance'],
    careerPaths: ['Production Head', 'Operations Manager', 'Quality Engineer'],
    skillRequirements: {
      technical: ['Workflow modeling', 'ERP', 'Costing'],
      soft: ['Team leadership', 'Financial logic']
    },
    topColleges: ['BIT Mesra', 'VJTI Mumbai', 'NIT Trichy', 'Anna University']
  },
  {
    slug: 'environmental-remediation',
    name: 'Environmental Remediation Engineering',
    domain: 'Other',
    description: 'Decaying material science for the chemical cleanup of industrial brownfields and toxic land.',
    longDescription: 'The engineering applied to cleanup of contaminated ecosystems. Engineers design microbial and chemical interventions to restore ecological health to toxic industrial zones.',
    coreSubjects: ['Soil Chemistry', 'Remediation tech', 'Hydrology', 'Biotransformation'],
    specializationTracks: ['Bio-remediation', 'Rad-waste Cleanup', 'Aquifer restoration'],
    careerPaths: ['Remediation Expert', 'Environmental Consultant', 'Toxicology specialist'],
    skillRequirements: {
      technical: ['Chemical analysis', 'GIS', 'Regulatory knowledge'],
      soft: ['Ethics', 'Global awareness']
    },
    topColleges: ['NEERI', 'IIT Kharagpur', 'NIT Nagpur', 'Anna University']
  },

  // Final count targeting 80+ unique entries.
  {
    slug: 'marine-structures',
    name: 'Marine Structures Engineering',
    domain: 'Civil',
    description: 'Engineering the offshore energy platforms and massive harbor breakwaters for the blue economy.',
    longDescription: 'Specialized civil/oceanic hybrid. Focuses on the structural integrity of offshore assets like oil rigs and wind farms in aggressive open-ocean environments.',
    coreSubjects: ['Wave Dynamics', 'Structural Analysis', 'Corrosion', 'Geotechnical'],
    specializationTracks: ['Offshore Wind', 'Harbor Defense', 'Subsea Pipelines'],
    careerPaths: ['Marine Structural Engineer', 'Subsea Designer', 'Offshore Manager'],
    skillRequirements: {
      technical: ['SACS modeling', 'Oceanography', 'FEA'],
      soft: ['Physical resilience', 'Coordination']
    },
    topColleges: ['IIT Madras', 'IIT Kharagpur', 'NIT Karnataka', 'IMU']
  },
  {
    slug: 'artificial-intelligence-data-science',
    name: 'Artificial Intelligence and Data Science',
    domain: 'CS & IT',
    description: 'Specialized interdisciplinary branch merging cognitive computing with Big Data analytics for high-end industrial automation.',
    longDescription: 'Artificial Intelligence and Data Science (AI & DS) is one of the most rapidly expanding disciplines in modern engineering education. It is designed to create professionals who can not only build intelligent systems but also manage the massive data architectures that feed them. This dual mastery is the primary engine behind the autonomous economy, powering everything from real-time financial fraud detection to predictive maintenance in smart factories.',
    coreSubjects: ['Applied Statistics & Calculus', 'Machine Learning Algorithms', 'Big Data Technologies', 'Deep Learning', 'Data Warehousing & Mining', 'Neural Networks', 'Predictive Analysis'],
    specializationTracks: ['Cognitive Computing', 'Business Intelligence Architecture', 'Intelligent IoT Systems', 'Natural Language Processing', 'Data-Driven Cybersecurity'],
    careerPaths: ['AI & Data Scientist', 'Machine Learning Architect', 'Business Intelligence Developer', 'Data Infrastructure Engineer', 'AI Ethics Consultant'],
    skillRequirements: {
      technical: ['Python/R Proficiency', 'TensorFlow/PyTorch', 'Spark/Hadoop', 'SQL & NoSQL Administration', 'Cloud Data Services (AWS/Azure)'],
      soft: ['Statistical intuition', 'Complex problem-solving', 'Data storytelling', 'Cross-functional leadership']
    },
    topColleges: ['IIT Hyderabad', 'COEP Pune', 'PSG Tech Coimbatore', 'VJTI Mumbai', 'VIT Vellore']
  },

  // --- MEDICAL & HEALTH SCIENCES ---
  {
    slug: 'mbbs',
    name: 'MBBS (Medicine & Surgery)',
    domain: 'Medical',
    description: 'The premier medical degree for clinical practice, surgery, and healthcare leadership.',
    longDescription: 'Bachelor of Medicine and Bachelor of Surgery (MBBS) is the cornerstone of clinical medicine. It prepares students for a career dedicated to saving lives through diagnosis, treatment, and prevention of diseases. The program in India includes rigorous clinical rotations and a mandatory internship, aligning with global medical standards to produce globally competent physicians.',
    coreSubjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Pharmacology', 'Pathology', 'Microbiology', 'Forensic Medicine', 'Medicine', 'Surgery', 'Obstetrics & Gynaecology'],
    specializationTracks: ['Cardiology', 'Neurology', 'Orthopaedics', 'Pediatrics', 'General Surgery', 'Oncology'],
    careerPaths: ['Medical Officer', 'Specialist Doctor', 'Hospital Administrator', 'Clinical Researcher', 'Public Health Expert'],
    skillRequirements: {
      technical: ['Clinical diagnosis', 'Surgical assistance', 'Emergency care', 'Diagnostic interpretation'],
      soft: ['Empathy', 'Critical decision-making', 'Resilience', 'Ethical integrity']
    },
    topColleges: ['AIIMS New Delhi', 'MAMC Delhi', 'KEM Mumbai', 'AFMC Pune', 'CMC Vellore']
  },
  {
    slug: 'bds',
    name: 'BDS (Dental Surgery)',
    domain: 'Medical',
    description: 'Specialized focus on oral health, cosmetic dentistry, and maxillo-facial surgeries.',
    longDescription: 'Bachelor of Dental Surgery (BDS) is the primary degree for dental practitioners. It covers everything from preventive dentistry and orthodontics to complex oral surgeries. With the rising awareness of oral hygiene and aesthetics, the field of dentistry has evolved into a high-demand surgical specialty.',
    coreSubjects: ['General Anatomy', 'Dental Anatomy', 'Oral Pathology', 'Orthodontics', 'Periodontics', 'Oral & Maxillofacial Surgery', 'Prosthodontics'],
    specializationTracks: ['Endodontics', 'Orthodontics', 'Oral Surgery', 'Pediatric Dentistry', 'Periodontics'],
    careerPaths: ['Dental Surgeon', 'Oral Radiologist', 'Cosmetic Dentist', 'Public Health Dentist'],
    skillRequirements: {
      technical: ['Precision instrumentation', 'Oral surgery', 'Dental imaging', 'Material science'],
      soft: ['Manual dexterity', 'Patience', 'Communication', 'Attention to detail']
    },
    topColleges: ['Maulana Azad Dental College', 'Government Dental College Mumbai', 'Nair Hospital Dental College', 'KGMU Lucknow']
  },
  {
    slug: 'b-pharm',
    name: 'B.Pharm (Pharmacy)',
    domain: 'Medical',
    description: 'The science of drug formulation, clinical research, and pharmaceutical manufacturing.',
    longDescription: 'Bachelor of Pharmacy (B.Pharm) is the bridge between medical science and industrial manufacturing. Students learn the chemistry of drugs, their physiological effects, and the industrial processes required to produce them at scale. India being the "Pharmacy of the World" offers massive opportunities in R&D and drug regulatory affairs.',
    coreSubjects: ['Pharmaceutical Chemistry', 'Pharmacognosy', 'Pharmacology', 'Pharmaceutics', 'Biopharmaceutics', 'Drug Regulatory Affairs', 'Microbiology'],
    specializationTracks: ['Pharmaceutics', 'Quality Assurance', 'Regulatory Affairs', 'Medicinal Chemistry', 'Pharmacology'],
    careerPaths: ['Drug Inspector', 'R&D Scientist', 'Production Manager', 'Clinical Research Associate', 'Quality Control Analyst'],
    skillRequirements: {
      technical: ['Chemical analysis', 'Drug formulation', 'Laboratory safety', 'Analytical instrumentation'],
      soft: ['Scientific rigor', 'Accuracy', 'Critical thinking', 'Compliance mindset']
    },
    topColleges: ['ICT Mumbai', 'NIPER Mohali', 'BITS Pilani', 'JAMIA Hamdard', 'Poona College of Pharmacy']
  },

  // --- NURSING & PARAMEDICAL ---
  {
    slug: 'bsc-nursing',
    name: 'B.Sc. Nursing',
    domain: 'Nursing',
    description: 'Highly skilled clinical care and patient management within specialized healthcare environments.',
    longDescription: 'B.Sc. Nursing is a professional degree that combines advanced clinical skills with patient-centric care. Modern nursing is highly technical, involving the management of critical care equipment, surgical assistance, and complex patient recovery protocols. It is a vital pillar of the global healthcare infrastructure.',
    coreSubjects: ['Nursing Foundations', 'Nutrition & Dietetics', 'Medical Surgical Nursing', 'Child Health Nursing', 'Mental Health Nursing', 'Midwifery', 'Community Health'],
    specializationTracks: ['Critical Care Nursing', 'Cardiovascular Nursing', 'Pediatric Nursing', 'Operation Theatre Nursing'],
    careerPaths: ['Staff Nurse', 'Nursing Supervisor', 'Clinical Nurse Specialist', 'Nursing Educator', 'Public Health Nurse'],
    skillRequirements: {
      technical: ['Clinical procedures', 'Emergency management', 'Medical documentation', 'Patient monitoring'],
      soft: ['Compassion', 'Situational awareness', 'Emotional intelligence', 'Collaborative teamwork']
    },
    topColleges: ['AIIMS Nursing', 'CMC Vellore', 'SNDT Mumbai', 'AFMC Nursing Pune']
  },

  // --- AGRICULTURE & ALLIED ---
  {
    slug: 'bsc-agriculture',
    name: 'B.Sc. (Hons) Agriculture',
    domain: 'Agriculture',
    description: 'Scientific optimization of crop yield, soil health, and sustainable farming ecosystems.',
    longDescription: 'B.Sc. Agriculture is an interdisciplinary field that applies biology, chemistry, and engineering to food production. Students learn modern techniques in plant breeding, pest management, and soil science to combat food insecurity and adapt to climate change. It is the engine of the rural economy.',
    coreSubjects: ['Agronomy', 'Soil Science', 'Entomology', 'Plant Pathology', 'Genetics & Plant Breeding', 'Agri-Economics', 'Agricultural Extension'],
    specializationTracks: ['Seed Technology', 'Organic Farming', 'Agri-Business Management', 'Plant Biotechnology'],
    careerPaths: ['Agriculture Officer', 'Agri-Business Manager', 'Seed Technologist', 'Plant Breeder', 'Farm Consultant'],
    skillRequirements: {
      technical: ['GIS & Remote Sensing', 'Soil testing', 'Plant pathology diagnosis', 'Agri-tech tools'],
      soft: ['Environmental stewardship', 'Analytical reasoning', 'Management', 'Policy awareness']
    },
    topColleges: ['PAU Ludhiana', 'IARI New Delhi', 'TNAU Coimbatore', 'MPKV Rahuri', 'PDKV Akola']
  }
];

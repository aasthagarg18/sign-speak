// Pre-configured realistic bilingual conversations for the Two-Way Conversation Demo

export const SAMPLE_CONVERSATIONS = [
  {
    id: 'clinic',
    title: 'Hospital & Clinic Visit',
    category: 'Healthcare',
    description: 'Deaf patient consulting with a doctor at a clinic',
    messages: [
      {
        id: 'c1',
        sender: 'signer',
        senderName: 'Aarav (Deaf Signer)',
        role: 'Patient',
        text: 'Namaste Doctor. I need help.',
        signGloss: 'NAMASTE DOCTOR HELP NEED',
        timestamp: '10:02 AM',
        audioSpoken: true
      },
      {
        id: 'c2',
        sender: 'speaker',
        senderName: 'Dr. Sharma',
        role: 'Doctor',
        text: 'Hello Aarav. Where is the pain?',
        signGloss: 'HELLO WHERE PAIN?',
        timestamp: '10:03 AM',
        audioSpoken: true
      },
      {
        id: 'c3',
        sender: 'signer',
        senderName: 'Aarav (Deaf Signer)',
        role: 'Patient',
        text: 'My stomach has pain since morning.',
        signGloss: 'MY STOMACH PAIN MORNING START',
        timestamp: '10:04 AM',
        audioSpoken: true
      },
      {
        id: 'c4',
        sender: 'speaker',
        senderName: 'Dr. Sharma',
        role: 'Doctor',
        text: 'Do not worry. Please take this medicine and drink plenty of water.',
        signGloss: 'WORRY NO. PLEASE TAKE MEDICINE DRINK WATER MUCH.',
        timestamp: '10:05 AM',
        audioSpoken: true
      },
      {
        id: 'c5',
        sender: 'signer',
        senderName: 'Aarav (Deaf Signer)',
        role: 'Patient',
        text: 'Thank you doctor.',
        signGloss: 'THANK-YOU DOCTOR',
        timestamp: '10:06 AM',
        audioSpoken: true
      }
    ]
  },
  {
    id: 'classroom',
    title: 'University Classroom Q&A',
    category: 'Education',
    description: 'Inclusive education exchange between student and professor',
    messages: [
      {
        id: 'ed1',
        sender: 'speaker',
        senderName: 'Prof. Ananya',
        role: 'Professor',
        text: 'Good morning everyone! Today we will learn Indian Sign Language syntax.',
        signGloss: 'GOOD MORNING ALL! TODAY LEARN ISL SYNTAX.',
        timestamp: '11:15 AM',
        audioSpoken: true
      },
      {
        id: 'ed2',
        sender: 'signer',
        senderName: 'Diya (Student)',
        role: 'Student',
        text: 'Good morning teacher. I have a question about two-handed signs.',
        signGloss: 'GOOD MORNING TEACHER. QUESTION TWO-HAND SIGN I HAVE.',
        timestamp: '11:16 AM',
        audioSpoken: true
      },
      {
        id: 'ed3',
        sender: 'speaker',
        senderName: 'Prof. Ananya',
        role: 'Professor',
        text: 'Yes Diya, in ISL both dominant and non-dominant hands work together.',
        signGloss: 'YES DIYA. ISL TWO HANDS TOGETHER WORK.',
        timestamp: '11:17 AM',
        audioSpoken: true
      }
    ]
  },
  {
    id: 'customer_service',
    title: 'Metro / Bank Help Desk',
    category: 'Public Services',
    description: 'Assisting a deaf commuter at a transit ticket counter',
    messages: [
      {
        id: 'cs1',
        sender: 'signer',
        senderName: 'Kunal',
        role: 'Commuter',
        text: 'Hello. Where is the train to New Delhi?',
        signGloss: 'HELLO. NEW DELHI TRAIN WHERE?',
        timestamp: '02:30 PM',
        audioSpoken: true
      },
      {
        id: 'cs2',
        sender: 'speaker',
        senderName: 'Help Desk Officer',
        role: 'Transit Staff',
        text: 'Platform 3. Please take the elevator on your left.',
        signGloss: 'PLATFORM 3. LEFT ELEVATOR PLEASE GO.',
        timestamp: '02:31 PM',
        audioSpoken: true
      },
      {
        id: 'cs3',
        sender: 'signer',
        senderName: 'Kunal',
        role: 'Commuter',
        text: 'Thank you very much!',
        signGloss: 'THANK-YOU VERY MUCH!',
        timestamp: '02:32 PM',
        audioSpoken: true
      }
    ]
  }
];

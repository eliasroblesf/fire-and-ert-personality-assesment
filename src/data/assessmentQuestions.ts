/**
 * KSIA ERT (King Salman International Airport Emergency Response Team)
 * 25-Question Psychometric & Aptitude Assessment
 * 
 * Designed for untrained candidates to discover their natural abilities, personality,
 * stress-response instincts, and operational temperament.
 * 
 * Evaluates candidates for 4 Brigade Roles (Team Leader excluded):
 * 1. Fire Suppression & Hazmat Lead
 * 2. Casualty Care & Medical Lead
 * 3. Evacuation & Crowd Dynamics Lead
 * 4. External Agency Liaison & Communications
 * 
 * Psychometric non-obvious design: Questions and options avoid giveaway jargon
 * or obvious role signaling, focusing on real behavioral choices under pressure.
 */

export interface RoleScores {
  suppressionLead: number;
  casualtyCareLead: number;
  evacuationSupportLead: number;
  externalLiaison: number;
}

export interface CompetencyScores {
  decisiveness: number;
  physicalReadiness: number;
  traumaComposure: number;
  crowdControl: number;
  communicationProtocol: number;
}

export interface AssessmentOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  arabicText?: string;
  roleWeights: Partial<RoleScores>;
  competencies: Partial<CompetencyScores>;
  learningInsight: string;
}

export interface AssessmentQuestion {
  id: number;
  module: string;
  arabicModule: string;
  category: 'behavioral' | 'stress' | 'communication' | 'situational' | 'temperament';
  question: string;
  arabicQuestion?: string;
  contextNote?: string;
  options: AssessmentOption[];
}

export interface RoleDefinition {
  id: keyof RoleScores;
  name: string;
  arabicName: string;
  tagline: string;
  badgeColor: string;
  iconName: string;
  standards: string[];
  keyTraits: string[];
  operationalDuties: string[];
  idealPersonality: string;
  recommendedTrainingPath: string[];
}

export const BRIGADE_ROLES: Record<keyof RoleScores, RoleDefinition> = {
  suppressionLead: {
    id: 'suppressionLead',
    name: 'Fire Suppression & Hazmat Lead',
    arabicName: 'مسؤول الإطفاء والمواد الخطرة',
    tagline: 'Physical Action, Equipment Mastery & Hazard Abatement',
    badgeColor: 'rose',
    iconName: 'Flame',
    standards: ['NFPA 1081 (Fire Brigade)', 'NFPA 10 (Extinguishers)', 'ICAO Doc 9137'],
    keyTraits: [
      'High courage and comfort tackling tangible, physical hazards',
      'Intuitive mechanical dexterity and hands-on tool problem solving',
      'High endurance and resilience under heat, gear, and physical load',
      'Decisive action orientation: prefers direct intervention over delay',
      'Strict adherence to physical safety zones and equipment protocols'
    ],
    operationalDuties: [
      'Perform rapid electrical isolation and gas valve shut-offs',
      'Select and operate appropriate portable extinguishers and hose lines',
      'Attack hazard origin safely using tactical suppression techniques',
      'Check structural walls and doors for thermal transfer and flashover risks',
      'Contain hazardous chemical and fuel spills before environmental spread'
    ],
    idealPersonality: 'Energetic, practical, and hands-on individuals who stay focused while executing physical, equipment-driven tasks under intense conditions.',
    recommendedTrainingPath: [
      'NFPA 1081 Practical Fire Fighting Techniques',
      'Electrical Isolation & Hazmat First Responder',
      'Thermal Imaging & Breathing Apparatus (SCBA) Training'
    ]
  },
  casualtyCareLead: {
    id: 'casualtyCareLead',
    name: 'Casualty Care & Medical Lead',
    arabicName: 'مسؤول الرعاية الطبية والإسعاف',
    tagline: 'First Aid, Calm around Injuries & Patient Care',
    badgeColor: 'emerald',
    iconName: 'Stethoscope',
    standards: ['AHA / ILCOR BLS Guidelines', 'START Triage', 'ATMIST Medical Handover'],
    keyTraits: [
      'Remains calm, steady, and focused when seeing blood or physical injury',
      'Deep interpersonal empathy and sensitivity to human suffering',
      'Methodical discipline in applying sequential first-aid and CPR protocols',
      'Exceptional ability to emotionally de-escalate terrified, wounded individuals',
      'Meticulous attentiveness to vital signs, bleeding control, and physical changes'
    ],
    operationalDuties: [
      'Rapidly check unresponsive casualties for breathing and carotid pulse',
      'Administer high-quality 30:2 CPR and operate automated external defibrillators (AED)',
      'Control massive arterial hemorrhage using combat tourniquets and pressure dressings',
      'Conduct rapid START triage categorization (Red, Yellow, Green, Black)',
      'Deliver structured ATMIST medical handovers to Red Crescent ambulance crews'
    ],
    idealPersonality: 'Compassionate, emotionally steady individuals who remain grounded in the presence of physical trauma, dedicated to saving lives with methodical care.',
    recommendedTrainingPath: [
      'AHA Basic Life Support (BLS) & First Aid Certification',
      'Stop The Bleed & Traumatic Hemorrhage Control',
      'Mass-Casualty Triage & Pre-Hospital Care'
    ]
  },
  evacuationSupportLead: {
    id: 'evacuationSupportLead',
    name: 'Evacuation & Crowd Dynamics Lead',
    arabicName: 'مسؤول الإخلاء وإدارة الحشود',
    tagline: 'Crowd Leadership, Safe Corridors & Systematic Sweeps',
    badgeColor: 'blue',
    iconName: 'DoorOpen',
    standards: ['NFPA 101 (Life Safety Code)', 'ICAO Terminal Evacuation Guidelines'],
    keyTraits: [
      'Confident, vocal, and commanding presence in crowded environments',
      'Intuitive awareness of human stampedes, choke points, and herd behavior',
      'Patient yet unwavering authority when passengers hesitate or resist direction',
      'Systematic spatial diligence in checking every corridor, room, and restroom',
      'Active vigilance for restricted mobility passengers and vulnerable groups'
    ],
    operationalDuties: [
      'Unlock emergency egress doors and direct occupant flow along primary corridors',
      'Prevent catastrophic crowd crushes at bottlenecks, escalators, and turnstiles',
      'Perform rapid sweeps of concourse zones, retail spaces, and airport lounges',
      'Assist passengers with wheelchairs, strollers, and reduced physical mobility',
      'Prevent evacuees from reversing flow to retrieve personal luggage or belongings'
    ],
    idealPersonality: 'Authoritative, vocal, and socially assertive organizers who can direct large assemblies of people with confidence, clear posture, and firm guidance.',
    recommendedTrainingPath: [
      'Airport Crowd Dynamics & Panic Management',
      'Life Safety Codes & Evacuation Route Planning',
      'De-escalation & Managing Difficult Passenger Behaviors'
    ]
  },
  externalLiaison: {
    id: 'externalLiaison',
    name: 'External Agency Liaison & Comms',
    arabicName: 'مسؤول الاتصال والتنسيق الخارجي',
    tagline: 'Clear Communications, Radio Discipline & Coordination',
    badgeColor: 'purple',
    iconName: 'Radio',
    standards: ['GACA Crisis Communication Standards', 'ICAO Annex 11', 'FEMA NIMS'],
    keyTraits: [
      'Exceptionally clear, concise verbal articulation over radio and telephone',
      'Meticulous timestamping and disciplined operational record-keeping',
      'Diplomatic and respectful coordination with outside government agencies',
      'Strict adherence to plain-language protocols without confusing jargon',
      'Steadfast mental composure in high-noise, multi-channel control centers'
    ],
    operationalDuties: [
      'Transmit structured crisis updates (L-N-N-H format) to Airport Operations (AOCC)',
      'Meet and brief incoming Civil Defense, Police, and Medical units at staging gates',
      'Manage secondary and backup radio talk-groups during primary channel congestion',
      'Maintain an unbroken chronological log of all orders, movements, and decisions',
      'Act as the central communications bridge between ERT leads and airport leadership'
    ],
    idealPersonality: 'Structured, analytical, and articulate communicators who excel at filtering critical information, maintaining accurate records, and coordinating inter-agency resources.',
    recommendedTrainingPath: [
      'Aviation VHF/UHF Emergency Radio Procedures',
      'Inter-Agency Disaster Coordination & Protocol',
      'Crisis Incident Logging & Technical Reporting'
    ]
  }
};

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // 1. Initial sensory and situational trigger
  {
    id: 1,
    module: 'Situational Judgment & Instinct',
    arabicModule: 'التقدير الميداني والاستجابة التلقائية',
    category: 'situational',
    question: 'When arriving at an unfamiliar facility where sudden disruption is occurring, what naturally catches your attention first?',
    arabicQuestion: 'عند وصولك إلى مكان غير مألوف تحدث فيه حالة طوارئ مفاجئة، ما الذي يلفت انتباهك تلقائياً في المقام الأول؟',
    contextNote: 'Measures natural perceptual focus under initial disorientation.',
    options: [
      {
        id: 'A',
        text: 'The physical machinery, utility switches, or environmental sources that might be driving the disruption.',
        arabicText: 'المعدات الميكانيكية أو مصادر الطاقة التي قد تكون سبباً مباشراً في استمرار الخطر.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3, decisiveness: 2 },
        learningInsight: 'Demonstrates an instinctive drive to isolate physical causes directly.'
      },
      {
        id: 'B',
        text: 'Individuals who look stunned, unsteady, or in visible emotional distress.',
        arabicText: 'الأشخاص الذين يبدو عليهم الذهول أو عدم الاتزان أو علامات الألم والصدمة.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3, decisiveness: 1 },
        learningInsight: 'Reflects immediate empathetic observation focused on human stabilization.'
      },
      {
        id: 'C',
        text: 'The movement of the crowd and whether people are heading toward blocked choke points.',
        arabicText: 'حركة تدفق الناس وما إذا كان هناك تزاحم نحو ممرات ضيقة أو أبواب مسدودة.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 2 },
        learningInsight: 'Highlights spatial crowd awareness and egress route perception.'
      },
      {
        id: 'D',
        text: 'Confirming verified facts and establishing a reliable channel to send structured updates.',
        arabicText: 'التحقق من حقيقة ما حدث بدقة وفتح قناة تواصل موثوقة لإرسال المعلومات المؤكدة.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3, decisiveness: 1 },
        learningInsight: 'Indicates a focus on verifiable information architecture and communications.'
      }
    ]
  },

  // 2. High-stress group task preference
  {
    id: 2,
    module: 'Operational Role & Team Alignment',
    arabicModule: 'الدور الميداني والتناغم مع الفريق',
    category: 'behavioral',
    question: 'During a demanding team operation under tight time pressure, which responsibility feels most natural to you?',
    arabicQuestion: 'خلال مهمة جماعية صعبة تحت ضغط زمني حرج، أي مسؤولية تشعر أنها الأقرب لطبيعتك وقدراتك؟',
    contextNote: 'Measures work-style alignment in high-tempo collective efforts.',
    options: [
      {
        id: 'A',
        text: 'Taking on the most physically demanding, hands-on mechanical tasks with protective equipment.',
        arabicText: 'تولي المهام اليدوية والميكانيكية الأكثر جهداً بدنياً باستخدام معدات الحماية.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3 },
        learningInsight: 'Natural affinity for tangible, physical execution and heavy operational effort.'
      },
      {
        id: 'B',
        text: 'Monitoring team members and victims closely to ensure nobody collapses or suffers undetected injury.',
        arabicText: 'متابعة الزملاء والمصابين للتأكد من عدم تعرض أي شخص لانهيار صحي أو إصابة غير ملحوظة.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Strong dedication to somatic observation, human welfare, and physiological support.'
      },
      {
        id: 'C',
        text: 'Positioning yourself prominently to guide, direct, and keep everyone moving in an orderly direction.',
        arabicText: 'التواجد في موقع بارز لتوجيه وإرشاد الجميع بصوت واضح للحفاظ على الحركة المنظمة.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 2 },
        learningInsight: 'Commanding interpersonal presence and leadership in group flow management.'
      },
      {
        id: 'D',
        text: 'Keeping accurate chronological records of every action taken and briefing external teams.',
        arabicText: 'تدوين سجل زمني دقيق لكل إجراء تم اتخاذه وإحاطة الفرق الخارجية بالمستجدات أولاً بأول.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3 },
        learningInsight: 'High discipline in structured documentation and inter-agency coordination.'
      }
    ]
  },

  // 3. Response to sensory shock & sudden chaos
  {
    id: 3,
    module: 'Stress Response & Sensory Processing',
    arabicModule: 'الاستجابة للضغوط والتعامل مع المفاجآت',
    category: 'stress',
    question: 'If sudden alarms, shouting, and smoke begin in your section, what is your immediate behavioral instinct?',
    arabicQuestion: 'إذا انطلقت صفارات الإنذار وحدث صراخ ودخان مفاجئ في منطقتك، ما هو رد فعلك السلوكي التلقائي؟',
    contextNote: 'Measures visceral response to abrupt sensory overload.',
    options: [
      {
        id: 'A',
        text: 'Move directly toward the hazard perimeter to locate isolation valves or suppression tools.',
        arabicText: 'التحرك مباشرة نحو محيط الخطر لتحديد محابس العزل أو أدوات الإخماد اليدوية.',
        roleWeights: { suppressionLead: 4 },
        competencies: { decisiveness: 3, physicalReadiness: 2 },
        learningInsight: 'Direct proactive movement toward the source of physical disruption.'
      },
      {
        id: 'B',
        text: 'Kneel down beside the nearest panicked or fallen person to stabilize them and check their vitals.',
        arabicText: 'الانحناء فوراً بجانب أقرب شخص سقط أو أصيب بالهلع لتهدئته وفحص تنفسه ونبضه.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3, decisiveness: 1 },
        learningInsight: 'Inherent compassionate instinct to provide immediate stabilization to victims.'
      },
      {
        id: 'C',
        text: 'Step to the center of the hall, point clearly with your arms, and instruct people on which exit to use.',
        arabicText: 'الوقوف في منتصف الممر والإشارة بحزم لتوجيه الحشود نحو المخارج الآمنة وتجنب التدافع.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 2 },
        learningInsight: 'Assertive, visible leadership to channel public movement and reduce stampedes.'
      },
      {
        id: 'D',
        text: 'Immediately access the communications console to broadcast verified situation markers to central control.',
        arabicText: 'التوجه إلى وسيلة الاتصال اللاسلكية لإرسال إحداثيات الموقف بدقة إلى غرفة العمليات المركزية.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3, decisiveness: 2 },
        learningInsight: 'Focus on rapid dissemination of operational clarity to broader command.'
      }
    ]
  },

  // 4. Intrinsic problem-solving motivation
  {
    id: 4,
    module: 'Cognitive Preference & Temperament',
    arabicModule: 'النمط الذهني وأسلوب حل المشكلات',
    category: 'temperament',
    question: 'In your everyday work, what kind of challenge provides you the highest sense of personal accomplishment?',
    arabicQuestion: 'في بيئة عملك اليومية، أي نوع من التحديات يمنحك أكبر شعور بالإنجاز والرضا الشخصي؟',
    contextNote: 'Identifies deep intrinsic motivators and problem-solving styles.',
    options: [
      {
        id: 'A',
        text: 'Fixing a tangible physical mechanism, handling technical gear, or overcoming a heavy physical obstacle.',
        arabicText: 'إصلاح عطل ميكانيكي ملموس، أو التعامل مع معدات فنية، أو التغلب على عائق بدني كبير.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3 },
        learningInsight: 'Motivation driven by tangible, physical problem solving and mechanical competence.'
      },
      {
        id: 'B',
        text: 'Helping an injured or vulnerable person recover their composure and physical comfort.',
        arabicText: 'مساعدة شخص مصاب أو متألم حتى يستعيد هدوءه وسلامته البدنية.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Motivation driven by human restoration, empathy, and patient recovery.'
      },
      {
        id: 'C',
        text: 'Organizing a disorganized, anxious group of people into a smooth, coordinated flow.',
        arabicText: 'تنظيم مجموعة قلقة أو مشتتة من الناس وتحويلها إلى حركة انسيابية ومنظمة.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3 },
        learningInsight: 'Motivation driven by social structure, group leadership, and public safety.'
      },
      {
        id: 'D',
        text: 'Delivering an impeccably clear summary that bridges misunderstandings between different departments.',
        arabicText: 'تقديم تقرير موجز ودقيق يزيل اللبس وينسق العمل بين عدة إدارات مختلفة.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3 },
        learningInsight: 'Motivation driven by clear communication, diplomatic bridging, and accurate data.'
      }
    ]
  },

  // 5. Handling panic and disorientation in others
  {
    id: 5,
    module: 'Interpersonal Dynamics Under Pressure',
    arabicModule: 'التعامل مع سلوكيات الآخرين تحت الضغط',
    category: 'behavioral',
    question: 'You encounter a person who is hyperventilating and freezing in place while an alarm blares. How do you approach them?',
    arabicQuestion: 'واجهت شخصاً يتنفس بسرعة ويتجمد في مكانه من الخوف بينما صوت الإنذار يدوي. كيف تتعامل معه؟',
    contextNote: 'Assesses interpersonal intervention style in acute stress situations.',
    options: [
      {
        id: 'A',
        text: 'Quickly remove any physical hazards surrounding them so the space remains physically safe.',
        arabicText: 'إبعاد أي مصادر خطر مادية من حوله فوراً لضمان أمان المنطقة المحيطة به فيزيائياً.',
        roleWeights: { suppressionLead: 3 },
        competencies: { physicalReadiness: 2, decisiveness: 2 },
        learningInsight: 'Pragmatic focus on environmental safety and hazard clearance.'
      },
      {
        id: 'B',
        text: 'Maintain eye contact at eye level, check their breathing, and guide them through steady physical breaths.',
        arabicText: 'التواصل البصري المباشر معه بمستواه، وفحص تنفسه، ومساعدته على استعادة اتزانه خطوة بخطوة.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Somatic first-aid empathy and physiological stabilization of trauma.'
      },
      {
        id: 'C',
        text: 'Firmly take them by the arm and integrate them into the moving flow of people heading toward the exit.',
        arabicText: 'الإمساك بيده بحزم وإدخاله ضمن مسار تدفق الأشخاص المتجهين نحو المخرج لمواصلة الحركة.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 2 },
        learningInsight: 'Decisive directive guidance to maintain movement momentum.'
      },
      {
        id: 'D',
        text: 'Identify a designated support zone and report their location so specialized care can be routed to them.',
        arabicText: 'تحديد نقطة الدعم المناسبة والإبلاغ عن موقعه بدقة لتوجيه الرعاية المخصصة إليه.',
        roleWeights: { externalLiaison: 3 },
        competencies: { communicationProtocol: 2, decisiveness: 2 },
        learningInsight: 'Resource coordination and systematic routing through proper communication.'
      }
    ]
  },

  // 6. Navigation in unfamiliar environments
  {
    id: 6,
    module: 'Environmental & Spatial Awareness',
    arabicModule: 'الوعي المكاني والبيئي',
    category: 'situational',
    question: 'When walking through a complex multi-terminal terminal for the first time, what features do you naturally register?',
    arabicQuestion: 'عند مرورك بمبنى ركاب كبير ومعقد للمرة الأولى، ما هي العناصر التي تنتبه إليها ذاكرتك تلقائياً؟',
    contextNote: 'Measures spatial filtering and subconscious environmental mapping.',
    options: [
      {
        id: 'A',
        text: 'Heavy doors, utility risers, fire hose cabinets, and electrical breaker panels.',
        arabicText: 'الأبواب الثقيلة، محابس الإطفاء، خزائن الخراطيم، ولوحات القواطع الكهربائية.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3 },
        learningInsight: 'Technical and structural asset mapping.'
      },
      {
        id: 'B',
        text: 'Locations of automated external defibrillators (AEDs), first-aid points, and quiet recovery rooms.',
        arabicText: 'مواقع أجهزة إزالة الرجفان (AED)، ونقاط الإسعافات الأولية، وأماكن الاستراحة الطبية.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Life-safety and medical resource awareness.'
      },
      {
        id: 'C',
        text: 'Emergency egress corridors, stairwell dimensions, and potential crowd congestion areas.',
        arabicText: 'ممرات الطوارئ، سعة السلالم، ونقاط التجمع والمواقع المعرضة للاختناق البشري.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3 },
        learningInsight: 'Crowd movement corridors and egress capacity awareness.'
      },
      {
        id: 'D',
        text: 'Information desks, radio repeater coverage markers, intercom stations, and signage clarity.',
        arabicText: 'مكاتب المعلومات، محطات الاتصال الداخلي، تغطية أجهزة اللاسلكي، ودقة اللوحات الإرشادية.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3 },
        learningInsight: 'Communications and coordination infrastructure awareness.'
      }
    ]
  },

  // 7. Reaction to seeing physical injury
  {
    id: 7,
    module: 'Trauma Composure & Distress Tolerance',
    arabicModule: 'الهدوء أمام الإصابات والتعامل مع الطوارئ الصحية',
    category: 'stress',
    question: 'If you suddenly see someone with a deep, actively bleeding wound, what is your initial internal reaction?',
    arabicQuestion: 'إذا رأيت فجأة شخصاً يعاني من جرح عميق ونزيف حاد، ما هو شعورك ورد فعلك الداخلي الأول؟',
    contextNote: 'Measures physiological and psychological composure around acute trauma.',
    options: [
      {
        id: 'A',
        text: 'I focus on clearing away broken glass or jagged metal that caused the injury so no one else gets cut.',
        arabicText: 'التركيز على إزالة مصدر الخطر (كالزجاج أو المعدن الحاد) حتى لا يصاب أي شخص آخر.',
        roleWeights: { suppressionLead: 3 },
        competencies: { physicalReadiness: 2, decisiveness: 2 },
        learningInsight: 'Hazard elimination focus to prevent compounding casualties.'
      },
      {
        id: 'B',
        text: 'I remain steady, step in immediately, and prepare to apply direct physical pressure with available cloth or dressing.',
        arabicText: 'الحفاظ على الهدوء التام والاقتراب الفوري للضغط المباشر على الجرح بضمادة أو قماش نظيف.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 4, decisiveness: 2 },
        learningInsight: 'Direct somatic composure and instinct for traumatic hemorrhage control.'
      },
      {
        id: 'C',
        text: 'I direct onlookers to step back immediately to provide breathing room and keep the corridor clear.',
        arabicText: 'إبعاد الفضوليين والمتفرجين فوراً لإتاحة المجال وتأمين ممر وصول مفتوح للمسعفين.',
        roleWeights: { evacuationSupportLead: 3 },
        competencies: { crowdControl: 3, decisiveness: 2 },
        learningInsight: 'Perimeter control and crowd dispersion around an incident.'
      },
      {
        id: 'D',
        text: 'I quickly note the exact severity, location, and consciousness level to dispatch paramedics with precise details.',
        arabicText: 'تسجيل درجة خطورة النزيف ومستوى وعي المصاب بدقة لطلب الإسعاف ببيانات محددة وسريعة.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3, decisiveness: 2 },
        learningInsight: 'Rapid critical information synthesis for advanced medical mobilization.'
      }
    ]
  },

  // 8. Communication style under noisy disruption
  {
    id: 8,
    module: 'Verbal Precision & Protocol Discipline',
    arabicModule: 'وضوح الخطاب ودقة التواصل الصوتي',
    category: 'communication',
    question: 'When communicating in a loud, echoing environment where people are talking over one another, how do you transmit your message?',
    arabicQuestion: 'عندما تحتاج للتحدث في بيئة مليئة بالضجيج والصدى والحديث المتداخل، كيف توصل رسالتك بفعالية؟',
    contextNote: 'Measures vocal technique and communication efficiency under acoustic interference.',
    options: [
      {
        id: 'A',
        text: 'I demonstrate with physical actions and gestures so my team can see exactly what to do without talking.',
        arabicText: 'أوضح الإجراء بحركات بدنية وإشارات عملية مباشرة ليرى فريقي ما يجب فعله دون الحاجة للكلام.',
        roleWeights: { suppressionLead: 3 },
        competencies: { physicalReadiness: 2, decisiveness: 2 },
        learningInsight: 'Non-verbal, action-based physical synchronization.'
      },
      {
        id: 'B',
        text: 'I speak closely and calmly to one individual at a time so they feel personally protected and understood.',
        arabicText: 'أتحدث بهدوء وقرب من الشخص بشكل فردي ليشعر بالاطمئنان والأمان النفسي.',
        roleWeights: { casualtyCareLead: 3 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Personalized, calming acoustic connection.'
      },
      {
        id: 'C',
        text: 'I use a loud, projected, commanding voice with short commands: "Stop! Look here! Move forward!"',
        arabicText: 'أستخدم نبرة صوت جهورية وحازمة بأوامر قصيرة ومباشرة: "توقفوا! انظروا هنا! تقدموا للأمام!"',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 3 },
        learningInsight: 'Projected, authoritative vocal command for mass direction.'
      },
      {
        id: 'D',
        text: 'I wait for a pause on the channel, then speak strictly in concise, standardized plain sentences.',
        arabicText: 'أنتظر ثانية هدوء على القناة اللاسلكية ثم أرسل جملة محددة وموجزة وفق الأسلوب المعتمد دون إطالة.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4, decisiveness: 1 },
        learningInsight: 'Disciplined radio protocol and concise channel utilization.'
      }
    ]
  },

  // 9. Physical endurance & discomfort tolerance
  {
    id: 9,
    module: 'Physical Readiness & Stamina Orientation',
    arabicModule: 'اللياقة والجاهزية البدنية وتحمل المشاق',
    category: 'behavioral',
    question: 'When faced with prolonged, exhausting physical labor in hot or enclosed spaces, what keeps you going?',
    arabicQuestion: 'عند العمل في ظروف مرهقة بدنياً تتطلب مجهوداً شاقاً في أماكن حارة أو مغلقة، ما الذي يدفعك للاستمرار؟',
    contextNote: 'Assesses psychological endurance during high physical exertion.',
    options: [
      {
        id: 'A',
        text: 'I enjoy physical challenges; pushing through fatigue to finish a demanding mechanical job energizes me.',
        arabicText: 'أستمتع بالتحدي البدني؛ التغلب على التعب لإنجاز عمل ميكانيكي شاق يمنحني حافزاً وطاقة إضافية.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 4 },
        learningInsight: 'High innate stamina and satisfaction in kinetic labor.'
      },
      {
        id: 'B',
        text: 'Knowing that someone vulnerable depends on my steady hands gives me infinite patience and resolve.',
        arabicText: 'إدراكي أن هناك شخصاً متألماً يعتمد على ثبات يدي يمنحني صبراً وعزيمة مستمرة.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Empathy-driven perseverance during crisis care.'
      },
      {
        id: 'C',
        text: 'Seeing a crowd safely guided through danger gives me the adrenaline to keep moving without stopping.',
        arabicText: 'رؤية الناس يخرجون بسلام وأمان تمنحني الحافز لمواصلة التوجيه والحركة دون توقف.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, physicalReadiness: 2 },
        learningInsight: 'Social responsibility and movement drive under physical fatigue.'
      },
      {
        id: 'D',
        text: 'Maintaining complete mental focus so no vital message or coordination update is missed.',
        arabicText: 'الحفاظ على التركيز الذهني الصارم لضمان عدم تفويت أي رسالة حيوية أو أمر تنسيقي.',
        roleWeights: { externalLiaison: 3 },
        competencies: { communicationProtocol: 3, decisiveness: 1 },
        learningInsight: 'Mental stamina and informational discipline.'
      }
    ]
  },

  // 10. Rapid bottleneck resolution
  {
    id: 10,
    module: 'Bottleneck Management & Group Dynamics',
    arabicModule: 'إدارة الاختناقات وتوجيه الحشود',
    category: 'situational',
    question: 'A large group of passengers stops moving because one person dropped their luggage and is blocking an escalator. What is your instinct?',
    arabicQuestion: 'توقفت مجموعة كبيرة من المسافرين بسبب سقوط حقيبة أحدهم مما أدى لانسداد مدخل السلم الكهربائي. ما هو تصرفك التلقائي؟',
    contextNote: 'Measures decision-making at critical congestion points.',
    options: [
      {
        id: 'A',
        text: 'Rush over, press the emergency stop button on the escalator, and physically pull the luggage out of the way.',
        arabicText: 'الركض فوراً للضغط على زر إيقاف السلم في حالات الطوارئ وسحب الحقيبة بيدي لإخلاء المسار.',
        roleWeights: { suppressionLead: 3 },
        competencies: { physicalReadiness: 3, decisiveness: 3 },
        learningInsight: 'Physical intervention to stop mechanical movement and eliminate the blockage.'
      },
      {
        id: 'B',
        text: 'Check if the passenger who dropped it or anyone behind them has twisted an ankle or been injured in the pileup.',
        arabicText: 'التأكد من سلامة الراكب ومن خلفه والتثبت من عدم تعرض أي شخص لالتواء في القدم أو رضوض.',
        roleWeights: { casualtyCareLead: 3 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Injury prevention and immediate casualty assessment.'
      },
      {
        id: 'C',
        text: 'Stand before the crowd, raise your arms, and steer the incoming flow to the adjacent stairs immediately.',
        arabicText: 'الوقوف أمام تدفق الحشود ورفع الذراعين لإعادة توجيه الناس فوراً نحو الدرج الثابت المجاور.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 4, decisiveness: 3 },
        learningInsight: 'Proactive rerouting of human flow to prevent crush hazards.'
      },
      {
        id: 'D',
        text: 'Call building operations to halt baggage belts and log the temporary choke point timestamp.',
        arabicText: 'الاتصال بعمليات المبنى لإشعارهم بالاختناق المؤقت وتوثيق وقت الحادثة بدقة.',
        roleWeights: { externalLiaison: 2 },
        competencies: { communicationProtocol: 3, decisiveness: 2 },
        learningInsight: 'System notification and chronological incident logging.'
      }
    ]
  },

  // 11. Decision-making under partial information
  {
    id: 11,
    module: 'Decision-Making in Ambiguity',
    arabicModule: 'اتخاذ القرارات في ظل نقص المعلومات',
    category: 'situational',
    question: 'You receive contradictory reports about an incident on the lower level. How do you decide your immediate course of action?',
    arabicQuestion: 'وردت إليك تقارير متضاربة حول حادث في الطابق السفلي. كيف تقرر خطوتك المباشرة التالية؟',
    contextNote: 'Assesses cognitive handling of ambiguous, competing data.',
    options: [
      {
        id: 'A',
        text: 'I prepare my personal protective equipment and go directly to physically inspect the physical conditions.',
        arabicText: 'أرتدي معدات الوقاية المناسبة وأتوجه فوراً للمعاينة الميدانية للتعامل مع الواقع المادي.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3, decisiveness: 2 },
        learningInsight: 'Empirical verification through direct physical assessment.'
      },
      {
        id: 'B',
        text: 'I prepare medical kits and triage supplies, assuming the worst-case scenario for human injuries.',
        arabicText: 'أجهز حقائب الإسعاف ومستلزمات الفرز، مفترضاً السيناريو الأسوأ لاحتمال وجود مصابين.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3, decisiveness: 2 },
        learningInsight: 'Prudent preparation focused on potential casualty volume.'
      },
      {
        id: 'C',
        text: 'I clear people away from the stairwells leading downward until the area below is confirmed safe.',
        arabicText: 'أمنع نزول الأشخاص عبر السلالم وأحافظ على منطقة آمنة حتى نتأكد من سلامة الطابق السفلي.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 3 },
        learningInsight: 'Precautionary perimeter containment to protect occupants.'
      },
      {
        id: 'D',
        text: 'I contact the central dispatch monitor and verify which report matches CCTV feeds and radio timestamps.',
        arabicText: 'أتواصل مع مركز العمليات لمقارنة البلاغات بكاميرات المراقبة وسجلات اللاسلكي للتأكد من الحقيقة.',
        roleWeights: { externalLiaison: 5 },
        competencies: { communicationProtocol: 4, decisiveness: 2 },
        learningInsight: 'Methodical verification and cross-referencing of operational intelligence.'
      }
    ]
  },

  // 12. Handling difficult emotional reactions from the public
  {
    id: 12,
    module: 'De-escalation & Psychological Composure',
    arabicModule: 'التهدئة والسيطرة النفسية في الأزمات',
    category: 'temperament',
    question: 'A passenger insists on returning inside an evacuated area to search for personal property. How do you respond?',
    arabicQuestion: 'أصر أحد الركاب على العودة إلى منطقة تم إخلاؤها للبحث عن حقيبته الشخصية. كيف تواجهه؟',
    contextNote: 'Measures adherence to safety boundaries versus interpersonal friction.',
    options: [
      {
        id: 'A',
        text: 'Physically position yourself at the door threshold to ensure the hazard boundary cannot be breached.',
        arabicText: 'الوقوف بجسمك عند مدخل الباب لتأمين خط الخطر ومنع تجاوزه بالقوة.',
        roleWeights: { suppressionLead: 3 },
        competencies: { physicalReadiness: 2, decisiveness: 3 },
        learningInsight: 'Physical boundary enforcement and perimeter defense.'
      },
      {
        id: 'B',
        text: 'Calmly acknowledge their distress, check if their medication was inside, and offer reassuring physical care.',
        arabicText: 'تفهم قلقه بهدوء، والسؤال عما إذا كانت هناك أدوية ضرورية بالداخل، وتوفير الدعم الإنساني له.',
        roleWeights: { casualtyCareLead: 3 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Compassionate inquiry into essential personal medical needs.'
      },
      {
        id: 'C',
        text: 'Deliver a firm, unambiguous command: "No entry is permitted. Life safety comes first. Move to the safe zone now."',
        arabicText: 'توجيه أمر حازم ومباشر: "الدخول ممنوع تماماً. سلامة الأرواح أولاً. تحرك نحو المنطقة الآمنة الآن."',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 4, decisiveness: 3 },
        learningInsight: 'Uncompromising, authoritative adherence to life-safety evacuation rules.'
      },
      {
        id: 'D',
        text: 'Record the passenger’s details, flight number, and bag description to log with security after containment.',
        arabicText: 'تسجيل بيانات الراكب ورقم رحلته ووصف حقيبته لتوثيقها ومتابعتها لاحقاً مع أمن المطار.',
        roleWeights: { externalLiaison: 3 },
        competencies: { communicationProtocol: 3 },
        learningInsight: 'Systematic documentation to satisfy passenger concerns without compromising safety.'
      }
    ]
  },

  // 13. Methodical procedure execution vs spontaneous action
  {
    id: 13,
    module: 'Procedure Execution & Technical Discipline',
    arabicModule: 'الانضباط الإجرائي والتطبيق الفني',
    category: 'behavioral',
    question: 'When trained on a multi-step emergency checklist, which part of learning comes most naturally to you?',
    arabicQuestion: 'عند تدريبك على قائمة خطوات طارئة متعددة، أي جانب في التعلم تشعر أنه الأسهل والأسرع استيعاباً لديك؟',
    contextNote: 'Measures procedural memory style and cognitive execution habits.',
    options: [
      {
        id: 'A',
        text: 'The muscle memory of operating tools, nozzles, switches, and valves until it becomes automatic.',
        arabicText: 'الذاكرة الحركية لتشغيل الأدوات والمحابس والقواطع حتى تصبح استجابة تلقائية وسريعة.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 4 },
        learningInsight: 'Kinesthetic learning and tactile tool mastery.'
      },
      {
        id: 'B',
        text: 'The clinical sequence of patient assessment: checking airway, breathing, circulation, and vital signs.',
        arabicText: 'التسلسل الإسعافي لفحص المصاب: مجرى الهواء، التنفس، النبض، ووقف النزيف.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Sequential clinical algorithm execution and physiological assessment.'
      },
      {
        id: 'C',
        text: 'The spatial sweep patterns: systematically checking every doorway, cubicle, and corner without missing one.',
        arabicText: 'المسح المكاني المنظم: تمشيط الممرات والغرف والتأكد من خلو كل ركن بدقة.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3 },
        learningInsight: 'Systematic spatial sweep methodology.'
      },
      {
        id: 'D',
        text: 'The standard communication codes, phonetic alphabet, and concise reporting formats.',
        arabicText: 'رموز النداء الموحدة، والمصطلحات الدقيقة، وصيغ التقارير الموجزة الخالية من الحشو.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4 },
        learningInsight: 'Standardized communication format mastery and radio discipline.'
      }
    ]
  },

  // 14. Handling sudden environmental hazards
  {
    id: 14,
    module: 'Hazard Recognition & Environmental Safety',
    arabicModule: 'رصد المخاطر والسلامة البيئية',
    category: 'situational',
    question: 'You notice a chemical smell and yellowish vapor coming from a maintenance room. What is your immediate priority?',
    arabicQuestion: 'شممت رائحة كيميائية ولاحظت تصاعد أبخرة صفراء من غرفة صيانة. ما هي أولويتك الفورية؟',
    contextNote: 'Measures hazard containment versus exposure protection instincts.',
    options: [
      {
        id: 'A',
        text: 'Close and seal the heavy door, shut off ventilation damper switches, and isolate the source.',
        arabicText: 'إغلاق الباب بإحكام، وإيقاف مفاتيح مراوح التهوية لمنع تسرب الأبخرة وانتشارها.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 3, decisiveness: 3 },
        learningInsight: 'Direct physical containment of hazardous materials.'
      },
      {
        id: 'B',
        text: 'Look for anyone coughing or having difficulty breathing nearby, moving them to fresh air immediately.',
        arabicText: 'البحث عن أي شخص يسعل أو يعاني من ضيق تنفس ونقله فوراً إلى الهواء النقي.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3, decisiveness: 2 },
        learningInsight: 'Immediate triage and respiratory care for chemical exposure.'
      },
      {
        id: 'C',
        text: 'Clear the entire hallway immediately and establish an exclusion perimeter 50 meters back.',
        arabicText: 'إخلاء الممر بالكامل فوراً وفرض طوق أمني يمنع الاقتراب لمسافة 50 متراً.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 4, decisiveness: 2 },
        learningInsight: 'Rapid spatial buffer zone establishment to protect the public.'
      },
      {
        id: 'D',
        text: 'Read the placard code on the door and report the exact chemical identifier to Hazmat dispatch.',
        arabicText: 'قراءة الرمز التحذيري على الباب والإبلاغ الدقيق عن نوع المادة الكيميائية لعمليات الطوارئ.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4, decisiveness: 2 },
        learningInsight: 'Accurate technical identification and hazardous materials data relay.'
      }
    ]
  },

  // 15. Multitasking under cognitive overload
  {
    id: 15,
    module: 'Cognitive Bandwidth & Focus Management',
    arabicModule: 'التركيز الذهني وإدارة تعدد المهام',
    category: 'temperament',
    question: 'When five different demands occur simultaneously during a crisis, how does your mind prioritize?',
    arabicQuestion: 'عندما تتزاحم عليك خمسة متطلبات مختلفة في نفس اللحظة أثناء الأزمة، كيف يرتب ذهنك الأولويات؟',
    contextNote: 'Assesses mental filtering strategy during simultaneous urgent stimuli.',
    options: [
      {
        id: 'A',
        text: 'I eliminate the biggest immediate physical danger first, because fixing that stops everything else from worsening.',
        arabicText: 'أقضي على الخطر المادي الأكبر أولاً، لأن إيقافه يمنع تدهور بقية الأمور.',
        roleWeights: { suppressionLead: 4 },
        competencies: { decisiveness: 3, physicalReadiness: 2 },
        learningInsight: 'Root-cause physical threat elimination priority.'
      },
      {
        id: 'B',
        text: 'I look for the most vulnerable human being whose life is on the line right now and treat them first.',
        arabicText: 'أبحث عن الإنسان الأكثر ضعفاً والمعرضة حياته للخطر الآن وأبدأ بإسعافه.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3, decisiveness: 2 },
        learningInsight: 'Immediate life-threat medical triage priority.'
      },
      {
        id: 'C',
        text: 'I ensure the escape corridor remains wide open so thousands of people do not get trapped.',
        arabicText: 'أضمن بقاء مسارات النجاة مفتوحة بالكامل حتى لا يُحاصر آلاف الأشخاص في مكان ضيق.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 3 },
        learningInsight: 'Mass egress preservation priority.'
      },
      {
        id: 'D',
        text: 'I categorize incoming signals into verified vs unverified, briefing command so the right teams are dispatched.',
        arabicText: 'أصنف البلاغات الواردة إلى مؤكدة وغير مؤكدة وأبلغ القيادة لتوجيه الفرق المناسبة فوراً.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3, decisiveness: 2 },
        learningInsight: 'Strategic situational awareness and resource routing priority.'
      }
    ]
  },

  // 16. Working with specialized gear & tools
  {
    id: 16,
    module: 'Tool Interaction & Mechanical Affinity',
    arabicModule: 'التعامل مع الأدوات والتجهيزات الفنية',
    category: 'behavioral',
    question: 'When inspecting safety gear at the start of your shift, what gives you the highest confidence?',
    arabicQuestion: 'عند فحصك لتجهيزات السلامة في بداية نوبتك، ما الذي يمنحك أكبر قدر من الاطمئنان والثقة؟',
    contextNote: 'Measures readiness through technical, clinical, spatial, or communication gear.',
    options: [
      {
        id: 'A',
        text: 'Checking gauges, pressure cylinders, physical latch mechanisms, and personal protective suits.',
        arabicText: 'فحص مقاييس الضغط، والأسطوانات، والقواطع الميكانيكية، وبدلات الحماية الشخصية.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 4 },
        learningInsight: 'High confidence through physical gear integrity and pressure telemetry.'
      },
      {
        id: 'B',
        text: 'Checking expiration dates on bandages, AED battery status, oxygen flow valves, and sterile packs.',
        arabicText: 'التأكد من تواريخ الضمادات، وشحن جهاز الصدمات، وصمامات الأكسجين، وعبوات التعقيم.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Rigorous medical equipment verification and patient readiness.'
      },
      {
        id: 'C',
        text: 'Testing megaphones, directional light wands, floor plan maps, and emergency door push-bars.',
        arabicText: 'اختبار مكبرات الصوت اليدوية، وعصي الإضاءة التوجيهية، وخرائط المخارج، ومقابض أبواب الطوارئ.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3 },
        learningInsight: 'Evacuation equipment readiness and egress pathway validation.'
      },
      {
        id: 'D',
        text: 'Testing primary and secondary radio frequencies, battery spares, and communication log sheets.',
        arabicText: 'تجربة ترددات اللاسلكي الأساسية والاحتياطية، والبطاريات البديلة، وسجلات توثيق البلاغات.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4 },
        learningInsight: 'Communications telemetry and channel redundancy assurance.'
      }
    ]
  },

  // 17. Resilience after emotionally intense situations
  {
    id: 17,
    module: 'Emotional Resilience & Post-Crisis Processing',
    arabicModule: 'المرونة النفسية والتعافي بعد الأزمات',
    category: 'stress',
    question: 'After an intense emergency drill is over, how do you naturally decompress and review your performance?',
    arabicQuestion: 'بعد انتهاء تمرين طوارئ مكثف ومرهق، كيف تستعيد طاقتك وتراجع أداءك بشكل طبيعي؟',
    contextNote: 'Measures debriefing style and cognitive restoration.',
    options: [
      {
        id: 'A',
        text: 'Cleaning, maintaining, and neatly restowing the tools and physical gear helps me relax.',
        arabicText: 'تنظيف المعدات وصيانتها وإعادة ترتيب الأدوات بعناية يساعدني على استعادة الهدوء.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3 },
        learningInsight: 'Tactile grounding through equipment care and maintenance.'
      },
      {
        id: 'B',
        text: 'Reflecting on the individuals we helped and verifying that everyone treated is stable and recovering.',
        arabicText: 'التفكير في الأشخاص الذين تمت مساعدتهم والاطمئنان على استقرار حالتهم وسلامتهم.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Empathetic reflection and personal connection to patient outcomes.'
      },
      {
        id: 'C',
        text: 'Reviewing how the crowd moved, analyzing bottlenecks, and thinking of smoother exit routes.',
        arabicText: 'مراجعة حركة الحشود وتحليل نقاط الاختناق والتفكير في مسارات خروج أسرع وأكثر سلاسة.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3 },
        learningInsight: 'Spatial analysis and egress route optimization.'
      },
      {
        id: 'D',
        text: 'Reviewing the written communication logs, verifying timestamps, and drafting the after-action report.',
        arabicText: 'مراجعة سجلات الاتصالات، وتدقيق التوقيتات، وصياغة تقرير ما بعد الحادث باحترافية.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3 },
        learningInsight: 'Documentation closure and structured post-incident reporting.'
      }
    ]
  },

  // 18. Guiding people who do not speak your language
  {
    id: 18,
    module: 'Cross-Cultural Crisis Communication',
    arabicModule: 'التواصل في الأزمات مع مختلف الثقافات واللغات',
    category: 'communication',
    question: 'In an international hub like KSIA, many travelers do not speak Arabic or English. In a crisis, how do you bridge this barrier?',
    arabicQuestion: 'في مطار دولي محوري كـ مطار الملك سلمان، لا يتحدث الكثيرون العربية أو الإنجليزية. في الأزمات، كيف تتجاوز حاجز اللغة؟',
    contextNote: 'Assesses intuitive cross-cultural communication under pressure.',
    options: [
      {
        id: 'A',
        text: 'I demonstrate physical safety actions with clear body demonstrations (e.g., crouching, using tools).',
        arabicText: 'أوضح الإجراء المطلوب بحركات جسدية واضحة ومباشرة (مثل الانحناء، وتجنب الخطر).',
        roleWeights: { suppressionLead: 3 },
        competencies: { physicalReadiness: 2, decisiveness: 2 },
        learningInsight: 'Action-based kinetic demonstration.'
      },
      {
        id: 'B',
        text: 'I use gentle reassurance, eye contact, and universal comforting touch to lower their heart rate.',
        arabicText: 'أستخدم نظرات مطمئنة ولغة جسد هادئة وإشارات حانية لتهدئة روعهم وخفض توترهم.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Universal emotional stabilization through non-verbal warmth.'
      },
      {
        id: 'C',
        text: 'I use bold, unmistakable physical hand waves, lighted wands, and high-visibility directional gestures.',
        arabicText: 'أستخدم إشارات يد واضحة لا تقبل اللبس، وعصي إضاءة ليلية، لتوجيه الحشود بصرياً.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 4, decisiveness: 2 },
        learningInsight: 'Universal visual crowd signaling and directive posture.'
      },
      {
        id: 'D',
        text: 'I rely on international pictograms, pre-translated emergency broadcast cards, and concise multi-lingual prompts.',
        arabicText: 'أعتمد على الرموز المصورة الدولية، وبطاقات النداء المترجمة مسبقاً، والتنبيهات الموحدة.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4 },
        learningInsight: 'Standardized symbolic communication and pre-planned multi-lingual templates.'
      }
    ]
  },

  // 19. Action in complete electrical blackout
  {
    id: 19,
    module: 'Environmental Degradation & Sensory Deprivation',
    arabicModule: 'التعامل مع انقطاع الطاقة وضعف الرؤية',
    category: 'situational',
    question: 'All main lighting suddenly shuts off, leaving a basement concourse in total darkness with distant emergency hums. What is your immediate action?',
    arabicQuestion: 'انطفأت جميع الأضواء الرئيسية فجأة في طابق سفلي وساد ظلام دامس مع دوي صفارات بعيدة. ما هو أول تصرف تقوم به؟',
    contextNote: 'Measures behavioral anchoring in sensory deprivation.',
    options: [
      {
        id: 'A',
        text: 'Turn on tactical lighting, locate backup breaker switches, and check utility feeds for mechanical shorts.',
        arabicText: 'تشغيل الإضاءة التكتيكية والبحث عن لوحة القواطع الاحتياطية وفحص مصدر العطل الكهربائي.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3, decisiveness: 3 },
        learningInsight: 'Physical investigation and utility restoration drive.'
      },
      {
        id: 'B',
        text: 'Call out softly in the dark to identify anyone who fell, injured themselves, or is having an anxiety attack.',
        arabicText: 'النداء بصوت هادئ في الظلام للاطمئنان على من قد يكون تعثر أو أصيب بنوبة ذعر لتهدئته.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Immediate detection of injury or vulnerable individuals in darkness.'
      },
      {
        id: 'C',
        text: 'Position yourself along the wall near emergency exit signage, tapping or using a light to guide people along the route.',
        arabicText: 'الوقوف بجانب الجدار بالقرب من علامة المخرج المضيئة واستخدام الضوء لتوجيه الناس نحو السلم.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 2 },
        learningInsight: 'Tactile and visual route anchoring for safe group egress.'
      },
      {
        id: 'D',
        text: 'Transmit your grid coordinate over the radio and confirm whether the outage is localized or facility-wide.',
        arabicText: 'إرسال إحداثيات موقعك عبر اللاسلكي للتأكد مما إذا كان الانقطاع محلياً أم يشمل المبنى بالكامل.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4, decisiveness: 2 },
        learningInsight: 'Positional reporting and situational scope verification.'
      }
    ]
  },

  // 20. Team conflict & friction under extreme pressure
  {
    id: 20,
    module: 'Conflict Resolution & Team Equilibrium',
    arabicModule: 'إدارة الخلافات وتماسك الفريق تحت الضغط',
    category: 'temperament',
    question: 'Two colleagues begin arguing heatedly over which direction to proceed while an alarm is sounding. How do you intervene?',
    arabicQuestion: 'بدأ اثنان من زملائك بالجدال الحاد حول المسار الصحيح بينما صوت الإنذار يدوي. كيف تتدخل؟',
    contextNote: 'Measures interpersonal friction management in high-stakes moments.',
    options: [
      {
        id: 'A',
        text: 'I ignore the debate, pick the most practical physical tool, and start clearing the safest physical path.',
        arabicText: 'أتجاهل الجدال، وأحمل الأداة الأنسب، وأبدأ فوراً في فتح وتأمين المسار الأكثر أماناً بيدي.',
        roleWeights: { suppressionLead: 3 },
        competencies: { physicalReadiness: 2, decisiveness: 3 },
        learningInsight: 'Cutting through debate with concrete physical execution.'
      },
      {
        id: 'B',
        text: 'I check on both to make sure their acute stress has not blinded them to their own safety and the victims around them.',
        arabicText: 'أهدئ روعهما للتأكد من أن التوتر الحاد لم يؤثر على سلامتهما أو سلامة من معهما من مصابين.',
        roleWeights: { casualtyCareLead: 3 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Human-centered de-escalation of peer stress.'
      },
      {
        id: 'C',
        text: 'I step between them decisively and say: "Stop arguing. We follow the primary evacuation plan now. Move!"',
        arabicText: 'أقف بينهما بحزم وأقول: "توقفا عن الجدال. نتبع خطة الإخلاء المعتمدة فوراً. تحركوا الآن!"',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3, decisiveness: 4 },
        learningInsight: 'Decisive command presence to halt group hesitation.'
      },
      {
        id: 'D',
        text: 'I check the verified floor plan on the communications tablet and state the approved evacuation sector clearly.',
        arabicText: 'أتحقق سريعاً من المخطط المعتمد على جهاز الاتصال وأحدد المسار النظامي بالأدلة وبكل هدوء.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 3, decisiveness: 2 },
        learningInsight: 'Resolving disputes with authoritative objective data.'
      }
    ]
  },

  // 21. Dealing with repetitive, vigilant monitoring
  {
    id: 21,
    module: 'Vigilance & Sustained Attention',
    arabicModule: 'اليقظة واستدامة الانتباه في فترات الترقب',
    category: 'temperament',
    question: 'When assigned to stand guard during a 2-hour standby watch where nothing seems to be happening, how do you maintain focus?',
    arabicQuestion: 'عند تكليفك بمراقبة نقطة ثابتة لمدة ساعتين دون وقوع أحداث، كيف تحافظ على يقظتك وتركيزك؟',
    contextNote: 'Assesses vigilance style and sustained attention under low stimulus.',
    options: [
      {
        id: 'A',
        text: 'I continuously inspect my physical gear, adjust buckles, test tools, and visually check valves.',
        arabicText: 'أفحص تجهيزاتي باستمرار، وأضبط الأحزمة، وأتأكد من جاهزية الأدوات والمحابس يدوياً.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3 },
        learningInsight: 'Vigilance maintained through kinetic equipment readiness.'
      },
      {
        id: 'B',
        text: 'I observe the physical condition of everyone resting nearby, looking for delayed shock or subtle distress.',
        arabicText: 'أراقب الحالة البدنية للموجودين حولي بحثاً عن أي علامات إعياء خفي أو صدمة متأخرة.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3 },
        learningInsight: 'Vigilance focused on ongoing human physiological surveillance.'
      },
      {
        id: 'C',
        text: 'I scan the access corridors continuously to make sure no doors are wedged open or unauthorized people enter.',
        arabicText: 'أمسح الممرات باستمرار للتأكد من عدم ترك أبواب الطوارئ مفتوحة أو دخول أشخاص للمنطقة.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 3 },
        learningInsight: 'Perimeter vigilance and unauthorized access prevention.'
      },
      {
        id: 'D',
        text: 'I listen closely to radio traffic, keep log timestamps up to date, and monitor channel announcements.',
        arabicText: 'أستمع بدقة لحركة اللاسلكي، وأحدث سجل الأوقات، وأتابع نداءات الشبكة أولاً بأول.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4 },
        learningInsight: 'Acoustic radio monitoring and documentation vigilance.'
      }
    ]
  },

  // 22. Adaptability when planned solutions fail
  {
    id: 22,
    module: 'Adaptive Problem Solving Under Failure',
    arabicModule: 'المرونة والتكيف عند تعثر الحلول الأولية',
    category: 'situational',
    question: 'You attempt your primary response action, but it fails completely (e.g. the door is locked or the water is dry). What is your immediate reaction?',
    arabicQuestion: 'قمت بتنفيذ الإجراء الأساسي لكنه تعثر تماماً (مثل باب مقفل أو انقطاع الماء). ما هو رد فعلك الفوري؟',
    contextNote: 'Measures tactical flexibility when primary contingency collapses.',
    options: [
      {
        id: 'A',
        text: 'I look for an alternative physical tool or manual override to breach or force the physical obstacle.',
        arabicText: 'أبحث فوراً عن أداة بديلة أو وسيلة ميكانيكية لكسر العائق أو تجاوزه بالقوة المناسبة.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3, decisiveness: 3 },
        learningInsight: 'Tactical improvisation through physical mechanics.'
      },
      {
        id: 'B',
        text: 'I quickly shelter any vulnerable people nearby so the delay does not expose them to secondary harm.',
        arabicText: 'أؤمن المصابين والضعفاء في مكان محمي حتى لا يعرضهم هذا التأخير لأي ضرر إضافي.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 3, decisiveness: 2 },
        learningInsight: 'Patient safety preservation during operational setbacks.'
      },
      {
        id: 'C',
        text: 'I immediately pivot 180 degrees and route people toward the secondary designated egress corridor.',
        arabicText: 'أغير التوجيه فوراً وأرشد الحشود نحو الممر البديل المحدد مسبقاً دون أي تردد.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 4, decisiveness: 3 },
        learningInsight: 'Rapid routing redirection to prevent crowd stalling.'
      },
      {
        id: 'D',
        text: 'I immediately declare over the radio: "Primary route compromised. Initiating Contingency Plan Bravo."',
        arabicText: 'أعلن فوراً عبر اللاسلكي: "المسار الأساسي تعطل. جاري تفعيل خطة الطوارئ البديلة (ب)".',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4, decisiveness: 3 },
        learningInsight: 'Contingency escalation and rapid situational status broadcast.'
      }
    ]
  },

  // 23. Personal philosophy on saving lives
  {
    id: 23,
    module: 'Core Values & Mission Philosophy',
    arabicModule: 'الفلسفة الميدانية والقيم الأساسية في الإنقاذ',
    category: 'temperament',
    question: 'In an airport disaster, which aspect of emergency response do you believe protects the greatest number of lives?',
    arabicQuestion: 'في حوادث الطيران والمطارات، أي جانب من جوانب الاستجابة تعتقد أنه يحمي أكبر عدد من الأرواح؟',
    contextNote: 'Reveals core values and strategic mental model of disaster mitigation.',
    options: [
      {
        id: 'A',
        text: 'Rapid physical abatement of the hazard before it grows into an unstoppable structural catastrophe.',
        arabicText: 'القضاء السريع والمباشر على أصل الخطر قبل أن يتحول إلى كارثة مادية لا يمكن السيطرة عليها.',
        roleWeights: { suppressionLead: 4 },
        competencies: { physicalReadiness: 3, decisiveness: 2 },
        learningInsight: 'Hazard neutralization philosophy: stopping the fire/leak saves the building.'
      },
      {
        id: 'B',
        text: 'Immediate on-scene medical triage and bleeding control during the golden first minutes of injury.',
        arabicText: 'الإسعاف الطبي الفوري والسيطرة على النزيف خلال الدقائق الذهبية الأولى للإصابة.',
        roleWeights: { casualtyCareLead: 4 },
        competencies: { traumaComposure: 4, decisiveness: 2 },
        learningInsight: 'Clinical rescue philosophy: stopping bleeding and cardiac arrest directly saves lives.'
      },
      {
        id: 'C',
        text: 'Fast, orderly mass evacuation that gets thousands of people away from dangerous zones before smoke spreads.',
        arabicText: 'الإخلاء الجماعي المنظم والسريع الذي يبعد آلاف الأشخاص عن مناطق الخطر قبل انتشار الدخان.',
        roleWeights: { evacuationSupportLead: 4 },
        competencies: { crowdControl: 4, decisiveness: 2 },
        learningInsight: 'Egress velocity philosophy: distance and clear corridors save thousands.'
      },
      {
        id: 'D',
        text: 'Flawless coordination between Airport Control, Civil Defense, and Police to bring overwhelming outside help.',
        arabicText: 'التنسيق المحكم والذكي بين عمليات المطار والدفاع المدني والشرطة لحشد الدعم الخارجي بدقة.',
        roleWeights: { externalLiaison: 4 },
        competencies: { communicationProtocol: 4, decisiveness: 2 },
        learningInsight: 'Systemic coordination philosophy: information flow mobilizes overwhelming resources.'
      }
    ]
  },

  // 24. Immediate instinctive volunteer choice
  {
    id: 24,
    module: 'Voluntary Deployment Inclination',
    arabicModule: 'الميول التلقائية لاختيار المهام الميدانية',
    category: 'situational',
    question: 'The incident commander asks for volunteers for immediate high-tempo deployment. Which assignment do your hands reach for?',
    arabicQuestion: 'طلب قائد الحادث متطوعين لمهام فورية تتطلب استجابة سريعة. أي مهمة تجد نفسك تتقدم لها بتلقائية؟',
    contextNote: 'Direct behavioral selection of operational duty.',
    options: [
      {
        id: 'A',
        text: 'Donning heavy breathing apparatus to advance toward the hot zone with containment tools.',
        arabicText: 'ارتداء جهاز التنفس وبدلة التدخل والتقدم نحو منطقة الخطر المباشر بأدوات العزل والإخماد.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 4, decisiveness: 3 },
        learningInsight: 'Voluntary frontline hazard mitigation deployment.'
      },
      {
        id: 'B',
        text: 'Setting up the trauma stabilization post to receive, tag, and treat incoming casualties.',
        arabicText: 'تجهيز نقطة الفرز الطبي ورعاية المصابين لاستقبال الجرحى وتضميدهم وتثبيت علاماتهم الحيوية.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 4, decisiveness: 2 },
        learningInsight: 'Voluntary trauma triage and casualty stabilization deployment.'
      },
      {
        id: 'C',
        text: 'Taking charge of the main concourse to marshal hundreds of evacuees safely toward assembly points.',
        arabicText: 'تولي مسؤولية البهو الرئيسي لتوجيه وحماية مئات الركاب وإيصالهم إلى نقاط التجمع الآمنة.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 4, decisiveness: 3 },
        learningInsight: 'Voluntary crowd command and evacuation corridor deployment.'
      },
      {
        id: 'D',
        text: 'Taking the primary command radio to coordinate incoming Civil Defense fire engines and ambulances.',
        arabicText: 'استلام جهاز اللاسلكي الرئيسي للتنسيق مع آليات الدفاع المدني والإسعاف القادمة من خارج المطار.',
        roleWeights: { externalLiaison: 5 },
        competencies: { communicationProtocol: 4, decisiveness: 2 },
        learningInsight: 'Voluntary tactical communications and external agency liaison deployment.'
      }
    ]
  },

  // 25. Vision of future tactical pride
  {
    id: 25,
    module: 'Professional Identity & Long-Term Pride',
    arabicModule: 'الهوية المهنية والاعتزاز بالدور الميداني',
    category: 'temperament',
    question: 'When you envision your service with the King Salman International Airport ERT, what memory would make you proudest?',
    arabicQuestion: 'عندما تتخيل مسيرتك في فريق الاستجابة للطوارئ بمطار الملك سلمان، ما الإنجاز الذي ستفخر به أكثر في حياتك؟',
    contextNote: 'Long-term self-concept alignment and pride projection.',
    options: [
      {
        id: 'A',
        text: 'Knowing that through physical courage and equipment mastery, I stopped a dangerous hazard in its tracks.',
        arabicText: 'أنني بشجاعتي الميدانية وإتقاني للأدوات والمعدات، استطعت إيقاف خطر حقيقي وإنقاذ مرافق حيوية.',
        roleWeights: { suppressionLead: 5 },
        competencies: { physicalReadiness: 3, decisiveness: 2 },
        learningInsight: 'Pride in physical hazard defeat and technical courage.'
      },
      {
        id: 'B',
        text: 'Knowing that in someone’s most terrifying moment, my medical care and calm hands kept them alive.',
        arabicText: 'أنني في أصعب لحظات شخص متألم، كنت سبباً بيدي الهادئة ورعايتي الطبية في إنقاذ حياته.',
        roleWeights: { casualtyCareLead: 5 },
        competencies: { traumaComposure: 4, decisiveness: 2 },
        learningInsight: 'Pride in life preservation, medical intervention, and human restoration.'
      },
      {
        id: 'C',
        text: 'Knowing that when panic could have caused a disaster, my voice and leadership brought thousands to safety.',
        arabicText: 'أنني عندما كاد الهلع أن يسبب كارثة، نجحت بصوتي وقيادتي الميدانية في إيصال الآلاف لبر الأمان.',
        roleWeights: { evacuationSupportLead: 5 },
        competencies: { crowdControl: 4, decisiveness: 3 },
        learningInsight: 'Pride in crowd leadership, panic prevention, and orderly salvation.'
      },
      {
        id: 'D',
        text: 'Knowing that under intense chaos, my clear coordination and discipline connected all forces as one united shield.',
        arabicText: 'أنني وسط الفوضى والضبابية، نجحت بدقة تواصلي في توحيد جهود جميع الفرق كدرع حماية واحد.',
        roleWeights: { externalLiaison: 5 },
        competencies: { communicationProtocol: 4, decisiveness: 2 },
        learningInsight: 'Pride in unified crisis communications, clarity, and institutional bridge-building.'
      }
    ]
  }
];

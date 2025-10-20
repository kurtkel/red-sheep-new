export interface Question {
  id: number;
  section: string;
  sectionNumber: number;
  leaderText: string;
  staffText: string;
}

export const sections = [
  { number: 1, name: "Job Demands & Expectations", questions: [1, 2, 3, 4] },
  { number: 2, name: "Role Clarity & Organisational Justice", questions: [5, 6, 7, 8] },
  { number: 3, name: "Control & Autonomy", questions: [9, 10, 11] },
  { number: 4, name: "Support & Recognition", questions: [12, 13, 14, 15] },
  { number: 5, name: "Relationships & Harmful Behaviours", questions: [16, 17, 18] },
  { number: 6, name: "Ministry-Specific Factors", questions: [19, 20, 21, 22] },
  { number: 7, name: "Trauma & Emotional Demands", questions: [23, 24] },
  { number: 8, name: "Work-Life Integration", questions: [25, 26] },
  { number: 9, name: "Trust & Psychological Safety", questions: [27, 28, 29, 30] },
];

export const questions: Question[] = [
  // Section 1: Job Demands & Expectations (Questions 1-4)
  {
    id: 1,
    section: "Job Demands & Expectations",
    sectionNumber: 1,
    leaderText: "Staff in my area have a manageable workload that allows them to complete essential tasks during normal working hours.",
    staffText: "I have a manageable workload that allows me to complete essential tasks during normal working hours.",
  },
  {
    id: 2,
    section: "Job Demands & Expectations",
    sectionNumber: 1,
    leaderText: "Team members can realistically meet the expectations placed on them given their role, skills, and available resources.",
    staffText: "I can realistically meet the expectations placed on me given my role, skills, and available resources.",
  },
  {
    id: 3,
    section: "Job Demands & Expectations",
    sectionNumber: 1,
    leaderText: "Workers in my ministry area have adequate time to rest and recover between busy ministry seasons.",
    staffText: "I have adequate time to rest and recover between busy ministry seasons.",
  },
  {
    id: 4,
    section: "Job Demands & Expectations",
    sectionNumber: 1,
    leaderText: "The emotional demands of the work (e.g., pastoral care, dealing with crises) are balanced with appropriate support and recovery time.",
    staffText: "The emotional demands of my work (e.g., pastoral care, dealing with crises) are balanced with appropriate support and recovery time.",
  },

  // Section 2: Role Clarity & Organisational Justice (Questions 5-8)
  {
    id: 5,
    section: "Role Clarity & Organisational Justice",
    sectionNumber: 2,
    leaderText: "Staff members clearly understand their role, responsibilities, and what is expected of them.",
    staffText: "I clearly understand my role, responsibilities, and what is expected of me.",
  },
  {
    id: 6,
    section: "Role Clarity & Organisational Justice",
    sectionNumber: 2,
    leaderText: "When I make decisions that affect my team, I apply policies consistently and fairly.",
    staffText: "Decisions that affect me are made fairly and policies are applied consistently.",
  },
  {
    id: 7,
    section: "Role Clarity & Organisational Justice",
    sectionNumber: 2,
    leaderText: "Team members feel comfortable approaching me when they're unclear about priorities or responsibilities.",
    staffText: "I feel comfortable approaching my supervisor/leader when I'm unclear about priorities or responsibilities.",
  },
  {
    id: 8,
    section: "Role Clarity & Organisational Justice",
    sectionNumber: 2,
    leaderText: "Workers receive clear information about organisational changes that affect their work.",
    staffText: "I receive clear information about organisational changes that affect my work.",
  },

  // Section 3: Control & Autonomy (Questions 9-11)
  {
    id: 9,
    section: "Control & Autonomy",
    sectionNumber: 3,
    leaderText: "Staff have appropriate input into how they accomplish their work within their area of responsibility.",
    staffText: "I have appropriate input into how I accomplish my work within my area of responsibility.",
  },
  {
    id: 10,
    section: "Control & Autonomy",
    sectionNumber: 3,
    leaderText: "Team members have sufficient authority to make decisions necessary for their role.",
    staffText: "I have sufficient authority to make decisions necessary for my role.",
  },
  {
    id: 11,
    section: "Control & Autonomy",
    sectionNumber: 3,
    leaderText: "Workers can adapt their approach to ministry tasks when circumstances require flexibility.",
    staffText: "I can adapt my approach to ministry tasks when circumstances require flexibility.",
  },

  // Section 4: Support & Recognition (Questions 12-15)
  {
    id: 12,
    section: "Support & Recognition",
    sectionNumber: 4,
    leaderText: "I am readily available to provide guidance and support when team members face work challenges.",
    staffText: "My supervisor/leader is readily available to provide guidance and support when I face work challenges.",
  },
  {
    id: 13,
    section: "Support & Recognition",
    sectionNumber: 4,
    leaderText: "Staff receive regular, constructive feedback about their performance and contribution.",
    staffText: "I receive regular, constructive feedback about my performance and contribution.",
  },
  {
    id: 14,
    section: "Support & Recognition",
    sectionNumber: 4,
    leaderText: "I actively recognise and appreciate the efforts and achievements of my team members.",
    staffText: "My efforts and achievements are recognised and appreciated by leadership.",
  },
  {
    id: 15,
    section: "Support & Recognition",
    sectionNumber: 4,
    leaderText: "Workers have access to the resources, training, and support they need to do their work effectively.",
    staffText: "I have access to the resources, training, and support I need to do my work effectively.",
  },

  // Section 5: Relationships & Harmful Behaviours (Questions 16-18)
  {
    id: 16,
    section: "Relationships & Harmful Behaviours",
    sectionNumber: 5,
    leaderText: "I am confident that bullying, harassment, or aggressive behaviour would be reported to me if it occurred in my area.",
    staffText: "I would feel safe reporting bullying, harassment, or aggressive behaviour if I experienced or witnessed it.",
  },
  {
    id: 17,
    section: "Relationships & Harmful Behaviours",
    sectionNumber: 5,
    leaderText: "Team members treat each other with respect, even during disagreements or stressful periods.",
    staffText: "Team members treat each other with respect, even during disagreements or stressful periods.",
  },
  {
    id: 18,
    section: "Relationships & Harmful Behaviours",
    sectionNumber: 5,
    leaderText: "I model and promote healthy boundaries around work relationships and communication.",
    staffText: "Leadership models and promotes healthy boundaries around work relationships and communication.",
  },

  // Section 6: Ministry-Specific Factors (Questions 19-22)
  {
    id: 19,
    section: "Ministry-Specific Factors",
    sectionNumber: 6,
    leaderText: "Staff can be honest about doubts, questions, or struggles without fear of judgment or negative consequences.",
    staffText: "I can be honest about doubts, questions, or struggles without fear of judgment or negative consequences.",
  },
  {
    id: 20,
    section: "Ministry-Specific Factors",
    sectionNumber: 6,
    leaderText: "The theological or ministry expectations in my area allow for appropriate personal conviction and conscience.",
    staffText: "The theological or ministry expectations in my area allow for appropriate personal conviction and conscience.",
  },
  {
    id: 21,
    section: "Ministry-Specific Factors",
    sectionNumber: 6,
    leaderText: "Team members can raise concerns about ministry practices or decisions without fear of retaliation.",
    staffText: "I can raise concerns about ministry practices or decisions without fear of retaliation.",
  },
  {
    id: 22,
    section: "Ministry-Specific Factors",
    sectionNumber: 6,
    leaderText: "I create space for staff to acknowledge when the gap between ministry ideals and reality causes stress or discouragement.",
    staffText: "There is space to acknowledge when the gap between ministry ideals and reality causes stress or discouragement.",
  },

  // Section 7: Trauma & Emotional Demands (Questions 23-24)
  {
    id: 23,
    section: "Trauma & Emotional Demands",
    sectionNumber: 7,
    leaderText: "Workers who are exposed to traumatic situations or distressing pastoral care receive adequate debriefing and support.",
    staffText: "When I'm exposed to traumatic situations or distressing pastoral care, I receive adequate debriefing and support.",
  },
  {
    id: 24,
    section: "Trauma & Emotional Demands",
    sectionNumber: 7,
    leaderText: "Staff feel able to set appropriate boundaries with people who are demanding, aggressive, or have complex needs.",
    staffText: "I feel able to set appropriate boundaries with people who are demanding, aggressive, or have complex needs.",
  },

  // Section 8: Work-Life Integration (Questions 25-26)
  {
    id: 25,
    section: "Work-Life Integration",
    sectionNumber: 8,
    leaderText: "Team members can attend to important family commitments without guilt or negative consequences.",
    staffText: "I can attend to important family commitments without guilt or negative consequences.",
  },
  {
    id: 26,
    section: "Work-Life Integration",
    sectionNumber: 8,
    leaderText: "The culture in my area supports staff taking their entitled leave and having genuine time off.",
    staffText: "The culture in my workplace supports me taking my entitled leave and having genuine time off.",
  },

  // Section 9: Trust & Psychological Safety (Questions 27-30)
  {
    id: 27,
    section: "Trust & Psychological Safety",
    sectionNumber: 9,
    leaderText: "Staff feel comfortable telling me when they are struggling, overwhelmed, or need help.",
    staffText: "I feel comfortable telling my supervisor/leader when I am struggling, overwhelmed, or need help.",
  },
  {
    id: 28,
    section: "Trust & Psychological Safety",
    sectionNumber: 9,
    leaderText: "Team members can make mistakes or admit limitations without fear of harsh judgment or loss of standing.",
    staffText: "I can make mistakes or admit limitations without fear of harsh judgment or loss of standing.",
  },
  {
    id: 29,
    section: "Trust & Psychological Safety",
    sectionNumber: 9,
    leaderText: "I believe workers in my area would describe our ministry environment as psychologically safe.",
    staffText: "I would describe my ministry environment as psychologically safe.",
  },
  {
    id: 30,
    section: "Trust & Psychological Safety",
    sectionNumber: 9,
    leaderText: "If anonymous feedback revealed significant concerns I was unaware of, I would be surprised.",
    staffText: "I believe my supervisor/leader is aware of the main sources of workplace stress that I experience.",
  },
];

export const scaleLabels = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Somewhat Disagree" },
  { value: 4, label: "Neither Agree nor Disagree" },
  { value: 5, label: "Somewhat Agree" },
  { value: 6, label: "Agree" },
  { value: 7, label: "Strongly Agree" },
];

export type RespondentRole = "leader" | "staff";

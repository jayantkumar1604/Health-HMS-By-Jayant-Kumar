const bloodGroups = [
    { value: "A_POSITIVE", label: "A+" },
    { value: "A_NEGATIVE", label: "A-" },
    { value: "B_POSITIVE", label: "B+" },
    { value: "B_NEGATIVE", label: "B-" },
    { value: "AB_POSITIVE", label: "AB+" },
    { value: "AB_NEGATIVE", label: "AB-" },
    { value: "O_POSITIVE", label: "O+" },
    { value: "O_NEGATIVE", label: "O-" }
];

const bloodGroup: Record<string, string> = {
    A_POSITIVE: "A+",
    A_NEGATIVE: "A-",
    B_POSITIVE: "B+",
    B_NEGATIVE: "B-",
    AB_POSITIVE: "AB+",
    AB_NEGATIVE: "AB-",
    O_POSITIVE: "O+",
    O_NEGATIVE: "O-"
};
const doctorSpecializations = ["Cardiologist","Dermatologist","Neurologist","Orthopedic","Pediatrician","Psychiatrist","Gynecologist","Oncologist","Radiologist","General Physician","ENT Specialist","Urologist","Gastroenterologist","Pulmonologist","Endocrinologist","Nephrologist"];
const doctorDepartments = ["Cardiology","Dermatology","Neurology","Orthopedics","Pediatrics","Psychiatry","Gynecology","Oncology","Radiology","General Medicine","ENT","Urology","Gastroenterology","Pulmonology","Endocrinology","Nephrology","Ophthalmology","Anesthesiology","Pathology","Emergency Medicine"];

const appointmentReasons= [
    "General consultation",
    "Not feeling well",
    "Routine check-up",
    "Follow-up visit",
    "New symptoms",
    "Chronic condition review",
    "Test results discussion",
    "Lab tests / diagnostics",
    "Medication review",
    "Prescription refill",
    "Pain or discomfort",
    "Infection or illness",
    "Injury or accident",
    "Preventive care",
    "Vaccination",
    "Health advice",
    "Second opinion",
    "Emergency concern",
    "Referral consultation",
    "Post-surgery follow-up",
    "Pre-surgery consultation",
    "Health screening",
    "Lifestyle consultation",
    "Diet and nutrition advice",
    "Sleep issues",
    "Stress or anxiety",
    "Physical examination",
    "Medical certificate",
    "Fitness check",
    "Allergy issues",
    "Long-term illness management",
    "Diagnostic review",
    "Therapy session",
    "Rehabilitation follow-up",
    "Other"
];

const symptoms = [
    "Fever",
    "Cough",
    "Headache",
    "Body Pain",
    "Fatigue",
    "Sore Throat",
    "Runny Nose",
    "Shortness of Breath",
    "Chest Pain",
    "Nausea",
    "Vomiting",
    "Diarrhea",
    "Dizziness",
    "Loss of Appetite",
    "Chills",
    "Sweating",
    "Muscle Weakness",
    "Back Pain",
    "Joint Pain",
    "Abdominal Pain"
];

const tests = [
    "Blood Test",
    "X-Ray",
    "MRI Scan",
    "CT Scan",
    "Urine Test",
    "ECG",
    "Ultrasound",
    "Liver Function Test",
    "Kidney Function Test",
    "Thyroid Test",
    "Blood Sugar Test",
    "Cholesterol Test"
];
const dosageFrequencies = [
    "1-0-0",  // Morning only
    "0-1-0",  // Afternoon only
    "0-0-1",  // Night only
    "1-0-1",  // Morning + Night
    "1-1-0",  // Morning + Afternoon
    "0-1-1",  // Afternoon + Night
    "1-1-1",  // Morning + Afternoon + Night
    "2-0-2",  // Two tabs Morning + Night
    "1-0-2",  // One Morning, Two Night
    "2-1-2"   // Strong dosage
];
export { bloodGroups , doctorSpecializations, doctorDepartments, bloodGroup, appointmentReasons,symptoms,tests,dosageFrequencies};
import { IRegisterPatientParams } from "@/models/patient";
import { IValidationMessages } from "@/models/validation";

export const UserFormValidationMessages: IValidationMessages = {
  name: {
    min: "Name must be atleast 2 characters.",
    max: "Name must be at most 50 characters.",
  },
  email: {
    invalid: "Invalid email address.",
  },
  phone: {
    invalid: "Invalid phone number.",
  },
};

export const RegisterFormValidationMessages: IValidationMessages = {
  address: {
    min: "Address must be atleast 5 characters.",
    max: "Address must be at most 500 characters.",
  },
  occupation: {
    min: "Occupation must be atleast 2 characters.",
    max: "Occupation must be at most 500 characters.",
  },
  emergencyContactName: {
    min: "Contact name must be atleast 2 characters.",
    max: "Contact name be at most 500 characters.",
  },
  primaryPhysician: {
    min: "Select at least one doctor.",
  },
  emergencyContactNumber: {
    invalid: "Invalid phone number.",
  },
  insuranceProvider: {
    min: "Insurance name must be at least 2 characters.",
    max: "Insurance name must be at most 50 characters.",
  },
  insurancePolicyNumber: {
    min: "Policy number must be at least 2 characters.",
    max: "Policy number must be at most 50 characters.",
  },
  treatmentConsent: {
    required: "You must consent to treatment in order to proceed.",
  },
  disclosureConsent: {
    required: "You must consent to disclosure in order to proceed.",
  },
  privacyConsent: {
    required: "You must consent to privacy in order to proceed.",
  },
};

export const AppointmentFormValidationMessages: IValidationMessages = {
  primaryPhysician: {
    min: "Select at least one doctor.",
  },
  reason: {
    min: "Reason must be atleast 5 characters.",
    max: "Reason must be at most 500 characters.",
  },
};

export const GenderOptions: string[] = ["Male", "Female", "Other"];

export const Doctors: { image: string; name: string }[] = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const IdentificationTypes: string[] = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Army ID Card",
  "Aadhaar Card",
  "Passport",
  "PAN Card",
  "Student ID Card",
  "Voter ID Card",
];

export const RegisterFormDefaultValues: IRegisterPatientParams = {
  userId: "",
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male",
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export enum Status {
  pending = "pending",
  scheduled = "scheduled",
  cancelled = "cancelled",
}

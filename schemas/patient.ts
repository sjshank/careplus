import {
  RegisterFormDefaultValues,
  RegisterFormValidationMessages,
  UserFormValidationMessages,
} from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const {
  name: { min: nameMinChar, max: nameMaxChar },
  email: { invalid: emailInvalid },
  phone: { invalid: phoneInvalid },
} = UserFormValidationMessages;

const {
  address: { min: addressMin, max: addressMax },
  occupation: { min: occupationMin, max: occupationMax },
  emergencyContactName: {
    min: emergencyContactNameMin,
    max: emergencyContactNameMax,
  },
  primaryPhysician: { min: primaryPhysicianMin },
  emergencyContactNumber: { invalid: emergencyContactNumberInvalid },
  insuranceProvider: { min: insuranceProviderMin, max: insuranceProviderMax },
  insurancePolicyNumber: {
    min: insurancePolicyNumberMin,
    max: insurancePolicyNumberMax,
  },
  treatmentConsent: { required: treatmentConsentRequired },
  disclosureConsent: { required: disclosureConsentRequired },
  privacyConsent: { required: privacyConsentRequired },
} = RegisterFormValidationMessages;

export const registerPatientFormSchema = z.object({
  name: z.string().min(2, nameMinChar).max(50, nameMaxChar),
  email: z.string().email(emailInvalid),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), phoneInvalid),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z.string().min(5, addressMin).max(500, addressMax),
  occupation: z.string().min(2, occupationMin).max(500, occupationMax),
  emergencyContactName: z
    .string()
    .min(2, emergencyContactNameMin)
    .max(50, emergencyContactNameMax),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      emergencyContactNumberInvalid
    ),
  primaryPhysician: z.string().min(2, primaryPhysicianMin),
  insuranceProvider: z
    .string()
    .min(2, insuranceProviderMin)
    .max(50, insuranceProviderMax),
  insurancePolicyNumber: z
    .string()
    .min(2, insurancePolicyNumberMin)
    .max(50, insurancePolicyNumberMax),
  allergies: z.string().optional().default(""),
  currentMedication: z.string().optional().default(""),
  familyMedicalHistory: z.string().optional().default(""),
  pastMedicalHistory: z.string().optional().default(""),
  identificationType: z.string().optional().default(""),
  identificationNumber: z.string().optional().default(""),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: treatmentConsentRequired,
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: disclosureConsentRequired,
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: privacyConsentRequired,
    }),
});

export const useRegisterPatientForm = () => {
  const form = useForm<z.infer<typeof registerPatientFormSchema>>({
    resolver: zodResolver(registerPatientFormSchema),
    defaultValues: {
      ...RegisterFormDefaultValues,
    },
  });

  return { form };
};

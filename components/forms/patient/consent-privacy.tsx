import React from "react";
import { CustomFormField, FormFieldType } from "../customFormField";

export const ConsentPrivacy = (form: any) => {
  return (
    <>
      <div className="space-y-4">
        <h3 className="sub-header">Consent and Privacy</h3>
      </div>

      <CustomFormField
        form={form}
        fieldType={FormFieldType.CHECKBOX}
        name="treatmentConsent"
        label="I consent to receive treatment for my health condition."
      />
      <CustomFormField
        form={form}
        fieldType={FormFieldType.CHECKBOX}
        name="disclosureConsent"
        label="I consent to the use and disclosure of my health information for treatment purpose only."
      />
      <CustomFormField
        form={form}
        fieldType={FormFieldType.CHECKBOX}
        name="privacyConsent"
        label="I acknowledge that I have reviewed and agree to the privacy policy."
      />
    </>
  );
};

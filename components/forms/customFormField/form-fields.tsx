import React from "react";
import {
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import "react-phone-number-input/style.css";
import {
  FormFieldType,
  DatePickerField,
  TextField,
  SelectField,
  PhoneInputField,
  TextAreaField,
  CheckboxField,
} from ".";

export type CustomFormFieldProps = {
  form: UseFormReturn<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  inputType?: string;
  renderSkeleton?: (
    field: ControllerRenderProps<FieldValues, string>
  ) => React.ReactNode;
  description?: string;
  minDate?: Date;
  maxDate?: Date;
};

const RenderField = ({
  field,
  formFieldProps,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  formFieldProps: CustomFormFieldProps;
}): React.ReactNode => {
  const {
    fieldType,
    renderSkeleton,
    dateFormat,
    showTimeSelect,
    children,
    placeholder,
    disabled,
    minDate,
    maxDate,
  } = formFieldProps;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return <TextField field={field} formFieldProps={formFieldProps} />;
    case FormFieldType.PHONE_INPUT:
      return <PhoneInputField field={field} />;
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.DATE_PICKER:
      return (
        <DatePickerField
          field={field}
          dateFormat={dateFormat}
          showTimeSelect={showTimeSelect}
          maxDate={maxDate}
          minDate={minDate}
        />
      );
    case FormFieldType.SELECT:
      return (
        <SelectField field={field} formFieldProps={formFieldProps}>
          {children}
        </SelectField>
      );
    case FormFieldType.TEXTAREA:
      return (
        <TextAreaField
          disabled={disabled!}
          field={field}
          placeholder={placeholder!}
        />
      );
    case FormFieldType.CHECKBOX:
      return <CheckboxField field={field} formFieldProps={formFieldProps} />;
    default:
      break;
  }
};

export const CustomFormField = (props: CustomFormFieldProps) => {
  const { form, label, name = "fieldName", fieldType, description } = props;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} formFieldProps={props} />
          {description && (
            <FormDescription className="text-xs text-slate-300">
              {description}
            </FormDescription>
          )}
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

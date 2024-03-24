export interface InputProps {
  name: string;
  isRequired: boolean;
  type: 'input' | 'textarea';
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  validationContent: string;
}

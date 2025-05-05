export interface SessionDataType {
  username: string;
  session_key?: string;
  teams?: string[];
  account?: string;
  user_id?: string;
  success?: boolean;
  password: string;
}

export interface AuthType {
  username: string;
  password: string;
  isRememberMe: boolean;
}

// For Extration Module
export interface FieldValue {
  value: string;
  form_id: string; // Replace with the actual type of form_id
  name: string;
  retry_validation_count: number;
  Text?: string; 
  validated: null | boolean;
  user_behaviour: {
    time_in_field: number;
    total_visits: number;
    retried_words: boolean;
    last_exit_method: string;
    any_edit: boolean;
    selected_from_dropdown: boolean;
    selected_first_dropdown: boolean;
  };
}
export interface HighlightPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

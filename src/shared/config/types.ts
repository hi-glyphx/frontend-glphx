// define interface for String object
export interface StringObjectTypes {
  [key: string]: string;
}

// define interface for Nav data
export interface NavDataTypes {
  name: string;
  path: string;
}

export interface SideBarDataTypes {
  label: string;
  Icon: string;
  to: string;
  children?: {
    label: string;
    Icon: string;
    to: string;
  }[];
}

export interface UserDataTypes {
  item: string;
  size: string;
  id: Number;
  type?: string;
  error?: boolean;
  status?: {
    item?: string;
    size?: string;
    id?: Number;
    fileName: String;
    fileURL?: String;
    project?: {}[];
    alias?: {}[];
  }[];
  project?: {}[];
  alias?: {}[];
}

export interface ProjectDataTypes {
  name?: string;
  id?: Number;
}

export const selecteProjectData: ProjectDataTypes[] = [
  {
    id: 3,
    name: "Info Template",
  },
  {
    id: 1,
    name: "Invoice 1",
  },

  {
    id: 12,
    name: "Health Insurance ",
  },
  {
    id: 11,
    name: "Car Insurance",
  },
  {
    id: 10,
    name: "Insurance",
  },

  {
    id: 11,
    name: "Template Insurance",
  },
];

export const options: string[] = [
  "Info Template",
  "Invoice 1",
  "Health Insurance ",
  "Car Insurance ",
  "Insurance ",
  "Template Insurance ",
];

export interface CurrenciesTypes {
  value: string;
  label: string;
}

export const currencies: CurrenciesTypes[] = [
  {
    value: "document",
    label: "Document",
  },
  {
    value: "workflow",
    label: "workflow",
  },
  {
    value: "system",
    label: "system",
  },
];
export interface HorizontalLayoutProps {
  hidden?: boolean;
  children: React.ReactNode;
  settings?: any;
  saveSettings?: any;
  contentHeightFixed?: boolean;
  horizontalLayoutProps?: {
    navMenu?: {
      navItems?: any;
      sx?: any;
      content?: any;
    };
  };
  horizontalNavItems?: { path: string }[];
}
export interface UserProfile {
  name: string;
  userId: number;
}

export type HandleOpen = () => void;
export type handleClose = () => void;

export interface TableColumn {
  Header: string;
  accessor?: string;
  sort?: string | boolean;
  Cell?: (column: any) => JSX.Element;
}

export interface DateFiler {
  startDate: string;
  endDate: string;
  label: string;
}

interface ScannedValueCharacter {
  Text: string;
  AlternateText: string[];
  Confidence: number;
  AlternateConfidence: number[];
  NumberResults: number;
  Area: string;
  IsCritical: boolean;
  Position: {
    from_page: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    from_field: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    from_line: {
      x: number;
      y: number;
      width: number;
      height: number;
    } | null;
  };
  resized_area: string;
}

interface ScannedValueTextline {
  Text: string;
  Confidence: number;
  NumberCharacters: number;
  Character: ScannedValueCharacter[];
  Position: {
    from_page: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    from_field: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    from_line: null;
  };
}

interface ScannedValueLocation {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ScannedValue {
  confidence: number;
  location: ScannedValueLocation;
  field_type: string;
  number_of_textline: number;
  textline: ScannedValueTextline[];
  threshold_confidence: number;
  do_multi_verification: boolean;
  page: string;
  title: string;
  num_combs: number;
  num_lines: number;
  critical: boolean;
  dictionary: string;
  regex: string;
  regex_message: string;
  do_validation: boolean;
  validation_max_retry: number;
  validate_on_change: boolean;
  jump_to_critical: boolean;
  show_similar_values: boolean;
  autocomplete_dictionary: null;
  autocomplete_type: null;
  resized_location: ScannedValueLocation;
  do_verification: boolean;
}

interface Result {
  NCB: {
    scanned_value: ScannedValue;
    value: [string[]];
    positions: {
      area: ScannedValueLocation;
      words: {
        characters: ScannedValueCharacter[];
        area: ScannedValueLocation;
      }[];
    }[];
    absolute_positions: {
      area: ScannedValueLocation;
      words: {
        characters: ScannedValueCharacter[];
        area: ScannedValueLocation;
      }[];
    }[];
    tokenizer: string;
    image_base64: string;
    template_id: string;
    template_name: string;
    form_id: null;
    page_id: string;
    page_index: number;
    page: string;
    verified_value: {
      field_values: {
        value: string;
        user_id: string;
        modified_time: number;
      }[];
      value_type: string;
    };
    last_updated: string;
    verify: boolean;
    preverification_history: {};
    validation_history: any[];
    validated: null;
    blank: boolean;
    final_result: string;
    padding: {
      left: number;
      top: number;
      right: number;
      bottom: number;
    };
    force_single_line_image: boolean;
    beagle_value: {
      confidence: number;
      location: ScannedValueLocation;
      field_type: string;
      number_of_textline: number;
      textline: ScannedValueTextline[];
      threshold_confidence: number;
    };
    critical_lines: any[];
    autocomplete_dictionary: null;
    autocomplete_type: null;
    min_length: number;
    formatter: string;
    formatter_kwargs: {};
    mandatory: boolean;
    dependent_fields: any[];
  };
}

export interface TextFieldsResultItem {
  result: Result;
  type: string;
  field: string;
  options: {};
  form_id: string;
  autocomplete_dictionary: null;
  autocomplete_type: null;
}

// Example usage:

//Case Module Data type

interface Meta {
  total_pages: number;
  current_page: string;
  verification_count: number;
  classification_count: number;
  total_cases: number;
}

interface CaseListData {
  case_id: string;
  case_num: string;
  team_id: string;
  team: string;
  documents: any[]; // You can specify the actual type of "documents" if you have that information
  created: string;
  completed: string | null;
  processed: boolean;
  template: string;
  is_processing: boolean;
}
export interface CaseListDataOBJ {
  meta: Meta;
  data: CaseListData[];
}

export interface CaseDeailData {
  meta: Record<string, any>;
  data: {
    case_id: string;
    case_num: string;
    team_id: string;
    team: string;
    created: string;
    flags: {
      redis_error: boolean;
    };
    status: boolean;
    template_id: string;
    is_processing: boolean;
    completed: null | string;
    available_aliases: string[];
    documents: {
      form_num?: string;
      alias: string;
      processed: boolean;
      dynamic: boolean;
      form_id: string;
      has_batch: "No" | "Yes"; // Assuming it's either "No" or "Yes"
    }[];
    others: {
      jobs: any[]; // You can define a specific type for jobs if needed
      verification_batches: {
        Ready: any[]; // Define a specific type if needed
        Sent: any[]; // Define a specific type if needed
        Received: any[]; // Define a specific type if needed
      };
      classification_batches: {
        Ready: any[]; // Define a specific type if needed
        Sent: any[]; // Define a specific type if needed
        Received: any[]; // Define a specific type if needed
      };
    };
  };
}

interface GetAllAliasListObj {
  id: string;
  name: string;
  alias: string;
}

export interface GetAllAliasList {
  success: boolean;
  templates: GetAllAliasListObj[];
}

interface getAllProjectsObj {
  name: string;
  id: string;
}

export interface GetAllProjects {
  data: getAllProjectsObj[];
  meta: Record<string, any>;
}

interface KeyValuePair {
  key?: string;
  value?: string;
}

interface ValueObject {
  keyValuePairs?: KeyValuePair[];
}

export interface CaseFlagsObject {
  id?: string;
  value?: ValueObject;
}

export interface ContextMenuType {
  mouseX: number;
  mouseY: number;
}
export interface FileItem {
  item: string;
  type: string;
  size: string;
  status?: FileItem[];
  fileName?: string;
  id?: string;
}

export interface FileOrFolder {
  item: string;
  type: 'file' | 'folder'; // Assuming the type can only be 'file' or 'folder'
  size: string;
  fileName: string;
  id: string;
}

//Extraction module data type

interface ExtractionistItem {
  document: string;
  resource_uri: [string, string[]];
  expires: string;
  case: string;
  created: string;
  status: string;
  batch_id: string;
}

interface ExtractionistMeta {
  offset: number;
  limit: number;
  total_count: number;
  total_pages: number;
  total_items: number;
  current_page: string;
  total_batches_ready: number;
  total_batches_pending: number;
}

export interface ExtractionistData {
  items: ExtractionistItem[];
  meta: ExtractionistMeta;
}


export interface ExtractionVerify {
  meta: {
    count: number;
    batch_id: string;
    manual: boolean;
    case_num: string;
    page_ids: string[];
    document_link: string;
    type: string;
  };
  data: {
    [key: number]: {
      result: {
        BodyType: {
          scanned_value: {
            confidence: number;
            location: {
              x: number;
              y: number;
              width: number;
              height: number;
            };
            field_type: string;
            number_of_textline: number;
            textline: any[];
            threshold_confidence: number;
            page: string;
            title: string;
            num_combs: number;
            num_lines: number;
            critical: boolean;
            dictionary: string;
            regex: string;
            regex_message: string;
            do_validation: boolean;
            validation_max_retry: number;
            validate_on_change: boolean;
            jump_to_critical: boolean;
            show_similar_values: boolean;
            autocomplete_dictionary: null;
            autocomplete_type: null;
            resized_location: {
              x: number;
              y: number;
              width: number;
              height: number;
            };
            do_verification: boolean;
          };
          value: any[];
          positions: any[];
          absolute_positions: any[];
          tokenizer: string;
          image_base64: string;
          template_id: string;
          template_name: string;
          form_id: null;
          page_id: string;
          page_index: number;
          page: string;
          verified_value: {
            field_values: {
              value: string;
              user_id: string;
              modified_time: number;
            }[];
            value_type: string;
          };
          last_updated: string;
          verify: boolean;
          preverification_history: any;
          validation_history: any[];
          validated: null;
          blank: boolean;
          final_result: string;
          padding: {
            left: number;
            top: number;
            right: number;
            bottom: number;
          };
          force_single_line_image: boolean;
          beagle_value: {
            confidence: number;
            location: {
              x: number;
              y: number;
              width: number;
              height: number;
            };
            field_type: string;
            number_of_textline: number;
            textline: any[];
            threshold_confidence: number;
          };
          critical_lines: any[];
          autocomplete_dictionary: null;
          autocomplete_type: null;
          min_length: number;
          formatter: string;
          formatter_kwargs: any;
          mandatory: boolean;
          dependent_fields: any[];
        };
      };
      type: string;
      field: string;
      options: any;
      form_id: string;
      autocomplete_dictionary: null;
      autocomplete_type: null;
    };
  };
  field_order: [string, string][];
}


 
export interface CheckboxesDetailData {
  meta: {
    count: number;
    batch_id: string;
  };
  data: Record<string, any>; // Here, you can use 'Record<string, any>' to represent an empty object with string keys and any values.
}


/** User Types */

/** Select Team */
interface SelectTeamItem {
  name: string;
  id: string;
}
interface SelectTeamMeta {
  offset: number;
  limit: number;
  total_count: number;
  success: boolean;
}
export interface SelectTeamData {
  items: SelectTeamItem[];
  meta: SelectTeamMeta;
}

/** Select Group */
interface SelectGroupItem {
  name: string;
  resource_uri: ["edit_group", string[]];
  default_url: string;
  id: string;
}
interface SelectGroupMeta {
  offset: number;
  limit: number;
  total_count: number;
}
export interface SelectGroupsData {
  items: SelectGroupItem[];
  meta: SelectGroupMeta;
}

/** User List */
interface ListGroups {
  [key: number]: string;
}
interface ListTeams {
  [key: number]: string;
}
interface UserListItem {
  email: string;
  resource_uri: ["specific_user_inventory", string[]];
  groups: ListGroups;
  id: string;
  teams: ListTeams;
  is_active: boolean;
  account: string;
  username: string;
}
interface UserListMeta {
  offset: number;
  limit: number;
  total_count: number;
  success: boolean;
}
export interface UserListData {
  items: UserListItem[];
  meta: UserListMeta;
}

/** Report Module Types */

interface BasicReportMeta {
  total_pages: number;
  current_page: number;
  verification_count: number;
  completed_count: number;
  total_forms: number;
}

interface BasicReportItem {
  case_id: string;
  case_num: string;
  created: string;
  completed: string | null;
  template: string;
  classification: string | null;
  has_classification_result: boolean;
  extraction: string | null;
  has_extraction_result: boolean;
}

export interface BasicReportListData {
  meta: BasicReportMeta;
  data: BasicReportItem[];
}







/** Classifications Reports List */
interface ClassificationsReportsListMeta {
  total_pages: number;
  current_page: number;
  total_reports: number;
}
interface ClassificationsReportsListReport {
  report_id: string;
  case_id: string;
  document_name: string;
  page_index: number;
  scanned_value: string;
  verified_value: string;
  qced_value: string | null;
  confidence: number;
  do_classification: boolean;
  edited: boolean;
  is_accurate: boolean;
  case_num: string;
}
export interface ClassificationsReportsListData {
  meta: ClassificationsReportsListMeta;
  data: ClassificationsReportsListReport[];
}

/** Extractions Reports List */
interface ExtractionsReportsListReport {
  report_id: string;
  case_id: string;
  document_name: string;
  page_index: number;
  field_name: string;
  scanned_value: string;
  verified_value: string;
  qced_value: string | null;
  confidence: number;
  case_num: string;
  do_verification: boolean;
  edited: boolean;
  is_accurate: boolean;
  form_id: string;
  page_id: string;
  location: Location;
}
interface ExtractionsReportslistMeta {
  total_pages: number;
  current_page: number;
  total_reports: number;
}

export interface ExtractionsReportslistData {
  meta: ExtractionsReportslistMeta;
  data: ExtractionsReportsListReport[];
}

/** Processing Report List */
interface ProcessingReportList {
  report_id: string;
  created: string;
  completed: string;
  document_name: string;
  case_id: string;
  form_id: string;
  status: string;
  alias: string;
  pages_classified: number;
  pages_recognised: number;
  case_num: string;
}
interface ProcessingReportListMeta {
  total_pages: number;
  current_page: number;
  total_reports: number;
}
export interface ProcessingReportListData {
  meta: ProcessingReportListMeta;
  data: ProcessingReportList[];
}

/** Validation Report List */
interface ValidationReport {
  report_id: string;
  case_id: string;
  document_name_1: string;
  document_name_2: string;
  field_name_1: string;
  field_value_1: string;
  field_name_2: string;
  field_value_2: string;
  validation_rule: string;
  validation_result: boolean;
  case_num: string;
}

interface ValidationReportListMeta {
  total_pages: number;
  current_page: number;
  total_reports: number;
}

export interface ValidationReportListData {
  meta: ValidationReportListMeta;
  data: ValidationReport[];
}


/** Group Module */
interface GroupList {
  name: string;
  resource_uri: [string, string[]];
  default_url: string;
  id: string;
}
interface GroupslistMeta {
  offset: number;
  limit: number;
  total_count: number;
}
export interface GroupslistData {
  items: GroupList[];
  meta: GroupslistMeta;
}



export interface Dimensions {
  height: string | null;
  width: string | null;
}



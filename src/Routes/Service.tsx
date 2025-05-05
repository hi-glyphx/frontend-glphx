import { BASE_URL, DELETE, GET, POST, PUT } from "../utils/HTTP";


export const LogInAPI = (data) => POST(`${BASE_URL}/login/`, data);

export const ForgotPasswordAPI = (data) =>
  GET(`${BASE_URL}/forgotpassword/?username=${data?.email}`);
export const LogOutAPI = (data) => POST(`${BASE_URL}/logout/`, data);



export const OTPVerifyAPI = (data) =>
  POST(
    `${BASE_URL}/forgotpassword/?username=${data.email}&token=${data?.token}`
  );


export const ClassificationAPI = (data) =>
  GET(`${BASE_URL}/classification/${data}`);
export const ClassifyAPI = () => GET(`${BASE_URL}/classify/`);
export const DeleteClassificationBatchAPI = (data) =>
  DELETE(`${BASE_URL}/classification/`, data);
export const updateClassificationBatchAPI = (data) =>
  PUT(`${BASE_URL}/classification/`, data);
export const getImageAPI = (data) => GET(`${BASE_URL}/media/pages/${data}`);
export const SaveClassifyAPI = (data) =>
  POST(`${BASE_URL}/classify/${data?.id}/`, data);


export const VerificationAPI = (data) =>
  GET(`${BASE_URL}/verification/${data}`);

export const ExpiresVerificationAPI = (data) =>
  PUT(`${BASE_URL}/verification/`, data);

export const VerifyApi = (data) => GET(`${BASE_URL}/verify/${data}`);

export const DeleteExtractionBatchAPI = (data) =>
  DELETE(`${BASE_URL}/verification/`, data);

export const DeleteVerifyExtractionBatchAPI = (data) =>
  DELETE(`${BASE_URL}/verify/${data}`);

export const DeleteclassificationBatchAPI = (data) =>
  DELETE(`${BASE_URL}/classify/${data}`);

export const GetCheckboxesAPI = () => GET(`${BASE_URL}/pre/checkboxes/`);
export const SaveCheckboxesAPI = (data) =>
  POST(`${BASE_URL}/pre/checkboxes/`, data);



export const CaseListAPI = (data) => GET(`${BASE_URL}/case/${data}`);

export const resetPasswordAPI = (data) =>
  POST(
    `${BASE_URL}/resetpassword/?uid=${data.uid}&token=${data.token}`,
    data.values
  );

export const CaseDetailAPI = (data) => GET(`${BASE_URL}/case/${data}/`);
export const deleteCaseAPI = (data) => DELETE(`${BASE_URL}/case/${data}/`);

export const CaseDownloadReqestApi = (data) =>
  POST(`${BASE_URL}/case/download/`, data);
export const CaseDownloadApi = (data) =>
  GET(`${BASE_URL}/media/cases/${data?.case_id}/content/`, data);
export const FormDownloadApi = (data) =>
  GET(`${BASE_URL}/media/forms/${data?.form_id}/content/`);
export const deleteFormCaseApi = (data) => DELETE(`${BASE_URL}/forms/${data}/`);


export const UserListAPI = (data) => GET(`${BASE_URL}/users/${data}`);
export const deleteUserAPI = (data) => DELETE(`${BASE_URL}/users/${data}/`);
export const UpdateUserAPI = (data) =>
  PUT(`${BASE_URL}/users/${data.id}/`, data.data);


export const createUserApi = (data) => POST(`${BASE_URL}/users/create/`, data);
export const SelectTeamAPI = (data) => GET(`${BASE_URL}/teams/`);
export const SelectGroupsAPI = (data) => GET(`${BASE_URL}/groups/?format=json`);


export const getUserApi = (data) => GET(`${BASE_URL}/users/${data}`);


export const getAllProjectsApi = (data) => GET(`${BASE_URL}/casetemplates/`);
export const getAllAliasApi = (data) =>
  GET(`${BASE_URL}/casetemplates/${data}/templates/`);
export const createCaseApi = (data) => POST(`${BASE_URL}/case/`, data);


export const createFormApi = (data) =>
  POST(`${BASE_URL}/case/${data.id}/forms/`, data.formData);

export const MarkAsProcessedAPI = (data) =>
  PUT(`${BASE_URL}/case/${data}/`, { processed: true });

export const MarkAsProcessedformAPI = (data) =>
  PUT(`${BASE_URL}/forms/${data}/`, { processed: true });
export const caseAbortProcessingAPI = (data) =>
  PUT(`${BASE_URL}/case/actions/?cancel=yes/`, data);
export const caseAbortProcessingFormAPI = (data) =>
  PUT(`${BASE_URL}/forms/actions/?cancel=yes/`, data);
export const caseFormReprocessApi = (data) =>
  POST(`${BASE_URL}/forms/reprocess/`, data);
export const caseReprocessApi = (data) =>
  POST(`${BASE_URL}/case/reprocess/`, data);

export const VerificationResultsAPI = (data) =>
  GET(`${BASE_URL}/forms/${data}/verification-results/`);

export const VerificationSaveChangesAPI = (data) =>
  POST(`${BASE_URL}/verify/${data?.meta?.batch_id}/`, data);
export const DynamicFieldValidationAPI = (data) =>
  POST(`${BASE_URL}/forms/validate/`, data);



export const ClassificationsReportsApi = (data) =>
  GET(`${BASE_URL}/reports/classifications/${data}`);
export const GetClassificationBatchesAPI = () => GET(`${BASE_URL}/batches/`);
export const ClassificationReportDetailApi = () =>
  GET(`${BASE_URL}/reports/classifications/6504a0b0fae20a07c2c5b7f7/`);

export const ClassificationReportUpdateApi = (data) =>
  PUT(`${BASE_URL}/reports/classifications/6504a0a6fae20a07c2c5b7f5/`, data);

export const ClassificationReportDeleteApi = (data) =>
  DELETE(`${BASE_URL}/reports/classifications/6504a0a6fae20a07c2c5b7f5/`);

export const ProcessingReportListApi = (data) =>
  GET(`${BASE_URL}/reports/processing/${data}`);
export const ExtractionsReportsApi = (data) =>
  GET(`${BASE_URL}/reports/extractions/${data}`);
export const ProcessingReportDetailApi = () =>
  GET(`${BASE_URL}/reports/processing/6504530bfae20a07c2c5b7f3/`);
export const ProcessingReportUpdateApi = (data) =>
  PUT(`${BASE_URL}/reports/processing/6504530bfae20a07c2c5b7f3/`, data);
export const ProcessingReportDeleteApi = (data) =>
  DELETE(`${BASE_URL}/reports/processing/6504530bfae20a07c2c5b7f3/`, data);
export const ValidationReportListApi = (data) =>
  GET(`${BASE_URL}/reports/validations/${data}`);
export const ValidationReportUpdateApi = (data) =>
  PUT(`${BASE_URL}/reports/validations/650452e6fae20a07c2c5b7f2/`, data);
export const ValidationReportDeleteApi = () =>
  DELETE(`${BASE_URL}/reports/validations/650452e6fae20a07c2c5b7f2/`);

export const ExtractionsReportDetailApi = () =>
  GET(`${BASE_URL}reports/extractions/6504a0b8fae20a07c2c5b7f8/`);

export const ExtractionsReportUpdateApi = (data) =>
  PUT(`${BASE_URL}/reports/extractions/6504a0b8fae20a07c2c5b7f8/`, data);

export const ExtractionsReportDeleteApi = (data) =>
  DELETE(`${BASE_URL}/reports/extractions/6504a0b8fae20a07c2c5b7f8/`);

export const BasicReportListApi = (data) =>
  GET(`${BASE_URL}/forms/reports/${data}`);


export const createTicketApi = (data) =>
  POST(`${BASE_URL}/reports/tickets/`, data);

export const getAllTicketsApi = (data) =>
  GET(`${BASE_URL}/reports/tickets/${data}`);

//body added one more parameter data which is the body
export const updateTicketApi = (data , body: any) =>
  PUT(`${BASE_URL}/reports/tickets/${data}/`, body);

export const deleteTicketApi = (data) => 
  // Directly use ticket_id, since we expect only a single ID per request
  DELETE(`${BASE_URL}/reports/tickets/${data}/`);



export const downloadTicketApi = (data) =>
  GET(`${BASE_URL}/reports/downloads/tickets/${data}`);

export const extractionsCaseListApi = (data) =>
  GET(`${BASE_URL}/reports/case/extractions/${data}`);

export const downloadProcessingApi = () =>
  GET(`${BASE_URL}/reports/downloads/processing/`);
export const classificationsreportsdownloadApi = (data) =>
  GET(`${BASE_URL}/reports/downloads/classifications/${data}`);
export const extractionsreportsdownloadApi = (data) =>
  GET(`${BASE_URL}/reports/downloads/extractions/${data}`);


export const GroupsListAPI = (data) => GET(`${BASE_URL}/groups/${data}`);

export const EditListAPI = (data) =>
  GET(`${BASE_URL}/groups/${data}/edit/?format=json`);

export const UpdateListAPI = (data) =>
  POST(`${BASE_URL}/groups/${data?.id}/edit/?format=json`, data?.apiReqest);

export const ExpireVerificationBatchAPI = (data) =>
  DELETE(`${BASE_URL}/verify/${data}/expire/`);

export const ClassificationBatchAPI = (data) =>
  DELETE(`${BASE_URL}/classify/${data}/expire/`);

export const ExtractionsReportListDownloadAPI = () =>
  GET(`${BASE_URL}/reports/downloads/case/extractions/`);

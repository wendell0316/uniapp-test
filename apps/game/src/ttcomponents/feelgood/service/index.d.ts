import { EnumTaskReportEvent, FormDataForSubmit, ReportResponse, TaskConfig } from '@ad/feelgood-sdk';
export declare function fetchTaskConfig(taskId: string): Promise<TaskConfig | undefined>;
export declare function submitTask(formData: FormDataForSubmit): Promise<boolean | null>;
export declare function submitDoNotShowAgain(): Promise<boolean | null>;
/**
 * 上报调研展示
 * @param type
 * @returns
 */
export declare function reportTaskShowOrClose(type: EnumTaskReportEvent | 'survey_close_manual_cnt' | 'survey_close_auto_cnt', taskConfig: TaskConfig): Promise<unknown>;
export declare function reportCustomEvent(eventName: string): Promise<ReportResponse | null>;

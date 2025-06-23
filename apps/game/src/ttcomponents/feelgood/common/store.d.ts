import { EnumChannel, EnumClientEnv, EnumPlatformEnv, EnumSurveyType, TaskConfig, UserParams, QuestionListVal } from '@ad/feelgood-sdk';
/**
 * 全局store
 */
export declare const GlobalStore: {
    UserInfo: UserParams;
    EnvInfo: {
        token: string;
        survey_type: EnumSurveyType;
        client_env: EnumClientEnv;
        device: EnumPlatformEnv;
        language: string;
        sdk_version: any;
        url: string;
    };
    TaskConfig: TaskConfig | null;
    Labels: Partial<Record<"screen_shot_banner" | "thankyou" | "thankyou_rich_text" | "thankyou_comment" | "thankyou_comment_rich_text" | "submit_btn" | "cancel_btn" | "title" | "title_rich_text" | "subtitle" | "subtitle_rich_text" | "entry_btn" | "request_error" | "please_enter" | "required_field_hint" | "offline_message" | "task_has_expired" | "incomplete_formdata" | "no_empty_answer" | "do_not_show_again" | "i_dont_know" | "block_btn_text" | "redirect_to_lottery" | "default_scale_negative" | "default_scale_positive" | "rate_1" | "rate_2" | "rate_3" | "rate_4" | "rate_5" | "screen_shot_icon_tooltip" | "screen_shot_upload" | "screen_shot_capture" | "screen_shot_tip_limit" | "screen_shot_size_limit" | "redirect_after_$_seconds" | "entry_label_custom" | "entry_label_feedback" | "entry_label_reward_survey" | "err_msg_phone" | "err_msg_email", string>>;
    FormValue: QuestionListVal;
    Channel: EnumChannel;
};

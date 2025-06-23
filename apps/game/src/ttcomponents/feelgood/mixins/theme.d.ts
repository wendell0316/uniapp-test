/**
 * @fileoverview 一个mixin，用于根据问卷主题，确定 theme Class 并用在template中
 */
import { EnumTheme } from '@ad/feelgood-sdk';
export declare const themeData: {
    theme: EnumTheme;
    themeClass: string;
};
export declare const determineThemeClass: () => void;

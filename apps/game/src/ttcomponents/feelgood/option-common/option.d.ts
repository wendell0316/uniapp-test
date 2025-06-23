import { SingleOptionConfig } from '@ad/feelgood-sdk';
export declare const optionCommonConfig: {
    properties: {
        selected: {
            type: BooleanConstructor;
            value: boolean;
        };
        highlight: {
            type: BooleanConstructor;
            value: boolean;
        };
        config: {
            type: ObjectConstructor;
            value: SingleOptionConfig;
        };
        disabled: {
            type: BooleanConstructor;
            value: boolean;
        };
    };
    data: {
        theme: import("@ad/feelgood-sdk").EnumTheme;
        themeClass: string;
    };
    methods: {
        onTap(): void;
        determineThemeClass: () => void;
    };
    attached(): void;
};

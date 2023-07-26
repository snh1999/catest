export type InputFormType = {
    fieldName: string;
    isUnique: boolean;
    isRequired: boolean;
    inputType: InputType;
};

export type InputType =
    | "Alphanumeric"
    | "Character String"
    | "String"
    | "Number"
    | "Boolean"
    | "Date"
    | "Email"
    | "Array"
    | "Object";

export const inputTypeArray: InputType[] = [
    "Alphanumeric",
    "Array",
    "Boolean",
    "Character String",
    "Date",
    "Email",
    "Number",
    "Object",
    "String",
];

export const DEFAULT_INPUT_FORM: InputFormType = {
    fieldName: "",
    isUnique: false,
    isRequired: true,
    inputType: "String",
};

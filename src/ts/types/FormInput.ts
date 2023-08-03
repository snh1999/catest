export type InputFormType = {
    fieldName: string;
    isUnique: boolean;
    isRequired: boolean;
    inputType: InputType;
};

export type InputType =
    | "string (alpha)"
    | "string (alpha, lowercase)"
    | "string (alpha, uppercase)"
    | "string (alphanumeric)"
    | "string (alphanumeric, lowercase)"
    | "string (alphanumeric, uppercase)"
    | "nanoid"
    | "sample string"
    | "uuid"
    | "userName"
    | "color"
    | "email"
    | "url"
    | "password"
    | "mac"
    | "ipv4"
    | "ipv6"
    | "paragraph"
    | "post"
    | "slug"
    | "sentence"
    | "Number (Integer)"
    | "bigInt"
    | "binary"
    | "hex"
    | "octal"
    | "Number (Float)"
    | "zipCode"
    | "country"
    | "latitude"
    | "longitude"
    | "nearbyGPSCoordinate"
    | "timeZone"
    | "imei"
    | "Phone number"
    | "bio"
    | "firstName"
    | "fullName"
    | "sex"
    | "jobTitle"
    | "prefix"
    | "sexType"
    | "suffix"
    | "zodiacSign"
    | "anytime"
    | "future"
    | "past"
    | "birthdate"
    | "month"
    | "weekday";

export const inputTypeArray: InputType[] = [
    "string (alpha)",
    "string (alpha, lowercase)",
    "string (alpha, uppercase)",
    "string (alphanumeric)",
    "string (alphanumeric, lowercase)",
    "string (alphanumeric, uppercase)",
    "nanoid",
    "sample string",
    "uuid",
    "userName",
    "color",
    "email",
    "url",
    "password",
    "mac",
    "ipv4",
    "ipv6",
    "paragraph",
    "post",
    "slug",
    "sentence",
    "Number (Integer)",
    "bigInt",
    "binary",
    "hex",
    "octal",
    "Number (Float)",
    "zipCode",
    "country",
    "latitude",
    "longitude",
    "nearbyGPSCoordinate",
    "timeZone",
    "imei",
    "Phone number",
    "bio",
    "firstName",
    "fullName",
    "sex",
    "jobTitle",
    "prefix",
    "sexType",
    "suffix",
    "zodiacSign",
    "anytime",
    "future",
    "past",
    "birthdate",
    "month",
    "weekday",
];

export const DEFAULT_INPUT_FORM: InputFormType = {
    fieldName: "",
    isUnique: false,
    isRequired: true,
    inputType: "string (alphanumeric)",
};

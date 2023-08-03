import { InputFormType, InputType } from "../types/FormInput";
import getFakeData from "./dataGenerator";

export default function generateComboJson(inputs: InputFormType[]) {
    const optionalFields: number[] = [];
    const requiredFields: number[] = [];
    const fields: string[] = [];
    const types: InputType[] = [];
    inputs.forEach((input, index) => {
        if (!input.isRequired) optionalFields.push(index);
        else requiredFields.push(index);
        fields.push(input.fieldName);
        types.push(input.inputType);
    });

    const optionalSubsets = generateSubsets(optionalFields);
    const subsetArr = appendArrayToSubsets(optionalSubsets, requiredFields);

    return generateRecordArray(subsetArr, fields, types);
}

function generateSubsets<T>(arr: T[]): T[][] {
    const subsets: T[][] = [];

    function backtrack(start: number, currentSubset: T[]): void {
        subsets.push([...currentSubset]);

        for (let i = start; i < arr.length; i++) {
            currentSubset.push(arr[i]);
            backtrack(i + 1, currentSubset);
            currentSubset.pop();
        }
    }

    backtrack(0, []);

    return subsets;
}

function appendArrayToSubsets<T>(subsets: T[][], inputArray: T[]): T[][] {
    return subsets.map((subset) => [...subset, ...inputArray]);
}

function generateRecordArray(subsets: any[][], fields: string[], types: InputType[]): Record<any, any>[] {
    return subsets.map((subarray) => {
        const recordObject: Record<any, any> = {};
        subarray.forEach((value) => {
            recordObject[fields[value]] = getFakeData(types[value]);
        });
        return recordObject;
    });
}

import { CalculationArguments } from "./calculation-arguments.model";
import { MessageSeverity } from "./calculation-response.models";

export class CalculationHelper {
    static newMessage(args: CalculationArguments, severity: MessageSeverity, text: string): CalculationArguments {
        args.allMessages = args.allMessages || [];
        args.allMessages.push({
            severity: severity,
            text: text
        });
        return args;
    }

    static truncateAtDecimal(value: number, decimal: number): number {
        return +(Math.floor(value * (Math.pow(10, decimal))) / Math.pow(10, decimal)).toFixed(decimal);
    }

    static getSignificantDigitCount(value: number): number {
        const log10 = Math.log(10);
        const max = Math.pow(2,53);

        if (Math.abs(value) > max) throw new Error(`${value} is greater than the max JavaScript float, ` +
            `and significant digits cannot be accurately calculated`);
        value = Math.abs(+String(value).replace(".", "")); //remove decimal and make positive
        if (value == 0) 
            return 0;
        while (value != 0 && value % 10 == 0) value /= 10; //kill the 0s at the end of n

        return Math.floor(Math.log(value) / log10) + 1; //get number of digits
    }
}
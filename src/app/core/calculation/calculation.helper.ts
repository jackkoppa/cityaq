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
}
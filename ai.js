var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});
export default function main(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const completion = yield openai.chat.completions.create({
            messages: [
                { "role": "system", "content": "You are a helpful assistant. You are great at converting user prompts into figma api codes for generating components in figma.For reference use https://www.figma.com/plugin-docs/api/global-objects/ and all the sub directories. You will respond the correct api call code which i can directly pass to api to create components. Nothing else." },
                { "role": "user", "content": prompt }
            ],
            model: 'gpt-3.5-turbo',
            stream: false
        });
        console.log((_b = (_a = completion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content);
    });
}
main("Create 5 circles in figma");

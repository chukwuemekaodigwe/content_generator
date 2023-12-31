import axios from "axios";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai'
import OpenAI from "openai";


export async function useGoogleGemini(prompt, densityMin, densityMax) {
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

    const genAI = new GoogleGenerativeAI(API_KEY);
    let density = densityMax - densityMin

    const generationConfig = {
        // stopSequences: ["red"],
        //maxOutputTokens: 20,
        temperature: 0.9,
        topP: (density / 100),
        topK: 16,
    };
    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
    ];
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig, safetySettings });

    //const prompt = "Write a story about a magic backpack."
    const result = await model.generateContentStream(prompt);

    let text = '';
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        //  console.log(chunkText);
        text += chunkText;
    }
    console.log(text)
    return text
}


export async function useGPT4(prompt, density = '') {
    let key = import.meta.env.VITE_OPENAI_KEY
    const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true });

    async function main() {
        const completion = await openai.chat.completions.create({
            messages: [
                //    {"role": "system", "content": "You are a helpful assistant."},
                { "role": "user", "content": prompt },

            ],
            model: "gpt-3.5-turbo", //gpt-4-1106-preview,
            response_format: { type: "json_object" },
        });
        console.log(completion.choices[0]);

        return completion.choices[0].message.content

    }

    return main();

}

export async function useRapidAPI(prompt, density, density2) {
    density = density2 - density
    const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY
    //console.log(API_KEY)
    const options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
        },
        data: {
            messages: [
                {
                    role: 'user',
                    content: prompt,
                }
            ],
            system_prompt: '',
            temperature: 0.9,
            top_k: 50,
            top_p: parseInt(density) / 100,
            image: ''
        }
    };
    let result = ''
    try {
        const response = await axios.request(options);
        console.log(response)
        result = response.data.result
    } catch (error) {
        alert('an error occured')
        console.error(error);
    }

    return result
}


export async function useDalle3(prompt) {

    const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY
    const options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/texttoimagetv',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
        },
        data: {
            // model: 'dall-e-3',
            // prompt: prompt,
            // n: 3,
            // quality: 'standard',
            // size: '1024x1024',
            // style: 'vivid'
            text: prompt,
            size: '975*975'
        }
    };
    try {
        const response = await axios.request(options);
        console.log(response.data)
        return [response.data.generated_image]
    } catch (error) {

        console.error(error);
        alert('an error occurred')
    }
}


export async function useDiffusion() {

}

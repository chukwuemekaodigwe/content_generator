import axios from "axios";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai'
import OpenAI from "openai";
import { ref } from "vue";

export async function useGoogleGemini(prompt, densityMin, densityMax) {
    const output = ref('')
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
    const genAI = new GoogleGenerativeAI(API_KEY);
    let density = densityMax - densityMin
    const generationConfig = {
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
    const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig, safetySettings });
    //const execute = async () => {
        const result = await model.generateContentStream(prompt);

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            output.value += chunkText;
        }
    //}

   // execute()
    return output.value
}

export async function useRapidAPI(prompt, density, density2) {
    const result = ref()
    density = density2 - density
    const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY
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
            top_k: 5,
            top_p: parseInt(density) / 100,
            image: ''
        }
    };

   // const execute = async () => {
        try {
            const response = await axios.request(options);
            result.value = response.data.result
        } catch (error) {
            alert('an error occured: Data could not be generated')
            console.error(error);
        }
    
   // }

   // execute()

    return result.value
}


export async function useDalle3(prompt) {
    const output = ref()
    const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY
    const options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/texttoimage',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
        },
        data: {
            text: prompt,
            size: '975*975'
        }
    };

   // const execute = async () => {
        try {
            const response = await axios.request(options);
            output.value = response.data.generated_image
        } catch (error) {

            console.error(error);
            alert('Error occurred generating image')
            return
        }
   // }

    //execute()

    return output.value
}

<template>
  <div v-if="!output" class="flex flex-column justify-between items-center" style="margin: 0 auto;">
    <header class="sm:hidden xs:hidden" v-if="!hide">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    </header>

    <div>
      <p>
        <em> Type in the keyword and select your desired keyword density</em>
      </p>
      <p>
        <label class="font-medium capitalize block" for="keyword">Enter Keyword:</label>
        <input v-model="keyword" class="px-2 py-0 mb-5 w-full max-w-xl text-black dark:gray-100" type="text"
          id="keyword" />
      </p>

      <p>
        <label class="font-medium text-capitalize block" for="tone">Select Tone/Style:</label>
        <select class="px-2 py-0 mb-5 w-full max-w-xl text-black dark:gray-100" id="tone" v-model="tone">
          <option value="narrative">Narrative</option>
          <option value="Friendly">Friendly</option>
          <option value="professional">Professional</option>
          <option value="authoritative">Authoritative</option>
          <option value="happy">Happy</option>
          <option value="emotional">Emotional</option>
          <option value="inspiring">Inspiring</option>
          <option value="sad">Sad</option>

        </select>

      </p>
      <p>
        <label class="font-medium text-capitalize block" for="density">Keyword Density Range (%):</label>
        Min <input class="px-2 py-0 mb-5 w-full max-w-sm text-black dark:gray-100" v-model="density1" type="number"
          min="0" id="density-min" placeholder="Min" />
        <br> Max <input class="px-2 py-0 mb-5 w-full max-w-sm text-black dark:gray-100" v-model="density2" type="number"
          min="0" id="density-max" placeholder="Max" />
      </p>

      <button class="bg-blue-900 text-white text-medium px-5 py-2 rounded" @click="generateContent()">Generate
        Content</button>
    </div>

  </div>
  <div v-else>
    <div class="container bg-white text-black p-5 text-justify min-h-screen d-flex flex-column">
      <Loader v-if="loading" />
      <button class="block bg-green-700 my-2 float-right px-3 py-3 text-white" @click="generateNew">Generate Another</button>
      <div id="image">
      </div>
      <div v-html="output" class="text-justify content-generated">
        
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useDalle3, useGoogleGemini, useRapidAPI } from '../composables/index'
import showdown from 'showdown'
import Loader from './Loader.vue'

const emit = defineEmits(['output'])
const keyword = ref('')
const tone = ref('')
const density1 = ref()
const density2 = ref()
const output = ref(null)
const contenttype = ref('')
const loading = ref(false)



function generateContent() {
  if (keyword.value && tone.value) {
    if (density2.value < density1.value) return alert('The percentage of Max keywork density should be higher')
    loading.value = true
    
    callGPT4API(keyword.value, tone.value, density1.value, density2.value).then((res)=>{
      displayContent(res)
    })

    generateImage(keyword.value).then(image1=>appendImage(image1))
    generateImage(keyword.value).then(image2=>appendImage(image2, 2))
    
  } else {
    alert('Please provide all the fields esp the keyword and tone')
  }

}

async function callGPT4API(keyword, tone, densityMin, densityMax) {
  if (contenttype.value == 'other') { contenttype.value = '' }
  const prompt = `In a ${tone} tone, write a blog post on this topic ${keyword}`
  //let result = ''
  const txt = await useGoogleGemini(prompt, densityMin, densityMax)
    
    return txt
  
}

async function generateImage(keyword){
  const r = await useDalle3(keyword)
  return r
}

function displayContent(text) {
  // Convert markdown to html
if(text)
  var converter = new showdown.Converter()
  let html = converter.makeHtml(text);
  loading.value = false
  output.value = html

}

function appendImage(imageUrl, position) {
  let targetElement = ''
  if(imageUrl){

  if (position == 2) {
    targetElement = document.getElementsByTagName('h3')
    if (targetElement.length <= 1) {
      targetElement = document.getElementsByTagName('p')
    }
    targetElement = targetElement[targetElement.length / 2]
  } else {
    targetElement = document.getElementById('image');
  }

  // Check if the target element exists
  if (targetElement) {
    // Create an image element
    const imageElement = document.createElement("img");

    // Set the image source attribute
    imageElement.src = imageUrl

    // Add the image element below the target element
    targetElement.appendChild(imageElement);


  } else {
    alert('an error occured')
  }
  }
}

function generateNew() {
  output.value = ''
  keyword.value = ''
  tone.value = ''
  contenttype.value = ''
  density1.value = ''
  density2.value = ''

}
</script>

<style scoped>
img {
  display: inline;
  width: 100px;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.content-generated p {
  text-align: justify;

}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);

  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    margin-top: 20px;
  }
}
</style>
<template>
  <Loader v-if="loading" />
  <div v-else>
    <div v-if="output">
      <button class="bg-green-500 px-4 py-3 float-right text-white text-medium text-left" @click="generateNew">Generate
        New
        Content</button>

      <div id="image"></div>
      <div v-html="output"></div>
    </div>
    <div v-else>
      <p>
        <em> Type in the keyword and select your desired keyword density</em>
      </p>
      <p>
        <label class="font-medium capitalize block" for="keyword">Enter Keyword:</label>
        <input v-model="keyword" class="px-2 py-0 mb-5 w-full max-w-xl text-black dark:gray-100" type="text"
          id="keyword" />
      </p>
      <p>
        <label class="font-medium text-capitalize block" for="tone">Content Type:</label>
        <select class="px-2 py-0 mb-5 w-full max-w-xl text-black dark:gray-100" id="tone" v-model="contenttype">
          <option value="blog post">Blog Post</option>
          <option value="article">Article</option>
          <option value="narration">Narration</option>
          <option value="other">Other</option>
        </select>

      </p>
      <p>
        <label class="font-medium text-capitalize block" for="tone">Select Tone/Style:</label>
        <select class="px-2 py-0 mb-5 w-full max-w-xl text-black dark:gray-100" id="tone" v-model="tone">
          <option value="narrative">Narrative</option>
          <option value="Friendly">Friendly</option>
          <option value="happy">Happy</option>

          <option value="emotional">Emotional</option>
          <option value="inspiring">Inspiring</option>
          <option value="professional">Professional</option>
          <option value="authoritative">Authoritative</option>
          <option value="Argumentatively">Argumentatively</option>
          <option value="sad">Sad</option>

        </select>

      </p>
      <p>
        <label class="font-medium text-capitalize block" for="density">Keyword Density Range (%):</label>
        Min <input class="px-2 py-0 mb-5 w-full max-w-sm text-black dark:gray-100" v-model="density1" type="number" min="0"
          id="density-min"  placeholder="Min" />
        <br> Max <input class="px-2 py-0 mb-5 w-full max-w-sm text-black dark:gray-100" v-model="density2" type="number" min="0"
          id="density-max" placeholder="Max" />
      </p>

      <button class="bg-blue-900 text-white text-medium px-5 py-2 rounded" @click="generateContent()">Generate
        Content</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useDalle3, useGoogleGemini, useGPT4, useRapidAPI } from '../composables/index'
import showdown from 'showdown'
import Loader from './Loader.vue'
import { text } from './text'

const emit = defineEmits(['output'])
const keyword = ref('')
const tone = ref('')
const density1 = ref(0)
const density2 = ref(0)
const output = ref('')
const contenttype = ref('')
const loading = ref(false)


async function generateContent() {
  if (keyword.value && tone.value && contenttype.value) {
    if(density2.value <  density1.value) return alert('The percentage of Max keywork density should be higher')
    loading.value = true
    const generatedText = await callGPT4API(keyword.value, tone.value, density1.value, density2.value);
    const images = await callMidjourneyAPI(keyword.value);
    //let generatedText = text
    // let images = [
    //   "https://audiospace-1-u9912847.deta.app/matagimage?id=gCRxn2REh2GcUe1TlZ7q1703987569.0152733",
    //   "https://audiospace-1-u9912847.deta.app/matagimage?id=OgjHmd7Y6K2ttsuknCaP1703987593.766965"
    // ]
    console.log({'image output': images})
    displayContent(generatedText, images).then(() => {
      addImage(images)
    })
  } else {
    alert('Please provide all the fields esp the keyword and tone')
  }

}

async function callGPT4API(keyword, tone, densityMin, densityMax) {
  if (contenttype.value == 'other') { contenttype.value = '' }
  const prompt = `In a ${tone} tone, write an ${contenttype.value} on this topic ${keyword}`
  let result = ''
  await useGoogleGemini(prompt, densityMin, densityMax)
    //await useRapidAPI(prompt, densityMin, densityMax)
    .then((res) => {

      result = res
    })
    .catch((err) => {
      alert(`an error occurred`)
      console.log(err)
    })
  //console.log(result)
  return result
}

async function callMidjourneyAPI(keyword) {
  let result = ''
  await useDalle3(keyword).then((re) => {
    result = re
  })

  return result
}


async function displayContent(text) {

  var converter = new showdown.Converter(),
    html = converter.makeHtml(text);
  loading.value = false
  output.value = html
  emit('output', true)

}

function addImage(imageUrl) {

  const targetElement = document.getElementById('image');
  let secondtag = document.getElementsByTagName('h3')
  if (secondtag.length <= 1) {
    secondtag = document.getElementsByTagName('p')
  }

  // Check if the target element exists
  if (targetElement) {
    // Create an image element
    const imageElement = document.createElement("img");

    // Set the image source attribute
    imageElement.src = imageUrl[0];

    // Add the image element below the target element
    targetElement.appendChild(imageElement);

    if (imageUrl.length > 1) {
      const imageElement2 = document.createElement("img");
      imageElement2.src = imageUrl[1];
      secondtag[(secondtag.length / 2) - 1].append(imageElement2)
    }

  } else {
    console.error(`Element with ID 'output' not found.`);
  }
}
function generateNew() {
  output.value = ''
  keyword.value = ''
  tone.value = ''
  contenttype.value = ''
  density1.value = ''
  density2.value = ''
  emit('output', false)
}
</script>

<style scoped>
img {
  display: inline;
  width: 100px;
}
</style>
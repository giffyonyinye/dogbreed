<template>
  <div>
    <div class="heroSection">
      <div>
        <input
          @click="isVisible = !isVisible"
          type="text"
          name="search"
          id="search"
          placeholder="search for dogs"
          v-model="searchBreed"
        />
      </div>
      <div v-if="isVisible" class="search-result">
        <div
          @click="isVisible = !isVisible"
          v-for="breed in filteredBreed"
          :key="breed"
        >
          <p @click="dogList(breed)">{{ breed }}</p>
        </div>
      </div>
    </div>
    <div style="margin-left: 3rem">
      <h1>Hey Dog Lovers</h1>
      <p>Check Out Some of Our amazing breeds of Dogs</p>
    </div>
    <div class="dogs">
      <div
        style="position: relative"
        v-for="(dog, index) in dogList"
        :key="index"
      >
        <img
          :class="{
            normal: imageEffect.normal,
            greyscale: imageEffect.greyscale,
            sepia: imageEffect.sepia,
          }"
          :src="dog"
          alt="dogs"
          loading="lazy"
        />
        <p @click="applyEffect(index)" class="effect" >Apply Effect</p>
      </div>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "@/config";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "AllDogs",

  data() {
    return {
      dogList: [],
      count: 0,
      dogIndex: 0,
      imageEffect: {
        normal: true,
        greyscale: false,
        sepia: false,
      },
    };
  },

  mounted() {
    this.getAllDog();
  },

  computed: {
    ...mapState["dogList"],
  },

  methods: {
    async getAllDog() {
      try {
        const response = await axios.get(`${baseUrl}/breed/bulldog/images`);
        this.dogList = response.data.message.slice(0, 99);

        console.log(this.dogList);
      } catch (error) {
        console.log(error);
      }
    },

    applyEffect(index) {
      this.dogIndex = index;
      if(this.dogIndex === index && this.count <= 2) {
        this.count++;
        console.log(this.count);

      }
      // if (this.count <= 2) {
      // }
      if (this.count === 0) {
        console.log("count is 0");
        this.imageEffect.greyscale = true;
      }
      if (this.count === 1) {
        console.log("count is 1");
        this.imageEffect.greyscale = true;
      }
      if (this.count === 2) {
        console.log("count is 2");
        this.imageEffect.sepia = true;
      }
      if (this.count == 3) {
        console.log("count is 3");
        this.count = 0;
        this.imageEffect.sepia = false;
        this.imageEffect.greyscale = false;
      }
    },
  },
};
</script>

<!--  "scoped" limits CSS to this component only -->
<style scoped>
input {
  width: 50%;
  outline: none;
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
}
.dogs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 4rem 4rem;
  gap: 2rem;
}

img {
  width: 18rem;
  height: 18rem;
  border-radius: 0.3rem;
  object-fit: cover;
}

.greyscale {
  filter: grayscale(100);
}

.sepia {
  filter: sepia(100);
}

.heroSection {
  height: 10rem;
  background-color: rgb(236, 217, 236);
  display: flex;
  justify-content: center;
  align-items: center;
}

.effect {
  position: absolute;
  right: 0.4rem;
  bottom: 0.5rem;
  background-color: brown;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: white;
}
</style>

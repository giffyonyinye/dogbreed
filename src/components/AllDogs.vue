<template>
  <div>
   
    <div style="margin-top:2rem; color:#2c3e50">
      <p v-if="isLoading" class="fa fa-spinner">Loading ........</p>
    </div>
    <div>
      <div class="dogs">
        <div v-for="(dog, index) in this.$store.state.dogList" :key="dog">
            <img :class="{
              normal: imageEffect.normal,
              greyscale: imageEffect.greyscale,
              sepia: imageEffect.sepia,
            }" :src="dog" alt="dogs" loading="lazy">
          <p @click="applyEffect(index)" >Apply Effect</p>
          <router-link :to="{ name: 'dogInfo', params: { id: index, image: dog } }"  >
              View More
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { baseUrl } from '../config';
const url = baseUrl;

import { mapState } from "vuex";
export default {
  props: ["breedName"],
  data() {
    return {
      isLoading: false,
       count: 0,
      dogIndex: 0,
      imageEffect: {
        normal: true,
        greyscale: false,
        sepia: false,
      },
    }
  },

  mounted() {
    this.dogList();
    var dogList = JSON.parse(localStorage.getItem("dogList"));
    this.$store.dispatch("dogList", dogList);
    // this.$store.dispatch("breedName", this.allBreeds[0]);
    console.log(this.allBreeds)
  },

  computed: {
    ...mapState(["allBreeds"]),

  },

  methods: {
    dogList() {
      this.isLoading = true;
      axios({
        method: "GET",
        url: `${url}/breed/bulldog/images`,
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then((res) => {
          let dog = res.data.message;
          let dogArray = dog.slice(0, 99);
          localStorage.setItem("dogList", JSON.stringify(dogArray));
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        })
    },

    applyEffect(index) {
      this.dogIndex = index;
      if (this.dogIndex === index && this.count <= 2) {
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
  }
}
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

<template>
  <div>
    <div style="margin-top: 2rem; color: #2c3e50">
      <p v-if="isLoading" class="fa fa-spinner">Loading ........</p>
    </div>
    <div>
      <div class="dogs">
        <div
          style="position: relative"
          v-for="(dog, index) in this.$store.state.dogList"
          :key="dog"
        >
          <img
            :class="getFilterClass(index)"
            :src="dog"
            alt="dogs"
            loading="lazy"
          />
          <div class="effect" >
            <p
              style="
                cursor: pointer;
                font-size: 0.8rem;
                background-color: white;
                color: black;
                padding: .5rem;
              "
              @click="applyNextFilter(index)"
            >
              Apply Effect
            </p>
            <div style="margin-top: 1rem">
              <router-link
                style="
                  text-decoration: none;
                  color: white;
                  border: 1px solid;
                  font-size: 0.8rem;
                padding: .5rem;
                "
                :to="{ name: 'dogInfo', params: { id: index, image: dog } }"
              >
                View More
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "../config";
const url = baseUrl;

import { mapState } from "vuex";
export default {
  props: ["breedName"],
  data() {
    return {
      isLoading: false,
      count: 0,
      dogIndex: 0,
      currentFilterIndex: 0,
      imageEffect: {
        sepia: false,
        grayscale: false,
        normal: true,
        cartoonify: false,
      },
      filterOptions: ["sepia", "grayscale", "normal", "cartoonify"],
    };
  },

  mounted() {
    this.dogList();
    var dogList = JSON.parse(localStorage.getItem("dogList"));
    this.$store.dispatch("dogList", dogList);
    this.$store.dispatch("breedName", this.allBreeds[0]);
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
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          let dog = res.data.message;
          let dogArray = dog.slice(0, 99);
          localStorage.setItem("dogList", JSON.stringify(dogArray));
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    applyNextFilter(index) {
      this.count = index;
      if (this.count == index) {
        const nextFilterIndex =
          (this.currentFilterIndex + 1) % this.filterOptions.length;
        const nextFilter = this.filterOptions[nextFilterIndex];

        // Reset all filters to false
        Object.keys(this.imageEffect).forEach((filter) => {
          this.imageEffect[filter] = false;
        });

        // Apply the next filter
        this.imageEffect[nextFilter] = true;

        this.currentFilterIndex = nextFilterIndex;
      }
    },

    getFilterClass(index) {
      if (this.count === index) {
        const activeFilters = Object.keys(this.imageEffect).filter(
          (filter) => this.imageEffect[filter]
        );
        return activeFilters.map((filter) => `${filter}-filter`).join(" ");
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
  position: relative;
}

img {
  width: 18rem;
  height: 18rem;
  border-radius: 0.3rem;
  object-fit: cover;
}

.grayscale-filter {
  filter: grayscale(100);
}

.sepia-filter {
  filter: sepia(100);
}
.cartoonify-filter {
  animation-name: imageAnimation;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes imageAnimation {
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(5deg) scale(0.95);
  }
  50% {
    transform: rotate(-5deg) scale(1.05);
  }
  75% {
    transform: rotate(5deg) scale(0.95);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}

.heroSection {
  height: 10rem;
  background-color: rgb(236, 217, 236);
  display: flex;
  justify-content: center;
  align-items: center;
}

.effect {
  /* position: absolute; */
  right: 0.4rem;
  bottom: 0.5rem;
  background-color: #2c3e50;
  cursor: pointer;
  padding: 0 1rem 0 1rem;
  border-radius: 0.5rem;
  color: white;
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  left: 1rem;
}
</style>

<template>
  <div class="main">
    <!-- THIS IS THE SEARCH BAR AND ITS FUNCTIONALITY -->
    <div
      style="padding: 2rem 2rem 2rem 3rem; background: #2c3e50; color: white"
    >
      <h1>Hey Dog Lovers</h1>
      <p>Check Out Some of Our amazing breeds of Dogs</p>
    </div>
    <!-- THIS IS THE SEARCH BAR AND ITS FUNCTIONALITY -->
    <div class="header">
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
          <p style="cursor: pointer" @click="dogList(breed)">{{ breed }}</p>
        </div>
      </div>
    </div>

    <!-- THIS SHOWS THE SEARCH RESULTS OF ANY BREED SEARCHED FOR -->
    <div v-show="showSearchResult">
      <div style="margin-top: 2rem; color: #2c3e50; text-align: center">
        <i v-if="isLoading" class="fa fa-spinner">Loading ........</i>
      </div>

      <div class="dogs">
        <div v-for="(dog, index) in searchResult" :key="dog">
          <img
          style="position: relative"
            :class="getFilterClass(index)"
            :src="dog"
            alt="dogs"
            loading="lazy"
          />
          <div class="effect">
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
  data() {
    return {
      searchBreed: "",
      isVisible: false,
      breedName: "",
      showSearchResult: false,
      dogLists: true,
      showBreedList: false,
      isLoading: false,
      count: 0,
      currentFilterIndex: 0,
      dogIndex: 0,
      imageEffect: {
        sepia: false,
        grayscale: false,
        normal: true,
        cartoonify: false
      },
      filterOptions: ["sepia", "grayscale", "normal", "cartoonify"],
    };
  },

  mounted() {
    this.getAllBreeds();
    this.breedName = localStorage.getItem("breed");
    console.log(this.breedName);
    this.dogList();

  },

  methods: {
    getAllBreeds() {
      axios({
        method: "GET",
        url: `${url}/breeds/list/all`,
        headers: {
          "Content-type": "application/json",
        },
      }).then((res) => {
        let breed = res.data.message;
        let breeds = Object.keys(breed);
        this.$store.dispatch("allBreeds", breeds);
      });
    },


    dogList(breed) {
      this.isLoading = true;
      console.log(this.breedName)
      axios({
        method: "GET",
        url: `${url}/breed/${ breed ? breed : this.breedName }/images`,
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          let searchResult = res.data.message;
          this.dogLists = false;
          this.showSearchResult = true;
          this.$store.dispatch("searchResult", searchResult);
          this.isLoading = false;
          this.$router.push(`/breed/${breed}`);
        })
        .catch((error) => {
          console.log(error);
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

  computed: {
    ...mapState(["allBreeds", "searchResult"]),

    filteredBreed() {
      if (this.searchBreed) {
        return this.allBreeds.filter((breed) => {
          return breed.toLowerCase().includes(this.searchBreed.toLowerCase());
        });
      } else {
        return this.allBreeds;
      }
    },
  },
};
</script>

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

.header {
  background: whitesmoke;
  padding: 2rem;
  display: flex;
  justify-content: end;
  position: relative;
}

.header input {
  outline: none;
  width: 15rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid grey;
  margin: auto;
}
.header button {
  outline: none;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid grey;
}

.search-result {
  overflow: auto;
  width: 15rem;
  height: 10rem;
  position: absolute;
  background: white;
  padding-left: 2rem;
  top: 5.2rem;
}

</style>

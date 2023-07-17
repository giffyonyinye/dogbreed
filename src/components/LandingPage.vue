<template>
  <div class="main">
    <div style="padding: 2rem 2rem 2rem 3rem; background: #2c3e50; color: white;">
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

    <!-- THIS SHOWS LIST OF DOG BY DEFAULT WHEN URL IS VISITED -->
    <div v-show="dogLists">
      <AllDogs />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AllDogs from "./AllDogs.vue";
import { baseUrl } from "../config";
const url = baseUrl;
import { mapState } from "vuex";
export default {
  components: { AllDogs },
  data() {
    return {
      searchBreed: "",
      isVisible: false,
      showSearchResult: false,
      dogLists: true,
      showBreedList: false,
      isLoading: false,
    };
  },

  mounted() {
    this.getAllBreeds();
    // this.dogList();
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
      this.$store.dispatch("breedName", breed);
      this.isLoading = true;
      axios({
        method: "GET",
        url: `${url}/breed/${breed}/images`,
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
          this.$router.push(`breed/${breed}`);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.dog-list {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  border: 1px solid black;
}
.main {
  background: white;
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

.list {
  cursor: pointer;
}
</style>

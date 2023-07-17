<template>
  <div class="main">
    <!-- THIS IS THE SEARCH BAR AND ITS FUNCTIONALITY -->
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

    <!-- THIS SHOWS THE SEARCH RESULTS OF ANY BREED SEARCHED FOR -->
    <div v-show="showSearchResult">
      <div style="margin-top: 2rem; color: #2c3e50; text-align: center;">
        <i v-if="isLoading" class="fa fa-spinner">Loading ........</i>
      </div>

      <div class="dogs">
            <div v-for="(dog, index) in searchResult " :key="dog">
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
import axios from "axios";
import { baseUrl } from "../config";
const url = baseUrl;
import { mapState } from "vuex";
export default {
  data() {
    return {
      searchBreed: "",
      isVisible: false,
      showSearchResult: false,
      dogLists: true,
      showBreedList: false,
      isLoading: false,
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
    this.getAllBreeds();
    this.dogList();
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
          this.$router.push(`/breed/${breed}`);
        })
        .catch((error) => {
          console.log(error);
        });
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

.dog-list {
    width:100%;
    display:flex;
    flex-flow: row nowrap;
    border: 1px solid black;
}
.main{
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

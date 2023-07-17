<template>
<!-- THIS SHOWS DOG INFORMATION -->
  <div class="dog-info">
    <img :src="breedImage" alt="dog">
    <p>{{this.$store.state.breedName}}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props:[
        "id", 
        "image",
    ],
    data() {
        return {
            images : localStorage.setItem("image", this.image),
            breedImage : localStorage.getItem("image")
        }
    },
    
  computed: {
    ...mapState(["allBreeds"], "breedName")
  },
  
};
</script>

<style scoped>

.dog-info {
    margin-top: 5rem;
}
.dog-info img {
    width: 30rem;
    height: 30rem;
}
@media only screen and (max-width: 600px) {
  .dog-info img{
    width: 80%;
  }
}
</style>
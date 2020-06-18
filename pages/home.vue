<template>
    <div class="general-container">
      <div class="container">

        <div class="card-container" v-if="user!==null">
          <div class="card-item">
            <div class="card-item-container">
              <img :src="microscope">
              <h3>Exámenes</h3>
            </div>
          </div>
          <div @click="navigateToAccount()">
            <div class="card-item-container">
              <img class="profile-picture" :src="user.photo">
              <h3>{{user.name}}</h3>
            </div>
          </div>
        </div>

        <div class="card-container">
          <div class="card-item">
            <div class="card-item-container">
              <img :src="streetMap">
              <h3>Casos</h3>
            </div>
          </div>
          <div class="card-item">
            <div class="card-item-container">
              <img :src="folder">
              <h3>Recursos</h3>
            </div>
          </div>
          <div class="card-item">
            <div class="card-item-container">
              <img :src="wifi">
              <h3>Noticias</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<script>
  import icons from '@/components/icons';

  export default {
    data() {
      return {
        microscope: icons.Microscope,
        folder: icons.Folder,
        wifi: icons.Wifi,
        streetMap: icons.StreetMap
      };
    },
    computed: {
      user() {
        return this.$store.state.user.loggedUser;
      }
    },
    methods: {
      navigateToAccount() {
        $nuxt.$router.push({path: `/account/profile`});
      }
    }
  }
</script>


<style scoped lang="scss">
 
  .general-container {
    //font-family: "Roboto", sans-serif;
    margin-top: 70px;
    padding: 20px;
    height: calc(100vh - 70px);
    box-sizing: border-box;
    display: grid;
    align-items: center;

    .container {
      width: 100%;
 
      .card-container {
        display: grid;
        grid-auto-flow: column;
        grid-gap: 20px;

        .card-item{
        -webkit-box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
        box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
        border-radius: 8px;
        transition: all .3s ease;
        width: calc(100% - 10px);
        margin: 5px;
        margin-bottom: 20px;
        }
        

        .card-item-container {
          display: grid;
          justify-content: center;
          align-items: center;
          grid-gap: 20px;
          height: 200px;
          cursor: pointer;

          img {
            width: 100px;
            height: 100px;
          }

          .profile-picture {
            border-radius: 50%;
          }

          h3 {
            text-align: center;
          }
        }
      }
    }
  }
</style>

<template>
    <div class="container-login">
        <div class="card-login">

            <h2>Iniciar sesión</h2>
            <vs-button 
                class="btn-login"
                @click="handleClickFace"
                :loading="loadingFace"
                color="pinterest"
                block
                flat
            >
                    <i class='bx bxl-google'></i>
                Iniciar con Google
                <!--<template #animate >
                <i class='bx bxs-user' ></i> Iniciar sesión
                </template>-->
            </vs-button>


           <vs-button 
                class="btn-login"
                @click="handleClickFace"
                :loading="loadingFace"
                color="facebook"
                block
                flat
            >
                <i class='bx bxl-facebook-square' ></i>
                Iniciar con Facebook
                <!--<template #animate >
                <i class='bx bxs-user' ></i> Iniciar sesión
                </template>-->
            </vs-button>
        </div>
    </div>
</template>



<script>
import icons from '@/components/icons';
 export default {
      data:() => ({
        sending: false,
        success: false,

        loadingFace: false,
        successFace: false
      }),
      methods:{
        handleClick() {
          this.sending = true

          setTimeout(() => {
            this.sending = false
            this.success = !this.success
          }, 2000);
        },
        handleClickFace() {
          this.loadingFace = true

          setTimeout(() => {
            this.loadingFace = false
            this.successFace = !this.successFace
          }, 2000);
        }
      
    }
}
</script>

<style scoped lang="scss">
@import "@/shared/variables.css";

    .container-login{
        width:100%;
        margin:auto;
        height:100vh;
        display:grid;
        justify-content: center;
    }

    .card-login{
        width:500px;
        padding:2em;
        margin:auto;
        display:grid;
        justify-content: center;
        background-color: var(--div-color);
        border-radius: 0px 15px 15px 15px;
        h2{
            margin:auto;
            padding-bottom:1em;
        }
        .btn-login{
            width:200px;
        }
    }

    
</style>
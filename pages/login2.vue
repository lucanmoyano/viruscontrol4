<template>
    <div class="container-login">
        <div class="card-login">

            <h2>Iniciar sesión</h2>
            <vs-button 
                class="btn-login"
                @click="loginWithGoogle"
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
                @click="loginWithFacebook"
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

        <!-- DIALOGO -->
    <vs-dialog prevent-close v-model="dialogFormVisible">
        <template #header>
          <h4 class="not-margin">
            Registro
          </h4>
        </template>

        <div v-if="newUser!=null">
          <vs-input v-model="newUser.idDocument" placeholder="Cédula de identidad">
            <template #icon>
              @
            </template>
          </vs-input>
        </div>
        <template #footer>
          <div class="con-footer">
            <vs-button @click="dontSaveNewUser" transparent>
              Cancelar
            </vs-button>
            <vs-button @click="saveNewUser" dark transparent>
              Continuar
            </vs-button>
          </div>
        </template>
      </vs-dialog>

        <!-- FIN DIALOGO -->


    </div>
</template>



<script>
import icons from '@/components/icons';
import firebase from '../plugins/fireinit';
import { getUserFromDatabase, saveUser } from "../shared/user";

 export default {
      layout:'inicio',
      data:() => ({
          newUser: null,
          dialogFormVisible:false
      }),
      methods:{

        loginWithGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().languageCode = 'es';
        this.loginWithProviders(provider);
      },

      loginWithFacebook() {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().languageCode = 'es';
        this.loginWithProviders(provider);
      },

      loginWithProviders(provider) {
        firebase.auth().signInWithPopup(provider).then(async (result) => {
          this.login(result);
        }).catch(error => {
          console.error(error.message);
        });
      },

      async login(result) {
        const loading = this.$vs.loading({type: 'scale',color: 'rgb(51,178,122)'})
        try {
          console.log('Usuario logueado: ', result.user);
          const userIsRegistered = await getUserFromDatabase(result.user.email);
          this.storeUser(result);
          loading.close();
          if (userIsRegistered) {
            $nuxt.$router.push({path: `/home`});
          } else {
            this.newUser = result.user;
            this.dialogFormVisible = true;
          }
        } catch (e) {
          console.error(e);
          loading.close();
        }
      },

      storeUser(result) {
        this.$store.commit('user/saveUser', {
          email: result.user.email,
          photo: result.user.photoURL,
          name: result.user.displayName,
          token: result.credential.accessToken
        });
      },

      saveNewUser(result) {
        // FIXME: Debería consultar al nodo central si hay un usuario con esa cédula
        saveUser(this.newUser);
        $nuxt.$router.push({path: `/account/profile`});
      },

      dontSaveNewUser() {
        this.dialogFormVisible = false;
        this.$store.commit('user/saveUser', null);
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
        width:300px;
        padding:8em 2em;
        margin:auto;
        display:grid;
        justify-content: center;
        background-color: var(--div-color-op);
        border-radius: 0px 20px 20px 20px;
        h2{
            margin:auto;
            padding-bottom:1em;
        }
        .btn-login{
            width:200px;
        }
    }

    
</style>
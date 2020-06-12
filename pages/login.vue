<template>
  <div>
   
   <a  rel="nofollow" @click="loginWithGoogle">
                <img :src=google class="image">
                Continuar con Google
    </a>

    <!-- DIÁLOGO -->
    <!--<div >
      <form>
          <input v-model="newUser.idDocument" autocomplete="off" >
       
        <div style="display: flex;">
          <button @click="dontSaveNewUser">Cancelar</button>
          <button type="primary" @click="saveNewUser">Continuar</button>
        </div>
      </form>
    </div>-->
    <!-- FIN DIÁLOGO -->


  </div>
</template>



<script>
  import icons from '@/components/icons';
  import firebase from '../plugins/fireinit';
  import { getUserFromDatabase, saveUser } from "../shared/user";

  export default {
    //layout: 'nobar',
    data() {
      let validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Por favor, ingresa usuario'));
        } else {
          if (this.ruleForm.pass !== '') {
            this.$refs.ruleForm.validateField('pass');
          }
          callback();
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Por favor, ingresa una contraseña'));
        }
        callback();
      };
      return {
        fullscreenLoading: false,
        google: icons.Google,
        facebook: icons.Facebook,
        loading: false,
        ruleForm: {
          user: '',
          pass: '',
        },
        rules: {
          user: [
            { validator: validateUser, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        },
        dialogFormVisible: false,
        newUser: null
      };
    },
    methods: {

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      openFullScreen1() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000);
      },

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
       // this.$vs.loading({type: 'point'});
        try {
          console.log('Usuario logueado: ', result.user);
          const userIsRegistered = await getUserFromDatabase(result.user.email);
          console.log("pasé");
          this.storeUser(result);
          //this.$vs.loading.close();
          if (userIsRegistered) {
            $nuxt.$router.push({path: `/home`});
          } else {
            this.newUser = result.user;
            this.dialogFormVisible = true;
           //saveUser(this.newUser);
          }
        } catch (e) {
          console.error(e);
          //this.$vs.loading.close();
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
        $nuxt.$router.push({path: `/account/edit`});
      },

      dontSaveNewUser() {
        this.dialogFormVisible = false;
        this.$store.commit('user/saveUser', null);
      }
    }
  }
</script>



<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

  .container {
    justify-content: center;
    height: 100vh;
    align-items: center;
  }

  .el-container {
    display: grid;
    grid-template-columns: 400px auto;
    grid-gap: 20px;
    padding: 40px;
    width: 100%;
  }

  .el-form-item__label {
    padding:0 0 0px !important;
  }

  .el-form-item{
    margin-bottom:13px
  }

  .el-row {
    text-align:center
  }

  form {
    margin-top: 4%;
  }

  button {
    margin-top: 5% !important;
    width:100%
  }

  .card {
    max-width: 400px;
    width: 100%;
  }

  .form-container {
    padding: 30px;
  }

  .title{
    font-size: 22px;
  }

  .subtitle {
    font-size: 14px;
    text-align:right
  }

  span {
    /*font-family: 'Roboto', sans-serif;*/
  }

  a {
    width:100%;
    text-decoration: none;
  }

  .image{
    fill: currentColor;
    height: 13px;
    width: 13px;
    vertical-align: middle;
    margin-top: -3px;
    margin-right: 2px;
  }

  .link{
    vertical-align: unset;
    text-align: left;
  }

  #illustration {
    width: inherit;
    max-height: 80vh;
  }

  #logo {
    height: 30px;
  }

  @media screen and (max-width: 500px) {
    .card {
      height: 100%;
    }
  }

  @media screen and (max-width: 500px) {
    .el-container {
      display: flex;
      padding: 0;
    }

    #illustration {
      visibility: hidden;
    }
  }
</style>

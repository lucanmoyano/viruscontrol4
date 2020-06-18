<template>
    <div id="container">
        <div id="start" @click="Home">
            <img src="@/assets/logo/Logo.svg" alt="viruscontrol" id="logo">
        </div>
        <div id="center">

            <vs-button
                icon
                transparent
                class="boton"
                @click="Home"
            >
                <i v-if="active1===true" class='bx bxs-home-heart' ></i>
                <i v-else class='bx bx-home-heart' ></i>
            </vs-button>

       
        <div v-if="usuario!==false && usuario!==null &&  typeof userType!='undefined' && userType!=null && userType=='Ciudadano'"  style="display:flex"> 
            <!-- Citizen -->
             <vs-button
                icon
                transparent
                class="boton active"
            >
                <i class='bx bx-news' ></i>
            </vs-button>

             <vs-button
                icon
                transparent
                class="boton"
            >
                <i class='bx bx-map-alt' ></i>
            </vs-button>

            <vs-button
                icon
                transparent
                class="boton"
                @click="ExamResult"
            >
                <i class='bx bxs-vial'></i>
            </vs-button>

             <vs-button
                icon
                transparent
                class="boton"
                @click="Resources"
            >
                <i class='bx bx-store-alt'></i>
            </vs-button>
        </div>

        <div v-if="usuario!==false && usuario!==null && typeof userType!='undefined' && userType!=null && userType=='Doctor'" style="display:flex">
            <!-- Doctor -->
             <vs-button
                icon
                transparent
                class="boton"
                @click="PatientList"
            >
                <i class='bx bxs-calendar-plus'></i>
            </vs-button>

             <vs-button
                icon
                transparent
                class="boton"
                @click="ExamRequest"
            >
                <i class='bx bxs-vial'></i>
            </vs-button>
        </div>
            

        </div>
        <div id="end" v-if="user!==null && user!==false">
        <vs-button
        transparent
        class="avatar-boton"
        @click="navigateEditAccount"
      >
        <img :src="user.photo" id="avatar"> <p style="font-size: 12px;">{{ user.name }}</p>
      </vs-button>

      <vs-button
        icon
        transparent
        circle
      >
        <i class='bx bxs-bell' ></i>
      </vs-button>
        </div>

        <div v-else id="login-container"> 
            <div @click="navigateLogin">Iniciar sesión</div>
        </div>

    </div>
</template>


<script>
import { getUserFromDatabase, saveUser } from "@/shared/user";
import firebase from "@/plugins/fireinit";

export default {
    firestore() {
        const loggedUser = this.$store.state.user.loggedUser;
        return {
        usuario: getUserFromDatabase(loggedUser.email)
    }
    },
    data:()=>({
       // userType:'doctor',
        active1:true,
        active2:false,
        active3:false,
        active4:false,
        usuario:null
    }),
    computed: {
      user() {
          console.log(this.$store.state.user.loggedUser)
        return this.$store.state.user.loggedUser;
      },
      userType() {
        return this.usuario.userType?.showName ?? "-";
      }
    },
    methods:{
        Home() {
            $nuxt.$router.push({ path: `/home` });
        },
        /* Ciudadano */
        Resources(){
            $nuxt.$router.push({ path: `/resources` });
        },
        ExamResult(){
            $nuxt.$router.push({ path: `/citizen/exams/result` });
        },

        /* Medico */
        PatientList(){
            $nuxt.$router.push({ path: `/doctor/patient/list` });
        },
        ExamRequest(){
            $nuxt.$router.push({ path: `/doctor/exams/request` });
        },
        navigateEditAccount() {
        $nuxt.$router.push({ path: `/account/profile` });
        },
        navigateLogin() {
        $nuxt.$router.push({ path: `/login` });
      },
      logout() {
        this.$notify({
          title: 'Notificación',
          message: `Se cerró la sesión de ${this.user.name}`,
          position: 'bottom-right'
        });
        this.$store.commit('user/deleteUser');
      }
    },
    async mounted(){
      //const loading = this.$vs.loading({type: 'scale',color: 'rgb(51,178,122)'})
      try {
        const loggedUser = this.$store.state.user.loggedUser;
        if (loggedUser) {
          const savedUser = await getUserFromDatabase(loggedUser.email);
          this.usuario = savedUser;
        } else {
          this.usuario = false;
        }
      } finally {
        //loading.close();
      }
    }

    }
</script>

<style scoped lang="scss">
@import '@/shared/variables.css';

    #container{
        width:100%;
        background-color:var(--header-background);
        display:flex;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 101;
        transition: box-shadow .1s ease 0s;
        box-shadow: var(--header-border-bottom);
        #start{
            width:20%;
            margin: auto;
            padding-top:.5rem;
            #logo{
                padding-left:5em;
                max-height:29px;
                width: auto;
                -webkit-transition: opacity .1s ease-out;
                transition: opacity .1s ease-out;
                cursor: pointer;
            }
        }
        #center{
            width:60%;
            display:flex;
            justify-content:center;
            .vs-button--icon .vs-button__content {
            padding: 8px 21px !important;
            }
            .boton{
               padding: 0px 21px !important;
            }
            .vs-button--icon i{
                font-size: 1.8rem !important;
            }
            .vs-button--transparent{
                margin-bottom: 0px;
                border-bottom-left-radius:0px;
                border-bottom-right-radius:0px;
            }
            .active {
                border-bottom: 2px solid var(--front-color) !important;
            }
            
        }
        #end{
            width:20%;
            margin: auto;
            padding-top:.2rem;
            display:flex;
            .avatar-boton{
               font-weight: 600;
               font-size:16px;
               
            }
            #avatar{
                width:32px;
                height:auto;
                border-radius:50%;
            }
            .vs-button--icon i{
                font-size: 1.45rem !important;
            }
        }
        #login-container{
            width:20%;
            margin: auto;
            padding-top:.2rem;
            display:flex;
            cursor: pointer;
            color: var(--front-color);
        }
    }
</style>
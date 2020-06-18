<template>
    <div id="container">
        <div id="start">
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


        <div v-if="userType=='citizen'">
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


        <div v-if="userType=='doctor'" style="display:flex">
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
        <div id="end">
        <vs-button
        transparent
        class="avatar-boton"
      >
        <img :src="img" id="avatar"> {{user.name}}
      </vs-button>

      <vs-button
        icon
        transparent
        circle
      >
        <i class='bx bxs-bell' ></i>
      </vs-button>


            
        </div>
    </div>
</template>


<script>

export default {
    data:()=>({
        userType:'doctor',
        active1:true,
        active2:false,
        active3:false,
        active4:false,
        img:'https://www.xtrafondos.com/wallpapers/naruto-uzumaki-3623.jpg',
        user:{
            name:'Lucas'
        }
    }),
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
    }
</style>
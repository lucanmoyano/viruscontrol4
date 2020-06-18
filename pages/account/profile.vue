<template>
    <div class="container-profile">
        <div class="p-header">
            <!--<div class="p-container-back">
                <img :src=back class="p-back">
            </div>-->
            <h2 class="p-title">Editar perfil</h2>
        </div>


        <div v-if="user!=null">
                 <div class="content">
                    <div class="profile-info-header">
                        <vs-avatar size="100" badge badge-color="success">
                            <img id="profile-pic" :src="user.photo">
                        </vs-avatar>
                      <div class="profile-info">
                        <div class="profile-info-header-title">
                          {{ user.name }}
                        </div>
                        <div class="profile-info-header-subtitle">
                          <div>{{user.email}}</div>
                          <div>{{ user.idDocument }}</div>
                          <div style="font-weight: bold">{{ userType }}</div>
                        </div>
                      </div>
                    </div>

                    <div class="divider"></div>

                    <vs-input v-model="user.email" placeholder="Email">
                        <template #icon>
                            <i class='bx bxs-envelope'></i>
                        </template>
                    </vs-input>

                    <vs-input v-model="user.phone" placeholder="Teléfono">
                        <template #icon>
                            <i class='bx bxs-phone'></i>
                        </template>
                    </vs-input>

                    <vs-input v-model="user.address" placeholder="Dirección">
                        <template #icon>
                            <i class='bx bxs-home-smile' ></i>
                        </template>
                    </vs-input>

                    
                    <div class="inline-content">
                        <div class="gender">
                            <vs-select placeholder="Género" v-model="user.gender"
                            >   
                                <vs-option  v-for="(item, i) in genderOptions" :key="i"
                                :value="item"
                                :label="item"
                                >
                                {{item}}
                                </vs-option>
                            </vs-select>
                        </div>
                        <div class="date">
                            <vs-input
                                v-model="user.birthDate"
                                placeholder="Fecha de nacimiento"
                                onfocus="(this.type='date')"
                                onfocusout="(this.type='text')"
                            />
                        </div>
                    </div>

                    <div class="submit-buttons-container">
                      <vs-button color="primary" type="filled" @click="updateUser"
                      size="large"
                        >Guardar</vs-button
                      >
                    </div>

                  </div>
                </div>
               <div v-else>
                  <h3>No hay usuario</h3>
                </div>

    </div>
</template>


<script>
import icons from '@/components/icons';
import { getUserFromDatabase, saveUser } from "../../shared/user";
import firebase from "../../plugins/fireinit";

export default {
    firestore() {
      const loggedUser = this.$store.state.user.loggedUser;
      return {
        user: getUserFromDatabase(loggedUser.email)
      }
    },
    data:()=>({
        back:icons.Back,
        genderOptions:["Hombre", "Mujer", "Otro"],
        user:null
    }),
    computed: {
      userType() {
        return this.user.userType?.showName ?? "-";
      }
    },
    methods:{
        async updateUser(){
          const loading = this.$vs.loading({type: 'scale',color: 'rgb(51,178,122)'})
          try {
            console.log('Guardar usuarioo');
            await saveUser(this.user);
          } finally {
            loading.close();
          }
        }
    },
    async mounted(){
      const loading = this.$vs.loading({type: 'scale',color: 'rgb(51,178,122)'})
      try {
        const loggedUser = this.$store.state.user.loggedUser;
        if (loggedUser) {
          const savedUser = await getUserFromDatabase(loggedUser.email);
          this.user = savedUser;
        } else {
          this.user = false;
        }
      } finally {
        loading.close();
      }
    }
}
</script>

<style lang="scss">
//@import "@/assets/styles/account.scss";
//@import "../../shared/variables.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
    .divider{
        border: 1px solid rgba(var(--b6a,219,219,219),1);
        height: 1px;
    }

    .container-profile{
        width:60%;
        overflow:hidden;
        margin:auto;
        background-color: white;
        border: 1px solid rgba(var(--b6a,219,219,219),1);
        padding: 2.1rem;
        padding-top:3%;
        height: 100vh;
  }

    .p-header{
        width:100%;
        //display:flex;
        border-bottom: 1px solid rgba(219,219,219,1);
        padding-bottom: 0.5em;
        display: inline-flex;
        //align-items: center;
        margin-bottom: 1em;
        .p-title{
        width:80%;
        //padding: 9px;
        padding-left: 1em;
        margin-bottom: 0em;

        }

        .p-container-back{
        cursor:pointer;
        padding: 9px;
        //background-color: red;
        .p-back{
            width:20px;
            height:20px;
        }
        .p-back:active {
            opacity: 0;
            transition: all 0.8s;
            
        }

        }
    }

 .content {
  font-family: "Roboto", sans-serif;
  display: grid;
  grid-gap: 10px;
  padding: 20px;

  .profile-info-header {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px 20px;
    width: fit-content;

    #profile-pic {
      /*width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;*/
        width: 100px;
        height: 100px;
        object-fit: cover;
    }

    .profile-info {
      display: grid;
      grid-gap: 10px;

      .profile-info-header-title {
        font-size: 2em;
        font-weight: bold;
        //color: var(--front-color);
      }

      .profile-info-header-subtitle {
        //color: var(--secondary-color);
      }

    }
  }

  .inline-content {
    display: flex;
    justify-content: space-between;
    .gender{
        width:60%;
        max-width:500px;
    }
    .date{
        width:30%;
        max-width:200px;
    }
  }

  .submit-buttons-container {
    margin-top: 20px;
    display: grid;
    grid-auto-flow: column;
    width: 100%;
    justify-content: flex-end;
  }
}

@media only screen and (max-width: 600px) {
        .container-profile{
            width:100%;
            padding:0rem;
            padding-top:20%;
            height: 100vh;
        }

        .gender{
            width:50%;
            max-width:500px;
        }
        .date{
            width:40%;
            max-width:500px;
        }
}

</style>
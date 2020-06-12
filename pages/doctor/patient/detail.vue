<template>
  <div class="container-detail">
  <div class="p-header">
    <div class="p-container-back">
      <img :src=back class="p-back">
    </div> 
    <h2 class="p-title">Visita</h2>
  </div>

  <div class="p-container">
   
    <div class="d-right">
      <div class="vs-table__header">
        <h3>Datos del paciente</h3>
      </div>
      <p class="p-info">Nombre: <span class="p-info-text">{{user.name}}</span> </p>
      <p class="p-info">Apellido: <span class="p-info-text">{{user.lastname}}</span> </p>
      <p class="p-info">Edad: <span class="p-info-text">{{user.age}}</span>  </p>

    <!--<div class="title-info">-->
      <div class="vs-table__header">
        <h3>Datos de la visita</h3>
      </div>
      <p class="p-info">Fecha : </p>
      <p class="p-info">Horario: </p>
      <p class="p-info">Sintomas: </p>
      <p class="p-info">Ubicación: </p>
    </div>

     <div class="d-left">
      <img class="imagen" src="https://image.winudf.com/v2/image/Y29tLmFuZHJvbW8uZGV2NjYwNjE0LmFwcDcxOTAxN19zY3JlZW5fMF8xNTIyODYzNjE4XzA5OQ/screen-0.jpg?fakeurl=1&type=.jpg" alt="avatar"> 
    </div>

  </div>


    <!--<vs-button @click="popupActivo=true" color="primary" type="border" style="margin-top:40%">Open Default popup</vs-button>
    <vs-popup class="holamundo"  title="Ubicación" :active.sync="popupActivo">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

      </p>
    </vs-popup>-->
  </div>
</template>

<script>
import icons from '@/components/icons';

export default {
  data(){
    return {
      popupActivo:false,
      back:icons.Back,
      user:{
        name:'Lucas',
        lastname:'Moyano Pérez',
        age:24,
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .container-detail{
        width:60%;
        overflow:hidden;
        margin:auto;
        background-color: white;
        border: 1px solid rgba(var(--b6a,219,219,219),1);
        padding: 2.1rem;
        padding-top:7%;
        height: 100vh;
  }
  .vs-table__header{
      margin-top:1rem;
      margin-bottom:1rem;
      padding-left:1rem;
  }

  .p-container{
     display:flex;

    .title-info{
      width:100%;
      background-color:#FBFBFB;
        margin-bottom:1rem;
        margin-top:1rem;
      //height:46px;
      h2{
        //font-family:MontserratThin;
        padding: 10px;
        //font-weight: 500;
        font-size: 18px;
      }
    }

    .d-left{
      float:right;
      width:35%;
      padding-left: 5em;
      .imagen{
        width: 130px;
        height: 180px;
        object-fit: cover;
        border-radius: 8px;
        margin-top:30%
      }
    }

    .d-right{
      //float:left;
      width:60%;
      padding-left: 1em;
      p{
          padding-left:2rem;
      }
      .p-info{
        width:100%;
        font-size:16px;
        font-weight: 500;
        .p-info-text{
          font-weight: 400;

        }
      }
    }

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

   @media only screen and (max-width: 930px){
      .p-container{
        .d-left{
          display:none;
        }

        .d-right{
            width:100% !important; 
            padding-left: 0em;
            .title-info{
                h2{
                    padding-left:1rem;
                }
            }
            
          }
        }
        .p-header{
          padding-left: 1em;
        }
   }

  @media only screen and (max-width: 600px) {
        .container-detail{
            width:100%;
            padding:0rem;
            padding-top:20%;
            /*position: absolute;
            top: 0;
            bottom: 0;*/
            height: 100vh;
        }
        .p-container{
        .d-left{
          display:none;
        }

        .d-right{
            width:100% !important; 
            padding-left: 0em;
            .title-info{
                h2{
                    padding-left:1rem;
                }
            }
            
          }
        }
        .p-header{
          padding-left: 1em;
        }
        
     }

</style>
<template>
  <div class="container-exams">
  <div class="p-header">
    <div class="p-container-back">
      <img :src=back class="p-back">
    </div> 
    <h2 class="p-title">Solicitar examen</h2>
  </div>

  <div class="p-container">
    
    <div class="vs-table__header">
        <h3>Datos del paciente</h3>
    </div>

    <div class="form-exam">
        <vs-input
        id="ci-input"
        placeholder="Cédula de identidad"
        v-model="value"
        autocomplete="off"
        >
        <template #icon>
        <i class='bx bxs-id-card'></i>
        </template>
      </vs-input>


    <vs-select
    id="disease-input"
    style="margin-top:2em"
        placeholder="Posible enfermedad"
        v-model="value1"
        color="success"
      >
        <vs-option label="Vuesax" value="1">
          Vuesax
        </vs-option>
        <vs-option label="Vue" value="2">
          Vue
        </vs-option>
        <vs-option label="Javascript" value="3">
          Javascript
        </vs-option>
      </vs-select>





        <vs-button
        style="width:300px;margin-top: 25vh;background-color:rgb(51,178,122)"
        size="large"
        flat
        success
        :active="active == 0"
        @click="active = 0"
      >
        Enviar
      </vs-button>
    </div> 
   
   
    </div>
    


    

  </div>
</template>

<script>
import icons from '@/components/icons';

export default {
  data(){
    return {
        value1:'',
        active: 0,
        value:'',
      popupActivo:false,
      back:icons.Back,
      check:false,
      active2:false,
      user:{
        name:'Lucas',
        lastname:'Moyano Pérez',
        age:24,
    },
    }
    },
    methods:{
        endVisit(){
            const noti = this.$vs.notification({
            flat: true,
            color:'success',
            position:'bottom-right',
            title: 'Visita finalizada con éxito',
          })
          this.check=true;
          this.active2=false;
        },
        cancelVisit(){
            this.check=false;
            this.active2=false;
        }
    }
  
}
</script>

<style scoped lang="scss">
  .container-exams{
        width:60%;
        overflow:hidden;
        margin:auto;
        background-color: white;
        border: 1px solid rgba(var(--b6a,219,219,219),1);
        padding: 2.1rem;
        padding-top:7%;
        height: 100vh;
  }

  .p-container{
      width:100%;
      
      .form-exam{
          padding-left:1.3rem;
          margin-top:3rem;
          width:90%;
          input{
              width:100%
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

  @media only screen and (max-width: 600px) {
      
        .container-exams{
            width:100%;
            padding:0rem;
            padding-top:20%;
            /*position: absolute;
            top: 0;
            bottom: 0;*/
            height: 100vh;
        }
        
        .p-header{
          padding-left: 1em;
        }
        
     }

</style>
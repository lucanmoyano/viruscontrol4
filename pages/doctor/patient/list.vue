<template>
  <div class="container-list">
  <div class="p-header">
    <div class="p-container-back">
      <img :src=back class="p-back">
    </div> 
    <h2 class="p-title">Pacientes</h2>
  </div>

  <div class="p-container">
      <vs-select @change="filtroLista" placeholder="Select" v-model="value" class="vs-table__header" id="patient-list">
        <vs-option label="Lista de visitas pendientes" value="1">
          Lista de visitas pendientes
        </vs-option>
         <vs-option label="Lista de visitas finalizadas" value="2">
           Lista de visitas finalizadas
        </vs-option>
      </vs-select>
    
    <!--lista de pacientes-->
    <div class="p-list" v-for="(u, index) in pacientes" :key="index" > 
        <div class="p-list-img">
            <vs-avatar size="60">
            <img :src="u.photo" alt="">
            </vs-avatar>
        </div>
        <div class="p-list-container">
        <div class="p-list-detail">
            <p>{{u.name}}</p>
            <p>{{u.date}} - {{u.hour}} </p>
        </div>
        <div class="p-list-check">
            <vs-checkbox success v-model="check" @change="active2=true">
            </vs-checkbox>
        </div>
        </div>
    </div>
   
    </div>
    


    <!--DIALOG FINALIZAR VISITA-->
    <vs-dialog width="550px" not-center v-model="active2">
        <template #header>
          <h4 class="not-margin">
            Visita finalizada
          </h4>
        </template>
        <div class="con-content">
            <p>Desea dar como finalizada la visita?</p>
        </div>
        <template #footer>
          <div class="con-footer">
            <vs-button @click="endVisit()" >
                Confirmar
            </vs-button>
            <vs-button @click="cancelVisit()" dark transparent>
                Cancelar
            </vs-button>
          </div>
        </template>
      </vs-dialog>

      
  </div>
</template>

<script>
import icons from '@/components/icons';
import data from '@/shared/rest'
import axios from 'axios'

export default {
  data(){
    return {
        link1:data.patientList,
        pacientes:[],

        value:'1',
        search:'',

        popupActivo:false,
        back:icons.Back,
        check:false,
        active2:false,
        user:{
            name:'Lucas',
            lastname:'Moyano Pérez',
            age:24,
        },
    img:'https://www.latercera.com/resizer/LtvijvmL1u8YitU83oC0zhHUz3c=/900x600/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/HCZX4NCJLNGQPJ4WH74GGWZZ6E.jpg'
    }
    },
    methods:{
        async pendientList(){
          const data = await axios.get(this.link1).then(response => {
            this.pacientes = response.data.users;
            })
            .catch(function (error) {
                
            });
        },
        async finList(){
          const data = await axios.get(this.link1).then(response => {
            this.pacientes = response.data.users;
            })
            .catch(function (error) {              
            });

        }, 
        async filtroLista(){
          const loading = this.$vs.loading({type: 'scale',color: 'rgb(51,178,122)'})
          if(this.value==1){
            try{
              await this.pendientList();
            }finally{
              loading.close();
              }
          }
          else{
            try{
              await this.finList();
            }
            finally{
              loading.close();
            }
          }
        },
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
    },
    async mounted(){
      const loading = this.$vs.loading({type: 'scale',color: 'rgb(51,178,122)'})
      try{
        await this.pendientList();
      }finally{
        loading.close();
      }
    }
  
}
</script>

<style scoped lang="scss">
    .con-footer{
        display: flex;
        align-content: flex-end;
        justify-content: flex-end;
    }

  .container-list{
        width:60%;
        overflow:hidden;
        margin:auto;
        background-color: white;
        border: 1px solid rgba(var(--b6a,219,219,219),1);
        padding: 2.1rem;
        padding-top:5%;
        min-height: 100vh;
  }

  .p-container{
      width:100%;
      .p-list{
          margin-left:1rem;
          margin-top:2rem;
          display:flex;
          //align-items: center;
          .p-list-img{
              margin-bottom:0.5rem;
              img{
                width: 70px;
                object-fit: cover;
                height: 70px;
              }
          }
          .p-list-container{
              display:flex;
              width:90%;
              margin-left:1rem;
              align-items:center;
              border-bottom: 1px solid rgba(219,219,219,1);
              margin-right:1rem;
              padding-bottom:0.5rem;
          .p-list-detail{
              width:90%;
          }
          .p-list-check{
              width:10%;
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

  @media only screen and (max-width: 600px) {
        .container-list{
            width:100%;
            padding:0rem;
            padding-top:20%;
            /*position: absolute;
            top: 0;
            bottom: 0;*/
            min-height: 100vh;
        }
        
        .p-header{
          padding-left: 1em;
        }
        
     }

</style>
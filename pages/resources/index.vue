<template>
    <div class="container-r">
        <div class="p-header">
            <div class="p-container-back">
                <img :src=back class="p-back">
            </div> 
            <h2 class="p-title">Recursos</h2>
        </div>

        <div class="head-search">
            <vs-input
            success
            icon-after
            id="search-r"
            class="search-input"
            v-model="value3"
            placeholder="Buscar recursos" >
                <template #icon> 
                    <i class='bx bx-search'></i>
                </template>
            </vs-input>

           
            <vs-button
                size="small"
                circle
                transparent
                :active="active == 0"
                 @click='activeDialog()'
                >
                <i class='bx bx-slider-alt'></i> Filtros
            </vs-button>
            <vs-button
                size="large"
                circle
                transparent
                :active="active == 0"
                @click="active = 0"
                >
                <i class='bx bxs-bell'></i>
            </vs-button>
        </div>

        <!--Recursos-->
        <div class="resource-container">
            <div class="card-resource" v-for="item in resources" :key="item.name" style="margin-bottom:2%;">
                    <div  class="image-container">
                    <img :src=item.image class="image">
                    </div>
                    <div style="padding: 14px;">
                    
                    <span v-if="undefined!=item.name && item.name.length<23" style="font-weight:500"> {{item.name}} </span>
                    <span v-else style="font-weight:500"> {{item.name.substring(0,15)+"..."}} </span>
                    <div class="bottom">
                        <span style="color: #838383; font-size: 0.8rem;" >Precio</span>
                    </div>
                    <span style="font-size: 1rem;color:#00B884;">${{item.price}} </span>
                    </div>
                </div>
        </div>
        <!--Fin Recursos-->


        <!--DIALOGO FILTRO-->
        <vs-dialog overflow-hidden v-model="filter.active" prevent-close>
        <template #header>
          <h4 class="not-margin">
            Filtrar <b>Recursos</b>
          </h4>
        </template>
        

        <div class="con-form">
          <vs-input v-model="filter.input1" loading placeholder="Ubicación">
            <template #icon>
                <i class='bx bxs-navigation'></i>
            </template>
          </vs-input>         

             <div>
                <vs-select
                filter
                multiple
                placeholder="Enfermedades"
                v-model="value2"
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
                    <vs-option label="Sass" value="4">
                    Sass
                    </vs-option>
                    <vs-option label="Typescript" value="5">
                    Typescript
                    </vs-option>
                    <vs-option label="Webpack" value="6">
                    Webpack
                    </vs-option>
                    <vs-option label="Nodejs" value="7">
                    Nodejs
                    </vs-option>
                </vs-select>
            </div>

          <div class="center">
            <p style="width:100%">Tipo de recurso</p> 
                <div class="center-check">
                    <vs-checkbox v-model="filter.option1s">
                        {{ filter.option1 }}
                    </vs-checkbox>
                    <vs-checkbox v-model="filter.option2s">
                        {{ filter.option2 }}
                    </vs-checkbox>
                </div>
            </div>
           
        </div>
        
        <template #footer>
          <div class="footer-dialog">
            <vs-button block size="large">
              Filtrar
            </vs-button>
          </div>
        </template>
      </vs-dialog>
    <!--FIN DIALOGO FILTRO-->



    </div>
</template>

<script>

import icons from '@/components/icons'
import axios from 'axios';

export default {
    data:()=>({
        back:icons.Back,
        value3:'',
        active: 1,
        value:'',
        value2:'',
        filter:{
            active: false,
            input1:'',
            input2:'',
            option1:'Prevención',
            option2:'Tratamiento',
            option1s:false,
            option2s:false,
        },
        resources:null,
    }),
    methods:{
        activeDialog(){
            this.filter.active = true;
        },
        async loadResources(){
            const data = await axios.get('https://my-json-server.typicode.com/lucanmoyano/testjson/db').then(response => {
            this.resources = response.data.resources;
            console.log(this.resources);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    async mounted(){
        const loading = this.$vs.loading({type: 'scale',color: 'rgb(51,178,122)'})
   
        try {     
            await this.loadResources();
        } finally {
            loading.close();
        }
    }
}
</script>

<style scoped lang="scss">
    .container-r{
        width:60%;
        overflow:hidden;
        margin:auto;
        background-color: white;
        border: 1px solid rgba(var(--b6a,219,219,219),1);
        padding: 2.1rem;
        padding-top:5%;
        margin-bottom:10%;
    }
    .head-search{
        width:100%;
        display:flex;
        margin:auto;
        align-items: center;
        justify-content: center;
    }    
    .search-input{
        width:300px
    }
    .center{
        display:grid;
        align-items: center;
        //justify-content: center;
        margin-top:8px;
        margin-bottom:8px;
        .center-check{
            display:flex
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

    .resource-container{
        padding-top:2rem;
        padding-bottom:5rem;
        display: grid;
        justify-content: center;
        //justify-content: space-between;
        grid-template-columns:200px 200px 200px;
        grid-gap: 35px;
        
       
    }

    //CARD
    .card-resource{
    max-width: 13rem;
    cursor:pointer;
    padding-bottom: .5rem;
    position: relative;
    height: 18.531rem;
    border:none;
    background: none;
  }

  .bottom{
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width:100%;
    position: absolute;
    display: block;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    max-width: 70%!important;
    max-height: none!important;
  }

  .image-container {
    background: white;
    position: relative;
    height: 13rem;
    width: 100%;
    box-shadow: 0 3px 10px 0 rgba(0,0,0,.1);
    //border: 1px solid #e7ebf3;
    border-radius:8px;
    /*border-bottom: 1px solid rgba(var(--b6a,219,219,219),1);*/
    transition: 300ms;
  }

  .image-container:hover{
    opacity: 0.7;
}

    @media only screen and (max-width: 1200px) {
         .container-r{
        width:70%;
        }
        .resource-container{
        padding-top:2rem;
        padding-bottom:5rem;
        display: grid;
        justify-content: center;
        grid-template-columns:200px 200px 200px;
        grid-gap: 20px;
        
       
    }
    @media only screen and (max-width: 970px) {
         .container-r{
        width:70%;
        }
        .resource-container{
            justify-content: center;
             grid-gap: 0px;
            .image-container{
                max-width: 10rem;
                height:10rem;
            }
            .card-resource{
                max-width: 10rem;
            }
        }   
    }
    }
    @media only screen and (max-width: 800px) {
         .container-r{
        width:100%;
        }
    }

     @media only screen and (max-width: 600px) {
         .container-r{
        width:100%;
        padding:0.4rem;
        padding-top:20%;
        }
        /* .search-input{
             width:100%
         }*/
     
     .resource-container{
        padding-top:2rem;
        padding-bottom:5rem;
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 10px;
        .image-container{
         max-width: 10rem;
         height:10rem;
     }
        .card-resource{
            max-width: 10rem;
        }
    }
}
     

</style>
<template>
  <div class="container-exam">
       <!-- <div class="exam-header">
            <div class="profile-pic-container">
                <img id="profile-pic"  src="https://i1.wp.com/www.sopitas.com/wp-content/uploads/2016/10/nintendo-64-logo.jpg"/>
            </div>
            <div class="profile-info">
                <div class="name"> <h1>Lucas Moyano</h1> </div>
                <div class="ci"> <h4>5.129.435-9</h4> </div>
                <div class="title"> <h2>Resultados de mis examenes</h2> </div>
            </div>
        </div>-->
        <div class="p-header">
            <div class="p-container-back">
                <img :src=back class="p-back">
            </div> 
            <h2 class="p-title">Mis examenes</h2>
        </div>

        <div class="exam-bottom">
      
      <vs-table v-model="selected" striped>
      <template slot="header">
            <h3>
            Resultados
            </h3>
        </template>
        <template #thead>
          <vs-tr>
            <vs-th style="width:140px"> 
              Fecha
            </vs-th>
            <vs-th >
              Enfermedad
            </vs-th>
            <vs-th>
              Resultado
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in exams"
            :data="tr"
            @selected="handleSelected"
           
          >
            <vs-td>
              {{ tr.date }}
            </vs-td>
            <vs-td>
            {{ tr.disease }}
            </vs-td>
            <vs-td>
            {{ tr.isPositive }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>




    </div>

  </div>
</template>

<script>
import icons from '@/components/icons'
import axios from 'axios';

export default {
  data:()=>({
    back:icons.Back,
    exams:[],
    selected:[],
   
  }),
  methods:{
    handleSelected(tr) {
      /*this.$vs.notify({
        //title:`Examen`,
        text:'Descargando PDF...'
      })*/
      console.log(tr);
      this.generatePDF();
    },
    doubleSelection(tr) {
      this.$vs.notify({
        //title:`Double Selection ${tr.username}`,
        text:`Email: ${tr.email}`,
        color: 'success'
      })
    },
    generatePDF(){
        const jsPDF = require('jspdf') 
         var imagen='data:image/png;base64,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'

        var doc = new jsPDF()

        doc.addImage(imagen, 'PNG', 20,12,32,6)

        doc.setFontSize(24)
        doc.text(20, 28, 'CORONAVIRUS TEST')


        doc.setFontSize(15)
        doc.text(20, 48, 'Reporte final')
        doc.setLineWidth(0.5)
        doc.line(20, 50.5, 120, 50.5)
        doc.setFontSize(9)
        doc.text(20, 60, 'Nombre: ' + 'Lucas Moyano')
        doc.text(20, 65, 'Cédula de identidad: ' + '1.111.111-1')
        doc.text(20, 70, 'Fecha de nacimiento: '+'20 de Noviembre de 1995')
        doc.text(20, 75, 'Fecha de evaluación: '+ '22 de Mayo de 2020')
        doc.text(20, 80, 'Médico consulta '+ 'Dr. House')

        doc.setLineWidth(0.5)
        doc.line(20, 90.5, 120, 90.5)


        doc.rect(20, 110, 100, 30)
        doc.setFontSize(13)
        doc.text(30, 118, 'Resultado test por Coronavirus')

        doc.setLineWidth(0.3)
        doc.line(20, 121, 120, 121)

        doc.setLineWidth(0.3)
        doc.line(55, 121, 55, 140)

        doc.setFontSize(13)
        doc.text(30, 130, 'Negativo')
        doc.setFontSize(13)
        doc.text(60, 130, 'No se detecto')
        doc.text(60, 135, 'Covid-19')
        doc.save("testcovid-19")
        },
    async loadTestResult(){
        const data = await axios.get('https://my-json-server.typicode.com/lucanmoyano/resultexamjson/db').then(response => {
            this.exams = response.data.exams;
            console.log(this.testResult);
            console.log(this.exams);
            //this.loading = false;
        })
        .catch(function (error) {
            console.log(error);
        });
    },
  },
  async mounted(){
    const loading = this.$vs.loading({type: 'scale',color: 'rgb(51,178,122)'})
   
    try {     
        await this.loadTestResult();
    } finally {
        loading.close();
    }
  }
}
</script>

<style scoped lang="scss">
    .container-exam{
         width:60%;
        overflow:hidden;
        margin:auto;
        background-color: white;
        border: 1px solid rgba(var(--b6a,219,219,219),1);
        padding: 2.1rem;
        padding-top:5%;
        height: 100vh;
    }
    /*.exam-header{
        width:100%;
        display:flex;
        margin-top:5%;
    }*/

    .exam-bottom{
        width:100%;
        margin-top:5%
    }

    

   /* #profile-pic {
      width: 130px;
      height: 130px;
      object-fit: cover;
      border-radius: 50%;
      float:right;
      margin-right:40px;
      margin-top:10px;
    }

    .profile-info{
        width:60%;
        .name{
            margin-top:30px;
            width:100%;
            margin-bottom: 0rem !important;
        }
        .ci{
            margin-bottom:30px;
            width:100%
        }
        .title{
        width:100%
        }
    }
    .profile-pic-container{
        width:40%
    }*/

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
        .container-exam{
            width:100%;
            padding:0rem;
            padding-top:20%;
            /*position: absolute;
            top: 0;
            bottom: 0;*/
            height: 100vh;
        }
        /*#profile-pic {
            width: 70px;
            height: 70px;
            object-fit: cover;
            border-radius: 50%;
            float:right;
            margin-right:40px;
            margin-top:30%
        }
        .exam-header{
        margin-top:18%;
        }*/

        th{
            max-width:170px;
            width:170px
        }
    }

</style>
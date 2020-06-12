<template>
  <div>
    <nuxt />
  </div>
</template>



<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
@import '@/shared/variables.css';
body{
  font-family: 'Poppins', sans-serif;
  background-color: var(--background-color);
}
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

/*VUESAX */

#search-r{
  #vs-input--search-r{
    width:100%;
  }

     .vs-checkbox-label{
        font-size:.8rem;
        }
    .vs-input-content{
        margin: 10px 0px;
        width: calc(100%);
        }

.content{
  .vs-input{
    width:100% !important;
  }
}

  //Search input
   
     
 
}
/*.vs-table__th{
        max-width:140px;
    }*/
     :root {
    --vs-primary: 51,178,122;
    --vs-success: 50,178,121;
    --vs-danger: 242, 19, 93;
    --vs-warn: 255, 130, 0;
    --vs-dark: 36, 33, 69;
  }

    .vs-input{
      height:40px !important;
      width:100% !important;
    }

.con-form{.vs-input{
        width: calc(100%) !important;
    margin: 10px 0px !important;
      }
    }

    #ci-input{
      .vs-input{
        //font-size: 17px;
        width:70%;
        //border: 1px solid rgba(219,219,219,.8);
        width: 300px !important;
      }
    }

    #disease-input{
      .vs-select__input{
        padding-top:0.5em;
        height:40px !important;
        //font-size: 17px;
        //border: 1px solid rgba(219,219,219,.8);
      }
      .vs-select{
        width: 300px !important;
        padding-top:0.3em;
      }
      .vs-select__label--label{
        font-size: 15px;
        
      }
    }

    #search-in{
      .vs-input{
        height:30px !important;
        background-color:white !important;
        font-size: 15px;
         border: 1px solid rgba(219,219,219,.8);
      }
    }

    .vs-select-content{
      max-width:100% !important;
      height:49px;
    }

  #patient-list{
    .vs-select-content{
      max-width:100% !important;
      height:49px;
    }
    .vs-select__input{
      font-size: 1.17em;
      font-weight: bold;
      padding: 0px;
      font-family: 'Poppins', sans-serif;
    }
    }
    
    .vs-input__label{
       font-size:15px;
    }

    @media only screen and (max-width: 600px) {
      #ci-input{
      .vs-input{
        width:100%;
         height:40px !important;
      }
      }
       #disease-input{
        .vs-select{
         height:40px !important;
        }
       }
    }

</style>

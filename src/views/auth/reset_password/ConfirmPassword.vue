<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">

        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Recuperar senha</small>
            {{ route.params.token }}
          </div>
          <form @submit.prevent="submit()" role="form">
            <base-input formClasses="input-group-alternative mb-3" placeholder="E-mail" addon-left-icon="ni ni-email-83" name="email" v-model="form.email" :validate="v$"/>
            <base-input formClasses="input-group-alternative" placeholder="Senha" type="password" addon-left-icon="ni ni-lock-circle-open" name="password" v-model="form.password" :validate="v$"></base-input>
            <base-input formClasses="input-group-alternative" placeholder="Confirme a senha" type="password" addon-left-icon="ni ni-lock-circle-open" name="password_confirmation" v-model="form.password_confirmation" :validate="v$" >
            </base-input>

            <div class="text-center">
              <button class="btn btn-primary" @click.prevent="submit">RECUPERAR</button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <router-link to="/login" class="text-light"><small>Login</small></router-link>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light"><small>Registre-se</small></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {computed, reactive} from "vue";
import { useRoute } from 'vue-router';
import useValidate from '@vuelidate/core';
import {email, helpers, minLength, required, sameAs} from '@vuelidate/validators';
import api from "../../../services";
import router from "../../../router";
import Swal from 'sweetalert2';
import store from "../../../store";

export default {
  name: "confirm-password",
  setup(){
    const route = useRoute();

    const form = reactive({
      email:    '',
      password: '',
      password_confirmation: '',
      token: route.params.token
    });

    const rules = computed(() => {
      return {
        email: {
          required:helpers.withMessage('O campo E-mail é obrigatório', required),
          email:helpers.withMessage('O campo E-mail deve ser um e-mail válido', email)
        },
        password:{
          required:helpers.withMessage('O campo Senha é obrigatório', required),
          minLength:helpers.withMessage('O campo Senha deve ter no mínimo 8 caracteres' ,minLength(8))
        },
        password_confirmation: {
          required:helpers.withMessage('O campo Confirmação de senha é obrigatório', required),
          minLength:helpers.withMessage('O campo Confirmação de senha deve ter no mínimo 8 caracteres' ,minLength(8)),
          sameAs:helpers.withMessage('O campo Senha e Confirmação de senha devem ser iguais' ,sameAs(form.password))
        }
      }
    });

    function submit() {
      this.v$.$validate();

      if(!this.v$.$error){
        try{
          api.get('/sanctum/csrf-cookie').then(response => {
            api.post('/api/auth/reset/confirm-password', form).then((res) => {
              if(res){ console.log(res.data);
                store.dispatch('setUser', res.data.user);
                router.push({name: 'home'});
                Swal.fire('Sucesso', 'Senha alterada com sucesso', 'success');
              }else{
                console.log(res);
                Swal.fire('Erro', 'Ocorreu um erro', 'error');
              }
            }).catch(function(error){
              console.log(error);
            });
          });
        }catch(error){ console.log('caiu no erro')
          Swal.fire('Erro', 'Ocorreu um erro', 'error');
          console.log(error);
        }
      }

    }

    const v$ = useValidate(rules, form);
    return { form, v$, submit, route }

  },

};
</script>
<style></style>

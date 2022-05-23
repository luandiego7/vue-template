<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">

        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Acessar sistema</small>
          </div>
          <form @submit.prevent="submit()" role="form">
            <base-input formClasses="input-group-alternative mb-3" placeholder="E-mail" addon-left-icon="ni ni-email-83" name="email" v-model="form.email" :validate="v$"/>
            <base-input formClasses="input-group-alternative mb-3" placeholder="Senha" type="password" name="password" addon-left-icon="ni ni-lock-circle-open" v-model="form.password" :validate="v$" />
            <div v-if="errorLogin" class="text-danger mb-3 mt--2">{{ errorLogin }}</div>

            <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Lembrar-me</span>
            </base-checkbox>
            <div class="text-center">
              <button class="btn btn-primary" @click.prevent="submit">LOGAR</button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <router-link to="/reset/confirm-email" class="text-light"><small>Esqueceu a senha?</small></router-link>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light"><small>Registre-se</small></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed, ref, onMounted } from "vue";
import useValidate from '@vuelidate/core';
import {required, email, minLength, helpers} from '@vuelidate/validators';
import api from "../../services";
import store from "../../store";
import router from "../../router";

export default {
  name: "login",
  setup(){
    const errorLogin = ref('');
    const form       = reactive({
      email:    '',
      password: ''
    });

    const rules = computed(() => {
      return {
        email: {
          required:helpers.withMessage('O campo E-mail é obrigatório', required),
          email:helpers.withMessage('O campo E-mail deve ser um e-mail válido', email)
        },
        password: {
          required:helpers.withMessage('O campo Senha é obrigatório', required),
          minLength:helpers.withMessage('O campo Senha deve ter no mínimo 8 caracteres' ,minLength(8))
        }
      }
    });

    function submit() {
      this.v$.$validate();

      if(!this.v$.$error){
        try{
          api.get('/sanctum/csrf-cookie').then( res => {
            api.post('/auth/login', {
              email: form.email,
              password: form.password
            }).then((res) => {
              if(res){
                store.dispatch('setUser', res.data.user);
                //store.dispatch('setToken', res.data.token);

                router.push({name: 'home'});
              }else{
                errorLogin.value = 'Usuário e/ou senha inválidos';
              }
            });
          });
        }catch(error){
          errorLogin.value = error.response ? error.response.data.error : 'Usuário e/ou senha inválidos';
          console.log(error.response);
        }
      }

    }

    const v$ = useValidate(rules, form);
    return { form, v$, errorLogin, submit }

  },

};
</script>
<style></style>

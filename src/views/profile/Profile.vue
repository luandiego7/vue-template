<template>
  <div>
    <base-header
        class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style="
        min-height: 600px;

        background-size: cover;
        background-position: center top;
      "
        :style="photoUrl ? `background-image: url(${photoUrl})` : ( form.photo ? `background-image: url(${form.photo})` :  'background-image: url(img/theme/profile-cover.jpg)' ) "
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Olá {{form.name}}</h1>
            <p class="text-white mt-0 mb-5">
              Esta é a página do seu perfil. Aqui você visualizar e atualizar suas informações. Lembre-se de manter tudo sempre atualizado.
            </p>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image cursor-pointer" @click="$refs.file.click()">
                  <img v-if="photoUrl" :src="photoUrl" width="180" height="180" class="rounded-circle"/>
                  <img v-else :src="form.photo ? form.photo : 'img/theme/team-4-800x800.jpg'" width="180" height="180" class="rounded-circle"/>
                  <input type="file" ref="file" class="d-none" @change="savePhoto" accept="image/*">
                </div>
              </div>
            </div>

            <div class="card-body mt-6">

              <div class="text-center mt-6">
                <h3>
                  {{form.name}}<span class="font-weight-light">{{ form.birthday ? ','+Format.calculateAge(Format.dateBrToUs(form.birthday)) : '' }}</span>
                </h3>
                <div class="h5 font-weight-300" v-if="store.state.user.city">
                  <i class="ni location_pin mr-2"></i>{{ store.state.user.city.name }}, {{ store.state.user.city.state.name }}
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>{{ form.profession }} - {{ form.company }}
                </div>
                <div>
                  <i class="ni education_hat mr-2"></i>{{ form.university }}
                </div>
                <hr class="my-4" />
                <p>{{ form.about }}</p>

              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-8 order-xl-1">
          <card shadow type="secondary">
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Perfil</h3>
                  </div>
                </div>
              </div>
            </template>

            <form>
              <h6 class="heading-small text-muted mb-4">Informações Pessoais</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-6">
                    <base-input alternative="" label="Nome" placeholder="Nome" input-classes="form-control-alternative" name="name" :validate="v$" v-model="form.name" :maxlength="100" />
                  </div>
                  <div class="col-lg-6">
                    <base-input alternative="" label="Email" placeholder="example@example.com" input-classes="form-control-alternative" name="email" :validate="v$" v-model="form.email" :maxlength="100"/>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-4">
                    <base-input alternative="" type="text" label="Contato" placeholder="(99)99999-9999" input-classes="form-control-alternative" name="phone" :mask="'(##)#########'" :validate="v$" v-model="form.phone" :maxlength="14"/>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <label class="form-control-label">Data de nascimento</label>
                      <date-picker v-model="form.birthday" placeholder="xx/xx/xxxx" :config="{dateFormat:'d/m/Y', 'locale':Portuguese}" class="bg-white form-control form-control-alternative" :maxlength="10"></date-picker>
                    </div>
                  </div>

                  <div class="col-lg-4">
                    <label class="form-control-label">Gênero</label>
                    <v-select :options="genders" v-model="form.gender" :reduce="(option) => option.id" class="bg-white form-control-alternative" />
                  </div>
                </div>

              </div>
              <hr class="my-4" />

              <h6 class="heading-small text-muted mb-4">Informações de contato</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-4">
                    <base-input alternative="" label="CEP" placeholder="CEP" input-classes="form-control-alternative" :mask="'#####-###'" v-model="form.zipcode" :maxlength="9" />
                  </div>
                  <div class="col-lg-4">
                    <label class="form-control-label">Estado<span class="text-danger">*</span></label>
                    <v-select :on-change="getCities" :options="states" v-model="form.state_id" :reduce="(option) => option.id" class="bg-white form-control-alternative" />
                    <div v-if="v$ && v$['state_id'].$errors[0]" class="text-danger mb-3">{{ v$['state_id'].$errors[0].$message }}</div>
                  </div>

                  <div class="col-lg-4">
                    <label class="form-control-label">Cidade<span class="text-danger">*</span></label>
                    <v-select :options="cities" v-model="form.city_id" :reduce="(option) => option.id" class="bg-white form-control-alternative"></v-select>
                    <div v-if="v$ && v$['city_id'].$errors[0]" class="text-danger mb-3">{{ v$['city_id'].$errors[0].$message }}</div>
                  </div>

                </div>
                <div class="row">
                  <div class="col-md-12">
                    <base-input alternative="" label="Endereço" placeholder="Endereço" input-classes="form-control-alternative" v-model="form.address" :maxlength="100"/>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-2">
                    <base-input alternative="" label="Número" placeholder="" input-classes="form-control-alternative" v-model="form.number" :maxlength="5" />
                  </div>
                  <div class="col-md-4">
                    <base-input alternative="" label="Bairro" placeholder="" input-classes="form-control-alternative" v-model="form.neighborhood" :maxlength="50"/>
                  </div>
                  <div class="col-md-6">
                    <base-input alternative="" label="Complemento" placeholder="" input-classes="form-control-alternative" v-model="form.complement" :maxlength="50"/>
                  </div>
                </div>
              </div>
              <hr class="my-4" />

              <h6 class="heading-small text-muted mb-4">Informações profissionais</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-6">
                    <base-input alternative="" label="Curso" placeholder="Curso" input-classes="form-control-alternative" v-model="form.course" :maxlength="30"/>
                  </div>
                  <div class="col-lg-6">
                    <base-input alternative="" label="Faculdade" placeholder="Faculdade" input-classes="form-control-alternative" v-model="form.university" :maxlength="30"/>
                  </div>
                  <div class="col-lg-6">
                    <base-input alternative="" label="Profissão" placeholder="Profissão" input-classes="form-control-alternative" v-model="form.profession" :maxlength="30"/>
                  </div>
                  <div class="col-lg-6">
                    <base-input alternative="" label="Empresa" placeholder="Empresa" input-classes="form-control-alternative" v-model="form.company" :maxlength="30"/>
                  </div>
                </div>
              </div>

              <hr class="my-4" />

              <h6 class="heading-small text-muted mb-4">Sobre mim</h6>
              <div class="pl-lg-4">
                <div class="form-group">
                  <base-input alternative="" label="Sobre mim">
                    <textarea rows="4" class="form-control form-control-alternative" placeholder="Um pouco sobre mim..." v-model="form.about">{{form.about}}</textarea>
                  </base-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 text-right">
                  <button class="btn btn-outline-success" @click="submit">Salvar</button>
                </div>
              </div>
            </form>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {computed, inject, onMounted, reactive, ref} from "vue";
import useValidate from '@vuelidate/core';
import {email, minLength, maxLength, required, helpers} from '@vuelidate/validators';
import api from "../../services";
import {Portuguese} from 'flatpickr/dist/l10n/pt.js';
import Format from '../../helpers/format';
import Swal from 'sweetalert2';


export default {
  name: "user-profile",

  setup(){
    const store   = inject('store');
    const user    = computed(() => store.state.user );
    const genders = [
      {id: 1, label: 'Masculino'},
      {id: 2, label: 'Feminino'},
      {id: 3, label: 'Outro'},
    ];
    const states   = ref([]);
    const cities   = ref([]);
    const photoUrl = ref('');

    const form = reactive({
      name:         store.state.user.name,
      email:        store.state.user.email,
      phone:        store.state.user.phone,
      birthday:     Format.dateUsToBr(store.state.user.birthday),
      gender:       store.state.user.gender,
      course:       store.state.user.course,
      university:   store.state.user.university,
      profession:   store.state.user.profession,
      company:      store.state.user.company,
      address:      store.state.user.address,
      number:       store.state.user.number,
      neighborhood: store.state.user.neighborhood,
      complement:   store.state.user.complement,
      state_id:     store.state.user.state_id,
      city_id:      store.state.user.city_id,
      zipcode:      store.state.user.zipcode,
      about:        store.state.user.about,
      photo:        store.state.user.photo,
    });

    function getStates(){
      api.get(`/api/states-select`).then((res) => {
        form.city_id = '';
        states.value = res.data.states;
      });
    }

    const getCities = computed(() => {
      cities.value = [];
      form.city_id = '';

      if(form.state_id !== undefined){
        api.get(`/api/cities-by-state/${form.state_id}`).then((res) => {
          cities.value = res.data.cities;
        });
      }

    });

    function savePhoto(event){
      const file     = event.target.files[0];

      if(file.size <= 1200000){
        photoUrl.value = URL.createObjectURL(file);

        const formData = new FormData();
        formData.append('photo', file);

        api.post('/api/user/photo', formData, {headers:{'content-type': 'multipart/form-data'}}).then((res) => {
          if(res.data.user){
            store.dispatch('setUser', res.data.user);
            Swal.fire('Sucesso', 'Salvo com sucesso', 'success');
          }else{
            Swal.fire('Error', 'Ocorreu um erro', 'error');
          }
        }).catch((error) => {
          console.log(error);
          Swal.fire('Error', 'Ocorreu um erro', 'error');
        });
      }else{
        Swal.fire('Aviso', 'A imagem deve ser menor que 1mb', 'warning');
      }
    }


    const rules = computed(() => {
      return {
        name: {
          required:helpers.withMessage('O campo Nome é obrigatório', required),
          minLength:helpers.withMessage('O campo Nome deve ter pelo menos 2 caracteres', minLength(2))
        },
        email: {
          required:helpers.withMessage('O campo E-mail é obrigatório', required),
          email:helpers.withMessage('O campo E-mail deve ser um e-mail válido', email)
        },
        phone: {
          minLength:helpers.withMessage('O campo Contato deve ter pelo menos 12 dígitos', minLength(12)),
          maxLength:helpers.withMessage('O campo Contato deve ter no máximo 14 dígitos', maxLength(14)),
        },
        state_id: {
          required:helpers.withMessage('O campo Estado é obrigatório', required),
        },
        city_id:{
          required:helpers.withMessage('O campo Cidade é obrigatório', required),
        },
      }
    });
    const v$ = useValidate(rules, form);

    function submit(){
      this.v$.$validate();

      if(!this.v$.$error){
        try{
          api.put('/api/user/profile', form).then((res) => {
            store.dispatch('setUser', res.data.user);
            Swal.fire('Sucesso', 'Atualizado com sucesso', 'success');
          });
        }catch(error){
          Swal.fire('Erro', 'Ocorreu um erro', 'error');
          console.log(error);
        }
      }
    }

    onMounted( () => {
      getStates();
      setTimeout(function(){
        form.city_id = store.state.user.city_id;
      }, 500);
    });

    return {store, form, photoUrl, savePhoto, v$, user, submit, states, cities, getCities, Portuguese, genders, Format }
  },
};
</script>
<style></style>

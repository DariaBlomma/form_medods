<template>
  <form @submit.prevent = 'submitHandler' id="form" name="form">
    <p>
      <span class="must-mark"> * </span> <i>Поле обязательное для заполнения</i>
    </p>
    <fieldset class="common-info">
      <legend>Общая информация</legend>
      <div class="common-info-inputs">
        <!-- v-model.trim="v$.name.$model"    -->
        <!-- <label class="required" v-for='item in nameInputs' :key='item.name'>
          <input
            v-on:input='onInput'
            @blur='onBlur'
            type="text"
            :name=item.name
            v-model=item.valName
            :class="[item.class, {invalid: v$.name.$error}]"
            :placeholder=item.placeholder
            :data-about=item.valName
            required
          />
        </label>
        <strong class="error-message">{{ msgRuLetters }}</strong>
        <strong class="error-message">{{ blurText }}</strong>
        <p 
          v-for="error of v$.$errors"
          :key="error.$uid"
        >
        <strong class="error-message">{{ error.$message }}</strong>
        </p> -->

        <label class="required">
          <input
            @input='onInput'
            v-model.trim="surname"    
            @blur='v$.surname.$touch'
            type="text"
            name="surname"
            :class="['surname', {invalid: v$.surname.$error}]"
            placeholder="Фамилия"
            required
          />
        </label>
        <strong class="error-message">{{ msgRuLetters }}</strong>
        <p
          v-for="error of v$.surname.$errors"
          :key="error.$uid"
        >
        <strong  class="error-message">{{ error.$message }}</strong>
        </p>
        <!-- v-bind:class="{invalid: $v.name.$dirty && !$v.name.required}" -->
        <!-- @blur="v$.name.$touch" -->
        <label class="required">
          <input
            @input='onInput'
            v-model.trim="name"    
            @blur='v$.name.$touch'
            type="text"
            :class="['name', {invalid: v$.name.$error}]"
            placeholder="Имя"
            required
          />
        </label>
        <strong class="error-message">{{ msgRuLetters }}</strong>
          <p
          v-for="error of v$.name.$errors"
          :key="error.$uid"
          >
          <strong class="error-message">{{ error.$message }}</strong>
          </p>

        <label class="optional">
          <input
            @input='onInput'
            v-model.trim="patronym"    
            @blur='v$.patronym.$touch'
            type="text"
            name="patronym"
            :class="['patronym', {invalid: v$.patronym.$error}]"
            placeholder="Отчество"
          />
        </label>
        <strong class="error-message">{{ msgRuLetters }}</strong>
        <p
          v-for="error of v$.patronym.$errors"
          :key="error.$uid"
          >
          <strong class="error-message">{{ error.$message }}</strong>
        </p>
        <label ref='birthdateLabel' class="required birthdate">
          Дата рождения
          <!-- <input type='date' name='birthdate' class='birthdate' placeholder='Дата рождения' required> -->
          <input
            v-model.trim="birthdate"
            @blur='v$.birthdate.$touch'
            type="text"
            name="birthdate"
            ref='birthdate'
            :class="['birthdate', {invalid: v$.birthdate.$error}]"
            style='margin-bottom: 10px'
            placeholder="Дата рождения"
            required
          />
        </label>
        <p
          v-for="error of v$.birthdate.$errors"
          :key="error.$uid"
        >
        <strong  class="error-message">{{ error.$message }}</strong>
        </p>
        <!-- подумать над регялркой для телефона или маской -->
        <label class="required">
          <input
            v-model.trim="phone"
            @blur='v$.phone.$touch'
            type="tel"
            :class="['phone', {invalid: v$.phone.$error}]"
            placeholder="Номер телефона"
            required
          />
        </label>
        <p
          v-for="error of v$.phone.$errors"
          :key="error.$uid"
        >
        <strong  class="error-message">{{ error.$message }}</strong>
        </p>
      </div>
      <div class="gender-wrapper">
        <h3>Пол</h3>
        <p>
          <input
            type="radio"
            name="gender"
            class="male"
            value="male"
            checked
          />Мужской
        </p>
        <p>
          <input
            type="radio"
            name="gender"
            class="female"
            value="female"
          />Женский
        </p>
      </div>

      <div class="group-select">
        <h3 class="required">Группа клиентов</h3>
        <select
          name="client-group"
          class="client-group"
          multiple
          size="3"
          required
        >
          <option>VIP</option>
          <option>Проблемные</option>
          <option selected>ОМС</option>
        </select>
      </div>
      <div style='margin-bottom: 10px' class="doctor-wrapper">
        <h3>Лечащий врач</h3>
        <select name="doctor" class="doctor">
          <option selected>Иванов</option>
          <option>Захаров</option>
          <option>Чернышева</option>
        </select>
      </div>

      <label for="sms" class="sms-label">
        Не отправлять СМС
        <input type="checkbox" name="sms" id="sms" />
      </label>
    </fieldset>
    <fieldset class="address-group">
      <legend>Адрес</legend>
      <label class="optional">
        <input
          v-model.trim="index"
          @blur='v$.index.$touch'
          type="number"
          name="index"
          :class="['index', {invalid: v$.index.$error}]"
          style='margin-bottom: 10px'
          placeholder="Индекс"
        />
      </label>
      <p
        v-for="error of v$.index.$errors"
        :key="error.$uid"
      >
        <strong  class="error-message">{{ error.$message }}</strong>
      </p>
      <label class="optional">
        <input
          @input='onInput'
          v-model.trim="country"
          @blur='v$.country.$touch'
          type="text"
          name="country"
          :class="['country', {invalid: v$.country.$error}]" 
          placeholder="Страна"
        />
      </label>
      <strong  class="error-message">{{ msgRuLetters }}</strong>
      <p
        v-for="error of v$.country.$errors"
        :key="error.$uid"
      >
        <strong  class="error-message">{{ error.$message }}</strong>
      </p>
      <label class="optional">
        <input 
        @input='onInput'
        v-model.trim="area"
        @blur='v$.area.$touch'
        type="text" 
        name="area" 
        :class="['area', {invalid: v$.area.$error}]" 
        placeholder="Область" />
      </label>
      <strong  class="error-message">{{ msgRuLetters }}</strong>
      <p
        v-for="error of v$.area.$errors"
        :key="error.$uid"
      >
        <strong  class="error-message">{{ error.$message }}</strong>
      </p>
      <label class="required">
        <input
          @input='onInput'
          v-model.trim="city"
          @blur='v$.city.$touch'
          type="text"
          name="city"
          :class="['city', {invalid: v$.city.$error}]"
          placeholder="Город"
          required
        />
      </label>
      <strong  class="error-message">{{ msgRuLetters }}</strong>
      <p
        v-for="error of v$.city.$errors"
        :key="error.$uid"
      >
        <strong  class="error-message">{{ error.$message }}</strong>
      </p>
      <label class="optional">
        <input 
        v-on:input='onInput'
        v-model.trim="street"
        @blur='v$.street.$touch'
        type="text" 
        name="street" 
        :class="['street', {invalid: v$.street.$error}]"
        placeholder="Улица" />
      </label>
      <strong  class="error-message">{{ msgRuLetters }}</strong>
      <p
        v-for="error of v$.street.$errors"
        :key="error.$uid"
      >
        <strong  class="error-message">{{ error.$message }}</strong>
      </p>
      <label class="optional">
        <input 
        v-model.trim="house"
        @blur='v$.house.$touch'
        type="number" 
        name="house" 
        :class="['house', {invalid: v$.house.$error}]"
        placeholder="Дом" />
      </label>
      <p
        v-for="error of v$.house.$errors"
        :key="error.$uid"
      >
        <strong  class="error-message">{{ error.$message }}</strong>
      </p>
    </fieldset>
    <fieldset class="pass-group">
      <legend>Паспорт</legend>
      <div style='margin-bottom: 10px' class="document-wrapper">
        <h3 class="required">Тип документа</h3>
        <select class="document-type" name="document-type" required>
          <option selected>Паспорт</option>
          <option>Свидетельство о рождении</option>
          <option>Вод. удостоверение</option>
        </select>
      </div>
      <label style='margin-bottom: 10px' class="optional">
        <input
          v-model.trim="passSerie"
          @blur='v$.passSerie.$touch'
          type="number"
          name="pass-serie"
          :class="['pass-serie', {invalid: v$.passSerie.$error}]"
          placeholder="Серия"
        />
      </label>
      <p
        v-for="error of v$.passSerie.$errors"
        :key="error.$uid"
      >
        <strong  class="error-message">{{ error.$message }}</strong>
      </p>
      <label style='margin-bottom: 10px' class="optional">
        <input
          v-model.trim="passNumber"
          @blur='v$.passNumber.$touch'
          type="number"
          name="pass-number"
          :class="['pass-number', {invalid: v$.passNumber.$error}]"
          placeholder="Номер"
        />
      </label>
      <p
        v-for="error of v$.passNumber.$errors"
        :key="error.$uid"
      >
        <strong  class="error-message">{{ error.$message }}</strong>
      </p>
      <label style='margin-bottom: 10px' class="optional">
        <input
          @input='onInput'
          v-model.trim="passOrg"
          @blur='v$.passOrg.$touch'
          type="text"
          name="pass-org"
          :class="['pass-org', {invalid: v$.passOrg.$error}]"
          placeholder="Кем выдан"
          data-about=''
        />
      </label>
      <strong  class="error-message">{{ msgRuLetters }}</strong>
      <p
        v-for="error of v$.passOrg.$errors"
        :key="error.$uid"
      >
        <strong  class="error-message">{{ error.$message }}</strong>
      </p>
      <label ref='passDateLabel' style='margin-bottom: 10px' class="required pass-date-label">
        Дата выдачи
        <!-- <input type='date' name='pass-date' class='pass-date' placeholder='Дата выдачи' required> -->
        <input       
          v-model.trim="passDate"
          @blur='v$.passDate.$touch'
          type="text"
          name="pass-date"
          ref='passDate'
          :class="['pass-date', {invalid: v$.passDate.$error}]"
          placeholder="Дата выдачи"
          required
        />
      </label>
      <p
        v-for="error of v$.passDate.$errors"
        :key="error.$uid"
      >
        <strong  class="error-message">{{ error.$message }}</strong>
      </p>
    </fieldset>
    <!-- <p v-bind:class="{ 'd-none': hidden}" class="success-sent">Hовый клиент успешно создан</p> -->
    <message v-bind:class="{ 'd-none': hidden}"></message>
    <button type="submit" class="btn submit">Отправить</button>
  </form>
</template>

<script>
import message from './message.vue'

import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers} from '@vuelidate/validators'

import Inputmask from "inputmask";


export default {
  name: "App",
    components: {
    message
  },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return { 
      name: "",
      surname: '',
      patronym: '',
      phone: '',
      birthdate: '',
      index: '',
      country: '',
      area: '',
      city: '',
      street: '',
      house: '',
      passSerie: '',
      passNumber: '',
      passOrg: '',
      passDate: '',
      valName: '',
      msgRuLetters: '',
      hidden: true,
      selector: '',
      nameInputs: [
        { 
          valName: 'surname',
          name: "surname",
          class: "surname",
          placeholder: "Фамилия",
        },
        { 
          valName: this.name,
          name: "name",
          class: "name",
          placeholder: 'Имя'
        }
      ],
      valNames: ['surname', this.name]
    };
  },
  validations() {
    return { 
      surname: {
        required: helpers.withMessage('Это поле не может быть пустым', required),
        minLength: helpers.withMessage('Введите не менее 2 символов', minLength(2)),
        maxLength: helpers.withMessage('Введите не более 50 символов', maxLength(50)),
      },
      name: { 
        required: helpers.withMessage('Это поле не может быть пустым', required),
        minLength: helpers.withMessage('Введите не менее 2 символов', minLength(2)),
        maxLength: helpers.withMessage('Введите не более 50 символов', maxLength(50)),
      },
      patronym: {
        minLength: helpers.withMessage('Введите не менее 2 символов', minLength(2)),
        maxLength: helpers.withMessage('Введите не более 50 символов', maxLength(50)),
      },
      birthdate: {
        required: helpers.withMessage('Это поле не может быть пустым', required),
      },
      phone: {
        required: helpers.withMessage('Это поле не может быть пустым', required),
      },
      index: {
        minLength: helpers.withMessage('Введите не менее 6 символов', minLength(6)),
        maxLength: helpers.withMessage('Введите не более 6 символов', maxLength(6)),
      },
      country: {
        minLength: helpers.withMessage('Введите не менее 2 символов', minLength(2)),
        maxLength: helpers.withMessage('Введите не более 50 символов', maxLength(50)),
      },
      area: {
        minLength: helpers.withMessage('Введите не менее 2 символов', minLength(2)),
        maxLength: helpers.withMessage('Введите не более 50 символов', maxLength(50)),
      },
      city: {
        required: helpers.withMessage('Это поле не может быть пустым', required),
        minLength: helpers.withMessage('Введите не менее 2 символов', minLength(2)),
        maxLength: helpers.withMessage('Введите не более 50 символов', maxLength(50)),
      },
      street: {
        minLength: helpers.withMessage('Введите не менее 2 символов', minLength(2)),
        maxLength: helpers.withMessage('Введите не более 50 символов', maxLength(50)),
      },
      house: {
        maxLength: helpers.withMessage('Введите не более 6 символов', maxLength(6)),
      },
      passSerie: {
        minLength: helpers.withMessage('Введите не менее 4 символов', minLength(4)),
        maxLength: helpers.withMessage('Введите не более 4 символов', maxLength(4)),
      },
      passNumber: {
        minLength: helpers.withMessage('Введите не менее 6 символов', minLength(6)),
        maxLength: helpers.withMessage('Введите не более 6 символов', maxLength(6)),
      },
      passOrg: {
        minLength: helpers.withMessage('Введите не менее 2 символов', minLength(2)),
        maxLength: helpers.withMessage('Введите не более 50 символов', maxLength(50)),
      },
      passDate: {
        required: helpers.withMessage('Это поле не может быть пустым', required),
      }
    }
  },
  methods: {
    // дописать реализацию по инпуту - замена нежелательных символов, вывод ошибок
    onInput(event) {
      const target = event.target;
      console.log('target', target.value);
          const test = /[А-я\s.]/ig.test(target.value);
    if (test) {
        target.classList.add('valid');
        this.msgRuLetters = '';
    } else {
        if (target.value !== '') {
            target.classList.add('invalid');
            this.msgRuLetters = 'Используйте только русские буквы';
            target.value = '';
        } else {
          this.msgRuLetters = '';
        }
    }
    },
    changeLabel(input, label, text, classToRemove) {
      if (input.type === 'text') {
        label.innerHTML = label.innerHTML.replace(text, '');
        label.classList.remove(classToRemove);
        this.typeText = true;
      }
    },
    checkType() {
        this.changeLabel(this.$refs.birthdate, this.$refs.birthdateLabel, 'Дата рождения', 'birthdate');
        this.changeLabel(this.$refs.passDate, this.$refs.passDateLabel, 'Дата выдачи', 'pass-date-label');
        Inputmask({"mask": "99/99/9999"}).mask('.birthdate');
        Inputmask({"mask": "99/99/9999"}).mask('.pass-date');
        Inputmask({"mask": "+7 (999) 999 99-99"}).mask('.phone');
    },

    // onBlur($event) {
    //   const target = $event.target;
      
    //   const valDataset = target.dataset.about;
    //   console.log('val: ', valDataset);
    //   this.v$.valDataset.$touch();
    // },
    submitHandler() {
      if (this.v$.error) {
        return;
      }
      console.log('click');
      this.hidden = false;
      setTimeout(() => {
        this.hidden = true;
    }, 5000);
    }
  },
  mounted() {
    this.checkType();
  }
};

</script>

<style src='./css/style.css'></style>

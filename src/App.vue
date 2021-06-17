<template>
  <form @submit.prevent = 'submitHandler' id="form" name="form" ref='mainForm'>
    <p>
      <span class="must-mark"> * </span> <i>Поле обязательное для заполнения</i>
    </p>
    <fieldset class="common-info">
      <legend>Общая информация</legend>
      <div class="common-info-inputs">
        <label class="required">
          <input
            @input='onInput'
            v-model.trim="surname"    
            @blur='v$.surname.$touch'
            type="text"
            name="surname"
            :class="['surname', {invalid: v$.surname.$error}, {valid: !v$.surname.$error && surname !== ''}]"
            placeholder="Фамилия"
            required
          />
        </label>
        <p
          v-for="error of v$.surname.$errors"
          :key="error.$uid"
        >
        <strong  class="error-message">{{ error.$message }}</strong>
        </p>
        <label class="required">
          <input
            @input='onInput'
            v-model.trim="name"    
            @blur='v$.name.$touch'
            type="text"
            :class="['name', {invalid: v$.name.$error}, {valid: !v$.name.$error && name !== ''}]"
            placeholder="Имя"
            required
          />
        </label>
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
            @blur='v$.patronym.$touch, dateInputsCheck'
            type="text"
            name="patronym"
            :class="['patronym', {invalid: v$.patronym.$error}, {valid: !v$.patronym.$error && patronym !== ''}]"
            placeholder="Отчество"
          />
        </label>
        <p
          v-for="error of v$.patronym.$errors"
          :key="error.$uid"
          >
          <strong class="error-message">{{ error.$message }}</strong>
        </p>
        <label ref='birthdateLabel' :class="['required', {'birthdateLabel': dateType}]">
          Дата рождения
          <input
            v-model.trim="birthdate"
            @blur='v$.birthdate.$touch'
            type="date"
            name="birthdate"
            ref='birthdate'
            :class="['birthdate', {invalid: v$.birthdate.$error}, {valid: !v$.birthdate.$error && birthdate !== ''}]"
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
        <label class="required">
          <input
            v-model.trim="phone"
            @blur='v$.phone.$touch, maskInputsCheck'
            type="tel"
            ref='phone'
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
      <div class="doctor-wrapper">
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
          :class="['index', {invalid: v$.index.$error}, {valid: !v$.index.$error && index !== ''}]"
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
          :class="['country', {invalid: v$.country.$error}, {valid: !v$.country.$error && country !== ''}]" 
          placeholder="Страна"
        />
      </label>
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
        :class="['area', {invalid: v$.area.$error}, {valid: !v$.area.$error && area !== ''}]" 
        placeholder="Область" />
      </label>
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
          :class="['city', {invalid: v$.city.$error}, {valid: !v$.city.$error && city !== ''}]"
          placeholder="Город"
          required
        />
      </label>
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
        :class="['street', {invalid: v$.street.$error}, {valid: !v$.street.$error && street !== ''}]"
        placeholder="Улица" />
      </label>
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
        :class="['house', {invalid: v$.house.$error}, {valid: !v$.house.$error && house !== ''}]"
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
      <div  class="document-wrapper">
        <h3 class="required">Тип документа</h3>
        <select 
        ref='docType' 
        class="document-type"
        name="document-type" 
        required>
          <option selected>Паспорт</option>
          <option>Свидетельство о рождении</option>
          <option>Вод. удостоверение</option>
        </select>
      </div>
      <label class="optional">
        <input
          v-model.trim="passSerie"
          @blur='v$.passSerie.$touch'
          type="number"
          name="pass-serie"
          :class="['pass-serie', {invalid: v$.passSerie.$error}, {valid: !v$.passSerie.$error && passSerie !== ''}]"
          placeholder="Серия"
        />
      </label>
      <p
        v-for="error of v$.passSerie.$errors"
        :key="error.$uid"
      >
        <strong  class="error-message">{{ error.$message }}</strong>
      </p>
      <label class="optional">
        <input
          v-model.trim="passNumber"
          @blur='v$.passNumber.$touch'
          type="number"
          name="pass-number"
          :class="['pass-number', {invalid: v$.passNumber.$error}, {valid: !v$.passNumber.$error && passNumber !== ''}]"
          placeholder="Номер"
        />
      </label>
      <p
        v-for="error of v$.passNumber.$errors"
        :key="error.$uid"
      >
        <strong  class="error-message">{{ error.$message }}</strong>
      </p>
      <label class="optional">
        <input
          @input='onInput'
          v-model.trim="passOrg"
          @blur='v$.passOrg.$touch'
          type="text"
          name="pass-org"
          :class="['pass-org', {invalid: v$.passOrg.$error}, {valid: !v$.passOrg.$error && passOrg !== ''}]"
          placeholder="Кем выдан"
          data-about=''
        />
      </label>
      <p
        v-for="error of v$.passOrg.$errors"
        :key="error.$uid"
      >
        <strong  class="error-message">{{ error.$message }}</strong>
      </p>
      <label ref='passDateLabel' :class="['required', {'pass-date-label': dateType}]">
        Дата выдачи
        <input       
          v-model.trim="passDate"
          @blur='v$.passDate.$touch'
          type="date"
          name="pass-date"
          ref='passDate'
          :class="['pass-date', {invalid: v$.passDate.$error}, {valid: !v$.passDate.$error && passDate !== ''}]"
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
    <p v-bind:class="{ 'd-none': !valMistakes}" class="valMistakes">Заполните все поля корректно</p>
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
      dateType: true,
      hidden: true,
      valMistakes: false,
      inputsValid: false,
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
    markValid(event) {
      event.target.classList.remove('invalid');
      event.target.classList.add('valid');
      this.inputsValid = true;
    },
    markInvalid(event) {
      event.target.classList.remove('valid');
      event.target.classList.add('invalid');
      this.inputsValid = false;
      this.renderErrorMessage(event.target, 'Заполните это поле', 'masked');
    },
    onInput(event) {
      const target = event.target;
      const test = /[А-я\s.]/ig.test(target.value);
      if (test) {
          target.classList.add('valid');
      } else {
        const message = target.parentNode.nextElementSibling;
          if (target.value !== '') {
              target.classList.add('invalid');
              target.value = '';
              if (message === null || !message.classList.contains('ru')) {
                  this.renderErrorMessage(target, 'Используйте только русские буквы', 'ru');
              }
          }
      }
    },
    renderErrorMessage(elem, text, type) {
      elem.classList.add('invalid');
      elem.classList.remove('valid');
      const strong = document.createElement('strong');
      strong.className = `error-message ${type}`;
      strong.textContent = text;
      elem.parentNode.insertAdjacentElement('afterend', strong);
      setTimeout(() => {
          strong.remove();
          elem.classList.remove('invalid');
      }, 5000);
    },
    changeLabel(input, label, text, classToRemove) {
      if (input.type === 'text') {
        this.dateType = false;
        label.innerHTML = label.innerHTML.replace(text, '');
        label.classList.remove(classToRemove);
      }
    },
    checkType() {
        this.changeLabel(this.$refs.birthdate, this.$refs.birthdateLabel, 'Дата рождения', 'birthdateLabel');
        this.changeLabel(this.$refs.passDate, this.$refs.passDateLabel, 'Дата выдачи', 'pass-date-label');

        Inputmask("99/99/9999", {
          'oncomplete': this.markValid,
          'onincomplete': this.markInvalid
          })
        .mask('.birthdate');

        Inputmask("99/99/9999", {
          'oncomplete': this.markValid,
          'onincomplete': this.markInvalid
          })
        .mask('.pass-date');

        Inputmask("+7 (999) 999 99-99", {
          'oncomplete': this.markValid,
          'onincomplete': this.markInvalid
          })
          .mask('.phone');
    },
    submitHandler() {
      if (this.v$.error || this.inputsValid === false) {
        this.valMistakes = true;
        return;
      }
      this.valMistakes = false;
      this.hidden = false;
      // чтобы не выводил так ошибки в обязательных полях
      this.v$.$reset();
      const allInputs = this.$refs.mainForm.querySelectorAll('input');
      allInputs.forEach(item => {      
      this.name = null,
      this.surname = '',
      this.patronym = '',
      this.phone = '',
      this.birthdate = '',
      this.index = '',
      this.country = '',
      this.area = '',
      this.city = '',
      this.street = '',
      this.house = '',
      this.passSerie = '',
      this.passNumber = '',
      this.passOrg = '',
      this.passDate = '',
        
      item.classList.remove('valid');
      });
      setTimeout(() => {
        this.hidden = true;
      }, 5000);
      

    }, 
  },
  mounted() {
    this.checkType();

  }
};

</script>

<style src='./css/style.css'></style>

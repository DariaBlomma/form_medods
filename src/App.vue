<template>
  <form @submit.prevent = 'submitHandler' id="form" name="form">
    <p>
      <span class="must-mark"> * </span> <i>Поле обязательное для заполнения</i>
    </p>
    <fieldset class="common-info">
      <legend>Общая информация</legend>
      <div class="common-info-inputs">
        <!-- v-model.trim="v$.name.$model"    -->
        <label class="required" v-for='item in nameInputs' :key='item.name'>
          <input
            @blur='this.v$.$touch'
            type="text"
            :name=item.name
            v-model="v$.name.$model"
            :class="[item.class, {invalid: v$.name.$error}]"
            :placeholder=item.placeholder
            required
          />
        </label>
        <p 
          v-for="error of v$.$errors"
          :key="error.$uid"
        >
        <strong class="error-message">{{ error.$message }}</strong>
        </p>
        <!-- <label class="required">
          <input
            type="text"
            name="surname"
            class="surname"
            placeholder="Фамилия"
            required
          />
        </label> -->
        <!-- v-bind:class="{invalid: $v.name.$dirty && !$v.name.required}" -->
        <!-- @blur="v$.name.$touch" -->
        <label class="required">
          <input
            v-model.trim="v$.name.$model"    
            @blur='this.v$.$touch'
            type="text"
            :class="{name, invalid: v$.name.$error}"
            placeholder="Имя"
            required
          />
        </label>
        <p
          v-for="error of v$.$errors"
          :key="error.$uid"
        >
        <strong class="error-message">{{ error.$message }}</strong>
        </p>
        <label class="optional">
          <input
            type="text"
            name="patronym"
            class="patronym"
            placeholder="Отчество"
          />
        </label>
        <label class="required birthdate">
          Дата рождения
          <!-- <input type='date' name='birthdate' class='birthdate' placeholder='Дата рождения' required> -->
          <input
            type="text"
            name="birthdate"
            class="birthdate"
            placeholder="Дата рождения"
            required
          />
        </label>
        <label class="required">
          <input
            type="tel"
            name="phone"
            class="phone"
            placeholder="Номер телефона"
            required
          />
        </label>
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
          type="number"
          name="index"
          class="index length6"
          placeholder="Индекс"
        />
      </label>
      <label class="optional">
        <input
          type="text"
          name="country"
          class="country"
          placeholder="Страна"
        />
      </label>
      <label class="optional">
        <input type="text" name="area" class="area" placeholder="Область" />
      </label>
      <label class="required">
        <input
          type="text"
          name="city"
          class="city"
          placeholder="Город"
          required
        />
      </label>
      <label class="optional">
        <input type="text" name="street" class="street" placeholder="Улица" />
      </label>
      <label class="optional">
        <input type="number" name="house" class="house" placeholder="Дом" />
      </label>
    </fieldset>
    <fieldset class="pass-group">
      <legend>Паспорт</legend>
      <div class="document-wrapper">
        <h3 class="required">Тип документа</h3>
        <select class="document-type" name="document-type" required>
          <option selected>Паспорт</option>
          <option>Свидетельство о рождении</option>
          <option>Вод. удостоверение</option>
        </select>
      </div>
      <label class="optional">
        <input
          type="number"
          name="pass-serie"
          class="pass-serie"
          placeholder="Серия"
        />
      </label>
      <label class="optional">
        <input
          type="number"
          name="pass-number"
          class="pass-number length6"
          placeholder="Номер"
        />
      </label>
      <label class="optional">
        <input
          type="text"
          name="pass-org"
          class="pass-org"
          placeholder="Кем выдан"
        />
      </label>
      <label class="required pass-date-label">
        Дата выдачи
        <!-- <input type='date' name='pass-date' class='pass-date' placeholder='Дата выдачи' required> -->
        <input
          type="text"
          name="pass-date"
          class="pass-date"
          placeholder="Дата выдачи"
          required
        />
      </label>
    </fieldset>
    <!-- <p v-bind:class="{ 'd-none': hidden}" class="success-sent">Hовый клиент успешно создан</p> -->
    <message v-bind:class="{ 'd-none': hidden}"></message>
    <button type="submit" class="btn submit">Отправить</button>
  </form>
</template>

<script>
import message from './message.vue'
// import { required, minLength } from 'vuelidate/lib/validators'
// import { reactive, toRefs } from "@vue/composition-api";
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers} from '@vuelidate/validators'

const ruLetters = helpers.regex('alpha', /[А-я\s.]/ig);

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
      valName: '',
      hidden: true,
      namesMinLength: 2,
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
      name: { 
        required: helpers.withMessage('Это поле не может быть пустым', required),
        ruLetters: helpers.withMessage('Используйте только русские буквы', ruLetters),
        minLength: helpers.withMessage('Введите не менее 2 символов', minLength(2)),
        maxLength: helpers.withMessage('Введите не более 50 символов', maxLength(50)),
      }
    }
  },
  methods: {
    defineModel() {
      this.nameInputs.forEach(item => {
console.log('item.valName: ', item.valName);
          return item.valName
          
      })
    },
    submitHandler() {
      console.log('click');
      this.hidden = false;
      setTimeout(() => {
        this.hidden = true;
    }, 5000);
    }
  }
};

</script>

<style src='./css/style.css'></style>

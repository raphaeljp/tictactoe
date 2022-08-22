<script setup>
import { ref } from 'vue'

const userEmail = ref('')

const subscribe = () => {
  alert(`You have subscribed with the e-mail ${userEmail.value}`)
}
</script>

<template>
  <footer>
    <div class="container">
      <div class="info-block">
        <h4>About page</h4>
        <p>
          Play tic tac toe or Connect four anytime! <br />
          Created by <a href="https://github.com/raphaeljp" target="_blank">raphaeljp</a>
        </p>
      </div>

      <div class="info-block">
        <h4>Contacts</h4>
        <p>
          (+351) 123 456 789 <br />
          Rua Sá de Bandira, 111, Porto
        </p>
      </div>

      <div class="contact-block">
        <h4>Stay in touch</h4>
        <div class="social">
          <img :src="require('@/assets/images/icon-facebook.svg')" alt="Facebook">
          <img :src="require('@/assets/images/icon-twitter.svg')" alt="Twitter">
          <img :src="require('@/assets/images/icon-instagram.svg')" alt="Instagram">
        </div>
        <div class="subscribe">
          <form @submit.prevent="subscribe">
            <input type="email" v-model="userEmail" placeholder="Subscribe our games" required />
            <button type="submit"><img :src="require('@/assets/images/icon-send.svg')" alt="Send"></button>
          </form>
        </div>
      </div>
    </div>
  </footer>
</template>


<style lang="scss" scoped>
footer {
  background-color: $clr-grey-light;
  padding: 30px 0;
  width: 100vw;

  .container {
    display: flex;
    flex-direction: column;

    @media only screen and (min-width: $breakpoint-md) {
      flex-direction: row;
      justify-content: space-between;
    }

    .info-block {
      margin-bottom: 30px;
      text-align: center;

      @media only screen and (min-width: $breakpoint-md) {
        text-align: left;
      }

      h4 {
        font-size: 20;
        font-weight: normal;
        margin-bottom: 20px;
      }

      p {
        font-size: 14px;
        line-height: 30px;

        a {
          color: $clr-grey-dark;
        }
      }
    }

    .contact-block {
      text-align: center;

      @media only screen and (min-width: $breakpoint-md) {
        text-align: left;
      }

      h4 {
        font-size: 20px;
        font-weight: normal;
        margin-bottom: 20px;
      }

      .social {
        margin-bottom: 20px;

        img {
          width: 30px;

          &:not(:first-child) {
            margin-left: 12px;
          }
        }
      }

      .subscribe {
          form {
            align-items: center;
            display: flex;
            justify-content: center;

            input {
              border: solid 2px $clr-grey;
              border-radius: 0;
              height: 30px;
              padding: 0 12px;
              width: 200px;
            }

            button {
              background-color: $clr-grey;
              cursor: pointer;
              height: 30px;
              line-height: 40px;
              text-align: center;
              width: 35px;

              img {
                width: 20px;
              }
            }
          }
        }
    }
  }
}
</style>

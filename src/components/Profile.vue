<script setup>
</script>

<template>
  <div class="c-profile">
    <div class="container">
      <img :src="require('@/assets/images/profile_pic.png')" alt="" />

      <div class="profile-data">
        <div class="profile-info">
          <h2>Raphael Pereira</h2>
          <p>
            Age: 31 <br />
            Location: São Paulo/BR <br />
            Occupation: Software Engineer
          </p>
        </div>

        <p class="about-me">
          About me: <br />
          My name is Raphael Pereira and I've been working as a software engineer for about 13 years. My main goal in my profession is to be able to help people live better through the software I build.
        </p>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.c-profile {
  padding: 24px 0;

  .container {
    align-items: center;
    display: flex;
    flex-direction: column;

    @media only screen and (min-width: $breakpoint-md) {
      flex-direction: row;
    }

    img {
      border-radius: 100%;
      width: 150px;

     @media only screen and (min-width: $breakpoint-md) {
        margin-right: 30px;
      }
    }

    .profile-data {
      display: flex;
      flex-direction: column;
      flex: 1;

      @media only screen and (min-width: $breakpoint-md) {
        align-items: flex-end;
        flex-direction: row;
        justify-content: space-between;
      }

      h2 {
        font-weight: normal;
        font-size: 32px;
        margin: 24px 0 12px;
        text-align: center;

        @media only screen and (min-width: $breakpoint-md) {
          font-size: 36px;
          text-align: left;
        }
      }

      p {
        display: inline-block;
        font-size: 16px;
        line-height: 24px;
        text-align: center;

        @media only screen and (min-width: $breakpoint-md) {
          font-size: 20px;
          text-align: left;
        }

        &.about-me {
          display: none;

          @media only screen and (min-width: $breakpoint-md) {
            display: inline-block;
            max-width: 450px;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>

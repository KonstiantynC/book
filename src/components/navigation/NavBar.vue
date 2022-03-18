<template>
  <div class="nav-bar">
    <div class="nav-bar__wrp">
      <div class="nav-bar__block">
        <logo />

        <div class="nav-bar__link-list">
          <router-link
            class="nav-bar__link"
            :to="{ path: '/home/ready-books' }"
            >
            <img
              class="nav-bar__icon"
              :src="iconReadyBooks"
            />
            <span>{{ $t('nav-bar.ready-books') }}</span>
          </router-link>

          <router-link
            class="nav-bar__link"
            :to="{ path: '/home/draft-books' }"
          >
            <img
              class="nav-bar__icon"
              :src="iconDraft"
            />
            <span>{{ $t('nav-bar.draft') }}</span>
          </router-link>

          <a class="nav-bar__link" href="#">
            <img
              class="nav-bar__icon"
              :src="iconPlaylist"
            />
            <span>{{ $t('nav-bar.playlist') }}</span>
          </a>
        </div>

      </div>
      <div>
        <div
          @click="signOut"
          class="nav-bar__link"
        >
          <img
            class="nav-bar__icon"
            :src="iconSetting"
          />
          <span>{{ $t('nav-bar.setting') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { vuexTypes } from '@/store/types'
  import { mapActions, mapMutations } from 'vuex'
  import logo from '@/components/common/Logo'
  import iconDraft from '@/assets/draft.svg'
  import iconReadyBooks from '@/assets/ready-books.svg'
  import iconPlaylist from '@/assets/playlist.svg'
  import iconSetting from '@/assets/setting.svg'

  export default {
    name: 'nav-bar',
    components: {
      logo,
    },
    data: () => ({
      iconDraft,
      iconReadyBooks,
      iconPlaylist,
      iconSetting
    }),
    methods: {
      ...mapActions({
        logOut: vuexTypes.LOG_OUT
      }),
      ...mapMutations({
        clearBooksModule: vuexTypes.CLEAR_BOOKS
      }),
      async signOut () {
        await this.logOut()
        await this.clearBooksModule()
        await this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/scss/variables";

  .nav-bar {
    width: 100%;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.08);
    position: sticky;
  }

  .nav-bar__wrp {
    padding: 1rem 7.5rem ;
    height: 6.6rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .nav-bar__block {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .nav-bar__link-list {
    display: flex;
    flex-direction: row;
    margin-left: 2.5rem;
  }

  .nav-bar__link {
    cursor: pointer;
    text-decoration: none;
    color: $nav-bar-link-color;
    margin-left: 4rem;
    height: 6.6rem;
    display: flex;
    align-items: center;
    transition: all 0.4s ease;

    &>span {
      font-size: 1.8rem;
      line-height: 2rem;
    }
  }

  .nav-bar__icon {
    margin-right: 0.6rem;
    height: 1.6rem;
    width: 1.2rem;
  }

  .nav-bar__link:hover {
    box-shadow: inset 0 -0.2rem $nav-bar-link-color;
  }
</style>

<template>
  <div class="action-card">
    <div class="action-card__body">
      <h3 class="fs-4xl">Suggestions?</h3>
      <p>
        Awesome ideas for new coins are always welcome. Let us know your suggestions and your idea might come to life very soon!
      </p>
    </div>

    <div class="card__footer">
      <div class="grid no-bottom-margin-cols">
        <div class="col-xs-6">
          <icon-link
            title="Twitter"
            icon="twitter"
            url="https://www.twitter.com/thehederianmint"
          />
          <icon-link
            title="Discord"
            icon="discord"
            url="https://discord.gg/6tqhdNRT6E"
          />
        </div>
        <div class="col-xs-6">
          <icon-link
            title="Mail"
            icon="mail"
            url="#contact"
          />
          <icon-link
            title="Instagram"
            icon="instagram"
            url="https://www.instagram.com/thehederianmint"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.action-card {
  border: 1px solid rgba(#fff, 0.5);
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 370px;
  // transition: background-color 0.3s 0.1s ease-in;

  @include from(l) {
    padding: 70px 50px 50px 50px;
  }

  &__body {
    margin-bottom: 20px;
  }

  &__footer {
  }
}
</style>

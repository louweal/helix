<template>
  <div class="page page--white">
    <back-button bg> Add contract </back-button>

    <div class="container">
      &nbsp;
      <div class="bottom-xs-3"></div>

      <div class="add-form">
        <input
          class="field field--light"
          type="text"
          placeholder="Product name"
        />

        <div class="field field--light field--upload" @click="todo">
          Upload image
        </div>

        <textarea
          class="field field--light field--textarea"
          placeholder="Product description (optional)"
        />

        <div class="field field--light field--dropdown">
          <ul>
            <li>China</li>
            <li>India</li>
            <li>Vietnam</li>
          </ul>
        </div>

        <textarea
          class="field field--light field--textarea"
          placeholder="Additional material information (optional)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>


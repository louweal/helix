<template>
  <main>
    <div class="container-xl">
      <div class="row justify-content-center" data-aos="fade">
        <div class="col-12 col-md-8">
          <!-- <div class="row mb-3">
            <div class="col-4 col-md-2">
              <img
                data-aos="fade"
                key="how-3"
                src="@/images/anneloes.jpg"
                alt="anneloes louwe"
                class="rounded-circle w-100"
              />
            </div>
          </div> -->
          <h2 data-aos="fade-up-scale">Hi there!</h2>

          <p data-aos="fade-up-scale">
            We're excited to connect with you. Got a question, need some help,
            or just want to say hi? Drop us a message using the contact form
            below. We value your feedback and promise to get back to you as
            quickly as possible. We're here to be your trusted partner, so don't
            hesitate to reach out. We can't wait to hear from you!
          </p>

          <form
            data-aos="fade-up-scale"
            name="contact"
            method="POST"
            action="/contact/success"
            data-netlify="true"
            netlify
            netlify-honeypot="title"
          >
            <input type="hidden" name="form-name" value="contact" />

            <div class="d-none">
              <label>
                Don’t fill this out if you’re human:
                <input name="title" />
              </label>
            </div>

            <!-- Name input -->
            <div class="form-floating mt-4 mb-2">
              <input
                type="text"
                id="name"
                class="form-control"
                name="name"
                required
              />
              <label class="form-label" for="name">Name</label>
            </div>

            <!-- Email input -->
            <div class="form-floating mb-2">
              <input
                type="email"
                id="email"
                class="form-control"
                name="email"
                required
              />
              <label class="form-label" for="email">E-mail</label>
            </div>

            <!-- Message input -->
            <div class="form-floating mb-2">
              <textarea
                class="form-control h-100"
                id="message"
                name="message"
                rows="5"
                required
              ></textarea>
              <label class="form-label" for="message">Message</label>
            </div>

            <!-- Submit button -->
            <button type="submit" class="btn btn-blue btn-block mb-4" event="">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style></style>

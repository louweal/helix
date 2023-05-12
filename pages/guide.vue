<template>
  <main>
    <section>
      <div class="container-xl">
        <div class="row justify-content-center">
          <div class="col-12 col-md-6">
            <badge>Getting started</badge>
            <h1>Small actions, big impact.</h1>

            <p class="fs-md">
              This guide is written for webshop owners.
              <span class="border-bottom border-danger"
                >Some JavaScript knowledge is required</span
              >.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container-xl">
        <div class="row justify-content-center">
          <div class="col-12 col-md-3 d-none d-md-flex">
            <sticky>
              <div>
                <badge>Steps</badge>

                <ol>
                  <li>
                    <nuxt-link :to="{ hash: '#collect' }">Collect</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="{ hash: '#encode' }">Encode</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="{ hash: '#create-link' }"
                      >Create link</nuxt-link
                    >
                  </li>
                </ol>
              </div>
            </sticky>
          </div>
          <div class="col-12 col-md-6">
            <badge>Step 1</badge>

            <h2 class="fs-3" id="collect">Collect order data</h2>

            <p>
              During processing of a customer's order, collect the relevant data
              into a single JSON object. The object should have a
              <code>meta</code> property and a <code>products</code> property.
            </p>

            <p>
              The <code>meta</code> property should have the following
              properties:
            </p>

            <div class="mx-2">
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td>store</td>
                    <td>The name of your store</td>
                  </tr>
                  <tr>
                    <td>order_date</td>
                    <td>The order date in DD/MM/YYYY format</td>
                  </tr>
                  <tr>
                    <td>currency</td>
                    <td>The currency used in your shop (e.g. USD, EUR)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              The <code>products</code> property be a array of objects with the
              following properties:
            </p>

            <div class="mx-2">
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td>name</td>
                    <td>The name of the product</td>
                  </tr>
                  <tr>
                    <td>visual</td>
                    <td>
                      An link to the main product image
                      <i><code>optional</code></i>
                    </td>
                  </tr>

                  <tr>
                    <td>deposit</td>
                    <td>The deposit for the product</td>
                  </tr>
                  <tr>
                    <td>lifespan</td>
                    <td>The expected lifespan of the product in days</td>
                  </tr>
                  <tr>
                    <td>amount</td>
                    <td>Amount of products ordered. The default value is 1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 class="mt-4 fs-6">Example:</h4>

            <div class="bg-white rounded">
              <pre><code>
        {
          "meta": {
            "store": "Hedera Store",
            "order_date": "07/05/2023", 
            "currency": "EUR"
          },
          "products": [
            {
              "name": "Build HAPI T-shirt",
              "visual": "https://url-to-product-image-here",
              "amount": 2,
              "deposit": 2.45,
              "lifespan": "3650"
            }
          ]
        }
              </code></pre>
            </div>

            <div class="mt-4" id="encode">
              <badge>Step 2</badge>

              <h2>Encode</h2>

              <p>Encode the object using base64 encoding</p>

              <h4 class="fs-6">Example:</h4>

              <div class="bg-white rounded">
                <pre><code>
      let encoded = Buffer.from(JSON.stringify(data)).toString("base64");
      console.log(encoded);
              </code> </pre>
              </div>

              <h4 class="fs-6">Output:</h4>

              <div class="bg-white rounded p-2" style="word-wrap: break-word">
                ewogICJtZXRhIjogewogICAgInN0b3JlIjogIkhlZGVyYSBTdG9yZSIsCiAgICAib3JkZXJfZGF0ZSI6ICIwNy8wNS8yMDIzIiwgCiAgICAiY3VycmVuY3kiOiAiRVVSIgogIH0sCiAgInByb2R1Y3RzIjogWwogICAgewogICAgICAibmFtZSI6ICJCdWlsZCBIQVBJIFQtc2hpcnQiLAogICAgICAidmlzdWFsIjogImh0dHBzOi8vdXJsLXRvLXByb2R1Y3QtaW1hZ2UtaGVyZSIsCiAgICAgICJhbW91bnQiOiAyLAogICAgICAiZGVwb3NpdCI6IDIuNDUsCiAgICAgICJsaWZlc3BhbiI6ICIzNjUwIgogICAgfQogIF0KfQ==
              </div>
            </div>

            <div class="mt-4" id="create-link" style="word-wrap: break-word">
              <badge>Step 3</badge>

              <h2>Create link</h2>

              <p>Create a link to Helix using the encoded string:</p>

              <a
                href="https://helix.codesparks.nl/create/ewogICJtZXRhIjogewogICAgInN0b3JlIjogIkhlZGVyYSBTdG9yZSIsCiAgICAib3JkZXJfZGF0ZSI6ICIwNy8wNS8yMDIzIiwgCiAgICAiY3VycmVuY3kiOiAiRVVSIgogIH0sCiAgInByb2R1Y3RzIjogWwogICAgewogICAgICAibmFtZSI6ICJCdWlsZCBIQVBJIFQtc2hpcnQiLAogICAgICAidmlzdWFsIjogImh0dHBzOi8vdXJsLXRvLXByb2R1Y3QtaW1hZ2UtaGVyZSIsCiAgICAgICJhbW91bnQiOiAyLAogICAgICAiZGVwb3NpdCI6IDIuNDUsCiAgICAgICJsaWZlc3BhbiI6ICIzNjUwIgogICAgfQogIF0KfQ=="
                >https://helix.codesparks.nl/ewogICJtZXRhIjogewogICAgInN0b3JlIjogIkhlZGVyYSBTdG9yZSIsCiAgICAib3JkZXJfZGF0ZSI6ICIwNy8wNS8yMDIzIiwgCiAgICAiY3VycmVuY3kiOiAiRVVSIgogIH0sCiAgInByb2R1Y3RzIjogWwogICAgewogICAgICAibmFtZSI6ICJCdWlsZCBIQVBJIFQtc2hpcnQiLAogICAgICAidmlzdWFsIjogImh0dHBzOi8vdXJsLXRvLXByb2R1Y3QtaW1hZ2UtaGVyZSIsCiAgICAgICJhbW91bnQiOiAyLAogICAgICAiZGVwb3NpdCI6IDIuNDUsCiAgICAgICJsaWZlc3BhbiI6ICIzNjUwIgogICAgfQogIF0KfQ==</a
              >
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </section>
  </main>
</template>

<script>
export default {};
</script>

<style></style>

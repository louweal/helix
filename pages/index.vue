<template>
  <main>
    <hero />

    <section id="about">
      <div class="container-xl">
        <div
          class="row justify-content-center text-center"
          data-aos="fade-up-scale"
        >
          <div class="col-12 col-md-8">
            <h2 class="lh-sm">
              Helix motivates people to buy sustainable products and to use
              their purchases longer. Together we can reduce waste, pollution
              and emission.
            </h2>
          </div>
          <div class="col-12 col-md-10 fs-md">
            <p>
              Attach environmental deposits to any type of product or service,
              from clothing to furniture to boat tours. Your customers already
              care about the environment, now it is time to give them the
              opportunity to contribute!
            </p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container-xl">
        <div class="row gy-4">
          <div class="col-12 col-lg-6 order-lg-1" data-aos="fade">
            <div class="position-relative">
              <TransitionGroup name="image" tag="div" class="ratio ratio-1x1">
                <img
                  key="sustainability"
                  src="@/images/sustainability.jpg"
                  alt="sustainability"
                  class="rounded w-100"
                  v-if="$store.state.accordions.list.why === 'sustainability'"
                />
                <img
                  key="advantage"
                  src="@/images/advantage.jpg"
                  alt="competitive advantage"
                  class="rounded w-100"
                  v-else-if="$store.state.accordions.list.why === 'advantage'"
                />
                <img
                  key="trust"
                  src="@/images/trust.jpg"
                  alt="build trust"
                  class="rounded w-100"
                  v-else-if="$store.state.accordions.list.why === 'trust'"
                />
                <img
                  key="trust"
                  src="@/images/drive.jpg"
                  alt="drive sustainable behavior"
                  class="rounded w-100"
                  v-else-if="$store.state.accordions.list.why === 'drive'"
                />
                <img
                  key="why"
                  src="@/images/why.jpg"
                  alt="why sustainability transparency"
                  class="rounded w-100"
                  v-else
                />
              </TransitionGroup>
            </div>
          </div>
          <div class="col-12 col-lg-6 order-lg-0" data-aos="fade-up-scale">
            <badge> Consious shopping </badge>

            <h2>Meet the growing demand for transparency</h2>

            <p class="fs-md">
              Consumers are increasingly concerned about the environmental
              impact of their purchases. By providing detailed information about
              the environmental footprint of products, you can meet the growing
              demand for transparency and empower customers to make informed
              choices aligned with their values.
            </p>

            <div class="accordion">
              <accordion-item
                title="Contribute to global sustainability goals"
                name="why"
                slug="sustainability"
              >
                <p>
                  By providing information about the environmental impact of
                  products, you play a crucial role in supporting global
                  sustainability goals, such as reducing carbon emissions,
                  conserving resources, and minimizing waste. You will become an
                  active participant in the larger mission to create a more
                  sustainable and environmentally responsible society!
                </p>
              </accordion-item>
              <accordion-item
                title="Get competitive advantage"
                name="why"
                slug="advantage"
              >
                <p>
                  In a crowded marketplace, providing information about the
                  environmental impact of products can help you stand out from
                  the competition. It showcases a your dedication to
                  sustainability and attracts environmentally conscious
                  consumers who actively seek out businesses that align with
                  their values.
                </p>
              </accordion-item>
              <accordion-item
                title="Build trust and loyalty"
                name="why"
                slug="trust"
              >
                <p>
                  Transparent communication about the environmental impact
                  demonstrates your commitment to sustainability. This builds
                  trust with customers who value eco-conscious practices and can
                  lead to increased loyalty and repeat business.
                </p>
              </accordion-item>
              <accordion-item
                title="Drive sustainable consumer behavior"
                name="why"
                slug="drive"
              >
                <p>
                  By highlighting the environmental impact of products, you can
                  educate and inspire customers to make more sustainable
                  choices. This can drive positive changes in consumer behavior,
                  encouraging the adoption of eco-friendly products and
                  influencing purchasing decisions across the market.
                </p>
              </accordion-item>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container-xl">
        <div class="row gy-4">
          <div class="col-12 col-lg-6 order-lg-1">
            <div class="w-100 position-relative" data-aos="fade">
              <div class="position-relative">
                <TransitionGroup
                  name="image"
                  tag="div"
                  class="position-relative ratio ratio-1x1"
                >
                  <img
                    key="lifespan"
                    src="@/images/lifespan.jpg"
                    alt="lifespan product"
                    class="rounded w-100"
                    v-if="$store.state.accordions.list.how === 'lifespan'"
                  />

                  <img
                    key="deposit"
                    src="@/images/deposit.jpg"
                    alt="environmental deposit"
                    class="rounded w-100"
                    v-else-if="$store.state.accordions.list.how === 'deposit'"
                  />
                  <img
                    key="how"
                    src="@/images/how.jpg"
                    alt="how"
                    class="rounded w-100"
                    v-else
                  />
                </TransitionGroup>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6" data-aos="fade-up-scale">
            <badge>How it works</badge>

            <h2>Quantify the environmental impact of your products</h2>

            <p class="fs-md">
              To effectively utilize Helix, it is important to quantify the
              following factors concerning the product(s) you sell:
            </p>

            <div class="accordion">
              <accordion-item
                title="1. Expected lifespan"
                name="how"
                slug="lifespan"
              >
                <p>
                  Review the documentation from the manufacturer, user manuals,
                  or specifications provided by the manufacturer. They may
                  provide an indication of the expected lifespan or durability
                  of the product.
                </p>
                <p>
                  If available, explore customer reviews and feedback regarding
                  the durability and longevity of the product. While individual
                  experiences may vary, collective insights can offer a general
                  understanding. Also take into account that the expected
                  lifespan is an approximation and may vary based on usage
                  patterns, maintenance, and other individual factors.
                </p>
              </accordion-item>
              <accordion-item
                title="2. Deposit amount"
                name="how"
                slug="deposit"
              >
                <p>
                  Determine a deposit amount that is both fair and afforable by
                  evaluating a range of factors throughout the lifecycle of the
                  product, including raw material extraction, manufacturing
                  processes, distribution, use, and disposal.
                </p>
                <p>
                  Take into account multiple environmental aspects, such as
                  greenhouse gas emissions, energy consumption, water usage,
                  waste generation, and chemical pollution.
                </p>
              </accordion-item>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="about">
      <div class="container-xl">
        <div
          class="row justify-content-center text-center"
          data-aos="fade-up-scale"
        >
          <div class="col-12 col-md-8">
            <h2 class="lh-sm">
              The customer gets up to 60% of the deposit back during the
              lifespan of the product and 10% is donated to his favorite
              environmental charity.
            </h2>
          </div>
          <div class="col-12 col-md-10 fs-md">
            <p>
              When a customer sells the product to someone else, the buyer
              receives a 30% of it's deposit, encouraging a thriving secondhand
              market. Additionally, if the customer disposes of the product
              prematurely before its expected lifespan ends, the remaining
              deposit is donated to their chosen environmental charity.
            </p>

            <p>
              It's a win-win situation that rewards sustainable practices while
              supporting meaningful causes.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="docs">
      <div class="container-xl">
        <div class="row gy-4">
          <div class="col-12 col-lg-6 order-lg-1">
            <div class="position-relative" data-aos="fade">
              <TransitionGroup
                name="image"
                tag="div"
                class="position-relative ratio ratio-1x1"
              >
                <img
                  key="guide"
                  src="@/images/guide.jpg"
                  alt="setup guide helix"
                  class="rounded w-100"
                  v-if="$store.state.accordions.list.tech === 'guide'"
                />

                <img
                  key="hedera"
                  src="@/images/hedera.jpg"
                  alt="hedera hashgraph"
                  class="rounded w-100"
                  v-else-if="$store.state.accordions.list.tech === 'hedera'"
                />
                <img
                  key="smart"
                  src="@/images/smart.jpg"
                  alt="smart contracts"
                  class="rounded w-100"
                  v-else-if="$store.state.accordions.list.tech === 'smart'"
                />
                <img
                  key="hbar"
                  src="@/images/hbar.jpg"
                  alt="smart contracts"
                  class="rounded w-100"
                  v-else-if="$store.state.accordions.list.tech === 'hbar'"
                />
                <img
                  key="tech"
                  src="@/images/tech.jpg"
                  alt="technology for sustainability"
                  class="rounded w-100"
                  v-else
                />
              </TransitionGroup>
            </div>
          </div>
          <div class="col-12 col-lg-6" data-aos="fade-up-scale">
            <badge> Tech </badge>

            <h2>
              Unlock the power of smart contracts on the Hedera Hashgraph
              network
            </h2>

            <p>
              The deposits
              <span class="fw-bold"
                >aren't stored by Helix or any other company</span
              >. Instead, there are securely stored on a <i>blockchain</i>,
              within a so-called <i>smart contract</i>. This contract also
              enforces the previously mentioned rules.
            </p>

            <div class="accordion">
              <accordion-item
                title="What are smart contracts?"
                name="tech"
                slug="smart"
              >
                <p>
                  A smart contract is a self-executing computer program that
                  automatically enforces and facilitates the terms of an
                  agreement or contract between parties. It operates on a
                  blockchain network and is executed when predefined conditions
                  are met. Smart contracts eliminate the need for
                  intermediaries, increase efficiency, and ensure trust and
                  transparency in digital transactions.
                </p>
              </accordion-item>
              <accordion-item
                title="What is Hedera Hashgraph?"
                name="tech"
                slug="hedera"
              >
                <p>
                  Hedera Hashgraph is a distributed public ledger technology
                  that aims to provide a secure, fast, and fair platform for
                  decentralized applications (dApps). It utilizes a directed
                  acyclic graph (DAG) structure combined with a consensus
                  algorithm to achieve consensus and validate transactions.
                  Hedera Hashgraph aims to offer high throughput, low latency,
                  and strong security while providing a platform for building
                  scalable and decentralized applications.
                </p>
              </accordion-item>

              <accordion-item
                title="How can I offer Helix to my clients?"
                name="tech"
                slug="guide"
              >
                <p>
                  Helix seamlessly integrates with any online store without the
                  need for any installations. When a customer places an order in
                  your shop, all you have to do is generate a personalized link
                  to Helix by decoding the relevant data using base64 encoding.
                  For detailed instructions, please refer to our comprehensive
                  <nuxt-link to="/guide" class="border-bottom"
                    >Setup guide</nuxt-link
                  >
                  or
                  <nuxt-link to="/create" class="border-bottom"
                    >view our demo</nuxt-link
                  >.
                </p>
              </accordion-item>

              <accordion-item
                title="Which currencies are supported?"
                name="tech"
                slug="hbar"
              >
                <p>
                  Due to Helix operating on Hedera's decentralized ledger
                  technology, the current payment option for deposits is limited
                  to Hedera's native currency, HBAR. Nevertheless, our future
                  plans involve expanding support for additional currencies.
                </p>
              </accordion-item>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="sponsors">
      <div class="container-xl">
        <div class="py-4 px-2 text-center bg-light rounded">
          <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8" data-aos="fade">
              <h3>These companies already love us</h3>

              <p class="fs-md">
                We received generous prizes from The HBAR Foundation and Avery
                Dennison during the
                <a
                  href="https://devpost.com/software/hedera-helix"
                  target="_blank"
                  class="border-bottom"
                  >Hedera Hackathon</a
                >
                in May 2022.
              </p>

              <div class="d-flex justify-content-center">
                <div class="row">
                  <div class="col-12 col-sm-6">
                    <a href="https://www.hbarfoundation.org/" target="_blank">
                      <img
                        src="@/images/hbarfoundation.png"
                        alt="The HBAR foundation"
                        class="w-100 logo"
                      />
                    </a>
                  </div>
                  <div class="col-12 col-sm-6">
                    <a
                      href="https://www.averydennison.com/"
                      target="_blank"
                      class="img-hover"
                    >
                      <img
                        src="@/images/avery-dennison.png"
                        alt="Avery Dennison"
                        class="w-100 logo"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="roadmap">
      <div class="container-xl">
        <div class="row gy-4">
          <div class="d-none d-md-block col-md-4">
            <div data-aos="fade-up-scale" class="h-100">
              <sticky>
                <div>
                  <badge> Versions </badge>

                  <roadmap />
                </div>
              </sticky>
            </div>
          </div>

          <div class="col-12 col-md-8">
            <div data-aos="fade-up-scale">
              <badge>Hello Future </badge>

              <h2>On the road to a greener planet</h2>

              <div class="fs-md">
                <p>
                  We believe that transparency is key to building a successful
                  business. That's why we're excited to share with you our
                  vision for the future, and the steps we're taking to get
                  there.
                </p>

                <p>
                  The roadmap below shows the key milestones and initiatives as
                  we work to bring our products and services to market. We want
                  you to be a part of this journey, and to share in our
                  excitement as we build something truly great. So, whether
                  you're an investor, a webshop owner, or just someone who's
                  interested in what we're doing, we invite you to join us on
                  this journey.
                </p>
              </div>

              <p xxxdata-aos="fade">
                <nuxt-link
                  :to="{ hash: '#contact' }"
                  class="fw-bold text-primary"
                  >Contact us to join our mission<i
                    class="ps-1 bi bi-arrow-right"
                  ></i
                ></nuxt-link>
              </p>
            </div>

            <div
              class="row gy-2 mt-2 border-top"
              id="v01"
              data-aos="fade-up-scale"
            >
              <span class="font-small fw-light">v0.1</span>

              <p>
                This version was submitted to the Hedera Hackathon and won two
                prizes.
              </p>

              <div class="col-12 col-lg-6">
                <h4>Initial proof-of-concept</h4>

                <p>
                  The proof-of-concept included a front-end for mobile devices
                  and smart contract technology running on the Hedera testnet.
                  We provided some demo accounts to experiment with the
                  features.
                </p>
              </div>

              <div class="col-12 col-lg-6">
                <h4>Pitch video</h4>

                <p>
                  We created a
                  <a
                    class="border-bottom"
                    href="https://www.youtube.com/watch?v=VQ1XsoY8KiQ"
                    target="_blank"
                    >pitch video</a
                  >
                  <i class="bi bi-box-arrow-up-right"></i>
                  showcasing the vision, goals and mission of Helix and
                  demonstrating the proof-of-concept app.
                </p>
              </div>
            </div>
            <div
              class="row gy-2 mt-2 border-top"
              id="v02"
              data-aos="fade-up-scale"
            >
              <span class="font-small fw-light">v0.2</span>

              <p>
                This version represents a substantial enhancement to the design
                and usability of Helix.
              </p>

              <div class="col-12 col-lg-6">
                <h4>App makeover</h4>

                <p>
                  We've given the app a complete makeover! We rebuilt it from
                  scratch to make it look even more stunning and user-friendly.
                  Plus, we've made sure it's easier to maintain down the road.
                  That's not all – we've also added sorting functionality to
                  make it easier to navigate through the contracts.
                </p>
              </div>

              <div class="col-12 col-lg-6">
                <h4>Dedicated desktop UX</h4>

                <p>
                  We've created a dedicated desktop front-end for seamless usage
                  alongside the
                  <a
                    class="border-bottom"
                    href="https://chrome.google.com/webstore/detail/hashpack/gjagmgiddbbciopjhllkdnddhcglnemk"
                    target="_blank"
                    >Hashpack browser extension
                  </a>
                  <i class="bi bi-box-arrow-up-right"></i>. We're excited to
                  announce that upcoming support for the Hashpack browser
                  extension is on its way.
                </p>
              </div>

              <div class="col-12 col-lg-6">
                <h4>New homepage!</h4>

                <p>
                  We've relocated the app to a new URL at
                  <nuxt-link to="/app">/app</nuxt-link> and introduced a fresh
                  homepage that serves a dual purpose: welcoming and onboarding
                  new clients, specifically webshop owners, as well as engaging
                  new end-users, the consumers.
                </p>
              </div>
            </div>
            <div data-aos="fade-up-scale">
              <div class="row gy-2 mt-2 border-top" id="v03">
                <span class="font-small fw-light">v0.3</span>

                <p>Helix's core functionality has undergone major updates!</p>

                <div class="col-12 col-lg-6">
                  <h4>Adding Hashpack connection</h4>

                  <p>
                    You can now connect your (testnet) wallet to the Helix app
                    using the
                    <a
                      class="border-bottom"
                      href="https://chrome.google.com/webstore/detail/hashpack/gjagmgiddbbciopjhllkdnddhcglnemk"
                      target="_blank"
                      >Hashpack browser extension
                    </a>
                    <i class="bi bi-box-arrow-up-right"></i>! And don't worry if
                    you don't have an Hedera wallet, we are looking into other
                    payment options as well!
                  </p>
                </div>

                <div class="col-12 col-lg-6">
                  <h4>Personal links</h4>

                  <p>
                    We completely changed the way how shops integrate Helix. We
                    made deposit payment optional and shops no longer have to
                    create the deposit contracts. Instead, shops can now send
                    their customers a personal link, which the customer can use
                    to pay the deposits.
                  </p>
                </div>

                <div class="col-12 col-lg-6">
                  <h4>Smarter smart contracts</h4>

                  <p>
                    We made new smart contracts that are simpler and more
                    efficient. This increases execution time, reduces
                    transaction fees and minimizes resource usage.
                  </p>
                </div>
              </div>
            </div>
            <div
              class="row gy-2 mt-2 border-top"
              id="v04"
              data-aos="fade-up-scale"
            >
              <span class="font-small fw-light">v0.4+</span>

              <p>We have exiting plans for the (near) future!</p>

              <div class="col-12 col-lg-6">
                <h4>OnRamp solutions</h4>

                <p>
                  We're planning to integrate an onramping service, such as
                  <a
                    href="https://www.c14.money/"
                    target="_blank"
                    class="border-bottom"
                    >C14</a
                  >, to make it easy for everyone to buy the crypto needed to
                  interact with our dApp.
                </p>
              </div>
              <div class="col-12 col-lg-6">
                <h4>Marketing</h4>

                <p>
                  By promoting Helix we aim to reach a wider audience and
                  effectively showcase the value and benefits of using Helix to
                  reduce waste, pollution and CO2 emission.
                </p>
              </div>
              <div class="col-12 col-lg-6">
                <h4>Launch on mainnet</h4>

                <p>
                  For Helix to make a significant impact on the environment, it
                  is crucial that it goes live on the mainnet. While being
                  limited to the testnet, its potential remains unrealized. As
                  soon as our testing phase is completed, we are committed to
                  promptly launch Helix on the mainnet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact">
      <div class="container-xl">
        <div class="py-4 px-2 text-center text-white bg-primary rounded">
          <div class="row justify-content-center" data-aos="fade">
            <div class="col-12 col-md-10">
              <h3 class="text-white">Let's connect</h3>

              <p>
                We're excited to connect with you. Got a question, need some
                help, or just want to say hi? Drop us a message!
              </p>

              <div class="d-flex justify-content-center">
                <nuxt-link to="/contact" class="btn btn-blue">
                  <i class="bi bi-envelope me-2"></i> Send message
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script></script>
<style></style>

import React from "react";

function Footer() {
  return (
    <footer class="text-center text-white"  style={{
                      background: "#f1f1f1;",
                    }}>
      <div class="container pt-4 pb-2">
        <section class="mb-1">
          <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i class="fab fa-facebook-f"></i>
          </a>

          <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i class="fab fa-twitter"></i>
          </a>

          <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i class="fab fa-google"></i>
          </a>

          <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i class="fab fa-instagram"></i>
          </a>

          <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i class="fab fa-linkedin"></i>
          </a>

          <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i class="fab fa-github"></i>
          </a>
        </section>
      </div>

      <div
        class="text-center text-dark"
        style={{
          background: "rgba(0, 0, 0, 0.2);",
        }}
      >
        © 2020 Copyright:
        <a class="text-dark" href="https://mdbootstrap.com/">
           
        </a>
      </div>
    </footer>
  );
}

export default Footer;

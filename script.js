const menu = document.querySelector("#mobile-menu");
const menuList = document.querySelector(".nav-list");
const preloader = document.querySelector(".preloader");
const btnToTop = document.querySelector(".btn-to-top");
const root = document.documentElement;

menu.addEventListener("click", () => {
  menu.classList.toggle("is-active");
  menuList.classList.toggle("nav-active");

  const active = document.querySelector(".is-active");

  active ? (root.style.overflow = "hidden") : (root.style.overflow = null);
});

menuList.addEventListener("click", () => {
  menu.classList.remove("is-active");
  menuList.classList.remove("nav-active");
  root.style.overflow = null;
});

const fadeOut = () => {
  setInterval(() => {
    if (!preloader.style.opacity) {
      preloader.style.opacity = 1;
    }

    if (preloader.style.opacity >= 0) {
      setTimeout(() => {
        preloader.style.opacity -= 0.1;
      }, 1000);
    } else {
      clearInterval(fadeOut);
      preloader.style.display = "none";
    }
  }, 100);
};

window.addEventListener("load", fadeOut);

const scrollScreen = () => {
  if (window.scrollY > 300) {
    btnToTop.classList.add("show");
  } else {
    btnToTop.classList.remove("show");
  }
};

btnToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", scrollScreen);

const destination = document.querySelectorAll(".destination");
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
  (entries, observer) => {
    let delay = 0;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("enter");
          entry.target.classList.remove("before-enter");
        }, delay);
        delay += 150;
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

destination.forEach((image) => {
  observer.observe(image);
});

cards.forEach((card) => {
  observer.observe(card);
});

document.addEventListener("DOMContentLoaded", function () {
  // Toggle tasks functionality with GSAP animations
  document.querySelectorAll(".toggle-tasks").forEach((toggleButton) => {
    const tasksList = toggleButton.nextElementSibling; // Related tasks list
    const toggleText = toggleButton.querySelector(".toggle-text"); // Text span
    const arrowIcon = toggleButton.querySelector("i");

    toggleButton.addEventListener("click", function () {
      // Animate the button (bounce effect)
      gsap.fromTo(
        toggleButton,
        { scale: 0.95 },
        { scale: 1, duration: 0.2, ease: "back.out(1.7)" }
      );

      // Check current state: if tasksList is hidden, then expand
      if (tasksList.classList.contains("hidden")) {
        // Remove the hidden class and animate opening the tasks list
        tasksList.classList.remove("hidden");
        gsap.fromTo(
          tasksList,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" }
        );
        toggleText.textContent = "Hide";
        gsap.to(arrowIcon, {
          rotation: 180,
          duration: 0.5,
          ease: "power2.out",
        });
        toggleButton.setAttribute("aria-expanded", "true");
      } else {
        // Animate collapse, then add the hidden class after animation
        gsap.to(tasksList, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            tasksList.classList.add("hidden");
          },
        });
        toggleText.textContent = "Read more";
        gsap.to(arrowIcon, { rotation: 0, duration: 0.5, ease: "power2.in" });
        toggleButton.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Register the ScrollTrigger plugin with GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Animate the work cards on scroll
  gsap.from(".work-card", {
    scrollTrigger: {
      trigger: ".work-card", // Animate when a work card comes into view
      start: "top 80%", // When top of card hits 80% of viewport height
      toggleActions: "play none none none",
      // markers: true,      // Uncomment to see markers for debugging
    },
    y: 50, // Start 50px lower
    opacity: 0, // Start fully transparent
    duration: 1, // Animation duration
    stagger: 0.2, // Stagger animations for each card
  });
});

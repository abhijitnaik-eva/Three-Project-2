window.toggleDropdown = function toggleDropdown(id) {
      const dropdowns = ["geometryDropdown", "lightDropdown", "cameraDropdown", "materialDropdown", "developerDropdown"];

      dropdowns.forEach(drop => {
        if (drop !== id) {
          document.getElementById(drop).classList.add("hidden");
        }
      });

      document.getElementById(id).classList.toggle("hidden");
    }

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".relative")) {
        document.querySelectorAll('[id$="Dropdown"]').forEach(drop => {
          drop.classList.add("hidden");
        });
      }
    });

    document.addEventListener("DOMContentLoaded", function () {

      const profileImage = document.getElementById("profileImage");
      const modal = document.getElementById("imageModal");
      const modalImage = document.getElementById("modalImage");
      const closeModal = document.getElementById("closeModal");

      profileImage.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        modalImage.src = profileImage.src;
      });

      closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.add("hidden");
          modal.classList.remove("flex");
        }
      });

    });
// Disables all autocomplete/suggestions on all inputs
const disableAutocomplete = {
  install(Vue) {
    Vue.mixin({
      mounted() {
        this.disableAutoComplete();
      },

      methods: {
        disableAutoComplete() {
          let elements = document.querySelectorAll("input");

          if (!elements) {
            return;
          }

          elements.forEach(element => {
            // leave alone if element has been set to read only.
            if (element.getAttribute("readonly")) {
              return;
            }

            element.setAttribute("readonly", "readonly");
            element.setAttribute("autocomplete", "off");

            setTimeout(() => {
              element.removeAttribute("readonly");
            }, 500);
          });
        }
      }
    });
  }
};

export default disableAutocomplete;

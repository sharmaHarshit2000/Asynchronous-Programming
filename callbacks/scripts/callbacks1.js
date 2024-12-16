
      document
        .getElementById("callback-btn")
        .addEventListener("click", function () {
          setTimeout(() => {
            document.getElementById("callback-text").innerHTML =
              "<p>Callback executed after 5 seconds</P>";
          }, 5000);
        });
  
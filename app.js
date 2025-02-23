let inp_link = document.querySelector("#link");
let shortIt = document.querySelector(".section2 button");

function new_links() {
  let box = document.createElement("div");
  let ogUrl = document.createElement("p");
  let short = document.createElement("p");

  box.className = "linkCards";
}

const shortenUrl = async () => {
  const url = "https://url-shortener42.p.rapidapi.com/shorten/";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "8b3ce5f100mshf1ba64f85626f53p1e6dcejsn57b838eaf172",
      "x-rapidapi-host": "url-shortener42.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Stringify the body object
      url: inp_link.value,
      validity_duration: 1,
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

// Call the function

shortIt.addEventListener("click", async () => {
  shortenUrl();
});

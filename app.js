let inp_link = document.querySelector("#link");
let shortIt = document.querySelector(".section2 button");
let bigContainer = document.querySelector(".bigContainer");
let section2 = document.querySelector(".section2");
let err_msg = document.querySelector("#error");
let menu = document.getElementById("menu");
let card2 = document.querySelector(".card2");
let navigation = document.querySelector(".hide");

function new_links(res) {
  let box = document.createElement("div");
  box.className = "linkCards";
  let linkBox = document.createElement("div");
  linkBox.className = "linkBox";

  let ogUrl = document.createElement("a");
  ogUrl.innerHTML = inp_link.value;
  ogUrl.setAttribute("href", inp_link.value);
  ogUrl.setAttribute("target", "_blank");
  ogUrl.style.width = "70%";

  let short = document.createElement("a");
  short.innerHTML = res;
  short.setAttribute("href", res);
  short.setAttribute("target", "_blank");
  short.style.color = "hsl(180, 66%, 49%)";

  let btn = document.createElement("button");
  btn.className = "copy";
  btn.innerHTML = "Copy";
  btn.addEventListener("click", () => {
    navigator.clipboard.writeText(res);
    btn.classList.add("copied");
    btn.innerHTML = "Copied!";
    setTimeout(() => {
      btn.textContent = "Copy"; // Reset the text to 'Copy'
      btn.classList.remove("copied"); // Remove the 'copied' class to reset color
    }, 500);
  });

  section2.after(box);
  box.appendChild(linkBox);
  box.appendChild(btn);
  linkBox.appendChild(ogUrl);
  linkBox.appendChild(short);
}

function validation(isValid) {
  if (isValid) {
    inp_link.style.outline = "none";
    err_msg.style.display = "none";
  } else {
    inp_link.style.outline = "3px solid hsl(0, 87%, 67%)";
    err_msg.style.display = "inline";
  }
}

const shortenUrl = async () => {
  if (!inp_link.value) {
    validation(false);
    return;
  }
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
    validation(true);

    if (result.message == "URL is invalid") {
      validation(false);
    } else {
      new_links(result.url);
      inp_link.value = "";
    }
  } catch (err) {
    console.error(err);
  }
};

shortIt.addEventListener("click", async () => {
  shortenUrl();
});

inp_link.addEventListener("keypress", () => {
  validation(true);
});

menu.addEventListener("click", () => {
  navigation.classList.toggle("hide");
  card2.classList.toggle("hide");

  navigation.classList.toggle("navigation");
  card2.classList.toggle("card2");
});

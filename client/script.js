// const button = document.querySelector("button")
const checkout_btn = document.getElementById('checkout-btn')
// checkout_btn.style.backgroundColor = "green"
checkout_btn.addEventListener("click", () => {
  // console.log('CHECKOUT TIME YAHOO')
  fetch("http://localhost:3000/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: getItemsForStripe(),
    }),
  })
    .then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
      window.location = url
    })
    .catch(e => {
      console.error(e.error)
    })
})
// @ts-check

;(() => {
  /**
   * @type { HTMLInputElement }
   **/
  // @ts-ignore
  const input = document.getElementById("input")
  const form = document.getElementById("form")
  const output = document.getElementById("output")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const response = await fetch("/data", {
      method: "POST",
      headers: {
        "content-type": "text/plain",
      },
      body: input.value,
    })
    const text = await response.text()
    output.innerText = text
  })
})()

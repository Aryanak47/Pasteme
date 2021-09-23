const userDocument = document.querySelectorAll(".note__list")


userDocument.forEach(document => {
    document.onclick = () => {
      const id = document.dataset.id
    //   Redirect user to different document page
      window.location = `/document/${id}`
    }
})
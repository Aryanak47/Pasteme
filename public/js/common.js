const userDocument = document.querySelectorAll(".note__list");
const pinButtons = document.querySelectorAll(".pin-btn");
const pinnedData = document.getElementsByClassName("pinnedData")[0];

const attachDocumentEventListener = (element) => {
  element.onclick = () => {
    const id = element.dataset.id;
    //   Redirect user to different document page
    window.location = `/document/${id}`;
  };
};
const attachPinEventListener = (element, data = { pinned: true }) => {
  element.onclick = async () => {
    try {
      const documentId = element.parentNode.nextElementSibling.dataset.id;
      await axios.put(`/document/${documentId}`, data);
      location.reload();
    } catch (error) {
      alert("something went wrong.Try again later!")
    }
  };
};

pinButtons.forEach((btn) => {
  attachPinEventListener(btn);
});
userDocument.forEach((document) => {
  attachDocumentEventListener(document);
});

if (pinnedData) {
  let data = pinnedData.getAttribute("data-pinned");
  data = JSON.parse(data);
  const parent = document.querySelector(".pinDocument");
  const html = `<div class="pin">
                <button class="pin-active" ><i class="fas fa-thumbtack"></i></button>
              </div>
              <button data-id=${data._id} class="pin_note note__list">
                <div class="note__title">
                ${data.document.split(" ")[0]}
                </div>
                <div class="note__body">${data.document}</div>
              </button>`;
  parent.insertAdjacentHTML("beforeend", html);
  const pinnedButton = document.querySelector(".pin-active");
  const pinnedDocument = document.querySelectorAll(".note__list")[0];
  attachPinEventListener(pinnedButton, { pinned: false });
  attachDocumentEventListener(pinnedDocument);
}

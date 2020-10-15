export default class Widget {
  constructor(container, url) {
    this.container = container;
    this.comments = [];
    this.eventSource = new EventSource(url);

    this.eventSource.addEventListener("comment", (evt) => {
      console.log(evt.data);
      this.addComments(JSON.parse(evt.data));
      this.showWidget();
    });

    this.eventSource.addEventListener("open", (evt) => {
      console.log(evt);
      console.log("connected");
    });

    this.eventSource.addEventListener("error", (evt) => {
      console.log(evt);
      console.log("error");
    });
  }

  addComments(comment) {
    this.comments.push(comment);
  }

  showWidget() {
    this.container.innerHTML = '';

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    this.comments.forEach((elem) => {
      const comment = document.createElement("div");
      comment.classList.add("comment");
      const text = document.createElement("div");
      text.classList.add("text");
      const date = document.createElement("div");
      date.classList.add("date");
      const action = document.createElement("div");

      if (elem.type === "freekick") {
        action.classList.add("freekick");
      } else if (elem.type === "goal") {
        action.classList.add("goal");
      } else {
        action.classList.add("action");
      }

      text.textContent = elem.text;
      date.textContent = elem.date;

      comment.append(action, date, text);
      wrapper.appendChild(comment);
    });
    this.container.appendChild(wrapper);
    wrapper.scrollTop = 9999;
  }
}

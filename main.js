const browserInfo = {
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  cookieEnabled: navigator.cookieEnabled,
  javaEnabled: navigator.javaEnabled(),
};

localStorage.setItem("browserInfo", JSON.stringify(browserInfo));

const footer = document.getElementById("site-footer");
const storedInfo = JSON.parse(localStorage.getItem("browserInfo"));

if (storedInfo) {
  footer.innerHTML = `
    <strong>Інформація про систему:</strong><br>
    User Agent: ${storedInfo.userAgent}<br>
    Платформа: ${storedInfo.platform}<br>
    Мова: ${storedInfo.language}<br>
    Cookies увімкнено: ${storedInfo.cookieEnabled}<br>
    Java увімкнено: ${storedInfo.javaEnabled}
  `;
}


  const commentsList = document.getElementById("comments-list");
  const postId = 4; 

  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(response => response.json())
    .then(comments => {
      comments.forEach(comment => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${comment.name}</strong> (${comment.email}):<br>${comment.body}`;
        commentsList.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Помилка завантаження коментарів:", error);
    });



  setTimeout(() => {
    document.getElementById('modal').classList.remove('hidden');
  }, 60000);


  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
  });


const toggle = document.getElementById('themeToggle');
  const prefersNight = () => {
    const hours = new Date().getHours();
    return hours < 7 || hours >= 21;
  };

  function applyTheme(night) {
    document.body.classList.toggle('night', night);
    toggle.checked = night;
    localStorage.setItem('theme', night ? 'night' : 'day');
  }

  toggle.addEventListener('change', () => {
    applyTheme(toggle.checked);
  });

  const saved = localStorage.getItem('theme');
  if (saved) {
    applyTheme(saved === 'night');
  } else {
    applyTheme(prefersNight());
  }

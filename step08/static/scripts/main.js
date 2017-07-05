var signout = document.querySelector('#signout');
signout.addEventListener('click', function() {
  if (navigator.credentials) {
    navigator.credentials.requireUserMediation()
    .then(function() {
      location.href = '/signout';
    });
  } else {
    location.href = '/signout';
  }
});

var unregForm = document.querySelector('#unregForm');
unregForm.addEventListener('submit', function(e) {
  e.preventDefault();

  fetch('/unregister', {
    method: 'POST',
    credentials: 'include',
    body: new FormData(unregForm)
  }).then(function(res) {
    if (res.status === 200) {
      if (navigator.credentials) {
        navigator.credentials.requireUserMediation()
        .then(function() {
          location.href = '/?quote=You are signed out';
        });
      } else {
        location.href = '/?quote=You are unregistered';
      }
    } else {
      app.fire('show-toast', {
        text: 'Unregister failed'
      });
    }
  }, function() {
    app.fire('show-toast', {
      text: 'Unregister failed'
    });
  });
});

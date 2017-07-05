var autoSignIn = function() {
  if (cmapiAvailable) {
    return navigator.credentials.get({
      password: true
    }).then(function(cred) {
      if (cred) {
        var form = new FormData();
        var csrf_token = document.querySelector('#csrf_token').value;
        form.append('csrf_token', csrf_token);

        switch (cred.type) {
          case 'password':
            form.append('email', cred.id);
            form.append('password', cred.password);
            return fetch('/auth/password', {
              method: 'POST',
              credentials: 'include',
              body: form
            });
        }
        return Promise.reject();
      } else {
        return Promise.reject();
      }
    }).then(function(res) {
      if (res.status === 200) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    });
  } else {
    return Promise.reject();
  }
};

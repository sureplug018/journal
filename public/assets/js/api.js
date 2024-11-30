////////////////////////////////////////
// alerts
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) {
    el.classList.remove('show');
    el.classList.add('hide');

    // Remove the element from the DOM after the fade-out animation
    el.addEventListener('animationend', () => {
      el.remove();
    });
  }
};

const showAlert = (type, msg) => {
  hideAlert(); // Ensure no existing alert is visible

  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);

  const alertElement = document.querySelector('.alert');
  if (alertElement) {
    // Trigger the drop-down effect and make it visible
    alertElement.classList.add('show');

    // Hide the alert after 5 seconds
    window.setTimeout(hideAlert, 5000);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 3000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const adminLogin = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/admin-login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/admin/dashboard');
      }, 3000);
    }
  } catch (err) {
    // console.log(err);
    showAlert('error', err.response.data.message);
  }
};

const signUp = async (
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  passwordConfirm,
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Signed up successfully!');
      window.setTimeout(() => {
        location.assign('/confirm-email');
      }, 3000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const forgotPassword = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: {
        email,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Password reset email sent!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const resetPassword = async (password, passwordConfirm, resetToken) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/resetPassword/${resetToken}`,
      data: {
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Successfully reset password');

      // Redirect to the login page after a delay
      window.setTimeout(() => {
        location.assign('/login');
      }, 3000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const supportFaq = async (fullName, email, phoneNumber, subject, message) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/supports/send-support',
      data: {
        fullName,
        email,
        phoneNumber,
        subject,
        message,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Message sent successfully!');

      window.setTimeout(() => {
        location.reload();
      }, 3000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const updateAdminData = async (firstName, lastName, phoneNumber) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/update',
      data: {
        firstName,
        lastName,
        phoneNumber,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Successfully updated profile!');

      // Redirect to the login page after a delay
      window.setTimeout(() => {
        location.reload();
      }, 3000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const updateAdminPassword = async (
  passwordCurrent,
  password,
  passwordConfirm,
) => {
  try {
    const res = await axios({
      method: 'patch',
      url: '/api/v1/users/updateMyPassword',
      data: {
        passwordCurrent,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Password updated successfully!');

      window.setTimeout(() => {
        location.reload();
      }, 3000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const logoutUser = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: '/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      setTimeout(function () {
        location.href = '/';
      }, 2000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const addJournal = async (formData) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/v1/journals/upload-journal',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Journal published successfully!');
      window.setTimeout(() => {
        location.reload();
      }, 3000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const addEvent = async (title, details) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/events/create-event',
      data: {
        title,
        details,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Event Added!');
      window.setTimeout(() => {
        location.reload();
      }, 3000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err);
  }
};

const submitArticle = async (formData) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/articles/submit-article',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Article Submitted!');
      window.setTimeout(() => {
        location.reload();
      }, 3000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err);
  }
};

const addScope = async (scope) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/v1/scopes/create-scope',
      data: {
        scope,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Scope Updated!');
      window.setTimeout(() => {
        location.reload();
      }, 3000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err);
  }
};

const addEditor = async (name, dept, levelOfEducation, occupation) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/v1/editors/create-editor',
      data: {
        name,
        dept,
        levelOfEducation,
        occupation,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Editor Added!');
      window.setTimeout(() => {
        location.reload();
      }, 3000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err);
  }
};

const userRole = async (email, role) => {
  try {
    const res = await axios({
      method: 'patch',
      url: '/api/v1/users/change-role',
      data: {
        email,
        role,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'User Role Updated!');
      setTimeout(function () {
        location.reload();
      }, 3000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const loginForm = document.querySelector('.form-login');
const adminLoginForm = document.querySelector('.admin-form-login');
const signupForm = document.querySelector('.form-signup');
const forgotPasswordButton = document.querySelector('.form-forgot-password');
const resetPasswordButton = document.querySelector('.form-reset-password');
const supportFormFaq = document.querySelector('.support-form-faq');
const adminProfileForm = document.querySelector('.admin-profile-form');
const updateAdminPasswordForm = document.querySelector('.admin-password-form');
const logoutUserBtn = document.querySelector('.signOut-user-btn');
const journalForm = document.querySelector('.add-journal-form');
const eventForm = document.querySelector('.event-form');
const submitArticleForm = document.querySelector('.submit-article-form');
const scopeForm = document.querySelector('.add-scope-form');
const editorForm = document.querySelector('.add-editor-form');
const userRoleForm = document.querySelector('.user-role-form');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.login-btn').style.opacity = '0.5';
    document.querySelector('.login-btn').textContent = 'Signing in...';
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await login(email, password);
    document.querySelector('.login-btn').style.opacity = '1';
    document.querySelector('.login-btn').textContent = 'Sign in';
  });
}

if (userRoleForm) {
  userRoleForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.querySelector('.update-btn');
    submitBtn.style.opacity = '0.5';
    submitBtn.textContent = 'Updating...';
    submitBtn.disabled = true;

    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    await userRole(email, role);

    submitBtn.style.opacity = '1';
    submitBtn.textContent = 'Update Role';
    submitBtn.disabled = false;
  });
}

if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.admin-login-btn').style.opacity = '0.5';
    document.querySelector('.admin-login-btn').textContent = 'Signing in...';
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await adminLogin(email, password);
    document.querySelector('.admin-login-btn').style.opacity = '1';
    document.querySelector('.admin-login-btn').textContent = 'Sign in';
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--signup').style.opacity = '0.5';
    document.querySelector('.btn--signup').textContent = 'signing up...';

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    await signUp(
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      passwordConfirm,
    );
    document.querySelector('.btn--signup').style.opacity = '1';
    document.querySelector('.btn--signup').textContent = 'sign up';
  });
}

if (forgotPasswordButton) {
  forgotPasswordButton.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--forgot').style.opacity = '0.5';
    document.querySelector('.btn--forgot').textContent =
      'Sending reset link...';

    const email = document.getElementById('email').value;

    await forgotPassword(email);

    document.querySelector('.btn--forgot').style.opacity = '1';
    document.querySelector('.btn--forgot').textContent =
      'Send password reset email';
  });
}

if (resetPasswordButton) {
  resetPasswordButton.addEventListener('submit', async (e) => {
    e.preventDefault();

    document.querySelector('.btn--reset').style.opacity = '0.5';
    document.querySelector('.btn--reset').textContent = 'Resetting password...';

    // Get the resetToken from the URL parameters
    const urlParams = window.location.pathname.split('/').pop();

    // Get the password and passwordConfirm from the form fields
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    // Call the resetPassword function with the obtained resetToken
    await resetPassword(password, passwordConfirm, urlParams);

    document.querySelector('.btn--reset').style.opacity = '1';
    document.querySelector('.btn--reset').textContent = 'Reset password';
  });
}

if (supportFormFaq) {
  supportFormFaq.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = document.querySelector('.support-faq-btn');

    button.style.opacity = '0.5';
    button.textContent = 'Sending...';
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    await supportFaq(fullName, email, phoneNumber, subject, message);
    button.style.opacity = '1';
    button.textContent = 'Send Message';
  });
}

if (adminProfileForm) {
  adminProfileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = document.querySelector('.admin-profile-btn');
    button.style.opacity = '0.5';
    button.textContent = 'Saving...';
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    await updateAdminData(firstName, lastName, phoneNumber);
    button.style.opacity = '1';
    button.textContent = 'Save Changes';
  });
}

if (updateAdminPasswordForm) {
  updateAdminPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = document.querySelector('.admin-password-btn');
    button.style.opacity = '0.5';
    button.textContent = 'Saving...';
    const passwordCurrent = document.getElementById('passwordCurrent').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    await updateAdminPassword(passwordCurrent, password, passwordConfirm);
    button.style.opacity = '1';
    button.textContent = 'Save Changes';
  });
}

if (logoutUserBtn) {
  logoutUserBtn.addEventListener('click', logoutUser);
}

if (journalForm) {
  journalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = document.querySelector('.add-journal-btn');
    button.style.opacity = '0.5';
    button.textContent = 'Uploading...';
    button.disabled = true;
    const formData = new FormData();

    formData.append('volume', document.getElementById('volume').value);
    formData.append('number', document.getElementById('number').value);
    formData.append('month', document.getElementById('month').value);
    formData.append('year', document.getElementById('year').value);
    formData.append(
      'imageCover',
      document.getElementById('imageCover').files[0],
    );
    formData.append('journal', document.getElementById('journal').files[0]);
    await addJournal(formData);
    button.style.opacity = '1';
    button.textContent = 'Upload Journal';
    button.disabled = false;
  });
}

if (eventForm) {
  eventForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = document.querySelector('.submit-btn');
    button.style.opacity = '0.5';
    button.textContent = 'Adding...';
    button.disabled = true;

    const title = document.getElementById('title').value;
    const details = document.getElementById('details').value;

    await addEvent(title, details);

    button.style.opacity = '1';
    button.textContent = 'Add Event';
    button.disabled = false;
  });
}

if (submitArticleForm) {
  submitArticleForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = document.querySelector('.submit-article-btn');
    button.style.opacity = '0.5';
    button.textContent = 'Submitting...';
    button.disabled = true;

    const formData = new FormData();
    formData.append('volume', document.getElementById('volume').value);
    formData.append('title', document.getElementById('title').value);
    formData.append('pageNumber', document.getElementById('pageNumber').value);
    formData.append('abstract', document.getElementById('abstract').value);
    formData.append('article', document.getElementById('article').files[0]);
    formData.append('authors', document.getElementById('authors').value);

    await submitArticle(formData);
    button.style.opacity = '1';
    button.textContent = 'Submit Article';
    button.disabled = false;
  });
}

if (scopeForm) {
  scopeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = document.querySelector('.add-scope-btn');
    button.style.opacity = '0.5';
    button.textContent = 'Adding...';
    button.disabled = true;
    const scope = document.getElementById('scope').value;
    await addScope(scope);
    button.style.opacity = '1';
    button.textContent = 'Add Scope';
    button.disabled = false;
  });
}

if (editorForm) {
  editorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = document.querySelector('.add-editor-btn');
    button.style.opacity = '0.5';
    button.textContent = 'Adding...';
    button.disabled = true;
    const name = document.getElementById('name').value;
    const dept = document.getElementById('dept').value;
    const levelOfEducation = document.getElementById('levelOfEducation').value;
    const occupation = document.getElementById('occupation').value;
    await addEditor(name, dept, levelOfEducation, occupation);
    button.style.opacity = '1';
    button.textContent = 'Add Editor';
    button.disabled = false;
  });
}

/////////////////////        EVENT       ////////////////////////

const editEventModalButtons = document.querySelectorAll('.edit-event-modal');
const deleteEventModal = document.querySelectorAll('.delete-event-modal');
const editButton = document.querySelector('.edit-btn');
const deleteButton = document.querySelector('.delete-btn');

let currentEventId = null;

// Add click event listener to each edit button
editEventModalButtons.forEach((button) => {
  button.addEventListener('click', function () {
    // Set the current event ID based on the clicked button
    currentEventId = this.dataset.eventId;
  });
});

deleteEventModal.forEach((button) => {
  button.addEventListener('click', function () {
    currentEventId = this.dataset.eventId;
  });
});

if (editButton) {
  // Add a single click event listener to the edit button
  editButton.addEventListener('click', async (e) => {
    e.preventDefault();

    // Ensure an event ID is set
    if (!currentEventId) return;

    editButton.style.opacity = '0.5';
    editButton.textContent = 'Updating...';
    editButton.disabled = true;

    const info = {
      title: document.getElementById('title').value,
      details: document.getElementById('details').value,
    };

    try {
      const res = await axios.patch(
        `/api/v1/events/edit-event/${currentEventId}`,
        info,
      );

      if (res.data.status === 'success') {
        showAlert('success', 'Event updated successfully!');
        window.setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (err) {
      showAlert(
        'error',
        err.response ? err.response.data.message : 'Error updating event',
      );
    } finally {
      editButton.style.opacity = '1';
      editButton.textContent = 'Update Event';
      editButton.disabled = false;
    }
  });
}

if (deleteButton) {
  deleteButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!currentEventId) return;

    deleteButton.style.opacity = '0.5';
    deleteButton.disabled = true;
    deleteButton.textContent = 'Deleting...';

    try {
      const res = await axios.delete(
        `/api/v1/events/delete-event/${currentEventId}`,
      );

      if (res.data.status === 'success') {
        showAlert('success', 'Event deleted successfully!');
        window.setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (err) {
      showAlert(
        'error',
        err.response ? err.response.data.message : 'Error deleting event',
      );
    } finally {
      deleteButton.style.opacity = '1';
      deleteButton.disabled = false;
      deleteButton.textContent = 'Delete Event';
    }
  });
}

//////////////////////////          JOURNAL        //////////////////////////////

const editJournalModal = document.querySelectorAll('.edit-journal-modal');
const deleteJournalModal = document.querySelectorAll('.delete-journal-modal');
const editJournalBtn = document.querySelector('.edit-journal-btn');
const deleteJournalBtn = document.querySelector('.delete-journal-btn');

let currentJournalId = null;

editJournalModal.forEach((button) => {
  button.addEventListener('click', function () {
    currentJournalId = this.dataset.journalId;
  });
});

deleteJournalModal.forEach((button) => {
  button.addEventListener('click', function () {
    currentJournalId = this.dataset.journalId;
  });
});
if (editJournalBtn) {
  editJournalBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!currentJournalId) return;

    editJournalBtn.style.opacity = '0.5';
    editJournalBtn.disabled = true;
    editJournalBtn.textContent = 'Updating...';

    const formData = new FormData();

    formData.append('volume', document.getElementById('volume').value);
    formData.append('number', document.getElementById('number').value);
    formData.append('month', document.getElementById('month').value);
    formData.append('year', document.getElementById('year').value);
    formData.append(
      'imageCover',
      document.getElementById('imageCover').files[0],
    );
    formData.append('journal', document.getElementById('journal').files[0]);

    try {
      const res = await axios.patch(
        `/api/v1/journals/edit-journal/${currentJournalId}`,
        formData,
      );

      if (res.data.status === 'success') {
        showAlert('success', 'Journal updated successfully!');
        window.setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (err) {
      showAlert(
        'error',
        err.response ? err.response.data.message : 'Error updating journal',
      );
    } finally {
      editJournalBtn.style.opacity = '1';
      editJournalBtn.disabled = false;
      editJournalBtn.textContent = 'Update Journal';
    }
  });
}

if (deleteJournalBtn) {
  deleteJournalBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!currentJournalId) return;

    deleteJournalBtn.style.opacity = '0.5';
    deleteJournalBtn.textContent = 'Deleting...';
    deleteJournalBtn.disabled = true;

    try {
      const res = await axios.delete(
        `/api/v1/journals/delete-journal/${currentJournalId}`,
      );

      if (res.data.status === 'success') {
        showAlert('success', 'Journal deleted!');

        window.setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (err) {
      showAlert(
        'error',
        err.response ? err.response.data.message : 'Error deleting journal',
      );
    } finally {
      deleteJournalBtn.style.opacity = '1';
      deleteJournalBtn.disabled = false;
      deleteJournalBtn.textContent = 'Delete Journal';
    }
  });
}

////////////////////////////        ARTICLE       //////////////////////////////

const addArticleModal = document.querySelectorAll('.add-article-modal');
const addArticleBtn = document.querySelector('.add-article-btn');
let currentArticleId = null;

addArticleModal.forEach((button) => {
  button.addEventListener('click', function () {
    currentArticleId = this.dataset.journalId;
  });
});

if (addArticleBtn) {
  addArticleBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!currentArticleId) return;

    addArticleBtn.style.opacity = '0.5';
    addArticleBtn.disabled = true;
    addArticleBtn.textContent = 'Processing...';

    // Collect input data
    const title = document.getElementById('title').value;
    const abstract = document.getElementById('abstract').value;
    const pageNumber = document.getElementById('pageNumber').value;
    const article = document.getElementById('article').files[0];

    if (!title) {
      addArticleBtn.style.opacity = '1';
      addArticleBtn.disabled = false;
      addArticleBtn.textContent = 'Publish Article';
      return showAlert('error', 'Title is required');
    }

    if (!pageNumber) {
      addArticleBtn.style.opacity = '1';
      addArticleBtn.disabled = false;
      addArticleBtn.textContent = 'Publish Article';
      return showAlert('error', 'Page number is required');
    }

    if (!abstract) {
      addArticleBtn.style.opacity = '1';
      addArticleBtn.disabled = false;
      addArticleBtn.textContent = 'Publish Article';
      return showAlert('error', 'Abstract is required');
    }

    if (!article) {
      addArticleBtn.style.opacity = '1';
      addArticleBtn.disabled = false;
      addArticleBtn.textContent = 'Publish Article';
      return showAlert('error', 'Upload a file is required');
    }

    const authors = Array.from(
      document.querySelectorAll('[name="firstName[]"]'),
    )
      .map((_, i) => {
        const firstName = document.querySelectorAll('[name="firstName[]"]')[i]
          .value;
        const lastName = document.querySelectorAll('[name="lastName[]"]')[i]
          .value;
        const email = document.querySelectorAll('[name="email[]"]')[i].value;
        if (firstName && lastName && email) {
          return { firstName, lastName, email };
        }
      })
      .filter(Boolean);

    if (authors.length === 0) {
      addArticleBtn.style.opacity = '1';
      addArticleBtn.disabled = false;
      addArticleBtn.textContent = 'Publish Article';
      return showAlert('error', 'Add at least one author');
    }

    // Create FormData and log its contents
    const formData = new FormData();
    formData.append('title', title);
    formData.append('abstract', abstract);
    formData.append('pageNumber', pageNumber);
    formData.append('authors', JSON.stringify(authors));
    formData.append('article', article);

    try {
      const response = await axios.post(
        `/api/v1/articles/create-article/${currentArticleId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.status === 'success') {
        showAlert('success', 'Article Published!');
        window.setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (err) {
      showAlert(
        'error',
        err.response ? err.response.data.message : 'Error creating article',
      );
    } finally {
      addArticleBtn.style.opacity = '1';
      addArticleBtn.disabled = false;
      addArticleBtn.textContent = 'Publish Article';
    }
  });
}

///////////////////////              EDIT ARTICLE            ///////////////////////////
const editArticleModal = document.querySelectorAll('.edit-article-modal');
const editArticleBtn = document.querySelector('.edit-article-btn');
const deleteArticleModal = document.querySelectorAll('.delete-article-modal');
const deleteArticleBtn = document.querySelector('.delete-article-btn');
let currentArticleIdDetail = null;

editArticleModal.forEach((button) => {
  button.addEventListener('click', function () {
    currentArticleIdDetail = this.dataset.articleId;
  });
});

deleteArticleModal.forEach((button) => {
  button.addEventListener('click', function () {
    currentArticleIdDetail = this.dataset.articleId;
  });
});

if (editArticleBtn) {
  editArticleBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!currentArticleIdDetail) return;

    editArticleBtn.style.opacity = '0.5';
    editArticleBtn.disabled = true;
    editArticleBtn.textContent = 'Processing...';

    // Collect input data
    const title = document.getElementById('title').value;
    const abstract = document.getElementById('abstract').value;
    const pageNumber = document.getElementById('pageNumber').value;
    const article = document.getElementById('article').files[0];

    const authors = Array.from(
      document.querySelectorAll('[name="firstName[]"]'),
    )
      .map((_, i) => {
        const firstName = document.querySelectorAll('[name="firstName[]"]')[i]
          .value;
        const lastName = document.querySelectorAll('[name="lastName[]"]')[i]
          .value;
        const email = document.querySelectorAll('[name="email[]"]')[i].value;
        if (firstName && lastName && email) {
          return { firstName, lastName, email };
        }
      })
      .filter(Boolean);

    // Create FormData and log its contents
    const formData = new FormData();
    formData.append('title', title);
    formData.append('abstract', abstract);
    formData.append('pageNumber', pageNumber);
    if (authors.length > 0) {
      formData.append('authors', JSON.stringify(authors));
    }
    formData.append('article', article);

    try {
      const response = await axios.patch(
        `/api/v1/articles/edit-article/${currentArticleIdDetail}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.status === 'success') {
        showAlert('success', 'Article Updated!');
        window.setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (err) {
      showAlert(
        'error',
        err.response ? err.response.data.message : 'Error creating article',
      );
    } finally {
      editArticleBtn.style.opacity = '1';
      editArticleBtn.disabled = false;
      editArticleBtn.textContent = 'Update Journal';
    }
  });
}

if (deleteArticleBtn) {
  deleteArticleBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    // Get the resetToken from the URL parameters
    const urlParams = window.location.pathname.split('/').pop();

    if (!currentArticleIdDetail) return;

    deleteArticleBtn.style.opacity = '0.5';
    deleteArticleBtn.textContent = 'Deleting...';
    deleteArticleBtn.disabled = true;

    try {
      const res = await axios.delete(
        `/api/v1/articles/delete-article/${currentArticleIdDetail}/${urlParams}`,
      );

      if (res.data.status === 'success') {
        showAlert('success', 'Article deleted!');

        window.setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (err) {
      showAlert(
        'error',
        err.response ? err.response.data.message : 'Error deleting article',
      );
    } finally {
      deleteArticleBtn.style.opacity = '1';
      deleteArticleBtn.disabled = false;
      deleteArticleBtn.textContent = 'Delete Article';
    }
  });
}

/////////////////////////           SUPPORT            ///////////////////////////////////
const replySupportModal = document.querySelectorAll('.reply-support-modal');
const replySupportBtn = document.querySelector('.reply-support-btn');
const sendMailModal = document.querySelectorAll('.send-mail-modal');
const sendMailBtn = document.querySelector('.send-mail-btn');

let currentUserId = null;
let supportId = null;

replySupportModal.forEach((button) => {
  button.addEventListener('click', function () {
    supportId = this.dataset.supportId;
  });
});

sendMailModal.forEach((button) => {
  button.addEventListener('click', function () {
    currentUserId = this.dataset.userId;
  });
});

if (replySupportBtn) {
  replySupportBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!currentUserId) return;

    replySupportBtn.style.opacity = '0.5';
    replySupportBtn.textContent = 'Sending Reply...';
    replySupportBtn.disabled = true;

    const info = {
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
    };

    try {
      const res = await axios.post(
        `/api/v1/supports/reply-support/${supportId}`,
        info,
      );

      if (res.data.status === 'success') {
        showAlert('success', 'Message Sent!');

        window.setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (err) {
      showAlert(
        'error',
        err.response ? err.response.data.message : 'Error sending message',
      );
    } finally {
      replySupportBtn.style.opacity = '1';
      replySupportBtn.disabled = false;
      replySupportBtn.textContent = 'Send Mail';
    }
  });
}

if (sendMailBtn) {
  sendMailBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!currentUserId) return;

    sendMailBtn.style.opacity = '0.5';
    sendMailBtn.textContent = 'Sending Reply...';
    sendMailBtn.disabled = true;

    const info = {
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
    };

    try {
      const res = await axios.post(
        `/api/v1/supports/send-mail/${currentUserId}`,
        info,
      );

      if (res.data.status === 'success') {
        showAlert('success', 'Message Sent!');

        window.setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (err) {
      showAlert(
        'error',
        err.response ? err.response.data.message : 'Error sending message',
      );
    } finally {
      sendMailBtn.style.opacity = '1';
      sendMailBtn.disabled = false;
      sendMailBtn.textContent = 'Send Mail';
    }
  });
}

//////////////////////            EDITORS                 /////////////////////////////
const editEditorModal = document.querySelectorAll('.edit-editor-modal');
const editEditorBtn = document.querySelector('.edit-editor-btn');
const deleteEditorModal = document.querySelectorAll('.delete-editor-modal');
const deleteEditorBtn = document.querySelector('.delete-editor-btn');
let currentEditorId = null;

editEditorModal.forEach((button) => {
  button.addEventListener('click', function () {
    currentEditorId = this.dataset.editorId;
  });
});

deleteEditorModal.forEach((button) => {
  button.addEventListener('click', function () {
    currentEditorId = this.dataset.editorId;
  });
});

if (editEditorBtn) {
  editEditorBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!currentEditorId) return;

    editEditorBtn.style.opacity = '0.5';
    editEditorBtn.disabled = true;
    editEditorBtn.textContent = 'Processing...';

    const info = {
      name: document.getElementById('name').value,
      dept: document.getElementById('dept').value,
      levelOfEducation: document.getElementById('levelOfEducation').value,
      occupation: document.getElementById('occupation').value,
    };

    try {
      const response = await axios.patch(
        `/api/v1/editors/edit-editor/${currentEditorId}`,
        info,
      );

      if (response.data.status === 'success') {
        showAlert('success', 'Editor Updated!');
        window.setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (err) {
      showAlert(
        'error',
        err.response ? err.response.data.message : 'Error creating article',
      );
    } finally {
      editEditorBtn.style.opacity = '1';
      editEditorBtn.disabled = false;
      editEditorBtn.textContent = 'Update Editor';
    }
  });
}

if (deleteEditorBtn) {
  deleteEditorBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!currentEditorId) return;

    deleteEditorBtn.style.opacity = '0.5';
    deleteEditorBtn.textContent = 'Deleting...';
    deleteEditorBtn.disabled = true;

    try {
      const res = await axios.delete(
        `/api/v1/editors/delete-editor/${currentEditorId}`,
      );

      if (res.data.status === 'success') {
        showAlert('success', 'Editor deleted!');

        window.setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (err) {
      showAlert(
        'error',
        err.response ? err.response.data.message : 'Error deleting article',
      );
    } finally {
      deleteEditorBtn.style.opacity = '1';
      deleteEditorBtn.disabled = false;
      deleteEditorBtn.textContent = 'Delete Editor';
    }
  });
}

///////////////////////        SUBMISSIONS           ////////////////////////////////
const deleteSubmissionModal = document.querySelectorAll(
  '.delete-submission-modal',
);
const deleteSubmissionBtn = document.querySelector('.delete-submission-btn');

let submissionId = null;

deleteSubmissionModal.forEach((button) => {
  button.addEventListener('click', function () {
    submissionId = this.dataset.submissionId;
  });
});

if (deleteSubmissionBtn) {
  deleteSubmissionBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    deleteSubmissionBtn.style.opacity = '0.5';
    deleteSubmissionBtn.textContent = 'Deleting...';
    deleteSubmissionBtn.disabled = true;

    try {
      const res = await axios.delete(
        `/api/v1/articles/delete-submission/${submissionId}`,
      );

      if (res.data.status === 'success') {
        showAlert('success', 'Success!');
        window.setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      showAlert('error', err.response.data.message);
    } finally {
      deleteSubmissionBtn.style.opacity = '1';
      deleteSubmissionBtn.textContent = 'Delete';
      deleteSubmissionBtn.disabled = false;
    }
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////       search Functions    ///////////////////////////////////////////////////////////////

// Find suggestions on input event
const searchInputField = document.querySelectorAll('.suggestions');

if (searchInputField) {
  searchInputField.forEach((input) => {
    input.addEventListener('input', async function (e) {
      e.preventDefault();
      const query = input.value;

      if (query.length > 0) {
        const suggestions = document.querySelectorAll('.list-of-suggestions');
        suggestions.forEach((input) => {
          input.style.display = 'block';
        });

        // Make sure there is something to search for
        try {
          // Correctly format the query parameter with '='
          const res = await fetch(
            `/api/v1/articles/find-article?name=${encodeURIComponent(query)}`,
          );

          // Check if the response is okay (status 200-299)
          if (res.ok) {
            const data = await res.json();

            console.log(data);

            const suggestions = document.querySelectorAll(
              '.list-of-suggestions',
            );

            suggestions.forEach((input) => {
              input.innerHTML = '';
              data.data.articles.forEach((article) => {
                const li = document.createElement('li');
                // Set inline styles
                li.style.padding = '5px'; // Add some padding
                li.style.backgroundColor = '#fff'; // Light background color
                li.style.cursor = 'pointer'; // Change cursor to pointer
                li.style.transition = 'background-color 0.3s'; // Transition for hover effect
                li.style.display = 'block';
                li.style.width = '100%';
                li.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';

                // Add hover effect using mouse events
                li.addEventListener('mouseover', () => {
                  li.style.backgroundColor = '#e0e0e0'; // Darker on hover
                });

                li.addEventListener('mouseout', () => {
                  li.style.backgroundColor = '#f9f9f9'; // Revert on mouse out
                });

                li.textContent = article.title;
                input.appendChild(li);

                // Define a custom slugify function
                function slugify(text) {
                  return text
                    .toString()
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, '-') // Replace spaces with -
                    .replace(/[^\w\-\.]+/g, '') // Remove all non-word chars except dot
                    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
                }

                // Apply slugify to the list item's textContent
                li.addEventListener('click', () => {
                  const slug = slugify(li.textContent);
                  window.location.href = `/articles/search?search=${slug}`; // Redirect to the product link with slug
                });
              });
            });

            // You can call a function to display suggestions here
            // displaySuggestions(data);
          } else {
            console.error('Error fetching suggestions:', res.statusText);
          }
        } catch (err) {
          console.error('Fetch error:', err);
        }
      } else {
        // Optionally clear suggestions if input is empty
        const suggestions = document.querySelectorAll('.list-of-suggestions');
        suggestions.forEach((input) => {
          input.style.display = 'none';
        });
      }
    });
  });
}

const searchBtn = document.querySelectorAll('.search-btn');
const searchInputs = document.querySelectorAll('.suggestions');

if (searchBtn && searchInputs) {
  // Handle search button clicks
  searchBtn.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      handleSearch();
    });
  });

  // Handle pressing the 'Enter' key in the search input
  searchInputs.forEach((input) => {
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter' && input.value.trim().length > 0) {
        e.preventDefault();
        handleSearch();
      }
    });
  });
}

// Search handling logic
function handleSearch() {
  searchInputs.forEach((input) => {
    const query = input.value.trim();
    if (query.length > 0) {
      // Define a custom slugify function
      function slugify(text) {
        return text
          .toString()
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-') // Replace spaces with -
          .replace(/[^\w\-\.]+/g, '') // Remove all non-word chars except dot
          .replace(/\-\-+/g, '-'); // Replace multiple - with single -
      }

      const slug = slugify(query);
      window.location.href = `/articles/search?search=${slug}`; // Redirect to the product link with slug
    }
  });
}

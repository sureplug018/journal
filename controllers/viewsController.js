const User = require('../models/userModel');
const Support = require('../models/supportModel');
const Journal = require('../models/journalModel');
const Event = require('../models/eventModel');
const Article = require('../models/articleModel');

exports.login = async (req, res) => {
  try {
    return res.status(200).render('login', {
      title: 'Login',
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    return res.status(200).render('signUp', {
      title: 'Sign Up',
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    return res.status(200).render('forgotPassword', {
      title: 'Forgot Password',
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    return res.status(200).render('resetPassword', {
      title: 'Reset Password',
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.home = async (req, res) => {
  try {
    const user = res.locals.user;
    return res.status(200).render('index', {
      title: 'Home',
      user,
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.about = async (req, res) => {
  try {
    const user = res.locals.user;
    return res.status(200).render('about', {
      title: 'About',
      user,
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.editorialTeam = async (req, res) => {
  try {
    const user = res.locals.user;
    return res.status(200).render('editorial', {
      title: 'Editorial Team',
      user,
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.submissionGuidelines = async (req, res) => {
  try {
    const user = res.locals.user;

    return res.status(200).render('submissions', {
      title: 'Submission Guidelines',
      user,
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.issues = async (req, res) => {
  try {
    const user = res.locals.user;

    return res.status(200).render('issues', {
      title: 'Journal Issues',
      user,
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.contact = async (req, res) => {
  try {
    const user = res.locals.user;

    return res.status(200).render('contact', {
      title: 'Contact Us',
      user,
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.error = async (req, res) => {
  try {
    const user = res.locals.user;

    return res.status(200).render('404', {
      title: 'Error',
      user,
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.accountSettings = async (req, res) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.status(302).redirect('/login');
    }

    if (user) {
      return res.status(200).render('accountsettings', {
        title: 'Profile',
        user,
      });
    }
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.confirmEmail = async (req, res) => {
  try {
    return res.status(200).render('confirmEmail', {
      title: 'Confirm Email',
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.emailConfirmation = async (req, res) => {
  try {
    return res.status(200).render('email-confirmed', {
      title: 'Confirm Email',
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    return res.status(200).render('resetPassword', {
      title: 'Reset Password',
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.events = async (req, res) => {
  try {
    const user = res.locals.user;

    return res.status(200).render('events', {
      title: 'Events',
      user,
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    return res.status(200).render('admin-login', {
      title: 'Admin Sign In',
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.addJournal = async (req, res) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.status(302).redirect('/admin-login');
    }

    if (user.role === 'admin') {
      return res.status(200).render('add-journal', {
        title: 'Add Journal',
        user,
      });
    }

    return res.status(302).redirect('/');
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.addEvent = async (req, res) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.status(302).redirect('/admin-login');
    }

    if (user.role === 'admin') {
      return res.status(200).render('add-event', {
        title: 'Add Event',
        user,
      });
    }

    return res.status(302).redirect('/');
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.eventList = async (req, res) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.status(302).redirect('/admin-login');
    }

    if (user.role === 'admin') {
      const events = await Event.find();
      return res.status(200).render('event-list', {
        title: 'Events',
        user,
        events,
      });
    }

    return res.status(302).redirect('/');
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.addArticle = async (req, res) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.status(302).redirect('/admin-login');
    }

    if (user.role === 'admin') {
      return res.status(200).render('add-article', {
        title: 'Add Article',
        user,
      });
    }

    return res.status(302).redirect('/');
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.submitArticle = async (req, res) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.status(302).redirect('/login');
    }

    if (user.role === 'user') {
      return res.status(200).render('submitArticle', {
        title: 'Submit Article',
        user,
      });
    }

    return res.status(302).redirect('/');
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.underReview = async (req, res) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.status(302).redirect('/admin-login');
    }

    if (user.role === 'admin') {
      return res.status(200).render('underreview', {
        title: 'Under Review',
        user,
      });
    }

    return res.status(302).redirect('/');
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.underReviewDetail = async (req, res) => {
  try {
    const user = res.locals.user;
    const { articleId } = req.params;

    if (!user) {
      return res.status(302).redirect('/admin-login');
    }

    if (user.role === 'admin') {
      const article = await Article.findById(articleId);
      if (!article) {
        return (
          res.status(404).render(404),
          {
            title: 'Error',
            message: 'Something went wrong',
          }
        );
      }
      return res.status(200).render('underReviewDetails', {
        title: 'Article Details',
        article,
        user,
      });
    }

    return res.status(302).redirect('/');
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.editAuthors = async (req, res) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.status(302).redirect('/login');
    }

    if (user.role === 'admin') {
      return res.status(200).render('underReviewDetails', {
        title: 'Article Details',
        user,
      });
    }

    return res.status(302).redirect('/');
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.article = async (req, res) => {
  try {
    const user = res.locals.user;
    return res.status(200).render('articleDetail', {
      title: 'Article Details',
      user,
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.issue = async (req, res) => {
  try {
    const user = res.locals.user;
    return res.status(200).render('journal-detail', {
      title: 'Journal Issue',
      user,
    });
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.journalList = async (req, res) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.status(302).status('/admin-login');
    }

    if (user.role === 'admin') {
      const journals = await Journal.find();
      return res.status(200).render('journal-list', {
        title: 'Journals',
        user,
        journals,
      });
    }

    return res.status(302).redirect('/');
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.addJournal = async (req, res) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.status(302).status('/admin-login');
    }

    if (user.role === 'admin') {
      return res.status(200).render('add-journal', {
        title: 'Add Journal',
        user,
      });
    }

    return res.status(302).redirect('/');
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.users = async (req, res) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.status(302).status('/admin-login');
    }

    if (user.role === 'admin') {
      const users = await User.find();
      return res.status(200).render('users', {
        title: 'Users',
        user,
        users,
      });
    }

    return res.status(302).redirect('/');
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.supports = async (req, res) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.status(302).status('/admin-login');
    }

    if (user.role === 'admin') {
      const supports = await Support.find();
      return res.status(200).render('supports', {
        title: 'Support Tickets',
        user,
        supports,
      });
    }

    return res.status(302).redirect('/');
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.contactSupport = async (req, res) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.status(302).status('/login');
    }

    if (user.role === 'user') {
      return res.status(200).render('contactSupport', {
        title: 'Contact Support',
        user,
      });
    }

    return res.status(302).redirect('/');
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.adminDashboard = async (req, res) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.status(302).status('/admin-login');
    }

    if (user.role === 'admin') {
      const users = await User.find();
      const supports = await Support.find();
      const journals = await Journal.find();
      const underReview = await Article.find({ status: 'Under Review' });
      const events = await Event.find();
      return res.status(200).render('adminDashboard', {
        title: 'Admin Dashboard',
        user,
        users,
        supports,
        journals,
        underReview,
        events,
      });
    }

    return res.status(302).redirect('/');
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.adminJournalDetails = async (req, res) => {
  try {
    const user = res.locals.user;
    const { journalId } = req.params;

    if (!user) {
      return res.status(302).redirect('/admin-login');
    }

    if (user.role === 'admin') {
      const articles = await Article.find({ journal: journalId });
      return res.status(200).render('admin-journal-details', {
        title: 'Articles',
        user,
        articles,
      });
    }
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

exports.articleDetailAdmin = async (req, res) => {
  try {
    const user = res.locals.user;
    const { articleId } = req.params;

    if (!user) {
      return res.status(302).redirect('/admin-login');
    }

    if (user.role === 'admin') {
      const article = await Article.findById(articleId);
      if (!article) {
        return (
          res.status(404).render(404),
          {
            title: 'Error',
            message: 'Something went wrong',
          }
        );
      }
      return res.status(200).render('article-detail-admin', {
        title: 'Article Details',
        article,
        user,
      });
    }

    return res.status(302).redirect('/');
  } catch (err) {
    return res.status(500).render('404', {
      title: 'Error',
      message: 'Something went wrong',
    });
  }
};

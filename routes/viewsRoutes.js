const express = require('express');
const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/login', viewsController.login);

router.get('/sign-up', viewsController.signUp);

router.get('/forgot-password', viewsController.forgotPassword);

router.get('/reset-password/:token', viewsController.resetPassword);

router.get('/confirm-email', viewsController.confirmEmail);

router.get(
  '/email-confirmation/:token',
  authController.confirmEmailFE,
  viewsController.emailConfirmation,
);

router.get('/reset-password/:resetToken', viewsController.resetPassword);

router.get('/admin-login', viewsController.adminLogin);

router.use(authController.isLoggedIn);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////               USER                 ///////////////////////////////////

router.get('/articles/search', viewsController.searchResult);

router.get('/error', viewsController.error);

router.get('/', viewsController.home);

router.get('/about-us', viewsController.about);

router.get('/editorial-team', viewsController.editorialTeam);

router.get('/submission-guidelines', viewsController.submissionGuidelines);

router.get('/journal-issues', viewsController.issues);

router.get('/journal-issues/:journalId', viewsController.issue);

router.get('/journal-issues/:journalId/:slug', viewsController.article);

router.get('/journal-issue/:slug', viewsController.article2);

router.get('/contact-us', viewsController.contact);

router.get('/account', viewsController.accountSettings);

router.get('/events', viewsController.events);

router.get('/submit-article', viewsController.submitArticle);

router.get('/contact-support', viewsController.contactSupport);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////               ADMIN                 //////////////////////////////////

router.get('/add-journal', viewsController.addJournal);

router.get('/journals', viewsController.journalList);

router.get('/journals/:journalId', viewsController.adminJournalDetails);

router.get('/journal/:articleId', viewsController.articleDetailAdmin);

router.get('/add-event', viewsController.addEvent);

router.get('/event-list', viewsController.eventList);

router.get('/add-article/:journalId', viewsController.addArticle);

router.get('/article/under-review', viewsController.underReview);

router.get('/article-details/:articleId', viewsController.underReviewDetail);

router.get('/users', viewsController.users);

router.get('/supports', viewsController.supports);

router.get('/admin/dashboard', viewsController.adminDashboard);

router.get('/scope', viewsController.scope);

router.get('/add-editor', viewsController.addEditor);

router.get('/editors', viewsController.editEditor);

router.get('/edit-user-role', viewsController.editRole);

module.exports = router;

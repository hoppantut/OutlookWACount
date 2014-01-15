Outlook Web Application title counter
=====================================

Greasemonkey script for showing _inbox_ unread count in (tab) title.

The script will periodically (the interval can be configured) check to see if there are any unread emails in your inbox.
It relies on the fact that OWA will poll the exchange server for new mails at given intervals and will only consult the DOM
when updating count.
